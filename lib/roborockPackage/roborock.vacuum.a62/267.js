var module52 = require('@babel/runtime/helpers/interopRequireDefault')(require('./52')),
  module47 = require('./47');

function s(s, o) {
  if (!module52.default.isTesting) module47.configureNextLayoutAnimation(s, null != o ? o : function () {}, function () {});
}

function o(n, t, s) {
  return {
    duration: n,
    create: {
      type: t,
      property: s,
    },
    update: {
      type: t,
    },
    delete: {
      type: t,
      property: s,
    },
  };
}

var p = {
    easeInEaseOut: o(300, 'easeInEaseOut', 'opacity'),
    linear: o(500, 'linear', 'opacity'),
    spring: {
      duration: 700,
      create: {
        type: 'linear',
        property: 'opacity',
      },
      update: {
        type: 'spring',
        springDamping: 0.4,
      },
      delete: {
        type: 'linear',
        property: 'opacity',
      },
    },
  },
  c = {
    configureNext: s,
    create: o,
    Types: Object.freeze({
      spring: 'spring',
      linear: 'linear',
      easeInEaseOut: 'easeInEaseOut',
      easeIn: 'easeIn',
      easeOut: 'easeOut',
      keyboard: 'keyboard',
    }),
    Properties: Object.freeze({
      opacity: 'opacity',
      scaleX: 'scaleX',
      scaleY: 'scaleY',
      scaleXY: 'scaleXY',
    }),
    checkConfig: function () {
      console.error('LayoutAnimation.checkConfig(...) has been disabled.');
    },
    Presets: p,
    easeInEaseOut: s.bind(null, p.easeInEaseOut),
    linear: s.bind(null, p.linear),
    spring: s.bind(null, p.spring),
  };
module.exports = c;
