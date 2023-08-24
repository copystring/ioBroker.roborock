const fs = require('fs');
const path = require('path');

const languages = fs.readdirSync('./admin/i18n').filter((file) => fs.statSync(path.join('./admin/i18n', file)).isDirectory());
const genDirs = fs.readdirSync('./lib/genSpecs').filter((file) => fs.statSync(path.join('./lib/genSpecs', file)).isDirectory());

fs.writeFileSync('./genDirs.txt', genDirs.join('\n'));
fs.writeFileSync('./languages.txt', languages.join('\n'));

languages.forEach((lang) => {
    genDirs.forEach((genDir) => {
        const dirPath = `./lib/genSpecs/${genDir}`;
        const files = fs.readdirSync(dirPath).filter((file) => file.endsWith('.js'));

        files.forEach((jsFile) => {
            const originalFilePath = `${dirPath}/${jsFile}`;
            const outputDir = `./tempTranslated/${genDir}`;
            fs.mkdirSync(outputDir, { recursive: true });

            const translationFilePath = `./admin/i18n/${lang}/translations.json`;
            const translationData = require(path.resolve(translationFilePath));

            let fileContent = fs.readFileSync(originalFilePath, 'utf8');

            for (const [key, value] of Object.entries(translationData)) {
                const regex = new RegExp(`@${key}@`, 'g');
                fileContent = fileContent.replace(regex, value);
            }

            fs.writeFileSync(`${outputDir}/${jsFile.split('.js')[0]}_${lang}.js`, fileContent);
        });
    });
});
