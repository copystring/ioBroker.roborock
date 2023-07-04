exports.getCarpetPageAction = function () {
  var t = p.CarpetIgnore;
  if (module390.default.isMapCarpetAddSupport()) t = p.CarpetIgnore | p.CarpetAdd;
  else if (module390.default.isSupportCustomCarpet()) t = p.CarpetAdd;
  return t;
};

exports.canEditDoorSill = function () {
  return module381.RSM.mapSaveEnabled && -1 != module381.RSM.currentMapId;
};

exports.isDynamicCleaning = function () {
  return module390.default.isSupportIncrementalMap() && module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None && module381.RSM.state != module381.RobotState.PAUSE;
};

var module390 = require('./390'),
  module381 = require('./381'),
  p = {
    CarpetIgnore: 1,
    CarpetAdd: 2,
  };

exports.CarpetEditMode = p;
