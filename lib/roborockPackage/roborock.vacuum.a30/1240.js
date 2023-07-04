var t;

switch (
  (Object.defineProperty(exports, '__esModule', {
    value: true,
  }),
  (exports.default = undefined),
  require('./12').Platform.OS)
) {
  case 'android':
    t = require('./1241').default;
    break;

  case 'ios':
    t = require('./1242').default;
    break;

  default:
    t = require('./1243').default;
}

var f = t;
exports.default = f;
