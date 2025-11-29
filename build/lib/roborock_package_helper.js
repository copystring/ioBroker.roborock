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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roborock_package_helper = void 0;
const fs = __importStar(require("fs"));
const JSZip = __importStar(require("jszip"));
class roborock_package_helper {
    adapter;
    constructor(adapter) {
        this.adapter = adapter;
    }
    async updateProduct(loginApi, productID, duid) {
        const products = await loginApi.get("api/v3/product");
        const list = products.data.data.categoryDetailList;
        const appPluginRequest = {
            apilevel: 99999, // sniffed 10016 and 10019 from the app but it's subject to change so we use a high number
            productids: [],
            type: 2,
        };
        const vacuumIDs = {};
        for (const array in list) {
            for (const product in list[array]["productList"]) {
                const vacuum = list[array]["productList"][product];
                const productIDinPackage = this.findProductIDinPackage(productID, vacuum);
                if (productIDinPackage) {
                    appPluginRequest.productids.push(vacuum.id);
                    vacuumIDs[vacuum.id] = vacuum.model;
                }
            }
        }
        const packageData = await loginApi.post("api/v1/appplugin", appPluginRequest);
        const packages = packageData.data.data;
        for (const rr_package in packages) {
            const vacuum = vacuumIDs[packages[rr_package].productid];
            const zipUrl = packages[rr_package].url;
            const version = packages[rr_package].version;
            const imagePath = `./images/products/${vacuum}`;
            const objectPath = `Devices.${duid}.images`;
            const versionFilePath = imagePath + "/version";
            if (!fs.existsSync("./lib/roborockPackage/"))
                fs.mkdirSync("./lib/roborockPackage/");
            try {
                // Create missing vacuum folders
                if (!fs.existsSync(`./images/products/`))
                    fs.mkdirSync(`./images/products/`);
                if (!fs.existsSync(imagePath))
                    fs.mkdirSync(imagePath);
                this.adapter.setObjectAsync(objectPath, {
                    type: "folder",
                    common: {
                        name: "images",
                    },
                    native: {},
                });
                if (!fs.existsSync(versionFilePath)) {
                    fs.writeFileSync(versionFilePath, "0");
                }
                const currentVersion = fs.readFileSync(versionFilePath, "utf8");
                if (packages[rr_package].version > currentVersion) {
                    this.adapter.log.debug(`New version roborock package available: ${version}`);
                    const response = await loginApi.get(zipUrl, { responseType: "arraybuffer" });
                    const zip = await JSZip.loadAsync(response.data);
                    const folder = zip.folder("drawable-mdpi");
                    if (folder) {
                        let i = 0;
                        folder.forEach(async (relativePath, file) => {
                            if (!file.dir) {
                                const fileContent = await file.async("nodebuffer");
                                if (fileContent) {
                                    fs.writeFileSync(`${imagePath}/${relativePath}`, fileContent);
                                    const fileContentBase64 = fileContent.toString("base64");
                                    const fileNameWithoutExtension = relativePath.slice(0, relativePath.lastIndexOf("."));
                                    const formattedNumber = i.toString().padStart(3, "0"); // "001", "002", "003", etc.
                                    this.adapter.setObjectAsync(`${objectPath}.${formattedNumber}`, {
                                        type: "state",
                                        common: {
                                            name: fileNameWithoutExtension,
                                            type: "string",
                                            role: "value",
                                            read: true,
                                            write: false,
                                        },
                                        native: {},
                                    });
                                    this.adapter.setState(`${objectPath}.${formattedNumber}`, { val: fileContentBase64, ack: true });
                                }
                                i++;
                            }
                        });
                    }
                    fs.writeFileSync(versionFilePath, version.toString());
                }
            }
            catch (err) {
                this.adapter.log.error(`${err.stack} roborock_package_helper.updateProduct ${productID}`);
            }
        }
    }
    findProductIDinPackage(productID, list) {
        if (list.model === productID) {
            return list.id;
        }
    }
}
exports.roborock_package_helper = roborock_package_helper;
//# sourceMappingURL=roborock_package_helper.js.map