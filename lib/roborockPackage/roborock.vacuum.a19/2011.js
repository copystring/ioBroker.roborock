var module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = (function (t, o) {
    if (!o && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var n = w(o);
    if (n && n.has(t)) return n.get(t);
    var s = {},
      c = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var l in t)
      if ('default' !== l && Object.prototype.hasOwnProperty.call(t, l)) {
        var u = c ? Object.getOwnPropertyDescriptor(t, l) : null;
        if (u && (u.get || u.set)) Object.defineProperty(s, l, u);
        else s[l] = t[l];
      }

    s.default = t;
    if (n) n.set(t, s);
    return s;
  })(require('react')),
  module12 = require('./12'),
  module1223 = require('./1223');

function w(t) {
  if ('function' != typeof WeakMap) return null;
  var o = new WeakMap(),
    n = new WeakMap();
  return (w = function (t) {
    return t ? n : o;
  })(t);
}

function h() {
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

var v = function (t, o, n) {
    if (n >= t.length) for (var s = n - t.length; 1 + s--; ) t.push(undefined);
    t.splice(n, 0, t.splice(o, 1)[0]);
    return t;
  },
  R = function (t, o) {
    t.forEach(function (t, n, s) {
      if (t == o) s.splice(n, 1);
    });
  },
  y = (function (t) {
    module7.default(b, t);

    var w = b,
      y = h(),
      S = function () {
        var t,
          o = module11.default(w);

        if (y) {
          var n = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, n);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function b(t) {
      var n;
      module4.default(this, b);

      (n = S.call(this, t))._registerDraggableRow = function (t, o) {
        if (o) n.secondDraggableRows.push(t);
        else n.draggableRows.push(t);
      };

      n._unregisterDraggableRow = function (t, o) {
        if (o) n.secondDraggableRows.pop(t);
        else n.draggableRows.pop(t);
      };

      n._getIndexByPositon = function (t, o) {
        var s = parseInt(t / n.props.height),
          c = (o ? n.state.secondRows.length : n.state.rows.length) - 1;
        return s < 0 ? 0 : s > c ? c : s;
      };

      n._getStartById = function (t) {
        return n.props.height * t;
      };

      n._dragStart = function (t, o, s) {
        if (s) n.secondCurrentIndex = o.props.idx;
        else n.currentIndex = o.props.idx;
        if (n.props.startDrag) n.props.startDrag();
      };

      n._dragMove = function (t, o, s) {
        n.isFisrtToSecondMove = false;
        n.isSecondToFisrtMove = false;
        var c = n.props,
          l = c.height,
          u = c.secondSectionHeight,
          p = o.start,
          f = p + l / 2,
          w = -(u - l / 2),
          h = (n.state.rows.length - 0.5) * l + u,
          v = f + t.dy;

        if ((console.log('draglist::', '\u62d6\u62fd\u7684\u957f\u5ea6', s ? '2' : '', p, v), v >= h)) {
          console.log('draglist:: handle secondToOne', o.item);
          return void (n.isFisrtToSecondMove = true);
        }

        if (v <= w) {
          n.isSecondToFisrtMove = true;
          return void console.log('draglist:: handle oneToSecond', o.item);
        }

        var R = n.draggableRows.find(function (t) {
            return t !== o && t.containsPosition(v);
          }),
          y = n.secondDraggableRows.find(function (t) {
            return t !== o && t.containsPosition(v);
          });

        if (s) {
          if ((console.log('draglist:: second row under', null == y ? undefined : y.props.item), y)) {
            var S = n._getIndexByPositon(y.setTop, true);

            if (S !== n.secondCurrentIndex) {
              var b = n._getStartById(n.secondCurrentIndex);

              y.setTop = b;
              n.secondCurrentIndex = S;
            }
          }
        } else if ((console.log('draglist:: fisrt row under', null == R ? undefined : R.props.item), R)) {
          var _ = n._getIndexByPositon(R.setTop);

          if (_ !== n.currentIndex) {
            var x = n._getStartById(n.currentIndex);

            R.setTop = x;
            n.currentIndex = _;
          }
        }
      };

      n._dragDrop = function (t, o, s) {
        var c = n.props,
          l = c.willSecondToFirstMove,
          u = c.willFirstToSecondMove,
          p = c.didFinishDrag;

        if (n.isSecondToFisrtMove) {
          console.log('draglist::2 to 1', o.props.item);
          return void (l && l(n.state.rows, n.state.secondRows)
            ? (R(n.state.secondRows, o.props.item),
              n.state.rows.push(o.props.item),
              console.log('draglist::2 to 1', n.state.rows, n.state.secondRows),
              n.setState({
                rows: n.state.rows,
                secondRows: n.state.secondRows,
              }),
              p && p(n.state.rows, n.state.secondRows))
            : o.resetPosition());
        }

        if (n.isFisrtToSecondMove) {
          console.log('draglist:: 1 to 2', o.props.item);
          return void (u && u(n.state.rows, n.state.secondRows)
            ? (R(n.state.rows, o.props.item),
              n.state.secondRows.push(o.props.item),
              n.setState({
                rows: n.state.rows,
                secondRows: n.state.secondRows,
              }),
              p && p(n.state.rows, n.state.secondRows))
            : o.resetPosition());
        }

        var f = n.state.rows,
          w = o.props.idx,
          h = s ? n.secondCurrentIndex : n.currentIndex;
        o.setTop = n._getStartById(h);
        f = n.handleDrop(w, h, s);
        if (s)
          n.setState({
            secondRows: f,
          });
        else
          n.setState({
            rows: f,
          });
        if (p) p(n.state.rows, n.state.secondRows);
      };

      n.handleDrop = function (t, o, s) {
        return v(s ? n.state.secondRows : n.state.rows, t, o);
      };

      n.setScrollEnabled = function (t) {
        n.setState({
          scrollEnabled: t,
        });
      };

      n.renderRow = function (t) {
        return n.props.renderRow(t);
      };

      n.state = {
        scrollEnabled: true,
        rows: t.rows,
        secondRows: t.secondRows,
      };
      n.draggableRows = [];
      n.secondDraggableRows = [];
      n.currentIndex = null;
      n.secondCurrentIndex = null;
      return n;
    }

    module5.default(b, [
      {
        key: 'componentWillReceiveProps',
        value: function (t) {
          var o = t.rows,
            n = t.secondRows;
          this.setState({
            rows: o,
            secondRows: n,
          });
        },
      },
      {
        key: '_renderRows',
        value: function (t, o) {
          var n = this;
          return t.map(function (t, s) {
            return React.default.createElement(module1223.default, {
              key: (o ? 'first_' : 'second') + t.key,
              item: t,
              idx: s,
              renderRow: n.renderRow,
              height: n.props.height,
              _registerDraggableRow: function (t) {
                return n._registerDraggableRow(t, o);
              },
              _unregisterDraggableRow: function (t) {
                return n._unregisterDraggableRow(t, o);
              },
              _dragMove: function (t, s) {
                return n._dragMove(t, s, o);
              },
              _dragDrop: function (t, s) {
                return n._dragDrop(t, s, o);
              },
              _dragStart: function (t, s) {
                return n._dragStart(t, s, o);
              },
              setScrollEnabled: n.setScrollEnabled,
            });
          });
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            o = this.props,
            n = o.renderFirstSection,
            s = o.renderSecondSection,
            c = o.renderFooter,
            l = o.firstSectionHeight,
            f = o.secondSectionHeight,
            w = this._renderRows(this.state.rows),
            h = this._renderRows(this.state.secondRows, true),
            v = this.state.rows.length * this.props.height + l,
            R = (this.state.rows.length + this.state.secondRows.length) * this.props.height + l + f;

          return React.default.createElement(
            module12.ScrollView,
            {
              ref: function (o) {
                return (t.list = o);
              },
              scrollEnabled: this.state.scrollEnabled,
              scrollEventThrottle: 256,
              contentContainerStyle: {
                height: R + 100,
              },
            },
            n && n(),
            React.default.createElement(
              module12.View,
              {
                style: {
                  width: '100%',
                  top: l,
                  position: 'absolute',
                  zIndex: 9,
                },
              },
              w
            ),
            React.default.createElement(
              module12.View,
              {
                style: {
                  width: '100%',
                  top: v,
                  position: 'absolute',
                },
              },
              s && s()
            ),
            React.default.createElement(
              module12.View,
              {
                style: {
                  width: '100%',
                  minHeight: 100,
                  top: v + f,
                  position: 'absolute',
                },
              },
              h
            ),
            React.default.createElement(
              module12.View,
              {
                style: {
                  width: '100%',
                  top: R,
                  position: 'absolute',
                },
              },
              c && c()
            )
          );
        },
      },
    ]);
    return b;
  })(React.Component);

exports.default = y;
module12.StyleSheet.create({
  firstBox: {
    backgroundColor: 'green',
  },
  secondBox: {
    backgroundColor: 'red',
  },
});
