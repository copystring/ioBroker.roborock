var module31 = require('@babel/runtime/helpers/toConsumableArray'),
  module50 = require('./50'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  PropTypes = require('prop-types'),
  module13 = require('./13'),
  module2162 = require('./2162'),
  module2165 = require('./2165');

function S(t, o) {
  var n = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(t);
    if (o)
      l = l.filter(function (o) {
        return Object.getOwnPropertyDescriptor(t, o).enumerable;
      });
    n.push.apply(n, l);
  }

  return n;
}

function R(t) {
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

function O(t, o) {
  var n;

  if ('undefined' == typeof Symbol || null == t['function' == typeof Symbol ? Symbol.iterator : '@@iterator']) {
    if (Array.isArray(t) || (n = L(t)) || (o && t && 'number' == typeof t.length)) {
      if (n) t = n;
      var l = 0;
      return function () {
        return l >= t.length
          ? {
              done: true,
            }
          : {
              done: false,
              value: t[l++],
            };
      };
    }

    throw new TypeError('Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
  }

  return (n = t['function' == typeof Symbol ? Symbol.iterator : '@@iterator']()).next.bind(n);
}

function L(t, o) {
  if (t) {
    if ('string' == typeof t) return E(t, o);
    var n = Object.prototype.toString.call(t).slice(8, -1);
    if ('Object' === n && t.constructor) n = t.constructor.name;
    return 'Map' === n || 'Set' === n ? Array.from(t) : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? E(t, o) : undefined;
  }
}

function E(t, o) {
  if (null == o || o > t.length) o = t.length;

  for (var n = 0, l = new Array(o); n < o; n++) l[n] = t[n];

  return l;
}

function A() {
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

var x = 'ios' === module13.Platform.OS ? 'zIndex' : 'elevation';

function I(t) {
  return '' + t + I.id;
}

I.id = 0;

var k = PropTypes.default.oneOfType([PropTypes.default.number, PropTypes.default.object]),
  z = (function (t, ...args) {
    module9.default(L, t);

    var o = L,
      PropTypes = A(),
      S = function () {
        var t,
          n = module12.default(o);

        if (PropTypes) {
          var l = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, l);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function L() {
      var t;
      module6.default(this, L);
      (t = S.call(this, ...args))._rows = {};
      t._rowsLayouts = {};
      t._resolveRowLayout = {};
      t._contentOffset = {
        x: 0,
        y: 0,
      };
      t.state = {
        animated: false,
        order: t.props.order || Object.keys(t.props.data),
        rowsLayouts: null,
        containerLayout: null,
        data: t.props.data,
        isMounting: true,
        activeRowKey: null,
        activeRowIndex: null,
        releasedRowKey: null,
        sortingEnabled: t.props.sortingEnabled,
        scrollEnabled: t.props.scrollEnabled,
      };

      t._onLayoutHeader = function (o) {
        var n = o.nativeEvent.layout;

        t._resolveHeaderLayout(n);
      };

      t._onLayoutFooter = function (o) {
        var n = o.nativeEvent.layout;

        t._resolveFooterLayout(n);
      };

      t._onActivateRow = function (o, n, l, s, c) {
        t._activeRowLocation = c;
        t.setState({
          activeRowKey: o,
          activeRowIndex: n,
          releasedRowKey: null,
          scrollEnabled: false,
        });
        if (t.props.onActivateRow) t.props.onActivateRow(o);
      };

      t._onPressRow = function (o) {
        if (t.props.onPressRow) t.props.onPressRow(o);
      };

      t._onReleaseRow = function (o) {
        t._stopAutoScroll();

        t.setState(function (o) {
          return {
            activeRowKey: null,
            activeRowIndex: null,
            releasedRowKey: o.activeRowKey,
            scrollEnabled: t.props.scrollEnabled,
          };
        });
        if (t.props.onReleaseRow) t.props.onReleaseRow(o, t.state.order);
      };

      t._onMoveRow = function (o, n, l) {
        var s = t._activeRowLocation.x,
          c = t._activeRowLocation.y,
          u = t._movingDirection;
        t._activeRowLocation = l;
        t._movingDirection = t.props.horizontal ? s < t._activeRowLocation.x : c < t._activeRowLocation.y;
        t._movingDirectionChanged = u !== t._movingDirection;

        t._setOrderOnMove();

        if (t.props.scrollEnabled) t._scrollOnMove(o);
      };

      t._onScroll = function (o) {
        t._contentOffset = o.nativeEvent.contentOffset;
        t.props.onScroll(o);
      };

      t._onRefContainer = function (o) {
        t._container = o;
      };

      t._onRefScrollView = function (o) {
        t._scrollView = o;
      };

      t._onRefRow = function (o, n) {
        t._rows[o] = n;
      };

      return t;
    }

    module7.default(L, [
      {
        key: 'componentDidMount',
        value: function () {
          var t = this;
          this.state.order.forEach(function (o) {
            t._rowsLayouts[o] = new Promise(function (n) {
              t._resolveRowLayout[o] = n;
            });
          });
          if (this.props.renderHeader && !this.props.horizontal)
            this._headerLayout = new Promise(function (o) {
              t._resolveHeaderLayout = o;
            });
          if (this.props.renderFooter && !this.props.horizontal)
            this._footerLayout = new Promise(function (o) {
              t._resolveFooterLayout = o;
            });

          this._onUpdateLayouts();

          this.setState({
            isMounting: false,
          });
        },
      },
      {
        key: 'componentDidUpdate',
        value: function (t, o) {
          var n = this,
            l = this.state,
            s = l.data,
            c = l.order,
            u = o.data,
            f = this.props,
            h = f.data,
            y = f.order;

          if (s && h && !module2162.shallowEqual(s, h)) {
            y = y || Object.keys(h);
            I.id++;
            this._rowsLayouts = {};
            y.forEach(function (t) {
              n._rowsLayouts[t] = new Promise(function (o) {
                n._resolveRowLayout[t] = o;
              });
            });
            if (Object.keys(h).length > Object.keys(s).length)
              this.setState({
                animated: false,
                data: h,
                containerLayout: null,
                rowsLayouts: null,
                order: y,
              });
            else
              this.setState({
                data: h,
                order: y,
              });
          } else if (c && y && !module2162.shallowEqual(c, y))
            this.setState({
              order: y,
            });

          if (s && u && !module2162.shallowEqual(s, u)) this._onUpdateLayouts();
        },
      },
      {
        key: 'scrollBy',
        value: function (t) {
          var o = t.dx,
            n = undefined === o ? 0 : o,
            l = t.dy,
            s = undefined === l ? 0 : l,
            c = t.animated,
            u = undefined !== c && c;
          if (this.props.horizontal) this._contentOffset.x += n;
          else this._contentOffset.y += s;

          this._scroll(u);
        },
      },
      {
        key: 'scrollTo',
        value: function (t) {
          var o = t.x,
            n = undefined === o ? 0 : o,
            l = t.y,
            s = undefined === l ? 0 : l,
            c = t.animated,
            u = undefined !== c && c;
          if (this.props.horizontal) this._contentOffset.x = n;
          else this._contentOffset.y = s;

          this._scroll(u);
        },
      },
      {
        key: 'scrollToRowKey',
        value: function (t) {
          for (
            var o, n = t.key, l = t.animated, s = undefined !== l && l, c = this.state, u = c.order, f = c.containerLayout, h = c.rowsLayouts, y = 0, p = 0, v = O(u);
            !(o = v()).done;

          ) {
            var w = o.value;
            if (w === n) break;
            y += h[w].width;
            p += h[w].height;
          }

          if (this.props.horizontal ? y < this._contentOffset.x || y > this._contentOffset.x + f.width : p < this._contentOffset.y || p > this._contentOffset.y + f.height) {
            if (this.props.horizontal) this._contentOffset.x = y;
            else this._contentOffset.y = p;

            this._scroll(s);
          }
        },
      },
      {
        key: 'render',
        value: function () {
          if (this.state.isMounting) return null;
          var t = this.props,
            o = t.contentContainerStyle,
            n = t.innerContainerStyle,
            l = t.horizontal,
            s = t.style,
            c = t.showsVerticalScrollIndicator,
            u = t.showsHorizontalScrollIndicator,
            f = t.snapToAlignment,
            h = t.scrollEventThrottle,
            y = t.decelerationRate,
            v = t.pagingEnabled,
            _ = t.nestedScrollEnabled,
            b = t.disableIntervalMomentum,
            S = t.keyboardShouldPersistTaps,
            R = this.state,
            O = R.animated,
            L = R.contentHeight,
            E = R.contentWidth,
            A = R.scrollEnabled,
            x = module13.StyleSheet.flatten([
              s,
              {
                opacity: Number(O),
              },
            ]);
          n = [
            P.rowsContainer,
            l
              ? {
                  width: E,
                }
              : {
                  height: L,
                },
            n,
          ];
          var I = this.props.refreshControl;
          if (I && I.type === module13.RefreshControl)
            I = React.default.cloneElement(this.props.refreshControl, {
              enabled: A,
            });
          return React.default.createElement(
            module13.View,
            {
              style: x,
              ref: this._onRefContainer,
            },
            React.default.createElement(
              module13.ScrollView,
              {
                nestedScrollEnabled: _,
                disableIntervalMomentum: b,
                refreshControl: I,
                ref: this._onRefScrollView,
                horizontal: l,
                contentContainerStyle: o,
                scrollEventThrottle: h,
                pagingEnabled: v,
                decelerationRate: y,
                scrollEnabled: A,
                keyboardShouldPersistTaps: S,
                showsHorizontalScrollIndicator: u,
                showsVerticalScrollIndicator: c,
                snapToAlignment: f,
                onScroll: this._onScroll,
              },
              this._renderHeader(),
              React.default.createElement(
                module13.View,
                {
                  style: n,
                },
                this._renderRows()
              ),
              this._renderFooter()
            )
          );
        },
      },
      {
        key: '_renderRows',
        value: function () {
          var t = this,
            o = this.props,
            n = o.horizontal,
            l = o.rowActivationTime,
            c = o.sortingEnabled,
            u = o.renderRow,
            f = this.state,
            h = f.animated,
            y = f.order,
            v = f.data,
            w = f.activeRowKey,
            _ = f.releasedRowKey,
            S = f.rowsLayouts,
            R = 0,
            O = 0;
          return y.map(function (o, f) {
            var y = module50.default({}, x, 0),
              L = {
                x: 0,
                y: 0,
              };
            if (S) n ? ((L.x = R), (R += S[o] ? S[o].width : 0)) : ((L.y = O), (O += S[o] ? S[o].height : 0));
            var E = w === o;
            if (E || _ === o) y[x] = 100;
            return React.default.createElement(
              module2165.default,
              {
                key: I(o),
                ref: t._onRefRow.bind(t, o),
                horizontal: n,
                activationTime: l,
                animated: h && !E,
                disabled: !c,
                style: y,
                location: L,
                onLayout: S ? null : t._onLayoutRow.bind(t, o),
                onActivate: t._onActivateRow.bind(t, o, f),
                onPress: t._onPressRow.bind(t, o),
                onRelease: t._onReleaseRow.bind(t, o),
                onMove: t._onMoveRow,
                manuallyActivateRows: t.props.manuallyActivateRows,
              },
              u({
                key: o,
                data: v[o],
                disabled: !c,
                active: E,
                index: f,
              })
            );
          });
        },
      },
      {
        key: '_renderHeader',
        value: function () {
          if (!this.props.renderHeader || this.props.horizontal) return null;
          var t = this.state.headerLayout;
          return React.default.createElement(
            module13.View,
            {
              onLayout: t ? null : this._onLayoutHeader,
            },
            this.props.renderHeader()
          );
        },
      },
      {
        key: '_renderFooter',
        value: function () {
          if (!this.props.renderFooter || this.props.horizontal) return null;
          var t = this.state.footerLayout;
          return React.default.createElement(
            module13.View,
            {
              onLayout: t ? null : this._onLayoutFooter,
            },
            this.props.renderFooter()
          );
        },
      },
      {
        key: '_onUpdateLayouts',
        value: function () {
          var t = this;
          Promise.all([this._headerLayout, this._footerLayout].concat(module31.default(Object.values(this._rowsLayouts)))).then(function (o) {
            var l = module2161.default(o),
              s = l[0],
              c = l[1],
              u = l.slice(2);

            t._container.measure(function (o, n, l, f, h, y) {
              var p = {},
                v = 0,
                w = 0;
              u.forEach(function (t) {
                var o = t.rowKey,
                  n = t.layout;
                p[o] = n;
                v += n.height;
                w += n.width;
              });
              t.setState(
                {
                  containerLayout: {
                    x: o,
                    y: n,
                    width: l,
                    height: f,
                    pageX: h,
                    pageY: y,
                  },
                  rowsLayouts: p,
                  headerLayout: s,
                  footerLayout: c,
                  contentHeight: v,
                  contentWidth: w,
                },
                function () {
                  t.setState({
                    animated: true,
                  });
                }
              );
            });
          });
        },
      },
      {
        key: '_scroll',
        value: function (t) {
          this._scrollView.scrollTo(
            R(
              R({}, this._contentOffset),
              {},
              {
                animated: t,
              }
            )
          );
        },
      },
      {
        key: '_setOrderOnMove',
        value: function () {
          var t = this,
            o = this.state,
            n = o.activeRowKey,
            l = o.activeRowIndex,
            s = o.order;

          if (null !== n && !this._autoScrollInterval) {
            var c,
              u = this._findRowUnderActiveRow(),
              f = u.rowKey,
              h = u.rowIndex;

            if ((this._movingDirectionChanged && (this._prevSwapedRowKey = null), f !== n && f !== this._prevSwapedRowKey)) {
              if (1 === Math.abs(h - l)) {
                this._prevSwapedRowKey = f;
                c = module2162.swapArrayElements(s, l, h);
              } else {
                (c = s.slice()).splice(l, 1);
                c.splice(h, 0, n);
              }

              this.setState(
                {
                  order: c,
                  activeRowIndex: h,
                },
                function () {
                  if (t.props.onChangeOrder) t.props.onChangeOrder(c);
                }
              );
            }
          }
        },
      },
      {
        key: '_findRowUnderActiveRow',
        value: function () {
          for (
            var t = this.props.horizontal,
              o = this.state,
              n = o.rowsLayouts,
              l = o.activeRowKey,
              s = o.activeRowIndex,
              c = o.order,
              u = n[l],
              f = this._activeRowLocation.x,
              h = f + u.width,
              y = this._activeRowLocation.y,
              p = y + u.height,
              v = 0,
              w = 0,
              _ = 0,
              b = c.length;
            v < b - 1;
            v++
          ) {
            var S = c[v],
              R = n[S],
              O = v + 1,
              L = n[c[O]];
            if (((w += R.width), (_ += R.height), S !== l && (t ? (w - R.width <= f || 0 === v) && f <= w - R.width / 3 : (_ - R.height <= y || 0 === v) && y <= _ - R.height / 3)))
              return {
                rowKey: c[v],
                rowIndex: v,
              };
            if (t ? w + L.width / 3 <= h && (h <= w + L.width || O === b - 1) : _ + L.height / 3 <= p && (p <= _ + L.height || O === b - 1))
              return {
                rowKey: c[O],
                rowIndex: O,
              };
          }

          return {
            rowKey: l,
            rowIndex: s,
          };
        },
      },
      {
        key: '_scrollOnMove',
        value: function (t) {
          var o = this,
            n = t.nativeEvent,
            l = n.pageX,
            s = n.pageY,
            c = this.props.horizontal,
            u = this.state.containerLayout,
            f = false,
            h = false;

          if (c) {
            f = l < u.pageX + this.props.autoscrollAreaSize;
            h = l > u.pageX + u.width - this.props.autoscrollAreaSize;
          } else {
            f = s < u.pageY + this.props.autoscrollAreaSize;
            h = s > u.pageY + u.height - this.props.autoscrollAreaSize;
          }

          if (!(f || h || null === this._autoScrollInterval)) this._stopAutoScroll();
          if (null === this._autoScrollInterval)
            f
              ? this._startAutoScroll({
                  direction: -1,
                  shouldScroll: function () {
                    return o._contentOffset[c ? 'x' : 'y'] > 0;
                  },
                  getScrollStep: function (t) {
                    var n = o._getScrollStep(t),
                      l = o._contentOffset[c ? 'x' : 'y'];

                    return l - n < 0 ? l : n;
                  },
                })
              : h &&
                this._startAutoScroll({
                  direction: 1,
                  shouldScroll: function () {
                    var t = o.state,
                      n = t.contentHeight,
                      l = t.contentWidth,
                      s = t.containerLayout,
                      u = t.footerLayout,
                      f =
                        undefined === u
                          ? {
                              height: 0,
                            }
                          : u;
                    return c ? o._contentOffset.x < l - s.width : o._contentOffset.y < n + f.height - s.height;
                  },
                  getScrollStep: function (t) {
                    var n = o._getScrollStep(t),
                      l = o.state,
                      s = l.contentHeight,
                      u = l.contentWidth,
                      f = l.containerLayout,
                      h = l.footerLayout,
                      y =
                        undefined === h
                          ? {
                              height: 0,
                            }
                          : h;

                    if (c) return o._contentOffset.x + n > u - f.width ? u - f.width - o._contentOffset.x : n;
                    var p = s + y.height - f.height;
                    return o._contentOffset.y + n > p ? p - o._contentOffset.y : n;
                  },
                });
        },
      },
      {
        key: '_getScrollStep',
        value: function (t) {
          return t > 3 ? 60 : 30;
        },
      },
      {
        key: '_startAutoScroll',
        value: function (t) {
          var o = this,
            n = t.direction,
            l = t.shouldScroll,
            c = t.getScrollStep;

          if (l()) {
            this.state.activeRowKey;
            var u = this.props.horizontal,
              f = 0;
            this._autoScrollInterval = setInterval(function () {
              if (l()) {
                var t = module50.default({}, u ? 'dx' : 'dy', n * c(f++));
                o.scrollBy(t);
              } else o._stopAutoScroll();
            }, 100);
          }
        },
      },
      {
        key: '_stopAutoScroll',
        value: function () {
          clearInterval(this._autoScrollInterval);
          this._autoScrollInterval = null;
        },
      },
      {
        key: '_onLayoutRow',
        value: function (t, o) {
          var n = o.nativeEvent.layout;

          this._resolveRowLayout[t]({
            rowKey: t,
            layout: n,
          });
        },
      },
    ]);
    return L;
  })(React.Component);

exports.default = z;
z.propTypes = {
  data: PropTypes.default.oneOfType([PropTypes.default.array, PropTypes.default.object]).isRequired,
  order: PropTypes.default.arrayOf(PropTypes.default.any),
  style: k,
  contentContainerStyle: k,
  innerContainerStyle: k,
  sortingEnabled: PropTypes.default.bool,
  scrollEnabled: PropTypes.default.bool,
  horizontal: PropTypes.default.bool,
  showsVerticalScrollIndicator: PropTypes.default.bool,
  showsHorizontalScrollIndicator: PropTypes.default.bool,
  refreshControl: PropTypes.default.element,
  autoscrollAreaSize: PropTypes.default.number,
  snapToAlignment: PropTypes.default.string,
  rowActivationTime: PropTypes.default.number,
  manuallyActivateRows: PropTypes.default.bool,
  keyboardShouldPersistTaps: PropTypes.default.oneOf(['never', 'always', 'handled']),
  scrollEventThrottle: PropTypes.default.number,
  decelerationRate: PropTypes.default.oneOfType([PropTypes.default.string, PropTypes.default.number]),
  pagingEnabled: PropTypes.default.bool,
  nestedScrollEnabled: PropTypes.default.bool,
  disableIntervalMomentum: PropTypes.default.bool,
  renderRow: PropTypes.default.func.isRequired,
  renderHeader: PropTypes.default.func,
  renderFooter: PropTypes.default.func,
  onChangeOrder: PropTypes.default.func,
  onActivateRow: PropTypes.default.func,
  onReleaseRow: PropTypes.default.func,
  onScroll: PropTypes.default.func,
};
z.defaultProps = {
  sortingEnabled: true,
  scrollEnabled: true,
  keyboardShouldPersistTaps: 'never',
  autoscrollAreaSize: 60,
  snapToAlignment: 'start',
  manuallyActivateRows: false,
  showsVerticalScrollIndicator: true,
  showsHorizontalScrollIndicator: true,
  scrollEventThrottle: 2,
  decelerationRate: 'normal',
  pagingEnabled: false,
  onScroll: function () {},
};
var P = module13.StyleSheet.create({
  container: {
    flex: 1,
  },
  rowsContainer: {
    flex: 1,
    zIndex: 1,
  },
});
