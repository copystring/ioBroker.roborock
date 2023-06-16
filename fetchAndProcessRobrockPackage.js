require("dotenv").config();

const fs = require("fs");
const crypto = require("crypto");
const axios = require("axios");
const JSZip = require("jszip");
const child_process = require("child_process");

const username = process.env.RR_USERNAME;
const password = process.env.RR_PASSWORD;
const clientID = crypto.randomUUID();

const loginApi = axios.create({
	baseURL: "https://euiot.roborock.com",
	headers: {
		"header_clientid": crypto.createHash("md5").update(username).update(clientID).digest().toString("base64"),
	},
});

loginApi.post("api/v1/login", new URLSearchParams({
	username: username,
	password: password,
	needtwostepauth: "false"
}).toString())
	.then(res => {
		loginApi.defaults.headers.common["Authorization"] = res.data.data.token;

		loginApi.get("api/v3/product")
			.then(res => {
				// console.log('Product data: ' + JSON.stringify(res.data.data.categoryDetailList));
				const list = res.data.data.categoryDetailList[1]["productList"];
				//console.log('Product data: ' + JSON.stringify(list));

				const appPluginRequest = {
					"apilevel": 10016,
					"productids": [],
					"type": 2
				};

				const vacuumIDs = {};
				for (const product in list) {
					const vacuum = list[product];
					console.log("vacuum " + vacuum.name + " id: " + vacuum.id);
					appPluginRequest.productids.push(vacuum.id);
					vacuumIDs[vacuum.id] = vacuum.model;
				}

				console.log("appPluginRequest: " + JSON.stringify(appPluginRequest));
				loginApi.post("api/v1/appplugin", appPluginRequest)
					.then(async packageData => {
						// console.log("appplugin data: " + JSON.stringify(packageData.data));
						// console.log("vacuumIDs: " + JSON.stringify(vacuumIDs));

						const packages = packageData.data.data;
						for (const rr_package in packages) {
							const vacuum = vacuumIDs[packages[rr_package].productid];
							const version = packages[rr_package].version;
							const zipUrl = packages[rr_package].url;

							console.log(vacuum);
							console.log("version: " + version);
							console.log(zipUrl);

							if (!fs.existsSync("./lib/roborockPackage/")) fs.mkdirSync("./lib/roborockPackage/");
							const path = "./lib/roborockPackage/" + vacuum;
							try {
								// Create missing vacuum folder
								if (!fs.existsSync(path)) fs.mkdirSync(path);

								const versionFilePath = path + "/version";

								if (!fs.existsSync(versionFilePath)) {
									const versionContent = packages[rr_package].version.toString();
									fs.writeFileSync(versionFilePath, "0");
									console.log("Version file created successfully!");
								}

								const currentVersion = fs.readFileSync(versionFilePath, "utf8");
								if (packages[rr_package].version > currentVersion) {
									console.log("New version found");

									const response = await loginApi.get(zipUrl, { responseType: "arraybuffer" });
									const zip = await JSZip.loadAsync(response.data);
									const file = zip.file("index.android.bundle");
									if (file) {
										// Get the file data
										const data = await file.async("nodebuffer");

										const tempPath = path + "/temp.index.android.bundle";
										fs.writeFileSync(tempPath, data);

										// Run the CLI tool
										child_process.execSync(`react-native-decompiler -i ${tempPath} -o ${path}`);

										// Delete the temp file
										fs.unlinkSync(tempPath);

										fs.writeFileSync(versionFilePath, currentVersion);
									}

								}
							} catch (err) {
								console.error(err);
							}
						}
					})
					.catch(err => console.error(err));
			})
			.catch(err => console.error(err));
	})
	.catch(err => console.error(err));