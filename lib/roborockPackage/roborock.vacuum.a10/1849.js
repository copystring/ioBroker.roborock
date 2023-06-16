var module1845 = require('@babel/runtime/helpers/interopRequireDefault')(require('./1845')),
  module12 = require('./12').NativeModules.UIManager,
  s = module12.GLCanvas;

module1845.default(
  s,
  'gl-react-native: the native module is not available.\nMake sure you have properly configured it.\nSee README install instructions.\n\nNativeModules.UIManager.GLCanvas is %s',
  s
);
var o = s.Commands;

module.exports = function (n, s) {
  return module12.dispatchViewManagerCommand(n, o.captureFrame, [s]);
};
