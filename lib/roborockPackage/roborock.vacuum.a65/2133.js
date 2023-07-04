var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1613 = require('./1613');

function h() {
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

var R = function (t, o, s) {
    if (s >= t.length) for (var n = s - t.length; 1 + n--; ) t.push(undefined);
    t.splice(s, 0, t.splice(o, 1)[0]);
    return t;
  },
  v = function (t, o) {
    t.forEach(function (t, s, n) {
      if (t == o) n.splice(s, 1);
    });
  },
  S = (function (t) {
    module9.default(b, t);

    var o = b,
      S = h(),
      _ = function () {
        var t,
          s = module12.default(o);

        if (S) {
          var n = module12.default(this).constructor;
          t = Reflect.construct(s, arguments, n);
        } else t = s.apply(this, arguments);

        return module11.default(this, t);
      };

    function b(t) {
      var o;
      module6.default(this, b);

      (o = _.call(this, t))._registerDraggableRow = function (t, s) {
        if (s) o.secondDraggableRows.push(t);
        else o.draggableRows.push(t);
      };

      o._unregisterDraggableRow = function (t, s) {
        if (s) o.secondDraggableRows.pop(t);
        else o.draggableRows.pop(t);
      };

      o._getIndexByPositon = function (t, s) {
        var n = parseInt(t / o.props.height),
          c = (s ? o.state.secondRows.length : o.state.rows.length) - 1;
        return n < 0 ? 0 : n > c ? c : n;
      };

      o._getStartById = function (t) {
        return o.props.height * t;
      };

      o._dragStart = function (t, s, n) {
        if (n) o.secondCurrentIndex = s.props.idx;
        else o.currentIndex = s.props.idx;
        if (o.props.startDrag) o.props.startDrag();
      };

      o._dragMove = function (t, s, n) {
        o.isFisrtToSecondMove = false;
        o.isSecondToFisrtMove = false;
        var c = o.props,
          l = c.height,
          u = c.secondSectionHeight,
          p = s.start,
          f = p + l / 2,
          w = -(u - l / 2),
          h = (o.state.rows.length - 0.5) * l + u,
          R = f + t.dy;

        if ((console.log('draglist::', '\u62d6\u62fd\u7684\u957f\u5ea6', n ? '2' : '', p, R), R >= h)) {
          console.log('draglist:: handle secondToOne', s.item);
          return void (o.isFisrtToSecondMove = true);
        }

        if (R <= w) {
          o.isSecondToFisrtMove = true;
          return void console.log('draglist:: handle oneToSecond', s.item);
        }

        var v = o.draggableRows.find(function (t) {
            return t !== s && t.containsPosition(R);
          }),
          S = o.secondDraggableRows.find(function (t) {
            return t !== s && t.containsPosition(R);
          });

        if (n) {
          if ((console.log('draglist:: second row under', null == S ? undefined : S.props.item), S)) {
            var _ = o._getIndexByPositon(S.setTop, true);

            if (_ !== o.secondCurrentIndex) {
              var b = o._getStartById(o.secondCurrentIndex);

              S.setTop = b;
              o.secondCurrentIndex = _;
            }
          }
        } else if ((console.log('draglist:: fisrt row under', null == v ? undefined : v.props.item), v)) {
          var y = o._getIndexByPositon(v.setTop);

          if (y !== o.currentIndex) {
            var x = o._getStartById(o.currentIndex);

            v.setTop = x;
            o.currentIndex = y;
          }
        }
      };

      o._dragDrop = function (t, s, n) {
        var c = o.props,
          l = c.willSecondToFirstMove,
          u = c.willFirstToSecondMove,
          p = c.didFinishDrag;

        if (o.isSecondToFisrtMove) {
          console.log('draglist::2 to 1', s.props.item);
          return void (l && l(o.state.rows, o.state.secondRows)
            ? (v(o.state.secondRows, s.props.item),
              o.state.rows.push(s.props.item),
              console.log('draglist::2 to 1', o.state.rows, o.state.secondRows),
              o.setState({
                rows: o.state.rows,
                secondRows: o.state.secondRows,
              }),
              p && p(o.state.rows, o.state.secondRows))
            : s.resetPosition());
        }

        if (o.isFisrtToSecondMove) {
          console.log('draglist:: 1 to 2', s.props.item);
          return void (u && u(o.state.rows, o.state.secondRows)
            ? (v(o.state.rows, s.props.item),
              o.state.secondRows.push(s.props.item),
              o.setState({
                rows: o.state.rows,
                secondRows: o.state.secondRows,
              }),
              p && p(o.state.rows, o.state.secondRows))
            : s.resetPosition());
        }

        var f = o.state.rows,
          w = s.props.idx,
          h = n ? o.secondCurrentIndex : o.currentIndex;
        s.setTop = o._getStartById(h);
        f = o.handleDrop(w, h, n);
        if (n)
          o.setState({
            secondRows: f,
          });
        else
          o.setState({
            rows: f,
          });
        if (p) p(o.state.rows, o.state.secondRows);
      };

      o.handleDrop = function (t, s, n) {
        return R(n ? o.state.secondRows : o.state.rows, t, s);
      };

      o.setScrollEnabled = function (t) {
        o.setState({
          scrollEnabled: t,
        });
      };

      o.renderRow = function (t) {
        return o.props.renderRow(t);
      };

      o.state = {
        scrollEnabled: true,
        rows: t.rows,
        secondRows: t.secondRows,
      };
      o.draggableRows = [];
      o.secondDraggableRows = [];
      o.currentIndex = null;
      o.secondCurrentIndex = null;
      return o;
    }

    module7.default(b, [
      {
        key: 'componentWillReceiveProps',
        value: function (t) {
          var o = t.rows,
            s = t.secondRows;
          this.setState({
            rows: o,
            secondRows: s,
          });
        },
      },
      {
        key: '_renderRows',
        value: function (t, o) {
          var s = this;
          return t.map(function (t, n) {
            return React.default.createElement(module1613.default, {
              key: (o ? 'first_' : 'second') + t.key,
              item: t,
              idx: n,
              renderRow: s.renderRow,
              height: s.props.height,
              _registerDraggableRow: function (t) {
                return s._registerDraggableRow(t, o);
              },
              _unregisterDraggableRow: function (t) {
                return s._unregisterDraggableRow(t, o);
              },
              _dragMove: function (t, n) {
                return s._dragMove(t, n, o);
              },
              _dragDrop: function (t, n) {
                return s._dragDrop(t, n, o);
              },
              _dragStart: function (t, n) {
                return s._dragStart(t, n, o);
              },
              setScrollEnabled: s.setScrollEnabled,
            });
          });
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            o = this.props,
            s = o.renderFirstSection,
            n = o.renderSecondSection,
            c = o.renderFooter,
            l = o.firstSectionHeight,
            u = o.secondSectionHeight,
            w = this._renderRows(this.state.rows),
            h = this._renderRows(this.state.secondRows, true),
            R = this.state.rows.length * this.props.height + l,
            v = (this.state.rows.length + this.state.secondRows.length) * this.props.height + l + u;

          return React.default.createElement(
            module13.ScrollView,
            {
              ref: function (o) {
                return (t.list = o);
              },
              scrollEnabled: this.state.scrollEnabled,
              scrollEventThrottle: 256,
              contentContainerStyle: {
                height: v + 100,
              },
            },
            s && s(),
            React.default.createElement(
              module13.View,
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
              module13.View,
              {
                style: {
                  width: '100%',
                  top: R,
                  position: 'absolute',
                },
              },
              n && n()
            ),
            React.default.createElement(
              module13.View,
              {
                style: {
                  width: '100%',
                  minHeight: 100,
                  top: R + u,
                  position: 'absolute',
                },
              },
              h
            ),
            React.default.createElement(
              module13.View,
              {
                style: {
                  width: '100%',
                  top: v,
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

exports.default = S;
module13.StyleSheet.create({
  firstBox: {
    backgroundColor: 'green',
  },
  secondBox: {
    backgroundColor: 'red',
  },
});
