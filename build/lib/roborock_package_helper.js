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
Object.defineProperty(exports, "__esModule", { value: true });
exports.roborock_package_helper = void 0;
const fs = __importStar(require("fs"));
const JSZip = __importStar(require("jszip"));
class roborock_package_helper {
    adapter;
    constructor(adapter) {
        this.adapter = adapter;
    }
    async updateProduct(duid) {
        const loginApi = this.adapter.http_api.loginApi;
        if (!loginApi) {
            this.adapter.log.error("loginApi not initialized in roborock_package_helper");
            return;
        }
        const devices = this.adapter.http_api.getDevices();
        const device = devices.find(d => d.duid === duid);
        if (!device) {
            this.adapter.log.warn(`Cannot update product for ${duid}: Device not found.`);
            return;
        }
        const appPluginRequest = {
            apilevel: 99999, // safe high value for latest assets
            productids: [device.productId],
            type: 2, // Android
        };
        const vacuumIDs = {
            [device.productId]: this.adapter.http_api.getRobotModel(duid) || "unknown_model"
        };
        try {
            // Reuse V4 auth headers for V1 asset request (works for now)
            const packageData = await loginApi.post("api/v1/appplugin", appPluginRequest);
            if (packageData.data.code !== 200) {
                this.adapter.log.warn(`AppPlugin (assets) request failed: ${JSON.stringify(packageData.data)}`);
                return;
            }
            const packages = packageData.data.data;
            for (const rr_package in packages) {
                const vacuumModel = vacuumIDs[packages[rr_package].productid];
                if (!vacuumModel)
                    continue;
                const zipUrl = packages[rr_package].url;
                const version = packages[rr_package].version;
                const imagePath = `./images/products/${vacuumModel}`;
                const objectPath = `Devices.${duid}.images`;
                const versionFilePath = imagePath + "/version";
                if (!fs.existsSync("./lib/roborockPackage/"))
                    fs.mkdirSync("./lib/roborockPackage/", { recursive: true });
                try {
                    if (!fs.existsSync(`./images/products/`))
                        fs.mkdirSync(`./images/products/`, { recursive: true });
                    if (!fs.existsSync(imagePath))
                        fs.mkdirSync(imagePath, { recursive: true });
                    await this.adapter.ensureFolder(objectPath);
                    if (!fs.existsSync(versionFilePath)) {
                        fs.writeFileSync(versionFilePath, "0");
                    }
                    const currentVersion = fs.readFileSync(versionFilePath, "utf8");
                    if (Number(packages[rr_package].version) > Number(currentVersion)) {
                        this.adapter.log.info(`New version roborock package available: ${version} for ${vacuumModel}`);
                        const response = await loginApi.get(zipUrl, { responseType: "arraybuffer" });
                        const zip = await JSZip.loadAsync(response.data);
                        const folder = zip.folder("drawable-mdpi"); // icon location
                        if (folder) {
                            let i = 0;
                            const filePromises = [];
                            folder.forEach((relativePath, file) => {
                                filePromises.push((async () => {
                                    if (!file.dir) {
                                        const fileContent = await file.async("nodebuffer");
                                        if (fileContent) {
                                            fs.writeFileSync(`${imagePath}/${relativePath}`, fileContent);
                                            const fileContentBase64 = fileContent.toString("base64");
                                            const fileNameWithoutExtension = relativePath.slice(0, relativePath.lastIndexOf("."));
                                            const formattedNumber = i.toString().padStart(3, "0");
                                            await this.adapter.ensureState(`${objectPath}.${formattedNumber}`, {
                                                name: fileNameWithoutExtension,
                                                type: "string",
                                                role: "value",
                                                write: false,
                                            });
                                            await this.adapter.setState(`${objectPath}.${formattedNumber}`, { val: fileContentBase64, ack: true });
                                        }
                                        i++;
                                    }
                                })());
                            });
                            await Promise.all(filePromises);
                        }
                        fs.writeFileSync(versionFilePath, version.toString());
                        this.adapter.log.info(`Updated assets for ${vacuumModel}`);
                    }
                    else {
                        this.adapter.log.debug(`Assets for ${vacuumModel} are up to date (Version ${currentVersion}).`);
                    }
                }
                catch (err) {
                    this.adapter.log.error(`${err.stack} roborock_package_helper.updateProduct ${duid}`);
                }
            }
        }
        catch (e) {
            this.adapter.log.error(`Failed to update product assets: ${e.message}`);
        }
    }
}
exports.roborock_package_helper = roborock_package_helper;
//# sourceMappingURL=roborock_package_helper.js.map