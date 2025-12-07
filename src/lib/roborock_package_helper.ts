import { Roborock } from "../main";
import * as fs from "fs";
import * as JSZip from "jszip";

export class roborock_package_helper {
	adapter: Roborock;

	constructor(adapter: Roborock) {
		this.adapter = adapter;
	}

	async updateProduct(duid: string) {
		const loginApi = this.adapter.http_api.loginApi;
		if (!loginApi) {
			this.adapter.log.error("loginApi not initialized in roborock_package_helper");
			return;
		}

		// Use existing V5 product info to get the ID
		const productInfo = this.adapter.http_api.productInfo;
		const devices = this.adapter.http_api.getDevices();
		const device = devices.find(d => d.duid === duid);

		if (!productInfo || !device) {
			this.adapter.log.warn(`Cannot update product for ${duid}: Missing product info or device not found.`);
			return;
		}


		const appPluginRequest: any = {
			apilevel: 99999, // safe high value for latest assets
			productids: [device.productId],
			type: 2, // Android
		};

		const vacuumIDs: Record<string, string> = {
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
				if (!vacuumModel) continue;

				const zipUrl = packages[rr_package].url;
				const version = packages[rr_package].version;
				const imagePath = `./images/products/${vacuumModel}`;
				const objectPath = `Devices.${duid}.images`;
				const versionFilePath = imagePath + "/version";

				if (!fs.existsSync("./lib/roborockPackage/")) fs.mkdirSync("./lib/roborockPackage/", { recursive: true });

				try {
					if (!fs.existsSync(`./images/products/`)) fs.mkdirSync(`./images/products/`, { recursive: true });
					if (!fs.existsSync(imagePath)) fs.mkdirSync(imagePath, { recursive: true });

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

							const filePromises: Promise<void>[] = [];

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
					} else {
						this.adapter.log.debug(`Assets for ${vacuumModel} are up to date (Version ${currentVersion}).`);
					}
				} catch (err: any) {
					this.adapter.log.error(`${err.stack} roborock_package_helper.updateProduct ${duid}`);
				}
			}
		} catch (e: any) {
			this.adapter.log.error(`Failed to update product assets: ${e.message}`);
		}
	}
}
