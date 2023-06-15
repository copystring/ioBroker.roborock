var module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module6 = require('./6'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = y(n);
    if (o && o.has(t)) return o.get(t);
    var s = {},
      u = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var f in t)
      if ('default' !== f && Object.prototype.hasOwnProperty.call(t, f)) {
        var l = u ? Object.getOwnPropertyDescriptor(t, f) : null;
        if (l && (l.get || l.set)) Object.defineProperty(s, f, l);
        else s[f] = t[f];
      }

    s.default = t;
    if (o) o.set(t, s);
    return s;
  })(require('react')),
  module12 = require('./12'),
  module506 = require('./506');

function y(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (y = function (t) {
    return t ? o : n;
  })(t);
}

function R() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ('function' == typeof Proxy) return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

var _ = (function (t) {
  module7.default(P, t);

  var module506 = P,
    y = R(),
    _ = function () {
      var t,
        n = module11.default(module506);

      if (y) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function P(t) {
    var n;
    module4.default(this, P);
    (n = _.call(this, t))._selfTop = 0;

    n.containsPosition = function (t) {
      var o = n._selfTop,
        s = o + n.size;
      return t >= o && t <= s;
    };

    n._dragStart = function (t) {
      n.props._dragStart(t, module6.default(n));

      n.selfRef.setNativeProps({
        style: {
          height: n.size,
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowRadius: 5,
          shadowOffset: {
            height: 0,
            width: 2,
          },
          elevation: 5,
          zIndex: 2,
        },
      });
      n.props.setScrollEnabled(false);
    };

    n._dragMove = function (t) {
      n.selfRef.setNativeProps({
        style: {
          top: n.start + t.dy,
        },
      });

      n.props._dragMove(t, module6.default(n));
    };

    n._dragDrop = function (t) {
      n.props.setScrollEnabled(true);
      n.selfRef.setNativeProps({
        style: {
          height: n.size,
          shadowColor: '#000',
          shadowOpacity: 0,
          shadowRadius: 0,
          shadowOffset: {
            height: 0,
            width: 0,
          },
          elevation: 0,
          zIndex: 0,
        },
      });

      n.props._dragDrop(t, module6.default(n));
    };

    n.dragging = false;
    return n;
  }

  module5.default(P, [
    {
      key: 'componentDidMount',
      value: function () {
        this.originTop = this._selfTop;
      },
    },
    {
      key: 'resetPosition',
      value: function () {
        this.setTop = this.originTop;
      },
    },
    {
      key: 'setTop',
      get: function () {
        return this._selfTop;
      },
      set: function (t) {
        var n;
        this._selfTop = t;
        if (!(null == (n = this.selfRef)))
          n.setNativeProps({
            style: {
              top: t,
            },
          });
      },
    },
    {
      key: 'start',
      get: function () {
        for (var t = 0, n = 0; n < this.props.idx; n++) t += this.props.height;

        this._selfTop = t;
        return t;
      },
    },
    {
      key: 'size',
      get: function () {
        return this.props.height;
      },
    },
    {
      key: 'componentWillMount',
      value: function () {
        var t = this;
        this._panResponder = module12.PanResponder.create({
          onStartShouldSetPanResponder: function (t, n) {
            return true;
          },
          onStartShouldSetPanResponderCapture: function (t, n) {
            return true;
          },
          onMoveShouldSetPanResponder: function (t, n) {
            return true;
          },
          onMoveShouldSetPanResponderCapture: function (t, n) {
            return true;
          },
          onPanResponderGrant: function (n, o) {
            t.dragging = true;

            t._dragStart(o);
          },
          onPanResponderMove: function (n, o) {
            if (t.dragging) t._dragMove(o);
          },
          onPanResponderTerminationRequest: function (t, n) {
            return true;
          },
          onPanResponderRelease: function (n, o) {
            if (t.dragging) t._dragDrop(o);
            t.dragging = false;
          },
          onPanResponderTerminate: function (n, o) {
            if (t.dragging) t._dragDrop(o);
            t.dragging = false;
          },
          onShouldBlockNativeResponder: function () {
            return true;
          },
        });

        this.props._registerDraggableRow(this);
      },
    },
    {
      key: 'componentWillUnmount',
      value: function () {
        this.props._unregisterDraggableRow(this);
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this,
          o = this.context.theme.mopModeList,
          s = this.props.dragEnabled,
          u = {
            position: 'absolute',
            top: this.start,
            height: this.size,
            right: 0,
            left: 0,
            flexDirection: 'row',
            backgroundColor: 'white',
            zIndex: 1,
          },
          f = this.props.renderRow(this.props.item),
          l = {
            position: 'absolute',
            height: this.size,
            right: 0,
            width: 37,
            justifyContent: 'center',
          },
          p = React.default.createElement(
            module12.View,
            module21.default(
              {
                style: l,
              },
              this._panResponder.panHandlers
            ),
            React.default.createElement(module12.Image, {
              style: w.dragMenu,
              source: o.dragIcon,
            })
          );
        return React.default.createElement(
          module12.View,
          {
            style: [u, w.mainContain],
            ref: function (n) {
              return (t.selfRef = n);
            },
          },
          f,
          s && p
        );
      },
    },
  ]);
  return P;
})(React.Component);

exports.default = _;
_.contextType = module506.AppConfigContext;
var w = module12.StyleSheet.create({
  mainContain: {
    flex: 1,
    flexDirection: 'row',
  },
  dragMenu: {
    width: 22,
    height: 10,
  },
});
