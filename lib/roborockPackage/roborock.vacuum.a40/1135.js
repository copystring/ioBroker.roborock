var t;

switch (
  (Object.defineProperty(exports, '__esModule', {
    value: true,
  }),
  (exports.default = undefined),
  require('./12').Platform.OS)
) {
  case 'android':
    t = require('./1136').default;
    break;

  case 'ios':
    t = require('./1137').default;
    break;

  default:
    t = require('./1138').default;
}

var f = t;
exports.default = f;
