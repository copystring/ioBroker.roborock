// @ts-nocheck
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getPublicKey = getPublicKey;
exports.getPrivateKey = getPrivateKey;
exports.generateRSAKeys = generateRSAKeys;
exports.transJsonKeyToPem = transJsonKeyToPem;
exports.decryptHexStringWithPrivateKey = decryptHexStringWithPrivateKey;
exports.decryptBytesWithPrivateKey = decryptBytesWithPrivateKey;
exports.decryptHexStringWithAesKey = decryptHexStringWithAesKey;
exports.decryptBytesWithAesKey = decryptBytesWithAesKey;

var Base64 = require('base64-js');

var aes = require('./aes');

var RSAKey = require('./rsa.js');

const crypto = require('crypto');


var keys = null;

function getPublicKey() {
	if (!keys || !keys.pub || !keys.pri) {
		keys = generateRSAKeys();
	}

	return keys.pub;
}

function getPrivateKey() {
	if (!keys || !keys.pub || !keys.pri) {
		keys = generateRSAKeys();
	}

	return keys.pri;
}

function generateRSAKeys() {
	var bits = 1024;
	var exponent = '10001';
	var rsa = new RSAKey();
	var r = rsa.generate(bits, exponent);
	var publicKey = rsa.getPublicString();
	var privateKey = rsa.getPrivateString();
	return {
		pub: publicKey,
		pri: privateKey
	};
}

function transJsonKeyToPem(jwt) {
	var pubObj = JSON.parse(jwt);
	pubObj.kty = 'RSA';
	var pemPub = jwkToPem(pubObj);
	return pemPub;
}

function decryptHexStringWithPrivateKey(str, privateKey) {
	var rsa2 = new RSAKey();
	rsa2.setPrivateString(privateKey);
	var decrypted = rsa2.decrypt(str, rsa2);
	console.log(decrypted);
	return decrypted;
}

function decryptBytesWithPrivateKey(bytes, privateKey) {
	console.warn('will decryptBytesWithPrivateKey');
	var hexStr = aes.utils.hex.fromBytes(bytes);
	var rsa2 = new RSAKey();
	rsa2.setPrivateString(privateKey);
	var decrypted = rsa2.decrypt(hexStr);
	return decrypted;
}

function decryptHexStringWithAesKey(str, aesKey, iv) {
	var strBytes = aes.utils.hex.toBytes(str);
	var aesEcb = new aes.ModeOfOperation.cbc(aesKey, iv);
	var decryptedBytes = aesEcb.decrypt(strBytes);
	var decryptedStr = aes.utils.utf8.fromBytes(decryptedBytes);
	return decryptedStr;
}

function decryptBytesWithAesKey(bytes, aesKey, iv) {
	console.warn('will decryptBytesWithAesKey');
	var aesCbc = new aes.ModeOfOperation.cbc(aesKey, iv);
	var decryptedBytes = aesCbc.decrypt(bytes);
	return decryptedBytes;
}