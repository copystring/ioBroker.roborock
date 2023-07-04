exports.hashU32 = function (n) {
  return (
    (-1252372727 ^
      (n =
        ((n = ((n = ((n = -949894596 ^ (n = ((n |= 0) + 2127912214 + (n << 12)) | 0) ^ (n >>> 19)) + 374761393 + (n << 5)) | 0) + -744332180) ^ (n << 9)) + -42973499 + (n << 3)) |
        0) ^
      (n >>> 16)) |
    0
  );
};

exports.readU64 = function (n, t) {
  var u = 0;
  u |= n[t++] << 0;
  u |= n[t++] << 8;
  u |= n[t++] << 16;
  u |= n[t++] << 24;
  u |= n[t++] << 32;
  u |= n[t++] << 40;
  u |= n[t++] << 48;
  u |= n[t++] << 56;
  return u;
};

exports.readU32 = function (n, t) {
  var u = 0;
  u |= n[t++] << 0;
  u |= n[t++] << 8;
  u |= n[t++] << 16;
  u |= n[t++] << 24;
  return u;
};

exports.writeU32 = function (n, t, u) {
  n[t++] = (u >> 0) & 255;
  n[t++] = (u >> 8) & 255;
  n[t++] = (u >> 16) & 255;
  n[t++] = (u >> 24) & 255;
};

exports.imul = function (n, t) {
  var u = 65535 & n,
    c = 65535 & t;
  return (u * c + (((n >>> 16) * c + u * (t >>> 16)) << 16)) | 0;
};
