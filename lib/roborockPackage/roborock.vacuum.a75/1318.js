var t;

switch (
  (Object.defineProperty(exports, '__esModule', {
    value: true,
  }),
  (exports.default = undefined),
  require('./13').Platform.OS)
) {
  case 'android':
    t = require('./1319').default;
    break;

  case 'ios':
    t = require('./1320').default;
    break;

  default:
    t = require('./1321').default;
}

var f = t;
exports.default = f;
