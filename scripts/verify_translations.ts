import * as datasetRaw from '../src/lib/protocols/q7_dataset.json';
import { RoborockLocales } from '../src/lib/roborock_locales';

const dataset = datasetRaw as any;
const locales = new RoborockLocales(dataset);

function test(name: string, actual: any, expected: any) {
    if (actual === expected) {
        console.log(`[PASS] ${name}: ${actual}`);
    } else {
        console.log(`[FAIL] ${name}: Got "${actual}", expected "${expected}"`);
    }
}

console.log('--- Testing generic keys ---');
test('EN guide_firstuse', locales.getText('guide_firstuse', 'en'), 'Quick Start');
test('DE guide_firstuse', locales.getText('guide_firstuse', 'de'), 'Schnellstart');
test('ZH guide_firstuse', locales.getText('guide_firstuse', 'zh'), '首次使用');

console.log('--- Testing name mappings ---');
test('EN fan_power name', locales.getName('fan_power', 'en'), 'Suction Power');
test('DE fan_power name', locales.getName('fan_power', 'de'), 'Saugleistung');

console.log('--- Testing getNameAll (multi-lang object) ---');
const fanPowerAll = locales.getNameAll('fan_power');
if (fanPowerAll && fanPowerAll.en === 'Suction Power' && fanPowerAll.de === 'Saugleistung') {
    console.log('[PASS] getNameAll(fan_power) contains correct multi-lang data');
} else {
    console.log('[FAIL] getNameAll(fan_power):', JSON.stringify(fanPowerAll));
}

console.log('--- Testing fault codes ---');
test('EN fault 500', locales.getErrorText(500, 'en'), 'LiDAR turret or laser blocked. Check for obstruction and retry.');
test('DE fault 500', locales.getErrorText(500, 'de'), 'LiDAR-Turm oder Laser blockiert. Auf Hindernisse prüfen und erneut versuchen.');

console.log('--- Testing hardcoded fallbacks ---');
const statusAll = locales.getNameAll('status');
test('EN status', statusAll ? (statusAll as any).en : 'undefined', 'Status');
test('DE status', statusAll ? (statusAll as any).de : 'undefined', 'Status');

console.log('Verification complete!');
