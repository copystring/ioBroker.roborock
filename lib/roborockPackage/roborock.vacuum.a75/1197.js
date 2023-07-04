exports.getCarpetPageAction = function () {
  var t = n.CarpetIgnore;
  if (module390.default.isMapCarpetAddSupport()) t = n.CarpetIgnore | n.CarpetAdd;
  else if (module390.default.isSupportCustomCarpet()) t = n.CarpetAdd;
  return t;
};

exports.canEditDoorSill = function () {
  return module381.RSM.mapSaveEnabled && -1 != module381.RSM.currentMapId;
};

var module390 = require('./390'),
  module381 = require('./381'),
  n = {
    CarpetIgnore: 1,
    CarpetAdd: 2,
  };

exports.CarpetEditMode = n;
