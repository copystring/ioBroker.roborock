var module49 = require('./49'),
  module4 = require('./4'),
  module5 = require('./5'),
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

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var l = u ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (l && (l.get || l.set)) Object.defineProperty(s, c, l);
        else s[c] = t[c];
      }

    s.default = t;
    if (o) o.set(t, s);
    return s;
  })(require('react')),
  module12 = require('./12'),
  module1223 = require('./1223');

function y(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (y = function (t) {
    return t ? o : n;
  })(t);
}

function b(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    if (n)
      s = s.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, s);
  }

  return o;
}

function v(t) {
  for (var o = 1; o < arguments.length; o++) {
    var s = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      b(Object(s), true).forEach(function (o) {
        module49.default(t, o, s[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      b(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

function w() {
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

var _ = function (t, n, o) {
    if (o >= t.length) for (var s = o - t.length; 1 + s--; ) t.push(undefined);
    t.splice(o, 0, t.splice(n, 1)[0]);
    return t;
  },
  O = (function (t) {
    module7.default(O, t);

    var module49 = O,
      y = w(),
      b = function () {
        var t,
          o = module11.default(module49);

        if (y) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function O(t) {
      var n;
      module4.default(this, O);

      (n = b.call(this, t))._registerDraggableRow = function (t) {
        n.draggableRows.push(t);
      };

      n._unregisterDraggableRow = function (t) {
        n.draggableRows.push(t);
      };

      n._getIndexByPositon = function (t) {
        var o = parseInt(t / n.props.height),
          s = n.state.rows.length - 1;
        return o < 0 ? 0 : o > s ? s : o;
      };

      n._getStartById = function (t) {
        return n.props.height * t;
      };

      n._dragStart = function (t, o) {
        n.currentIndex = o.props.idx;
        if (n.props.startDrag) n.props.startDrag();
      };

      n._dragMove = function (t, o) {
        var s = o.start + n.props.height / 2 + t.dy;
        console.log('\u62d6\u62fd\u7684\u957f\u5ea6', s);
        var u = n.draggableRows.find(function (t) {
          return t !== o && t.containsPosition(s);
        });

        if ((console.log(u), u)) {
          var c = n._getIndexByPositon(u.setTop);

          if (c !== n.currentIndex) {
            var l = n._getStartById(n.currentIndex);

            u.setTop = l;
            n.currentIndex = c;
          }
        }
      };

      n._dragDrop = function (t, o) {
        var s = n.state.rows,
          u = o.props.idx,
          c = n.currentIndex;
        o.setTop = n._getStartById(n.currentIndex);
        s = n.handleDrop(u, c);
        n.setState({
          rows: s,
        });
        if (n.props.stopDrag) n.props.stopDrag();
      };

      n.handleDrop = function (t, o) {
        return _(n.state.rows, t, o);
      };

      n.setScrollEnabled = function (t) {
        if (n.props.setScrollEnabled) n.props.setScrollEnabled(t);
      };

      n.renderRow = function (t) {
        return n.props.renderRow(t);
      };

      n.state = {
        rows: t.rows,
      };
      n.draggableRows = [];
      n.currentIndex = null;
      return n;
    }

    module5.default(O, [
      {
        key: 'componentWillReceiveProps',
        value: function (t) {
          var n = t.rows;
          this.setState({
            rows: n,
          });
        },
      },
      {
        key: '_renderRows',
        value: function () {
          var t = this,
            n = this.props.dragEnabled;
          return this.state.rows.map(function (o, s) {
            return React.default.createElement(module1223.default, {
              key: o.key,
              item: o,
              idx: s,
              dragEnabled: n,
              renderRow: t.renderRow,
              height: t.props.height,
              _registerDraggableRow: t._registerDraggableRow,
              _unregisterDraggableRow: t._unregisterDraggableRow,
              _dragMove: t._dragMove,
              _dragDrop: t._dragDrop,
              _dragStart: t._dragStart,
              setScrollEnabled: t.setScrollEnabled,
            });
          });
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this._renderRows();

          return React.default.createElement(
            module12.View,
            {
              style: v(
                {
                  height: t.length * this.props.height,
                },
                this.props.style
              ),
            },
            t
          );
        },
      },
    ]);
    return O;
  })(React.Component);

exports.default = O;
