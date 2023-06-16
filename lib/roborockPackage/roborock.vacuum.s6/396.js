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
  var u = new module398();
  u.setPrivateString(c);
  return u.decrypt(t);
};

exports.decryptBytesWithPrivateKey = function (c, u) {
  console.warn('will decryptBytesWithPrivateKey');
  var y = module397.utils.hex.fromBytes(c),
    s = new module398();
  s.setPrivateString(u);
  return s.decrypt(y);
};

exports.encryptBytesWithPublicKey = function (c, u) {
  var y = new module398();
  y.setPublicString(u);
  var s = y.encrypt(c);
  return module397.utils.hex.toBytes(s);
};

exports.decryptHexStringWithAesKey = function (n, c, u) {
  var y = module397.utils.hex.toBytes(n),
    s = new module397.ModeOfOperation.cbc(c, u).decrypt(y);
  return module397.utils.utf8.fromBytes(s);
};

exports.decryptBytesWithAesKey = function (n, c, u) {
  console.warn('will decryptBytesWithAesKey');
  return new module397.ModeOfOperation.cbc(c, u).decrypt(n);
};

exports.encryptBytesWithAesKey = function (n, c, u) {
  var y = new module397.ModeOfOperation.cbc(c, u).encrypt(n);
  return [].slice.call(y);
};

require('base64-js');

var module397 = require('./397'),
  module398 = require('./398'),
  c = null;

function u() {
  var t = new module398();
  t.generate(1024, '10001');
  return {
    pub: t.getPublicString(),
    pri: t.getPrivateString(),
  };
}
