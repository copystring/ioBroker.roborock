exports.getPublicKey = function () {
  if (!(c && c.pub && c.pri)) c = u();
  return c.pub;
};

exports.getPrivateKey = function () {
  if (!(c && c.pub && c.pri)) c = u();
  return c.pri;
};

exports.generateRSAKeys = u;

exports.transJsonKeyToPem = function (t) {
  var n = JSON.parse(t);
  n.kty = 'RSA';
  return jwkToPem(n);
};

exports.decryptHexStringWithPrivateKey = function (t, c) {
  var u = new module402();
  u.setPrivateString(c);
  return u.decrypt(t);
};

exports.decryptBytesWithPrivateKey = function (c, u) {
  console.warn('will decryptBytesWithPrivateKey');
  var y = module401.utils.hex.fromBytes(c),
    s = new module402();
  s.setPrivateString(u);
  return s.decrypt(y);
};

exports.encryptBytesWithPublicKey = function (c, u) {
  var y = new module402();
  y.setPublicString(u);
  var s = y.encrypt(c);
  return module401.utils.hex.toBytes(s);
};

exports.decryptHexStringWithAesKey = function (n, c, u) {
  var y = module401.utils.hex.toBytes(n),
    s = new module401.ModeOfOperation.cbc(c, u).decrypt(y);
  return module401.utils.utf8.fromBytes(s);
};

exports.decryptBytesWithAesKey = function (n, c, u) {
  console.warn('will decryptBytesWithAesKey');
  return new module401.ModeOfOperation.cbc(c, u).decrypt(n);
};

exports.encryptBytesWithAesKey = function (n, c, u) {
  var y = new module401.ModeOfOperation.cbc(c, u).encrypt(n);
  return [].slice.call(y);
};

require('base64-js');

var module401 = require('./401'),
  module402 = require('./402'),
  c = null;

function u() {
  var t = new module402();
  t.generate(1024, '10001');
  return {
    pub: t.getPublicString(),
    pri: t.getPrivateString(),
  };
}
