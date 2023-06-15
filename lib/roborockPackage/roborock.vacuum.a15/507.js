var module22 = require('./22'),
  module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module50 = require('./50'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module508 = require('./508'),
  PropTypes = require('prop-types'),
  module496 = require('./496');

function S(t, o) {
  var n = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    if (o)
      s = s.filter(function (o) {
        return Object.getOwnPropertyDescriptor(t, o).enumerable;
      });
    n.push.apply(n, s);
  }

  return n;
}

function v(t) {
  for (var o = 1; o < arguments.length; o++) {
    var n = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      S(Object(n), true).forEach(function (o) {
        module50.default(t, o, n[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
    else
      S(Object(n)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(n, o));
      });
  }

  return t;
}

function C() {
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

var P = (function (t) {
  module7.default(S, t);

  var o = S,
    module50 = C(),
    b = function () {
      var t,
        n = module11.default(o);

      if (module50) {
        var s = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, s);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function S(t) {
    var o;
    module4.default(this, S);
    (o = b.call(this, t))._rows = {};
    o.openCellKey = null;
    return o;
  }

  module5.default(S, [
    {
      key: 'setScrollEnabled',
      value: function (t) {
        if (this._listView && this._listView.setNativeProps)
          this._listView.setNativeProps({
            scrollEnabled: t,
          });
        else if (this._listView && this._listView.getScrollResponder) {
          var o = this._listView.getScrollResponder();

          if (o.setNativeProps)
            o.setNativeProps({
              scrollEnabled: t,
            });
        }
        if (this.props.onScrollEnabled) this.props.onScrollEnabled(t);
      },
    },
    {
      key: 'safeCloseOpenRow',
      value: function () {
        var t = this._rows[this.openCellKey];
        if (t && t.closeRow) this._rows[this.openCellKey].closeRow();
      },
    },
    {
      key: 'rowSwipeGestureBegan',
      value: function (t) {
        if (this.props.closeOnRowBeginSwipe && this.openCellKey && this.openCellKey !== t) this.safeCloseOpenRow();
        if (this.props.swipeGestureBegan) this.props.swipeGestureBegan(t);
      },
    },
    {
      key: 'onRowOpen',
      value: function (t) {
        if (this.openCellKey && this.openCellKey !== t) this.safeCloseOpenRow();
        this.openCellKey = t;
        if (this.props.onRowOpen) this.props.onRowOpen(t, this._rows);
      },
    },
    {
      key: 'onRowPress',
      value: function () {
        if (this.openCellKey && this.props.closeOnRowPress) {
          this.safeCloseOpenRow();
          this.openCellKey = null;
        }
      },
    },
    {
      key: 'onScroll',
      value: function (t) {
        if (this.openCellKey && this.props.closeOnScroll) {
          this.safeCloseOpenRow();
          this.openCellKey = null;
        }

        if (this.props.onScroll) this.props.onScroll(t);
      },
    },
    {
      key: 'setRefs',
      value: function (t) {
        this._listView = t;
        if (this.props.listViewRef) this.props.listViewRef(t);
      },
    },
    {
      key: 'renderCell',
      value: function (t, o, n, s, l) {
        var p = this;
        return o
          ? React.default.createElement(
              module508.default,
              {
                ref: function (t) {
                  return (p._rows[n] = t);
                },
                swipeGestureBegan: function (t) {
                  return p.rowSwipeGestureBegan(n);
                },
                onRowOpen: function (t) {
                  return p.onRowOpen(n);
                },
                onRowDidOpen: function (t) {
                  return p.props.onRowDidOpen && p.props.onRowDidOpen(n, p._rows);
                },
                onRowClose: function (t) {
                  return p.props.onRowClose && p.props.onRowClose(n, p._rows);
                },
                onRowDidClose: function (t) {
                  return p.props.onRowDidClose && p.props.onRowDidClose(n, p._rows);
                },
                onRowPress: function (t) {
                  return p.onRowPress(n);
                },
                setScrollEnabled: function (t) {
                  return p.setScrollEnabled(t);
                },
                leftOpenValue: s.leftOpenValue || this.props.leftOpenValue,
                rightOpenValue: s.rightOpenValue || this.props.rightOpenValue,
                closeOnRowPress: s.closeOnRowPress || this.props.closeOnRowPress,
                disableLeftSwipe: s.disableLeftSwipe || this.props.disableLeftSwipe,
                disableRightSwipe: s.disableRightSwipe || this.props.disableRightSwipe,
                stopLeftSwipe: s.stopLeftSwipe || this.props.stopLeftSwipe,
                stopRightSwipe: s.stopRightSwipe || this.props.stopRightSwipe,
                recalculateHiddenLayout: this.props.recalculateHiddenLayout,
                style: this.props.swipeRowStyle,
                preview: l,
                previewDuration: this.props.previewDuration,
                previewOpenValue: this.props.previewOpenValue,
                tension: this.props.tension,
                friction: this.props.friction,
                directionalDistanceChangeThreshold: this.props.directionalDistanceChangeThreshold,
                swipeToOpenPercent: this.props.swipeToOpenPercent,
                swipeToOpenVelocityContribution: this.props.swipeToOpenVelocityContribution,
                swipeToClosePercent: this.props.swipeToClosePercent,
              },
              o,
              t
            )
          : React.default.cloneElement(
              t,
              v(
                v({}, t.props),
                {},
                {
                  ref: function (t) {
                    return (p._rows[n] = t);
                  },
                  onRowOpen: function (t) {
                    return p.onRowOpen(n);
                  },
                  onRowDidOpen: function (t) {
                    return p.props.onRowDidOpen && p.props.onRowDidOpen(n, p._rows);
                  },
                  onRowClose: function (t) {
                    return p.props.onRowClose && p.props.onRowClose(n, p._rows);
                  },
                  onRowDidClose: function (t) {
                    return p.props.onRowDidClose && p.props.onRowDidClose(n, p._rows);
                  },
                  onRowPress: function (t) {
                    return p.onRowPress();
                  },
                  setScrollEnabled: function (t) {
                    return p.setScrollEnabled(t);
                  },
                  swipeGestureBegan: function (t) {
                    return p.rowSwipeGestureBegan(n);
                  },
                }
              )
            );
      },
    },
    {
      key: 'renderRow',
      value: function (t, o, n, s) {
        var l = '' + o + n,
          p = this.props.renderRow(t, o, n, s),
          u = this.props.renderHiddenRow && this.props.renderHiddenRow(t, o, n, s),
          c = this.props.dataSource && this.props.dataSource.getRowIDForFlatIndex(this.props.previewRowIndex || 0),
          w = (this.props.previewFirstRow || this.props.previewRowIndex) && n === c;
        return this.renderCell(p, u, l, t, w);
      },
    },
    {
      key: 'renderItem',
      value: function (t, o) {
        var n = this.props.renderItem(t, o),
          s = this.props.renderHiddenItem && this.props.renderHiddenItem(t, o),
          l = t.item,
          p = t.index,
          u = l.key;
        if (!u && this.props.keyExtractor) u = this.props.keyExtractor(l, p);
        var c = this.props.previewRowKey === u;
        return this.renderCell(n, s, u, l, c);
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this,
          o = this.props,
          l = o.useFlatList,
          p = o.renderListView,
          u = module56.default(o, ['useFlatList', 'renderListView']);
        return p
          ? p(u, this.setRefs.bind(this), this.onScroll.bind(this), l ? this.renderItem.bind(this) : this.renderRow.bind(this, this._rows))
          : l
          ? React.default.createElement(
              module12.FlatList,
              module22.default({}, u, {
                showsVerticalScrollIndicator: false,
                ref: function (o) {
                  return t.setRefs(o);
                },
                onScroll: function (o) {
                  return t.onScroll(o);
                },
                renderItem: function (o) {
                  return t.renderItem(o, t._rows);
                },
              })
            )
          : React.default.createElement(
              module496.default,
              module22.default({}, u, {
                showsVerticalScrollIndicator: false,
                ref: function (o) {
                  return t.setRefs(o);
                },
                onScroll: function (o) {
                  return t.onScroll(o);
                },
                renderRow: function (o, n, s) {
                  return t.renderRow(o, n, s, t._rows);
                },
              })
            );
      },
    },
  ]);
  return S;
})(React.Component);

P.propTypes = {
  renderListView: PropTypes.default.func,
  renderItem: PropTypes.default.func,
  renderHiddenItem: PropTypes.default.func,
  renderRow: PropTypes.default.func,
  renderHiddenRow: PropTypes.default.func,
  leftOpenValue: PropTypes.default.number,
  rightOpenValue: PropTypes.default.number,
  stopLeftSwipe: PropTypes.default.number,
  stopRightSwipe: PropTypes.default.number,
  closeOnScroll: PropTypes.default.bool,
  closeOnRowPress: PropTypes.default.bool,
  closeOnRowBeginSwipe: PropTypes.default.bool,
  disableLeftSwipe: PropTypes.default.bool,
  disableRightSwipe: PropTypes.default.bool,
  recalculateHiddenLayout: PropTypes.default.bool,
  swipeGestureBegan: PropTypes.default.func,
  onRowOpen: PropTypes.default.func,
  onRowDidOpen: PropTypes.default.func,
  onRowClose: PropTypes.default.func,
  onRowDidClose: PropTypes.default.func,
  onScrollEnabled: PropTypes.default.func,
  swipeRowStyle: module12.ViewPropTypes.style,
  listViewRef: PropTypes.default.func,
  previewRowKey: PropTypes.default.string,
  previewFirstRow: PropTypes.default.bool,
  previewRowIndex: PropTypes.default.number,
  previewDuration: PropTypes.default.number,
  previewOpenValue: PropTypes.default.number,
  friction: PropTypes.default.number,
  tension: PropTypes.default.number,
  directionalDistanceChangeThreshold: PropTypes.default.number,
  swipeToOpenPercent: PropTypes.default.number,
  swipeToOpenVelocityContribution: PropTypes.default.number,
  swipeToClosePercent: PropTypes.default.number,
};
P.defaultProps = {
  leftOpenValue: 0,
  rightOpenValue: 0,
  closeOnRowBeginSwipe: false,
  closeOnScroll: true,
  closeOnRowPress: true,
  disableLeftSwipe: false,
  disableRightSwipe: false,
  recalculateHiddenLayout: false,
  previewFirstRow: false,
  directionalDistanceChangeThreshold: 2,
  swipeToOpenPercent: 50,
  swipeToOpenVelocityContribution: 0,
  swipeToClosePercent: 50,
};
module.exports = P;
