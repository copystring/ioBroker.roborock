var t = [];
module.exports = {
  registerAsset: function (s) {
    return t.push(s);
  },
  getAssetByID: function (s) {
    return t[s - 1];
  },
};
