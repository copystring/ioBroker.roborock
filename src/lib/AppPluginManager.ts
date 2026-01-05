import * as fs from "fs";
import * as JSZip from "jszip";
import * as path from "path";
import { Roborock } from "../main";


export class AppPluginManager {
	adapter: Roborock;

	constructor(adapter: Roborock) {
		this.adapter = adapter;
	}

	public async downloadAppPlugins(): Promise<void> {
		const loginApi = this.adapter.http_api.loginApi;
		if (!loginApi) {
			this.adapter.rLog("System", null, "Error", undefined, undefined, "loginApi not initialized in AppPluginManager", "error");
			return;
		}

		try {
			// Ensure we have V5 product info (numeric IDs)
			await this.adapter.http_api.ensureProductInfo();

			// Future: Integrate automated plugin discovery and background updates
		} catch (e: any) {
			this.adapter.rLog("System", null, "Error", undefined, undefined, `Failed to prepare for app plugin download: ${e.message}`, "error");
			return;
		}
	}

	async updateProduct(duid: string) {
		const loginApi = this.adapter.http_api.loginApi;
		if (!loginApi) {
			this.adapter.rLog("System", null, "Error", undefined, undefined, "loginApi not initialized in AppPluginManager", "error");
			return;
		}

		const devices = this.adapter.http_api.getDevices();
		const device = devices.find(d => d.duid === duid);

		if (!device) {
			this.adapter.rLog("Cloud", duid, "Warn", undefined, undefined, "Cannot update product assets: Device not found.", "warn");
			return;
		}


		const appPluginRequest: any = {
			apilevel: 1000,
			type: 2, // Android
		};

		// Resolve numeric Product ID from V5 Product Info
		let numericProductId = 0;
		await this.adapter.http_api.ensureProductInfo();


		let vacuumModel = "unknown_model";
		const modelStr = this.adapter.http_api.getRobotModel(duid);
		if (modelStr) vacuumModel = modelStr;

		// Resolve numeric Product ID
		const resolvedId = this.adapter.http_api.getProductIdByModel(vacuumModel);

		if (resolvedId) {
			numericProductId = resolvedId;
			this.adapter.rLog("Cloud", duid, "Debug", undefined, undefined, `Resolved numeric ID ${numericProductId} for model ${vacuumModel}`, "debug");
		} else {
			// Try to see if V5 product info is at least fetched for debug
			const productInfo = this.adapter.http_api.productInfo;
			// Log minimal info
			const hasV3 = !!(this.adapter.http_api.homeData && this.adapter.http_api.homeData.products);
			const hasV5 = !!(productInfo && productInfo.data);


			let v5Count = 0;
			if (productInfo?.data?.categoryDetailList) {
				for (const c of productInfo.data.categoryDetailList) {
					if (c.productList) v5Count += c.productList.length;
				}
			}
			const v5List = `V5Products(${v5Count})`;

			this.adapter.rLog("Cloud", duid, "Warn", undefined, undefined, `Could not find numeric ID for ${vacuumModel}. V3Products: ${hasV3}, V5Data: ${hasV5}, V5Counts: ${v5List}`, "warn");
		}

		if (numericProductId > 0) {
			appPluginRequest.productids = [numericProductId];
			appPluginRequest.apilevel = 10042; // Update to match sniff
		} else {
			this.adapter.rLog("Cloud", duid, "Warn", undefined, undefined, `Falling back to request with string productId ${device.productId} (might fail)`, "warn");
		}

		this.adapter.rLog("Cloud", duid, "Info", undefined, undefined, `Requesting assets for ProductID: ${numericProductId || device.productId}`, "info");
		this.adapter.rLog("Cloud", duid, "Debug", undefined, undefined, `Payload: ${JSON.stringify(appPluginRequest)}`, "debug");

		const vacuumIDs: Record<string, string> = {
			// Map both string and numeric ID to the model for the extraction loop later
			[device.productId]: vacuumModel,
			[numericProductId.toString()]: vacuumModel
		};

		try {
			const packageData = await loginApi.post("api/v1/appplugin", appPluginRequest);

			if (packageData.data.code !== 200) {
				this.adapter.rLog("Cloud", duid, "Warn", undefined, undefined, `AppPlugin (assets) request failed: ${JSON.stringify(packageData.data)}`, "warn");
				return;
			}

			const packages = packageData.data.data;
			for (const rr_package in packages) {
				// Determine model from the product ID returned in package info (can be numeric or string)
				let vacuumModel = vacuumIDs[packages[rr_package].productid];
				if (!vacuumModel) {
					// Try finding by model name if possible, or fallback
					vacuumModel = "unknown";
				}

				// If vacuumModel is valid...
				if (!vacuumModel || vacuumModel === "unknown_model") {
					// Try to match specific product ID from package
					const pid = packages[rr_package].productid;
					if (pid == numericProductId || pid == device.productId) {
						vacuumModel = modelStr || "unknown";
					}
				}

				if (!vacuumModel) continue;

				const zipUrl = packages[rr_package].url;
				const newVersion = packages[rr_package].version;

				// Target: c:\iobroker\iobroker.roborock\www\assets\<model>
				const adapterRoot = this.adapter.adapterDir;
				const assetPath = `${adapterRoot}/www/assets/${vacuumModel}`;
				const versionFilePath = `${assetPath}/version`;

				// Check if we need to download
				let shouldDownload = false;
				let reason = "";

				if (!fs.existsSync(assetPath)) {
					shouldDownload = true;
					reason = "Assets missing";
				} else {
					if (fs.existsSync(versionFilePath)) {
						const versionContent = fs.readFileSync(versionFilePath, "utf8").trim();
						const currentVersion = parseInt(versionContent);
						const remoteVersion = parseInt(newVersion);

						if (!isNaN(remoteVersion) && (!isNaN(currentVersion) ? remoteVersion > currentVersion : true)) {

							shouldDownload = true;
							reason = `New version (Local: ${currentVersion}, Remote: ${newVersion})`;
						} else {
							// Check if directory is empty or missing key files?
							// For now, version match is enough to skip.
							this.adapter.rLog("Cloud", duid, "Debug", undefined, undefined, `Assets for ${vacuumModel} up to date (Version ${currentVersion}).`, "debug");
						}
					} else {
						shouldDownload = true;
						reason = "Version file missing";
					}
				}

				if (shouldDownload) {
					// Create directory if missing
					if (!fs.existsSync(assetPath)) {
						try {
							fs.mkdirSync(assetPath, { recursive: true });
						} catch (e) {
							this.adapter.rLog("System", duid, "Error", undefined, undefined, `Could not create asset directory at ${assetPath}: ${e}`, "error");
							continue;
						}
					}

					this.adapter.rLog("Cloud", duid, "Info", undefined, undefined, `Downloading assets for ${vacuumModel} (${reason})...`, "info");

					try {
						const response = await loginApi.get(zipUrl, { responseType: "arraybuffer" });
						const zip = await JSZip.loadAsync(response.data);

						// Extract all 'drawable-*' and 'raw' folders preserving structure
						let extractedCount = 0;
						const filePromises: Promise<void>[] = [];

						zip.forEach((relativePath, file) => {
							// Filter for drawable-* or raw folders
							// relativePath example: "drawable-mdpi/icon.png" or "res/drawable-xhdpi/icon.png" depending on zip structure.
							// The user screenshot shows root folders "drawable-hdpi", etc.
							// So we check if it starts with "drawable-" or "raw/"
							const isTarget = relativePath.startsWith("drawable-") || relativePath.startsWith("raw/");

							if (isTarget && !file.dir) {
								filePromises.push((async () => {
									const fileContent = await file.async("nodebuffer");
									if (fileContent) {
										// Preserve structure: assets/<model>/drawable-xxhdpi/icon.png
										const targetPath = path.join(assetPath, relativePath);
										const targetDir = path.dirname(targetPath);

										if (!fs.existsSync(targetDir)) {
											fs.mkdirSync(targetDir, { recursive: true });
										}

										fs.writeFileSync(targetPath, fileContent as Uint8Array);
										extractedCount++;
									}
								})());
							}
						});

						await Promise.all(filePromises);

						if (extractedCount > 0) {
							this.adapter.rLog("Cloud", duid, "Info", undefined, undefined, `Extracted ${extractedCount} assets to ${assetPath}`, "info");
							// Write version file on success
							fs.writeFileSync(versionFilePath, newVersion.toString());
						} else {
							this.adapter.rLog("Cloud", duid, "Warn", undefined, undefined, `No assets found in zip for ${vacuumModel} (searched drawable-*/raw/). Version file NOT updated.`, "warn");
						}
					} catch (err: any) {
						this.adapter.rLog("Cloud", duid, "Error", undefined, undefined, `Failed to download/extract assets for ${vacuumModel}: ${err.message}`, "error");
					}
				}
			}
		} catch (e: any) {
			this.adapter.rLog("Cloud", duid, "Error", undefined, undefined, `Failed to update product assets: ${e.message}`, "error");
		}
	}
}
