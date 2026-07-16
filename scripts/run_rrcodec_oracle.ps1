[CmdletBinding()]
param(
    [Parameter(Mandatory = $true, Position = 0)]
    [string]$ApkPath,
    [string]$MavenPath,
    [string]$ApkSignerPath,
    [string]$JavaHome
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$apk = (Resolve-Path -LiteralPath $ApkPath).Path

if ([string]::IsNullOrWhiteSpace($env:ROBOROCK_APP_SECRET)) {
    throw "ROBOROCK_APP_SECRET muss für den lokalen PoC gesetzt sein. Der Wert wird nicht gespeichert oder ausgegeben."
}

if ([string]::IsNullOrWhiteSpace($JavaHome)) {
    $bundledJava = Join-Path $env:ProgramFiles "Java\jdk-17"
    if (Test-Path -LiteralPath $bundledJava -PathType Container) {
        $JavaHome = $bundledJava
    }
}
if (-not [string]::IsNullOrWhiteSpace($JavaHome)) {
    $env:JAVA_HOME = (Resolve-Path -LiteralPath $JavaHome).Path
    $env:Path = "$env:JAVA_HOME\bin;$env:Path"
}

if ([string]::IsNullOrWhiteSpace($MavenPath)) {
    $localMaven = Join-Path $repoRoot ".tmp\tools\apache-maven-3.9.16\bin\mvn.cmd"
    if (Test-Path -LiteralPath $localMaven -PathType Leaf) {
        $MavenPath = $localMaven
    } else {
        $mavenCommand = Get-Command mvn.cmd, mvn -ErrorAction SilentlyContinue | Select-Object -First 1
        if ($null -ne $mavenCommand) {
            $MavenPath = $mavenCommand.Source
        }
    }
}
if ([string]::IsNullOrWhiteSpace($MavenPath)) {
    throw "Maven wurde nicht gefunden. Übergib den Pfad mit -MavenPath."
}
$MavenPath = (Resolve-Path -LiteralPath $MavenPath).Path

if ([string]::IsNullOrWhiteSpace($ApkSignerPath)) {
    $sdkRoots = @($env:ANDROID_SDK_ROOT, $env:ANDROID_HOME)
    if (-not [string]::IsNullOrWhiteSpace($env:LOCALAPPDATA)) {
        $sdkRoots += Join-Path $env:LOCALAPPDATA "Android\Sdk"
    }
    $apksignerCandidates = foreach ($sdkRoot in $sdkRoots | Where-Object { -not [string]::IsNullOrWhiteSpace($_) }) {
        Get-ChildItem -LiteralPath (Join-Path $sdkRoot "build-tools") -Filter apksigner.bat -Recurse -File -ErrorAction SilentlyContinue
    }
    $selectedApkSigner = $apksignerCandidates | Sort-Object FullName -Descending | Select-Object -First 1
    if ($null -ne $selectedApkSigner) {
        $ApkSignerPath = $selectedApkSigner.FullName
    }
}
if ([string]::IsNullOrWhiteSpace($ApkSignerPath)) {
    throw "apksigner wurde nicht gefunden. Übergib den Pfad mit -ApkSignerPath."
}
$ApkSignerPath = (Resolve-Path -LiteralPath $ApkSignerPath).Path

$certificateOutput = & $ApkSignerPath verify --print-certs-pem $apk | Out-String
if ($LASTEXITCODE -ne 0) {
    throw "Die APK-Signatur konnte nicht mit apksigner gelesen werden."
}
$certificateMatch = [regex]::Match(
    $certificateOutput,
    "(?s)-----BEGIN CERTIFICATE-----(?<value>.*?)-----END CERTIFICATE-----"
)
if (-not $certificateMatch.Success) {
    throw "Das Signaturzertifikat konnte nicht aus der APK gelesen werden."
}
$env:ROBOROCK_APK_CERT_DER_BASE64 = $certificateMatch.Groups["value"].Value -replace "\s", ""

$codecOutput = Join-Path $repoRoot ".tmp\rrcodec"
& node (Join-Path $repoRoot "scripts\extract_rrcodec.js") $apk --out $codecOutput
if ($LASTEXITCODE -ne 0) {
    throw "librrcodec.so konnte nicht aus der APK extrahiert werden."
}
$library = Join-Path $codecOutput "arm64-v8a\librrcodec.so"
if (-not (Test-Path -LiteralPath $library -PathType Leaf)) {
    throw "Die APK enthält keine ARM64-Version von librrcodec.so."
}
$oracleApk = Join-Path $codecOutput "source.apk"
Copy-Item -LiteralPath $apk -Destination $oracleApk -Force

$mavenRepository = Join-Path $repoRoot ".tmp\m2"
$oracleProject = Join-Path $repoRoot "tools\rrcodec-oracle"
$execArguments = "$oracleApk $library"

Push-Location $oracleProject
try {
    & $MavenPath "-Dmaven.repo.local=$mavenRepository" -q compile exec:java "-Dexec.args=$execArguments"
    if ($LASTEXITCODE -ne 0) {
        throw "Der native Codec-Oracle ist fehlgeschlagen."
    }
} finally {
    Pop-Location
}
