"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cryptoEngine = void 0;
const crypto = __importStar(require("crypto"));
const node_forge_1 = __importDefault(require("node-forge"));
// Salt from librrcodec.so (encrypted via com.roborock.iotsdk.appsecret)
const SALT = "TXdfu$jyZ#TZHsg4";
// Lazy RSA keypair generation
let rsaKeys = null;
function encodeTimestamp(ts) {
    const hex = ts.toString(16).padStart(8, "0").split("");
    return [5, 6, 3, 7, 1, 2, 0, 4].map((idx) => hex[idx]).join("");
}
function md5bin(str) {
    return crypto.createHash("md5").update(str).digest();
}
function md5hex(str) {
    return crypto.createHash("md5").update(str).digest("hex");
}
function toBuffer(input) {
    return Buffer.isBuffer(input) ? input : Buffer.from(input, "utf-8");
}
/*
 * Crypto implementations based on community research:
 * - 1.0: Credits to rovo89
 * - L01: Credits to Kenny (Homey project)
 */
exports.cryptoEngine = {
    /**
     * Generates an RSA keypair if one does not already exist.
     */
    ensureRsaKeys() {
        if (rsaKeys)
            return rsaKeys;
        const kp = node_forge_1.default.pki.rsa.generateKeyPair(2048);
        rsaKeys = {
            public: {
                n: kp.publicKey.n.toString(16),
                e: kp.publicKey.e.toString(16),
            },
            private: {
                n: kp.privateKey.n.toString(16),
                e: kp.privateKey.e.toString(16),
                d: kp.privateKey.d.toString(16),
                p: kp.privateKey.p.toString(16),
                q: kp.privateKey.q.toString(16),
                dmp1: kp.privateKey.dP.toString(16),
                dmq1: kp.privateKey.dQ.toString(16),
                coeff: kp.privateKey.qInv.toString(16),
            },
        };
        return rsaKeys;
    },
    // ---------- V1 (AES-128-ECB) ----------
    encryptV1(payload, localKey, ts) {
        const key = md5bin(encodeTimestamp(ts) + localKey + SALT);
        const cipher = crypto.createCipheriv("aes-128-ecb", key, null);
        return Buffer.concat([cipher.update(toBuffer(payload)), cipher.final()]);
    },
    decryptV1(payload, localKey, ts) {
        const key = md5bin(encodeTimestamp(ts) + localKey + SALT);
        const decipher = crypto.createDecipheriv("aes-128-ecb", key, null);
        return Buffer.concat([decipher.update(payload), decipher.final()]);
    },
    // ---------- A01 (AES-128-CBC) ----------
    encryptA01(payload, localKey, random) {
        const randomHex = (random >>> 0).toString(16).padStart(8, "0");
        const ivHex = md5hex(randomHex + "726f626f726f636b2d67a6d6da").substring(8, 24);
        const key = Buffer.from(localKey, "utf-8");
        const iv = Buffer.from(ivHex, "utf-8");
        const buf = toBuffer(payload);
        // PKCS7 Padding
        const pad = 16 - (buf.length % 16);
        const padded = Buffer.concat([buf, Buffer.alloc(pad, pad)]);
        const cipher = crypto.createCipheriv("aes-128-cbc", key, iv);
        return Buffer.concat([cipher.update(padded), cipher.final()]);
    },
    decryptA01(payload, localKey, random) {
        const randomHex = (random >>> 0).toString(16).padStart(8, "0");
        const ivHex = md5hex(randomHex + "726f626f726f636b2d67a6d6da").substring(8, 24);
        const key = Buffer.from(localKey, "utf-8");
        const iv = Buffer.from(ivHex, "utf-8");
        const decipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
        return Buffer.concat([decipher.update(payload), decipher.final()]);
    },
    // ---------- L01 (AES-256-GCM) ----------
    encryptL01(payload, localKey, ts, seq, random, connectNonce, ackNonce) {
        if (!connectNonce || ackNonce == null)
            throw new Error("Missing nonces for L01");
        const key = crypto
            .createHash("sha256")
            .update(encodeTimestamp(ts) + localKey + SALT)
            .digest();
        const digestInput = Buffer.alloc(12);
        digestInput.writeUInt32BE(seq >>> 0, 0);
        digestInput.writeUInt32BE(random >>> 0, 4);
        digestInput.writeUInt32BE(ts >>> 0, 8);
        const iv = crypto.createHash("sha256").update(digestInput).digest().subarray(0, 12);
        const aad = Buffer.alloc(20);
        aad.writeUInt32BE(seq >>> 0, 0);
        aad.writeUInt32BE(connectNonce >>> 0, 4);
        aad.writeUInt32BE(ackNonce >>> 0, 8);
        aad.writeUInt32BE(random >>> 0, 12);
        aad.writeUInt32BE(ts >>> 0, 16);
        const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
        cipher.setAAD(aad);
        const buf = toBuffer(payload);
        const ciphertext = Buffer.concat([cipher.update(buf), cipher.final()]);
        const tag = cipher.getAuthTag();
        return Buffer.concat([ciphertext, tag]);
    },
    decryptL01(payload, localKey, ts, seq, random, connectNonce, ackNonce) {
        if (!connectNonce || ackNonce == null)
            throw new Error("Missing nonces for L01");
        const key = crypto
            .createHash("sha256")
            .update(encodeTimestamp(ts) + localKey + SALT)
            .digest();
        const digestInput = Buffer.alloc(12);
        digestInput.writeUInt32BE(seq >>> 0, 0);
        digestInput.writeUInt32BE(random >>> 0, 4);
        digestInput.writeUInt32BE(ts >>> 0, 8);
        const iv = crypto.createHash("sha256").update(digestInput).digest().subarray(0, 12);
        const aad = Buffer.alloc(20);
        aad.writeUInt32BE(seq >>> 0, 0);
        aad.writeUInt32BE(connectNonce >>> 0, 4);
        aad.writeUInt32BE(ackNonce >>> 0, 8);
        aad.writeUInt32BE(random >>> 0, 12);
        aad.writeUInt32BE(ts >>> 0, 16);
        const tag = payload.subarray(payload.length - 16);
        const ciphertext = payload.subarray(0, payload.length - 16);
        const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
        decipher.setAAD(aad);
        decipher.setAuthTag(tag);
        return Buffer.concat([decipher.update(ciphertext), decipher.final()]);
    },
    // ---------- Password Encryption (Login V4) ----------
    encryptPassword(password, k) {
        const derivedKey = k.slice(4) + k.slice(0, 4);
        const cipher = crypto.createCipheriv("aes-128-ecb", Buffer.from(derivedKey, "utf-8"), null);
        cipher.setAutoPadding(true);
        let encrypted = cipher.update(password, "utf8", "base64");
        encrypted += cipher.final("base64");
        return encrypted;
    },
};
//# sourceMappingURL=cryptoEngine.js.map