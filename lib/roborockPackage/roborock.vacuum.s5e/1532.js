var module50 = require('./50'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1533 = require('./1533');

function w(t, n) {
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
  for (var n = 1; n < arguments.length; n++) {
    var s = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      w(Object(s), true).forEach(function (n) {
        module50.default(t, n, s[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      w(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

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

var _ = function (t, n, o) {
    if (o >= t.length) for (var s = o - t.length; 1 + s--; ) t.push(undefined);
    t.splice(o, 0, t.splice(n, 1)[0]);
    return t;
  },
  R = (function (t) {
    module7.default(R, t);

    var n = R,
      module50 = y(),
      w = function () {
        var t,
          s = module11.default(n);

        if (module50) {
          var u = module11.default(this).constructor;
          t = Reflect.construct(s, arguments, u);
        } else t = s.apply(this, arguments);

        return module9.default(this, t);
      };

    function R(t) {
      var n;
      module4.default(this, R);

      (n = w.call(this, t))._registerDraggableRow = function (t) {
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

    module5.default(R, [
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
            return React.default.createElement(module1533.default, {
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
    return R;
  })(React.Component);

exports.default = R;
