var module53 = require('@babel/runtime/helpers/interopRequireDefault')(require('./53')),
  n = {
    __constants: null,
    OS: 'android',

    get Version() {
      return this.constants.Version;
    },

    get constants() {
      if (null == this.__constants) this.__constants = module53.default.getConstants();
      return this.__constants;
    },

    get isTesting() {
      return false;
    },

    get isTV() {
      return 'tv' === this.constants.uiMode;
    },

    select: function (t) {
      return 'android' in t ? t.android : t.default;
    },
  };

module.exports = n;
