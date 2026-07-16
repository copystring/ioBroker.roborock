package de.iobroker.roborock.poc;

import com.github.unidbg.AndroidEmulator;
import com.github.unidbg.Emulator;
import com.github.unidbg.Module;
import com.github.unidbg.Symbol;
import com.github.unidbg.arm.backend.Unicorn2Factory;
import com.github.unidbg.hook.hookzz.HookEntryInfo;
import com.github.unidbg.hook.hookzz.HookZz;
import com.github.unidbg.hook.hookzz.HookZzArm64RegisterContext;
import com.github.unidbg.hook.hookzz.WrapCallback;
import com.github.unidbg.linux.android.AndroidEmulatorBuilder;
import com.github.unidbg.linux.android.AndroidResolver;
import com.github.unidbg.linux.android.dvm.AbstractJni;
import com.github.unidbg.linux.android.dvm.BaseVM;
import com.github.unidbg.linux.android.dvm.DalvikModule;
import com.github.unidbg.linux.android.dvm.DvmClass;
import com.github.unidbg.linux.android.dvm.DvmObject;
import com.github.unidbg.linux.android.dvm.StringObject;
import com.github.unidbg.linux.android.dvm.VarArg;
import com.github.unidbg.linux.android.dvm.VM;
import com.github.unidbg.linux.android.dvm.api.Signature;
import com.github.unidbg.linux.android.dvm.array.ArrayObject;
import com.github.unidbg.linux.android.dvm.array.ByteArray;
import com.github.unidbg.pointer.UnidbgPointer;
import net.dongliu.apk.parser.bean.CertificateMeta;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.cert.Certificate;
import java.security.cert.CertificateEncodingException;
import java.security.cert.CertificateException;
import java.security.cert.CertificateFactory;
import java.util.Arrays;
import java.util.Base64;

/**
 * Executes Roborock's original ARM64 JNI codec implementation as a local validation oracle.
 * This is reverse-engineering tooling only; it is not part of the adapter runtime.
 */
public final class RrCodecOracle implements AutoCloseable {
    private static final String API_CLASS = "com/roborock/internal/RRCodecApi";
    private static final String INIT = "init(Ljava/lang/Object;Ljava/lang/String;)V";
    private static final String CODEC = "codec(Ljava/lang/Object;[BILjava/lang/String;I)[B";
    private static final String CODEC2 = "codec2(Ljava/lang/Object;[BLjava/lang/String;II)[B";
    private static final String CODEC_B1 = "codecB1(Ljava/lang/Object;[BLjava/lang/String;II)[B";
    private static final String CODEC3 = "codec3([BLjava/lang/String;IIIIII)[B";

    private final AndroidEmulator emulator;
    private final VM vm;
    private final DvmClass api;
    private final DvmObject<?> context;

    private RrCodecOracle(File apk, File library, byte[] signingCertificate, boolean traceCodec) {
        AndroidEmulatorBuilder builder = AndroidEmulatorBuilder.for64Bit();
        builder.setProcessName("com.roborock.smart");
        builder.addBackendFactory(new Unicorn2Factory(true));
        emulator = builder.build();
        emulator.getMemory().setLibraryResolver(new AndroidResolver(23));

        vm = emulator.createDalvikVM(apk);
        CertificateMeta[] parsedSignatures = vm.getSignatures();
        if (signingCertificate == null && (parsedSignatures == null || parsedSignatures.length == 0)) {
            throw new IllegalStateException(
                "APK-Signatur fehlt. Nutze scripts/run_rrcodec_oracle.ps1 oder setze ROBOROCK_APK_CERT_DER_BASE64."
            );
        }
        vm.setJni(new RrJni(signingCertificate));
        vm.setVerbose(false);

        DalvikModule dalvikModule = vm.loadLibrary(library, false);
        dalvikModule.callJNI_OnLoad(emulator);
        if (traceCodec) {
            installCodecTracing();
        }
        api = vm.resolveClass(API_CLASS);
        context = vm.resolveClass("android/content/Context").newObject(null);
    }

    private void installCodecTracing() {
        Module libc = emulator.getMemory().findModule("libc.so");
        if (libc == null) {
            return;
        }
        installVsnprintfTrace(libc, "vsnprintf");
        installVsnprintfTrace(libc, "__vsnprintf_chk");
    }

    private void installVsnprintfTrace(Module libc, String symbolName) {
        Symbol symbol = libc.findSymbolByName(symbolName, false);
        if (symbol == null) {
            return;
        }
        HookZz.getInstance(emulator).wrap(
            symbol,
            new WrapCallback<HookZzArm64RegisterContext>() {
                @Override
                public void preCall(
                    Emulator<?> emulator,
                    HookZzArm64RegisterContext context,
                    HookEntryInfo info
                ) {
                    context.push(context.getPointerArg(0));
                }

                @Override
                public void postCall(
                    Emulator<?> emulator,
                    HookZzArm64RegisterContext context,
                    HookEntryInfo info
                ) {
                    UnidbgPointer output = context.pop();
                    if (output == null) {
                        return;
                    }
                    String value = output.getString(0);
                    if (value.length() <= 128 && value.matches("(?i)[0-9a-f]{8}.+")) {
                        System.err.println("rrcodec-vsnprintf=" + value);
                    }
                }
            }
        );
    }

    private static final class RrJni extends AbstractJni {
        private final byte[] signingCertificate;

        private RrJni(byte[] signingCertificate) {
            this.signingCertificate = signingCertificate;
        }

        @Override
        public DvmObject<?> callStaticObjectMethod(
            BaseVM vm,
            DvmClass dvmClass,
            String signature,
            VarArg varArg
        ) {
            if ("android/app/ActivityThread->currentActivityThread()Landroid/app/ActivityThread;".equals(signature)) {
                return dvmClass.newObject(null);
            }
            if (
                "java/security/cert/CertificateFactory->getInstance(Ljava/lang/String;)Ljava/security/cert/CertificateFactory;"
                    .equals(signature)
            ) {
                StringObject type = varArg.getObjectArg(0);
                try {
                    return dvmClass.newObject(CertificateFactory.getInstance(type.getValue()));
                } catch (CertificateException error) {
                    throw new IllegalStateException(error);
                }
            }
            if ("java/security/MessageDigest->getInstance(Ljava/lang/String;)Ljava/security/MessageDigest;".equals(signature)) {
                StringObject type = varArg.getObjectArg(0);
                try {
                    return dvmClass.newObject(MessageDigest.getInstance(type.getValue()));
                } catch (NoSuchAlgorithmException error) {
                    throw new IllegalStateException(error);
                }
            }
            return super.callStaticObjectMethod(vm, dvmClass, signature, varArg);
        }

        @Override
        public DvmObject<?> callObjectMethod(
            BaseVM vm,
            DvmObject<?> dvmObject,
            String signature,
            VarArg varArg
        ) {
            if ("android/app/ActivityThread->getApplication()Landroid/app/Application;".equals(signature)) {
                return vm.resolveClass("android/content/ContextWrapper").newObject(null);
            }
            if ("android/content/ContextWrapper->getPackageManager()Landroid/content/pm/PackageManager;".equals(signature)) {
                return vm.resolveClass("android/content/pm/PackageManager").newObject(null);
            }
            if ("android/content/ContextWrapper->getPackageName()Ljava/lang/String;".equals(signature)) {
                return new StringObject(vm, "com.roborock.smart");
            }
            if (
                "java/security/cert/CertificateFactory->generateCertificate(Ljava/io/InputStream;)Ljava/security/cert/Certificate;"
                    .equals(signature)
            ) {
                CertificateFactory factory = (CertificateFactory) dvmObject.getValue();
                DvmObject<?> stream = varArg.getObjectArg(0);
                try {
                    Certificate certificate = factory.generateCertificate((InputStream) stream.getValue());
                    return vm.resolveClass("java/security/cert/Certificate").newObject(certificate);
                } catch (CertificateException error) {
                    throw new IllegalStateException(error);
                }
            }
            if ("java/security/cert/Certificate->getEncoded()[B".equals(signature)) {
                Certificate certificate = (Certificate) dvmObject.getValue();
                try {
                    return new ByteArray(vm, certificate.getEncoded());
                } catch (CertificateEncodingException error) {
                    throw new IllegalStateException(error);
                }
            }
            if ("java/security/MessageDigest->digest([B)[B".equals(signature)) {
                MessageDigest messageDigest = (MessageDigest) dvmObject.getValue();
                ByteArray array = varArg.getObjectArg(0);
                return new ByteArray(vm, messageDigest.digest(array.getValue()));
            }
            return super.callObjectMethod(vm, dvmObject, signature, varArg);
        }

        @Override
        public DvmObject<?> getObjectField(BaseVM vm, DvmObject<?> dvmObject, String signature) {
            if (
                "android/content/pm/PackageInfo->signatures:[Landroid/content/pm/Signature;".equals(signature)
                    && signingCertificate != null
            ) {
                CertificateMeta metadata = new CertificateMeta(
                    null,
                    null,
                    null,
                    null,
                    signingCertificate,
                    null,
                    null
                );
                return new ArrayObject(new Signature(vm, metadata));
            }
            return super.getObjectField(vm, dvmObject, signature);
        }

        @Override
        public DvmObject<?> newObject(BaseVM vm, DvmClass dvmClass, String signature, VarArg varArg) {
            if ("java/io/ByteArrayInputStream-><init>([B)V".equals(signature)) {
                ByteArray array = varArg.getObjectArg(0);
                return dvmClass.newObject(new ByteArrayInputStream(array.getValue()));
            }
            return super.newObject(vm, dvmClass, signature, varArg);
        }
    }

    private void initialize(String appSecret) {
        api.callStaticJniMethod(emulator, INIT, context, new StringObject(vm, appSecret));
    }

    private byte[] codec(byte[] payload, int timestamp, String key, int mode) {
        return callBytes(CODEC, context, new ByteArray(vm, payload), timestamp, new StringObject(vm, key), mode);
    }

    private byte[] codec2(byte[] payload, String key, int random, int mode) {
        return callBytes(CODEC2, context, new ByteArray(vm, payload), new StringObject(vm, key), random, mode);
    }

    private byte[] codecB1(byte[] payload, String key, int random, int mode) {
        return callBytes(CODEC_B1, context, new ByteArray(vm, payload), new StringObject(vm, key), random, mode);
    }

    private byte[] codec3(
        byte[] payload,
        String key,
        int first,
        int second,
        int third,
        int fourth,
        int fifth,
        int mode
    ) {
        return callBytes(
            CODEC3,
            new ByteArray(vm, payload),
            new StringObject(vm, key),
            first,
            second,
            third,
            fourth,
            fifth,
            mode
        );
    }

    private byte[] callBytes(String signature, Object... arguments) {
        DvmObject<?> result = api.callStaticJniMethodObject(emulator, signature, arguments);
        if (result == null || !(result.getValue() instanceof byte[])) {
            throw new IllegalStateException("Native Methode lieferte kein Byte-Array: " + signature);
        }
        return (byte[]) result.getValue();
    }

    private static void verifyRoundtrip(String protocol, byte[] cleartext, byte[] encrypted, byte[] decrypted) {
        boolean roundtrip = Arrays.equals(cleartext, decrypted);
        System.out.printf(
            "{\"protocol\":\"%s\",\"encryptedBase64\":\"%s\",\"encryptedBytes\":%d,\"roundtrip\":%s}%n",
            protocol,
            Base64.getEncoder().encodeToString(encrypted),
            encrypted.length,
            roundtrip
        );
        if (!roundtrip) {
            throw new IllegalStateException("Roundtrip fehlgeschlagen für " + protocol);
        }
    }

    private void runProof() {
        byte[] payload = "{\"dps\":{\"101\":1}}".getBytes(StandardCharsets.UTF_8);
        String localKey = "0123456789abcdef";
        int timestamp = 1_717_171_717;
        int random = 42;

        byte[] encrypted10 = codec(payload, timestamp, localKey, 1);
        verifyRoundtrip("1.0", payload, encrypted10, codec(encrypted10, timestamp, localKey, 0));
        byte[] encryptedA01 = codec2(payload, localKey, random, 1);
        verifyRoundtrip("A01", payload, encryptedA01, codec2(encryptedA01, localKey, random, 0));
        byte[] encryptedB01 = codecB1(payload, localKey, random, 1);
        verifyRoundtrip("B01", payload, encryptedB01, codecB1(encryptedB01, localKey, random, 0));

        int first = 11;
        int second = 22;
        int third = 33;
        int fourth = timestamp;
        int fifth = random;
        byte[] encryptedL01 = codec3(payload, localKey, first, second, third, fourth, fifth, 1);
        verifyRoundtrip(
            "L01",
            payload,
            encryptedL01,
            codec3(encryptedL01, localKey, first, second, third, fourth, fifth, 0)
        );
    }

    private void runB01Vectors() {
        byte[] payload = "{\"dps\":{\"101\":1}}".getBytes(StandardCharsets.UTF_8);
        String localKey = "0123456789abcdef";
        int[] randomValues = {0, 1, 42, 0x3c21018e, -1};
        for (int random : randomValues) {
            byte[] encrypted = codecB1(payload, localKey, random, 1);
            System.out.printf(
                "{\"random\":%d,\"encryptedBase64\":\"%s\"}%n",
                random,
                Base64.getEncoder().encodeToString(encrypted)
            );
        }
    }

    private void decryptB01(String payloadBase64, String localKey, int random) {
        byte[] encrypted = Base64.getDecoder().decode(payloadBase64);
        byte[] decrypted = codecB1(encrypted, localKey, random, 0);
        System.out.println(Base64.getEncoder().encodeToString(decrypted));
    }

    private void decryptB01File(String inputPath, String outputPath, String localKey, int random) throws IOException {
        byte[] encrypted = Files.readAllBytes(Path.of(inputPath));
        byte[] decrypted = codecB1(encrypted, localKey, random, 0);
        Files.write(Path.of(outputPath), decrypted);
    }

    @Override
    public void close() throws IOException {
        emulator.close();
    }

    public static void main(String[] args) throws Exception {
        if (args.length < 2) {
            throw new IllegalArgumentException(
                "Aufruf: RrCodecOracle <Pfad zur APK> <Pfad zu librrcodec.so> "
                    + "[proof|b01-vectors|b01-decrypt <Payload-Base64> <LocalKey> <Random> "
                    + "|b01-decrypt-file <Eingabe> <Ausgabe> <LocalKey> <Random>]"
            );
        }
        File apk = new File(args[0]).getCanonicalFile();
        File library = new File(args[1]).getCanonicalFile();
        if (!apk.isFile()) {
            throw new IllegalArgumentException("APK nicht gefunden: " + apk);
        }
        if (!library.isFile()) {
            throw new IllegalArgumentException("librrcodec.so nicht gefunden: " + library);
        }
        String appSecret = System.getenv("ROBOROCK_APP_SECRET");
        if (appSecret == null || appSecret.isBlank()) {
            throw new IllegalStateException("ROBOROCK_APP_SECRET ist nicht gesetzt.");
        }
        String certificateBase64 = System.getenv("ROBOROCK_APK_CERT_DER_BASE64");
        byte[] signingCertificate = certificateBase64 == null || certificateBase64.isBlank()
            ? null
            : Base64.getDecoder().decode(certificateBase64);
        String command = args.length >= 3 ? args[2] : "proof";

        try (RrCodecOracle oracle = new RrCodecOracle(apk, library, signingCertificate, "b01-vectors".equals(command))) {
            oracle.initialize(appSecret);
            switch (command) {
                case "proof" -> oracle.runProof();
                case "b01-vectors" -> oracle.runB01Vectors();
                case "b01-decrypt" -> {
                    if (args.length != 6) {
                        throw new IllegalArgumentException(
                            "b01-decrypt benötigt <Payload-Base64> <LocalKey> <Random>"
                        );
                    }
                    oracle.decryptB01(args[3], args[4], Integer.parseInt(args[5]));
                }
                case "b01-decrypt-file" -> {
                    if (args.length != 7) {
                        throw new IllegalArgumentException(
                            "b01-decrypt-file benötigt <Eingabe> <Ausgabe> <LocalKey> <Random>"
                        );
                    }
                    oracle.decryptB01File(args[3], args[4], args[5], Integer.parseInt(args[6]));
                }
                default -> throw new IllegalArgumentException("Unbekannter Oracle-Befehl: " + command);
            }
        }
    }
}
