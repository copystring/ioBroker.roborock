var t =
  Object.assign ||
  function (t) {
    for (var n = 1; n < arguments.length; n++) {
      var o = arguments[n];

      for (var u in o) Object.prototype.hasOwnProperty.call(o, u) && (t[u] = o[u]);
    }

    return t;
  };

module.exports = {
  Content: function (t) {
    return {
      type: 'content',
      id: t,
    };
  },
  NDArray: function (t) {
    return {
      type: 'ndarray',
      ndarray: t,
    };
  },
  URI: function (n) {
    return t(
      {
        type: 'uri',
      },
      n
    );
  },
  Framebuffer: function (t) {
    return {
      type: 'fbo',
      id: t,
    };
  },
  withOpts: function (n, o) {
    return t({}, n, {
      opts: o,
    });
  },
};
