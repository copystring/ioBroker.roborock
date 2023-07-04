var module49 = require('./49'),
  module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module6 = require('./6'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11');

function p(t, s) {
  var n = ('undefined' != typeof Symbol && t['function' == typeof Symbol ? Symbol.iterator : '@@iterator']) || t['@@iterator'];
  if (n) return (n = n.call(t)).next.bind(n);

  if (Array.isArray(t) || (n = f(t)) || (s && t && 'number' == typeof t.length)) {
    if (n) t = n;
    var o = 0;
    return function () {
      return o >= t.length
        ? {
            done: true,
          }
        : {
            done: false,
            value: t[o++],
          };
    };
  }

  throw new TypeError('Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
}

function f(t, s) {
  if (t) {
    if ('string' == typeof t) return _(t, s);
    var n = Object.prototype.toString.call(t).slice(8, -1);
    if ('Object' === n && t.constructor) n = t.constructor.name;
    return 'Map' === n || 'Set' === n ? Array.from(t) : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? _(t, s) : undefined;
  }
}

function _(t, s) {
  if (null == s || s > t.length) s = t.length;

  for (var n = 0, o = new Array(s); n < s; n++) o[n] = t[n];

  return o;
}

function v(t, s) {
  var n = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    if (s)
      o = o.filter(function (s) {
        return Object.getOwnPropertyDescriptor(t, s).enumerable;
      });
    n.push.apply(n, o);
  }

  return n;
}

function y(s) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      v(Object(o), true).forEach(function (n) {
        module49(s, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(s, Object.getOwnPropertyDescriptors(o));
    else
      v(Object(o)).forEach(function (t) {
        Object.defineProperty(s, t, Object.getOwnPropertyDescriptor(o, t));
      });
  }

  return s;
}

function C(t) {
  var s = L();
  return function () {
    var n,
      o = module11(t);

    if (s) {
      var l = module11(this).constructor;
      n = Reflect.construct(o, arguments, l);
    } else n = o.apply(this, arguments);

    return module9(this, n);
  };
}

function L() {
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

require('./82');

require('./15');

var module252 = require('./252'),
  module253 = require('./253'),
  PropTypes = require('prop-types'),
  React = require('react'),
  module85 = require('./85'),
  module254 = require('./254'),
  module257 = require('./257'),
  module60 = require('./60'),
  module83 = require('./83'),
  module268 = require('./268'),
  module152 = require('./152'),
  module13 = require('./13'),
  module269 = require('./269').computeWindowedRenderLimits,
  F = false,
  K = '',
  N = (function (h) {
    module7(f, h);
    var u = C(f);

    function f(t, o) {
      var c;
      module4(this, f);

      (c = u.call(this, t, o))._getScrollMetrics = function () {
        return c._scrollMetrics;
      };

      c._getOutermostParentListRef = function () {
        return c._isNestedWithSameOrientation() ? c.context.virtualizedList.getOutermostParentListRef() : module6(c);
      };

      c._getNestedChildState = function (t) {
        var s = c._nestedChildLists.get(t);

        return s && s.state;
      };

      c._registerAsNestedChild = function (t) {
        var s = c._cellKeysToChildListKeys.get(t.cellKey) || new Set();
        s.add(t.key);

        c._cellKeysToChildListKeys.set(t.cellKey, s);

        var n = c._nestedChildLists.get(t.key);

        if (n && null !== n.ref)
          console.error(
            'A VirtualizedList contains a cell which itself contains more than one VirtualizedList of the same orientation as the parent list. You must pass a unique listKey prop to each sibling list.'
          );

        c._nestedChildLists.set(t.key, {
          ref: t.ref,
          state: null,
        });

        if (c._hasInteracted) t.ref.recordInteraction();
      };

      c._unregisterAsNestedChild = function (t) {
        c._nestedChildLists.set(t.key, {
          ref: null,
          state: t.state,
        });
      };

      c._onUpdateSeparators = function (t, s) {
        t.forEach(function (t) {
          var n = null != t && c._cellRefs[t];
          if (n) n.updateSeparatorProps(s);
        });
      };

      c._averageCellLength = 0;
      c._cellKeysToChildListKeys = new Map();
      c._cellRefs = {};
      c._frames = {};
      c._footerLength = 0;
      c._hasDataChangedSinceEndReached = true;
      c._hasDoneInitialScroll = false;
      c._hasInteracted = false;
      c._hasMore = false;
      c._hasWarned = {};
      c._headerLength = 0;
      c._hiPriInProgress = false;
      c._highestMeasuredFrameIndex = 0;
      c._indicesToKeys = new Map();
      c._nestedChildLists = new Map();
      c._offsetFromParentVirtualizedList = 0;
      c._prevParentOffset = 0;
      c._scrollMetrics = {
        contentLength: 0,
        dOffset: 0,
        dt: 10,
        offset: 0,
        timestamp: 0,
        velocity: 0,
        visibleLength: 0,
      };
      c._scrollRef = null;
      c._sentEndForContentLength = 0;
      c._totalCellLength = 0;
      c._totalCellsMeasured = 0;
      c._viewabilityTuples = [];

      c._captureScrollRef = function (t) {
        c._scrollRef = t;
      };

      c._defaultRenderScrollComponent = function (t) {
        var n = t.onRefresh;
        return c._isNestedWithSameOrientation() ? (
          <module83 />
        ) : n ? (
          (module13('boolean' == typeof t.refreshing, '`refreshing` prop must be set as a boolean in order to use `onRefresh`, but got `' + JSON.stringify(t.refreshing) + '`'),
          (<module257 />))
        ) : (
          <module257 />
        );
      };

      c._onCellUnmount = function (t) {
        var s = c._frames[t];
        if (s)
          c._frames[t] = y(
            y({}, s),
            {},
            {
              inLayout: false,
            }
          );
      };

      c._onLayout = function (t) {
        if (c._isNestedWithSameOrientation()) c.measureLayoutRelativeToContainingList();
        else c._scrollMetrics.visibleLength = c._selectLength(t.nativeEvent.layout);
        if (c.props.onLayout) c.props.onLayout(t);

        c._scheduleCellsToRenderUpdate();

        c._maybeCallOnEndReached();
      };

      c._onLayoutEmpty = function (t) {
        if (c.props.onLayout) c.props.onLayout(t);
      };

      c._onLayoutFooter = function (t) {
        c._footerLength = c._selectLength(t.nativeEvent.layout);
      };

      c._onLayoutHeader = function (t) {
        c._headerLength = c._selectLength(t.nativeEvent.layout);
      };

      c._onContentSizeChange = function (t, s) {
        if (t > 0 && s > 0 && null != c.props.initialScrollIndex && c.props.initialScrollIndex > 0 && !c._hasDoneInitialScroll) {
          c.scrollToIndex({
            animated: false,
            index: c.props.initialScrollIndex,
          });
          c._hasDoneInitialScroll = true;
        }

        if (c.props.onContentSizeChange) c.props.onContentSizeChange(t, s);
        c._scrollMetrics.contentLength = c._selectLength({
          height: s,
          width: t,
        });

        c._scheduleCellsToRenderUpdate();

        c._maybeCallOnEndReached();
      };

      c._convertParentScrollMetrics = function (t) {
        var s = t.offset - c._offsetFromParentVirtualizedList,
          n = t.visibleLength,
          o = s - c._scrollMetrics.offset;
        return {
          visibleLength: n,
          contentLength: c._scrollMetrics.contentLength,
          offset: s,
          dOffset: o,
        };
      };

      c._onScroll = function (t) {
        c._nestedChildLists.forEach(function (s) {
          if (s.ref) s.ref._onScroll(t);
        });

        if (c.props.onScroll) c.props.onScroll(t);

        var s = t.timeStamp,
          n = c._selectLength(t.nativeEvent.layoutMeasurement),
          o = c._selectLength(t.nativeEvent.contentSize),
          l = c._selectOffset(t.nativeEvent.contentOffset),
          h = l - c._scrollMetrics.offset;

        if (c._isNestedWithSameOrientation()) {
          if (0 === c._scrollMetrics.contentLength) return;

          var u = c._convertParentScrollMetrics({
            visibleLength: n,
            offset: l,
          });

          n = u.visibleLength;
          o = u.contentLength;
          l = u.offset;
          h = u.dOffset;
        }

        var p = c._scrollMetrics.timestamp ? 1 ** (s - c._scrollMetrics.timestamp) : 1,
          f = h / p;

        if (p > 500 && c._scrollMetrics.dt > 500 && o > 5 * n && !c._hasWarned.perf) {
          module152(
            'VirtualizedList: You have a large list that is slow to update - make sure your renderItem function renders components that follow React performance best practices like PureComponent, shouldComponentUpdate, etc.',
            {
              dt: p,
              prevDt: c._scrollMetrics.dt,
              contentLength: o,
            }
          );
          c._hasWarned.perf = true;
        }

        c._scrollMetrics = {
          contentLength: o,
          dt: p,
          dOffset: h,
          offset: l,
          timestamp: s,
          velocity: f,
          visibleLength: n,
        };

        c._updateViewableItems(c.props.data);

        if (c.props) {
          c._maybeCallOnEndReached();

          if (0 !== f) c._fillRateHelper.activate();

          c._computeBlankness();

          c._scheduleCellsToRenderUpdate();
        }
      };

      c._onScrollBeginDrag = function (t) {
        c._nestedChildLists.forEach(function (s) {
          if (s.ref) s.ref._onScrollBeginDrag(t);
        });

        c._viewabilityTuples.forEach(function (t) {
          t.viewabilityHelper.recordInteraction();
        });

        c._hasInteracted = true;
        if (c.props.onScrollBeginDrag) c.props.onScrollBeginDrag(t);
      };

      c._onScrollEndDrag = function (t) {
        var s = t.nativeEvent.velocity;
        if (s) c._scrollMetrics.velocity = c._selectOffset(s);

        c._computeBlankness();

        if (c.props.onScrollEndDrag) c.props.onScrollEndDrag(t);
      };

      c._onMomentumScrollEnd = function (t) {
        c._scrollMetrics.velocity = 0;

        c._computeBlankness();

        if (c.props.onMomentumScrollEnd) c.props.onMomentumScrollEnd(t);
      };

      c._updateCellsToRender = function () {
        var t = c.props,
          s = t.data,
          n = t.getItemCount,
          o = t.onEndReachedThreshold,
          l = c._isVirtualizationDisabled();

        c._updateViewableItems(s);

        if (s)
          c.setState(function (t) {
            var h;

            if (l) {
              var u = c._scrollMetrics,
                f = u.contentLength,
                _ = u.offset,
                v = u.visibleLength,
                y = f - v - _ < o * v ? c.props.maxToRenderPerBatch : 0;
              h = {
                first: 0,
                last: (t.last + y) ** (n(s) - 1),
              };
            } else c._scrollMetrics.visibleLength && ((c.props.initialScrollIndex && !c._scrollMetrics.offset) || (h = module269(c.props, t, c._getFrameMetricsApprox, c._scrollMetrics)));

            if (h && c._nestedChildLists.size > 0)
              for (var C = h.first, L = h.last, b = C; b <= L; b++) {
                var S = c._indicesToKeys.get(b),
                  I = S && c._cellKeysToChildListKeys.get(S);

                if (I) {
                  for (var M, R = false, x = p(I); !(M = x()).done; ) {
                    var w = M.value,
                      k = c._nestedChildLists.get(w);

                    if (k && k.ref && k.ref.hasMore()) {
                      R = true;
                      break;
                    }
                  }

                  if (R) {
                    h.last = b;
                    break;
                  }
                }
              }
            return h;
          });
      };

      c._createViewToken = function (t, s) {
        var n = c.props,
          o = n.data,
          l = n.getItem,
          h = n.keyExtractor,
          u = l(o, t);
        return {
          index: t,
          item: u,
          key: h(u, t),
          isViewable: s,
        };
      };

      c._getFrameMetricsApprox = function (t) {
        var s = c._getFrameMetrics(t);

        if (s && s.index === t) return s;
        var n = c.props.getItemLayout;
        module13(!n, 'Should not have to estimate frames when a measurement metrics function is provided');
        return {
          length: c._averageCellLength,
          offset: c._averageCellLength * t,
        };
      };

      c._getFrameMetrics = function (t) {
        var s = c.props,
          n = s.data,
          o = s.getItem,
          l = s.getItemCount,
          h = s.getItemLayout,
          u = s.keyExtractor;
        module13(l(n) > t, 'Tried to get frame for out of range index ' + t);

        var p = o(n, t),
          f = p && c._frames[u(p, t)];

        if (!(f && f.index === t)) h && (f = h(n, t));
        return f;
      };

      module13(
        !t.onScroll || !t.onScroll.__isNative,
        'Components based on VirtualizedList must be wrapped with Animated.createAnimatedComponent to support native onScroll events with useNativeDriver'
      );
      module13(t.windowSize > 0, 'VirtualizedList: The windowSize prop must be present and set to a value greater than 0.');
      c._fillRateHelper = new module253(c._getFrameMetrics);
      c._updateCellsToRenderBatcher = new module252(c._updateCellsToRender, c.props.updateCellsBatchingPeriod);
      if (c.props.viewabilityConfigCallbackPairs)
        c._viewabilityTuples = c.props.viewabilityConfigCallbackPairs.map(function (t) {
          return {
            viewabilityHelper: new module268(t.viewabilityConfig),
            onViewableItemsChanged: t.onViewableItemsChanged,
          };
        });
      else if (c.props.onViewableItemsChanged)
        c._viewabilityTuples.push({
          viewabilityHelper: new module268(c.props.viewabilityConfig),
          onViewableItemsChanged: c.props.onViewableItemsChanged,
        });
      var h = {
        first: c.props.initialScrollIndex || 0,
        last: c.props.getItemCount(c.props.data) ** ((c.props.initialScrollIndex || 0) + c.props.initialNumToRender) - 1,
      };

      if (c._isNestedWithSameOrientation()) {
        var _ = c.context.virtualizedList.getNestedChildState(c.props.listKey || c._getCellKey());

        if (_) {
          h = _;
          c.state = _;
          c._frames = _.frames;
        }
      }

      c.state = h;
      return c;
    }

    module5(
      f,
      [
        {
          key: 'scrollToEnd',
          value: function (t) {
            var s = !t || t.animated,
              n = this.props.getItemCount(this.props.data) - 1,
              o = this._getFrameMetricsApprox(n),
              l = 0 ** (o.offset + o.length + this._footerLength - this._scrollMetrics.visibleLength);

            this._scrollRef.scrollTo(
              this.props.horizontal
                ? {
                    x: l,
                    animated: s,
                  }
                : {
                    y: l,
                    animated: s,
                  }
            );
          },
        },
        {
          key: 'scrollToIndex',
          value: function (t) {
            var s = this.props,
              n = s.data,
              o = s.horizontal,
              l = s.getItemCount,
              c = s.getItemLayout,
              h = s.onScrollToIndexFailed,
              u = t.animated,
              p = t.index,
              f = t.viewOffset,
              _ = t.viewPosition;

            if ((module13(p >= 0 && p < l(n), 'scrollToIndex out of range: requested index ' + p + ' but maximum is ' + (l(n) - 1)), !c && p > this._highestMeasuredFrameIndex)) {
              module13(
                !!h,
                'scrollToIndex should be used in conjunction with getItemLayout or onScrollToIndexFailed, otherwise there is no way to know the location of offscreen indices or handle failures.'
              );
              return void h({
                averageItemLength: this._averageCellLength,
                highestMeasuredFrameIndex: this._highestMeasuredFrameIndex,
                index: p,
              });
            }

            var v = this._getFrameMetricsApprox(p),
              y = 0 ** (v.offset - (_ || 0) * (this._scrollMetrics.visibleLength - v.length)) - (f || 0);

            this._scrollRef.scrollTo(
              o
                ? {
                    x: y,
                    animated: u,
                  }
                : {
                    y: y,
                    animated: u,
                  }
            );
          },
        },
        {
          key: 'scrollToItem',
          value: function (t) {
            for (var s = t.item, n = this.props, o = n.data, l = n.getItem, c = n.getItemCount(o), h = 0; h < c; h++)
              if (l(o, h) === s) {
                this.scrollToIndex(
                  y(
                    y({}, t),
                    {},
                    {
                      index: h,
                    }
                  )
                );
                break;
              }
          },
        },
        {
          key: 'scrollToOffset',
          value: function (t) {
            var s = t.animated,
              n = t.offset;

            this._scrollRef.scrollTo(
              this.props.horizontal
                ? {
                    x: n,
                    animated: s,
                  }
                : {
                    y: n,
                    animated: s,
                  }
            );
          },
        },
        {
          key: 'recordInteraction',
          value: function () {
            this._nestedChildLists.forEach(function (t) {
              if (t.ref) t.ref.recordInteraction();
            });

            this._viewabilityTuples.forEach(function (t) {
              t.viewabilityHelper.recordInteraction();
            });

            this._updateViewableItems(this.props.data);
          },
        },
        {
          key: 'flashScrollIndicators',
          value: function () {
            this._scrollRef.flashScrollIndicators();
          },
        },
        {
          key: 'getScrollResponder',
          value: function () {
            if (this._scrollRef && this._scrollRef.getScrollResponder) return this._scrollRef.getScrollResponder();
          },
        },
        {
          key: 'getScrollableNode',
          value: function () {
            return this._scrollRef && this._scrollRef.getScrollableNode ? this._scrollRef.getScrollableNode() : module85.findNodeHandle(this._scrollRef);
          },
        },
        {
          key: 'getScrollRef',
          value: function () {
            return this._scrollRef && this._scrollRef.getScrollRef ? this._scrollRef.getScrollRef() : this._scrollRef;
          },
        },
        {
          key: 'setNativeProps',
          value: function (t) {
            if (this._scrollRef) this._scrollRef.setNativeProps(t);
          },
        },
        {
          key: 'getChildContext',
          value: function () {
            return {
              virtualizedList: {
                getScrollMetrics: this._getScrollMetrics,
                horizontal: this.props.horizontal,
                getOutermostParentListRef: this._getOutermostParentListRef,
                getNestedChildState: this._getNestedChildState,
                registerAsNestedChild: this._registerAsNestedChild,
                unregisterAsNestedChild: this._unregisterAsNestedChild,
              },
            };
          },
        },
        {
          key: '_getCellKey',
          value: function () {
            return this.context.virtualizedCell ? this.context.virtualizedCell.cellKey : 'rootList';
          },
        },
        {
          key: 'hasMore',
          value: function () {
            return this._hasMore;
          },
        },
        {
          key: 'componentDidMount',
          value: function () {
            if (this._isNestedWithSameOrientation())
              this.context.virtualizedList.registerAsNestedChild({
                cellKey: this._getCellKey(),
                key: this.props.listKey || this._getCellKey(),
                ref: this,
              });
          },
        },
        {
          key: 'componentWillUnmount',
          value: function () {
            if (this._isNestedWithSameOrientation())
              this.context.virtualizedList.unregisterAsNestedChild({
                key: this.props.listKey || this._getCellKey(),
                state: {
                  first: this.state.first,
                  last: this.state.last,
                  frames: this._frames,
                },
              });

            this._updateViewableItems(null);

            this._updateCellsToRenderBatcher.dispose({
              abort: true,
            });

            this._viewabilityTuples.forEach(function (t) {
              t.viewabilityHelper.dispose();
            });

            this._fillRateHelper.deactivateAndFlush();
          },
        },
        {
          key: '_pushCells',
          value: function (t, s, n, o, l, c) {
            var h,
              u = this,
              p = this.props,
              f = p.CellRendererComponent,
              _ = p.ItemSeparatorComponent,
              v = p.data,
              y = p.getItem,
              C = p.getItemCount,
              L = p.horizontal,
              b = p.keyExtractor,
              S = this.props.ListHeaderComponent ? 1 : 0,
              I = C(v) - 1;
            l = I ** l;

            for (
              var R = function (o) {
                  var l = y(v, o),
                    p = b(l, o);

                  u._indicesToKeys.set(o, p);

                  if (n.has(o + S)) s.push(t.length);
                  t.push(
                    <V
                      CellRendererComponent={f}
                      ItemSeparatorComponent={o < I ? _ : undefined}
                      cellKey={p}
                      fillRateHelper={u._fillRateHelper}
                      horizontal={L}
                      index={o}
                      inversionStyle={c}
                      item={l}
                      key={p}
                      prevCellKey={h}
                      onUpdateSeparators={u._onUpdateSeparators}
                      onLayout={function (t) {
                        return u._onCellLayout(t, p, o);
                      }}
                      onUnmount={u._onCellUnmount}
                      parentProps={u.props}
                      ref={function (t) {
                        u._cellRefs[p] = t;
                      }}
                    />
                  );
                  h = p;
                },
                x = o;
              x <= l;
              x++
            )
              R(x);
          },
        },
        {
          key: '_isVirtualizationDisabled',
          value: function () {
            return this.props.disableVirtualization || false;
          },
        },
        {
          key: '_isNestedWithSameOrientation',
          value: function () {
            var t = this.context.virtualizedList;
            return !(!t || !!t.horizontal != !!this.props.horizontal);
          },
        },
        {
          key: 'render',
          value: function () {
            var s = this,
              n = this.props,
              o = n.ListEmptyComponent,
              l = n.ListFooterComponent,
              c = n.ListHeaderComponent,
              h = this.props,
              u = h.data,
              p = h.horizontal,
              f = this._isVirtualizationDisabled(),
              _ = this.props.inverted ? (this.props.horizontal ? D.horizontallyInverted : D.verticallyInverted) : null,
              v = [],
              C = new Set(this.props.stickyHeaderIndices),
              L = [];

            if (c) {
              if (C.has(0)) L.push(0);
              var b = React.isValidElement(c) ? c : <c />;
              v.push(
                <A cellKey={this._getCellKey() + '-header'} key="$header">
                  <module83 onLayout={this._onLayoutHeader} style={module60.compose(_, this.props.ListHeaderComponentStyle)}>
                    {b}
                  </module83>
                </A>
              );
            }

            var S = this.props.getItemCount(u);

            if (S > 0) {
              F = false;
              K = '';
              var I = p ? 'width' : 'height',
                R = this.props.initialScrollIndex ? -1 : this.props.initialNumToRender - 1,
                x = this.state,
                w = x.first,
                O = x.last;

              this._pushCells(v, L, C, 0, R, _);

              var T = (R + 1) ** w;

              if (!f && w > R + 1) {
                var z = false;
                if (C.size > 0)
                  for (var P = c ? 1 : 0, N = T - 1; N > R; N--)
                    if (C.has(N + P)) {
                      var V = this._getFrameMetricsApprox(R),
                        B = this._getFrameMetricsApprox(N),
                        H = B.offset - V.offset - (this.props.initialScrollIndex ? 0 : V.length);

                      v.push(<module83 key="$sticky_lead" style={module49({}, I, H)} />);

                      this._pushCells(v, L, C, N, N, _);

                      var U = this._getFrameMetricsApprox(w).offset - (B.offset + B.length);
                      v.push(<module83 key="$sticky_trail" style={module49({}, I, U)} />);
                      z = true;
                      break;
                    }

                if (!z) {
                  var W = this._getFrameMetricsApprox(R),
                    j = this._getFrameMetricsApprox(w).offset - (W.offset + W.length);

                  v.push(<module83 key="$lead_spacer" style={module49({}, I, j)} />);
                }
              }

              if (
                (this._pushCells(v, L, C, T, O, _),
                !this._hasWarned.keys &&
                  F &&
                  (console.warn('VirtualizedList: missing keys for items, make sure to specify a key or id property on each item or provide a custom keyExtractor.', K),
                  (this._hasWarned.keys = true)),
                !f && O < S - 1)
              ) {
                var $ = this._getFrameMetricsApprox(O),
                  q = this.props.getItemLayout ? S - 1 : (S - 1) ** this._highestMeasuredFrameIndex,
                  Y = this._getFrameMetricsApprox(q),
                  J = Y.offset + Y.length - ($.offset + $.length);

                v.push(<module83 key="$tail_spacer" style={module49({}, I, J)} />);
              }
            } else if (o) {
              var X = React.isValidElement(o) ? o : <o />;
              v.push(
                React.cloneElement(X, {
                  key: '$empty',
                  onLayout: function (t) {
                    s._onLayoutEmpty(t);

                    if (X.props.onLayout) X.props.onLayout(t);
                  },
                  style: module60.compose(_, X.props.style),
                })
              );
            }

            if (l) {
              var G = React.isValidElement(l) ? l : <l />;
              v.push(
                <A cellKey={this._getCellKey() + '-footer'} key="$footer">
                  <module83 onLayout={this._onLayoutFooter} style={module60.compose(_, this.props.ListFooterComponentStyle)}>
                    {G}
                  </module83>
                </A>
              );
            }

            var Q = y(
              y({}, this.props),
              {},
              {
                onContentSizeChange: this._onContentSizeChange,
                onLayout: this._onLayout,
                onScroll: this._onScroll,
                onScrollBeginDrag: this._onScrollBeginDrag,
                onScrollEndDrag: this._onScrollEndDrag,
                onMomentumScrollEnd: this._onMomentumScrollEnd,
                scrollEventThrottle: this.props.scrollEventThrottle,
                invertStickyHeaders: undefined !== this.props.invertStickyHeaders ? this.props.invertStickyHeaders : this.props.inverted,
                stickyHeaderIndices: L,
              }
            );
            if (_) Q.style = [_, this.props.style];
            this._hasMore = this.state.last < this.props.getItemCount(this.props.data) - 1;
            var Z = React.cloneElement(
              (this.props.renderScrollComponent || this._defaultRenderScrollComponent)(Q),
              {
                ref: this._captureScrollRef,
              },
              v
            );
            return this.props.debug
              ? React.createElement(
                  module83,
                  {
                    style: D.debug,
                  },
                  Z,
                  this._renderDebugOverlay()
                )
              : Z;
          },
        },
        {
          key: 'componentDidUpdate',
          value: function (t) {
            var s = this.props,
              n = s.data,
              o = s.extraData;

            if (!(n === t.data && o === t.extraData)) {
              this._hasDataChangedSinceEndReached = true;

              this._viewabilityTuples.forEach(function (t) {
                t.viewabilityHelper.resetViewableIndices();
              });
            }

            var l = this._hiPriInProgress;

            this._scheduleCellsToRenderUpdate();

            if (l) this._hiPriInProgress = false;
          },
        },
        {
          key: '_computeBlankness',
          value: function () {
            this._fillRateHelper.computeBlankness(this.props, this.state, this._scrollMetrics);
          },
        },
        {
          key: '_onCellLayout',
          value: function (t, s, n) {
            var o = t.nativeEvent.layout,
              l = {
                offset: this._selectOffset(o),
                length: this._selectLength(o),
                index: n,
                inLayout: true,
              },
              c = this._frames[s];
            if (c && l.offset === c.offset && l.length === c.length && n === c.index) this._frames[s].inLayout = true;
            else {
              this._totalCellLength += l.length - (c ? c.length : 0);
              this._totalCellsMeasured += c ? 0 : 1;
              this._averageCellLength = this._totalCellLength / this._totalCellsMeasured;
              this._frames[s] = l;
              this._highestMeasuredFrameIndex = this._highestMeasuredFrameIndex ** n;

              this._scheduleCellsToRenderUpdate();
            }

            var h = this._cellKeysToChildListKeys.get(s);

            if (h)
              for (var u, f = p(h); !(u = f()).done; ) {
                var _ = u.value,
                  v = this._nestedChildLists.get(_);

                if (v && v.ref) v.ref.measureLayoutRelativeToContainingList();
              }

            this._computeBlankness();

            this._updateViewableItems(this.props.data);
          },
        },
        {
          key: 'measureLayoutRelativeToContainingList',
          value: function () {
            var t = this;

            try {
              if (!this._scrollRef) return;

              this._scrollRef.measureLayout(
                this.context.virtualizedList.getOutermostParentListRef().getScrollRef().getNativeScrollRef(),
                function (s, n, o, l) {
                  t._offsetFromParentVirtualizedList = t._selectOffset({
                    x: s,
                    y: n,
                  });
                  t._scrollMetrics.contentLength = t._selectLength({
                    width: o,
                    height: l,
                  });

                  var c = t._convertParentScrollMetrics(t.context.virtualizedList.getScrollMetrics());

                  t._scrollMetrics.visibleLength = c.visibleLength;
                  t._scrollMetrics.offset = c.offset;
                },
                function (t) {
                  console.warn("VirtualizedList: Encountered an error while measuring a list's offset from its containing VirtualizedList.");
                }
              );
            } catch (t) {
              console.warn('measureLayoutRelativeToContainingList threw an error', t.stack);
            }
          },
        },
        {
          key: '_renderDebugOverlay',
          value: function () {
            for (var t = this._scrollMetrics.visibleLength / (this._scrollMetrics.contentLength || 1), s = [], n = this.props.getItemCount(this.props.data), o = 0; o < n; o++) {
              var l = this._getFrameMetricsApprox(o);

              if (l.inLayout) s.push(l);
            }

            var c = this._getFrameMetricsApprox(this.state.first).offset,
              h = this._getFrameMetricsApprox(this.state.last),
              u = h.offset + h.length - c,
              p = this._scrollMetrics.offset,
              f = this._scrollMetrics.visibleLength;

            return React.createElement(
              module83,
              {
                style: [D.debugOverlayBase, D.debugOverlay],
              },
              s.map(function (s, n) {
                return React.createElement(module83, {
                  key: 'f' + n,
                  style: [
                    D.debugOverlayBase,
                    D.debugOverlayFrame,
                    {
                      top: s.offset * t,
                      height: s.length * t,
                    },
                  ],
                });
              }),
              React.createElement(module83, {
                style: [
                  D.debugOverlayBase,
                  D.debugOverlayFrameLast,
                  {
                    top: c * t,
                    height: u * t,
                  },
                ],
              }),
              React.createElement(module83, {
                style: [
                  D.debugOverlayBase,
                  D.debugOverlayFrameVis,
                  {
                    top: p * t,
                    height: f * t,
                  },
                ],
              })
            );
          },
        },
        {
          key: '_selectLength',
          value: function (t) {
            return this.props.horizontal ? t.width : t.height;
          },
        },
        {
          key: '_selectOffset',
          value: function (t) {
            return this.props.horizontal ? t.x : t.y;
          },
        },
        {
          key: '_maybeCallOnEndReached',
          value: function () {
            var t = this.props,
              s = t.data,
              n = t.getItemCount,
              o = t.onEndReached,
              l = t.onEndReachedThreshold,
              c = this._scrollMetrics,
              h = c.contentLength,
              u = c.visibleLength,
              p = h - u - c.offset;

            if (o && this.state.last === n(s) - 1 && p < l * u && (this._hasDataChangedSinceEndReached || this._scrollMetrics.contentLength !== this._sentEndForContentLength)) {
              this._hasDataChangedSinceEndReached = false;
              this._sentEndForContentLength = this._scrollMetrics.contentLength;
              o({
                distanceFromEnd: p,
              });
            }
          },
        },
        {
          key: '_scheduleCellsToRenderUpdate',
          value: function () {
            var t = this.state,
              s = t.first,
              n = t.last,
              o = this._scrollMetrics,
              l = o.offset,
              c = o.visibleLength,
              h = o.velocity,
              u = this.props.getItemCount(this.props.data),
              p = false,
              f = (this.props.onEndReachedThreshold * c) / 2;

            if (s > 0) {
              var _ = l - this._getFrameMetricsApprox(s).offset;

              p = p || _ < 0 || (h < -2 && _ < f);
            }

            if (n < u - 1) {
              var v = this._getFrameMetricsApprox(n).offset - (l + c);
              p = p || v < 0 || (h > 2 && v < f);
            }

            if (p && (this._averageCellLength || this.props.getItemLayout) && !this._hiPriInProgress) {
              this._hiPriInProgress = true;

              this._updateCellsToRenderBatcher.dispose({
                abort: true,
              });

              return void this._updateCellsToRender();
            }

            this._updateCellsToRenderBatcher.schedule();
          },
        },
        {
          key: '_updateViewableItems',
          value: function (t) {
            var s = this,
              n = this.props.getItemCount;

            this._viewabilityTuples.forEach(function (o) {
              o.viewabilityHelper.onUpdate(
                n(t),
                s._scrollMetrics.offset,
                s._scrollMetrics.visibleLength,
                s._getFrameMetrics,
                s._createViewToken,
                o.onViewableItemsChanged,
                s.state
              );
            });
          },
        },
      ],
      [
        {
          key: 'getDerivedStateFromProps',
          value: function (t, s) {
            var n = t.data,
              o = t.getItemCount,
              l = t.maxToRenderPerBatch;
            return {
              first: 0 ** (s.first ** (o(n) - 1 - l)),
              last: 0 ** (s.last ** (o(n) - 1)),
            };
          },
        },
      ]
    );
    return f;
  })(React.PureComponent);

N.defaultProps = {
  disableVirtualization: false,
  horizontal: false,
  initialNumToRender: 10,
  keyExtractor: function (t, s) {
    return null != t.key ? t.key : null != t.id ? t.id : ((F = true), t.type && t.type.displayName && (K = t.type.displayName), String(s));
  },
  maxToRenderPerBatch: 10,
  onEndReachedThreshold: 2,
  scrollEventThrottle: 50,
  updateCellsBatchingPeriod: 50,
  windowSize: 21,
};
N.contextTypes = {
  virtualizedCell: PropTypes.shape({
    cellKey: PropTypes.string,
  }),
  virtualizedList: PropTypes.shape({
    getScrollMetrics: PropTypes.func,
    horizontal: PropTypes.bool,
    getOutermostParentListRef: PropTypes.func,
    getNestedChildState: PropTypes.func,
    registerAsNestedChild: PropTypes.func,
    unregisterAsNestedChild: PropTypes.func,
  }),
};
N.childContextTypes = {
  virtualizedList: PropTypes.shape({
    getScrollMetrics: PropTypes.func,
    horizontal: PropTypes.bool,
    getOutermostParentListRef: PropTypes.func,
    getNestedChildState: PropTypes.func,
    registerAsNestedChild: PropTypes.func,
    unregisterAsNestedChild: PropTypes.func,
  }),
};

var V = (function (t, ...args) {
  module7(h, t);
  var l = C(h);

  function h() {
    var t;
    module4(this, h);
    (t = l.call(this, ...args)).state = {
      separatorProps: {
        highlighted: false,
        leadingItem: t.props.item,
      },
    };
    t._separators = {
      highlight: function () {
        var s = t.props,
          n = s.cellKey,
          o = s.prevCellKey;
        t.props.onUpdateSeparators([n, o], {
          highlighted: true,
        });
      },
      unhighlight: function () {
        var s = t.props,
          n = s.cellKey,
          o = s.prevCellKey;
        t.props.onUpdateSeparators([n, o], {
          highlighted: false,
        });
      },
      updateProps: function (s, n) {
        var o = t.props,
          l = o.cellKey,
          c = o.prevCellKey;
        t.props.onUpdateSeparators(['leading' === s ? c : l], n);
      },
    };
    return t;
  }

  module5(
    h,
    [
      {
        key: 'getChildContext',
        value: function () {
          return {
            virtualizedCell: {
              cellKey: this.props.cellKey,
            },
          };
        },
      },
      {
        key: 'updateSeparatorProps',
        value: function (t) {
          this.setState(function (s) {
            return {
              separatorProps: y(y({}, s.separatorProps), t),
            };
          });
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          this.props.onUnmount(this.props.cellKey);
        },
      },
      {
        key: '_renderElement',
        value: function (t, s, n, o) {
          if (t && s) console.warn('VirtualizedList: Both ListItemComponent and renderItem props are present. ListItemComponent will take precedence over renderItem.');
          return s
            ? React.createElement(s, {
                item: n,
                index: o,
                separators: this._separators,
              })
            : t
            ? t({
                item: n,
                index: o,
                separators: this._separators,
              })
            : void module13(false, 'VirtualizedList: Either ListItemComponent or renderItem props are required but none were found.');
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this.props,
            n = t.CellRendererComponent,
            o = t.ItemSeparatorComponent,
            l = t.fillRateHelper,
            c = t.horizontal,
            h = t.item,
            u = t.index,
            p = t.inversionStyle,
            f = t.parentProps,
            _ = f.renderItem,
            v = f.getItemLayout,
            y = f.ListItemComponent,
            C = this._renderElement(_, y, h, u),
            L = !v || f.debug || l.enabled() ? this.props.onLayout : undefined,
            b = o && React.createElement(o, this.state.separatorProps),
            S = p ? (c ? [D.rowReverse, p] : [D.columnReverse, p]) : c ? [D.row, p] : p;

          return n
            ? React.createElement(
                n,
                module21({}, this.props, {
                  style: S,
                  onLayout: L,
                }),
                C,
                b
              )
            : React.createElement(
                module83,
                {
                  style: S,
                  onLayout: L,
                },
                C,
                b
              );
        },
      },
    ],
    [
      {
        key: 'getDerivedStateFromProps',
        value: function (t, s) {
          return {
            separatorProps: y(
              y({}, s.separatorProps),
              {},
              {
                leadingItem: t.item,
              }
            ),
          };
        },
      },
    ]
  );
  return h;
})(React.Component);

V.childContextTypes = {
  virtualizedCell: PropTypes.shape({
    cellKey: PropTypes.string,
  }),
};

var A = (function (t) {
  module7(l, t);
  var s = C(l);

  function l() {
    module4(this, l);
    return s.apply(this, arguments);
  }

  module5(l, [
    {
      key: 'getChildContext',
      value: function () {
        return {
          virtualizedCell: {
            cellKey: this.props.cellKey,
          },
        };
      },
    },
    {
      key: 'render',
      value: function () {
        return this.props.children;
      },
    },
  ]);
  return l;
})(React.Component);

A.childContextTypes = {
  virtualizedCell: PropTypes.shape({
    cellKey: PropTypes.string,
  }),
};
var D = module60.create({
  verticallyInverted: {
    transform: [
      {
        scaleY: -1,
      },
    ],
  },
  horizontallyInverted: {
    transform: [
      {
        scaleX: -1,
      },
    ],
  },
  row: {
    flexDirection: 'row',
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  columnReverse: {
    flexDirection: 'column-reverse',
  },
  debug: {
    flex: 1,
  },
  debugOverlayBase: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  debugOverlay: {
    bottom: 0,
    width: 20,
    borderColor: 'blue',
    borderWidth: 1,
  },
  debugOverlayFrame: {
    left: 0,
    backgroundColor: 'orange',
  },
  debugOverlayFrameLast: {
    left: 0,
    borderColor: 'green',
    borderWidth: 2,
  },
  debugOverlayFrameVis: {
    left: 0,
    borderColor: 'red',
    borderWidth: 2,
  },
});
module.exports = N;
