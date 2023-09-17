const fs = require("fs");
const path = require("path");

const languages = fs.readdirSync("./admin/i18n").filter((file) => fs.statSync(path.join("./admin/i18n", file)).isDirectory());
const genDirs = fs.readdirSync("./lib/genSpecs").filter((file) => fs.statSync(path.join("./lib/genSpecs", file)).isDirectory());

fs.writeFileSync("./genDirs.txt", genDirs.join("\n"));
fs.writeFileSync("./languages.txt", languages.join("\n"));

languages.forEach((lang) => {
	genDirs.forEach((genDir) => {
		let dirsToProcess = [genDir];

		// Überprüfung für den speziellen 'gen4'-Ordner
		if (genDir === "gen4") {
			const subDirs = fs.readdirSync(`./lib/genSpecs/${genDir}`).filter((file) => fs.statSync(path.join(`./lib/genSpecs/${genDir}`, file)).isDirectory());
			dirsToProcess = subDirs.map((subDir) => `${genDir}/${subDir}`);
		}

		dirsToProcess.forEach((dirToProcess) => {
			const dirPath = `./lib/genSpecs/${dirToProcess}`;
			const files = fs.readdirSync(dirPath).filter((file) => file.endsWith(".js"));

			files.forEach((jsFile) => {
				const originalFilePath = `${dirPath}/${jsFile}`;
				const outputDir = `./tempTranslated/${dirToProcess}`;
				fs.mkdirSync(outputDir, { recursive: true });

				const translationFilePath = `./admin/i18n/${lang}/translations.json`;
				const translationData = require(path.resolve(translationFilePath));

				let fileContent = fs.readFileSync(originalFilePath, "utf8");

				for (const [key, value] of Object.entries(translationData)) {
					const regex = new RegExp(`@${key}@`, "g");
					fileContent = fileContent.replace(regex, value);
				}

				fs.writeFileSync(`${outputDir}/${jsFile.split(".js")[0]}_${lang}.js`, fileContent);
			});
		});
	});
});
