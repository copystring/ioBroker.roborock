var module12 = require('./12'),
  module415 = require('./415'),
  module387 = require('./387'),
  module934 = require('./934');

exports.TabWrapWidth = 180;
exports.TabWrapHeight = 40;
exports.HorizontalMargin = 15;
exports.InfoBoardHeight = 60;
var p = 0.5 * module934.AppBarMarginBottom;
exports.BottomControlBottom = p;
var l = (module12.Dimensions.get('window').width - 30) / 3;
exports.BottomControlTopButtonWidth = l;
var M = (module12.Dimensions.get('window').width - 30) / 2;
exports.BottomControlBottomButtonWidth = M;
var s = (module12.Dimensions.get('window').width - 30) / 3;
exports.BottomControlBottomThreeButtonWidth = s;
var u = module415.DMM.isTopazS || module415.DMM.isTopazSPlus || module415.DMM.isTopazSV,
  w = module415.DMM.isGarnet ? 156 : u ? 115 : 73;
exports.BottomControlHeight = w;
var T = 81 + module387.default.iOSAndroidReturn(module934.StatusBarHeight + module934.AppBarMarginTop, module12.StatusBar.currentHeight || 0) + 60;
exports.MapViewInnerTop = T;
var W = w + 40 + p + 15 + 15;
exports.MapViewInnerBottom = W;
exports.BaseShadow = {
  x: 0,
  y: 0,
  color: '#9b9b9b',
  border: 5,
  opacity: 0.07,
};
