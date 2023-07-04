var module22 = require('./22'),
  module6 = require('./6'),
  module8 = require('./8'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1193 = require('./1193');

function y() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ('function' == typeof Proxy) return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

var _ = (function (t) {
  module9.default(S, t);

  var n = S,
    module1193 = y(),
    _ = function () {
      var t,
        o = module12.default(n);

      if (module1193) {
        var s = module12.default(this).constructor;
        t = Reflect.construct(o, arguments, s);
      } else t = o.apply(this, arguments);

      return module11.default(this, t);
    };

  function S(t) {
    var n;
    module6.default(this, S);
    (n = _.call(this, t))._selfTop = 0;

    n.containsPosition = function (t) {
      var o = n._selfTop,
        s = o + n.size;
      return t >= o && t <= s;
    };

    n._dragStart = function (t) {
      n.props._dragStart(t, module8.default(n));

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

      n.props._dragMove(t, module8.default(n));
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

      n.props._dragDrop(t, module8.default(n));
    };

    n.dragging = false;
    return n;
  }

  module7.default(S, [
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
      key: 'componentWillMount',
      value: function () {
        var t = this;
        this._panResponder = module13.PanResponder.create({
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
          n = this.context.theme.mopModeList,
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
          l = this.props.renderRow(this.props.item),
          f = {
            position: 'absolute',
            height: this.size,
            right: 0,
            width: 37,
            justifyContent: 'center',
          },
          p = React.default.createElement(
            module13.View,
            module22.default(
              {
                style: f,
              },
              this._panResponder.panHandlers
            ),
            React.default.createElement(module13.Image, {
              style: w.dragMenu,
              source: n.dragIcon,
            })
          );
        return React.default.createElement(
          module13.View,
          {
            style: [u, w.mainContain],
            ref: function (n) {
              return (t.selfRef = n);
            },
          },
          l,
          s && p
        );
      },
    },
    {
      key: 'setTop',
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
      get: function () {
        return this._selfTop;
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
  ]);
  return S;
})(React.Component);

exports.default = _;
_.contextType = module1193.AppConfigContext;
var w = module13.StyleSheet.create({
  mainContain: {
    flex: 1,
    flexDirection: 'row',
  },
  dragMenu: {
    width: 22,
    height: 10,
  },
});
