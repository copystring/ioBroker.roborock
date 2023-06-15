var module12 = require('./12'),
  module422 = require('./422'),
  module391 = require('./391'),
  module1153 = require('./1153');

exports.TabWrapWidth = 180;
exports.TabWrapHeight = 40;
exports.HorizontalMargin = 15;
exports.InfoBoardHeight = 60;
var p = 0.5 * module1153.AppBarMarginBottom;
exports.BottomControlBottom = p;
var l = (module12.Dimensions.get('window').width - 30) / 3;
exports.BottomControlTopButtonWidth = l;
var w = (module12.Dimensions.get('window').width - 30) / 2;
exports.BottomControlBottomButtonWidth = w;
var u = (module12.Dimensions.get('window').width - 30) / 3;
exports.BottomControlBottomThreeButtonWidth = u;
var s = module422.DMM.isGarnet ? 156 : 120;
exports.BottomControlHeight = s;
var W = 81 + module391.default.iOSAndroidReturn(module1153.StatusBarHeight + module1153.AppBarMarginTop, module12.StatusBar.currentHeight || 0) + 60;
exports.MapViewInnerTop = W;
var v = s + 40 + p + 15 + 15;
exports.MapViewInnerBottom = v;
exports.BaseShadow = {
  x: 0,
  y: 0,
  color: '#9b9b9b',
  border: 5,
  opacity: 0.07,
};
