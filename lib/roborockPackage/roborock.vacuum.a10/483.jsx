var module49 = require('./49'),
  module21 = require('./21'),
  module55 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  s = ['renderScrollComponent'];

function l(t, o) {
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

function h(o) {
  for (var n = 1; n < arguments.length; n++) {
    var s = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      l(Object(s), true).forEach(function (n) {
        module49(o, n, s[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(o, Object.getOwnPropertyDescriptors(s));
    else
      l(Object(s)).forEach(function (t) {
        Object.defineProperty(o, t, Object.getOwnPropertyDescriptor(s, t));
      });
  }

  return o;
}

require('./484');

var module485 = require('./485'),
  React = require('react'),
  module12 = require('./12'),
  f = module12.NativeModules.ScrollViewManager,
  w = module12.ScrollView,
  module258 = require('./258').Mixin,
  module489 = require('./489'),
  S = module12.View,
  module490 = require('./490'),
  module213 = require('./213'),
  module486 = require('./486'),
  module13 = module213({
    displayName: 'ListView',
    _rafIds: [],
    _childFrames: [],
    _sentEndForContentLength: null,
    _scrollComponent: null,
    _prevRenderedRowsCount: 0,
    _visibleRows: {},
    scrollProperties: {},
    mixins: [module258],
    statics: {
      DataSource: module485,
    },
    getMetrics: function () {
      return {
        contentLength: this.scrollProperties.contentLength,
        totalRows: this.props.enableEmptySections ? this.props.dataSource.getRowAndSectionCount() : this.props.dataSource.getRowCount(),
        renderedRows: this.state.curRenderedRowsCount,
        visibleRows: Object.keys(this._visibleRows).length,
      };
    },
    getScrollResponder: function () {
      if (this._scrollComponent && this._scrollComponent.getScrollResponder) return this._scrollComponent.getScrollResponder();
    },
    getScrollableNode: function () {
      return this._scrollComponent && this._scrollComponent.getScrollableNode ? this._scrollComponent.getScrollableNode() : module12.findNodeHandle(this._scrollComponent);
    },
    scrollTo: function () {
      var t;
      if (this._scrollComponent && this._scrollComponent.scrollTo) (t = this._scrollComponent).scrollTo.apply(t, arguments);
    },
    scrollToEnd: function (t) {
      if (this._scrollComponent)
        this._scrollComponent.scrollToEnd
          ? this._scrollComponent.scrollToEnd(t)
          : console.warn('The scroll component used by the ListView does not support scrollToEnd. Check the renderScrollComponent prop of your ListView.');
    },
    flashScrollIndicators: function () {
      if (this._scrollComponent && this._scrollComponent.flashScrollIndicators) this._scrollComponent.flashScrollIndicators();
    },
    setNativeProps: function (t) {
      if (this._scrollComponent) this._scrollComponent.setNativeProps(t);
    },
    getDefaultProps: function () {
      return {
        initialListSize: 10,
        pageSize: 1,
        renderScrollComponent: function (t) {
          return <w />;
        },
        scrollRenderAheadDistance: 1e3,
        onEndReachedThreshold: 1e3,
        stickySectionHeadersEnabled: false,
        stickyHeaderIndices: [],
      };
    },
    getInitialState: function () {
      return {
        curRenderedRowsCount: this.props.initialListSize,
        highlightedRow: {},
      };
    },
    getInnerViewNode: function () {
      return this._scrollComponent && this._scrollComponent.getInnerViewNode();
    },
    UNSAFE_componentWillMount: function () {
      this.scrollProperties = {
        visibleLength: null,
        contentLength: null,
        offset: 0,
      };
      this._rafIds = [];
      this._childFrames = [];
      this._visibleRows = {};
      this._prevRenderedRowsCount = 0;
      this._sentEndForContentLength = null;
    },
    componentWillUnmount: function () {
      this._rafIds.forEach(cancelAnimationFrame);

      this._rafIds = [];
    },
    componentDidMount: function () {
      var t = this;

      this._requestAnimationFrame(function () {
        t._measureAndUpdateScrollProps();
      });
    },
    UNSAFE_componentWillReceiveProps: function (t) {
      var o = this;
      if (!(this.props.dataSource === t.dataSource && this.props.initialListSize === t.initialListSize))
        this.setState(
          function (t, n) {
            o._prevRenderedRowsCount = 0;
            return {
              curRenderedRowsCount: (t.curRenderedRowsCount ** n.initialListSize) ** (n.enableEmptySections ? n.dataSource.getRowAndSectionCount() : n.dataSource.getRowCount()),
            };
          },
          function () {
            return o._renderMoreRowsIfNeeded();
          }
        );
    },
    componentDidUpdate: function () {
      var t = this;

      this._requestAnimationFrame(function () {
        t._measureAndUpdateScrollProps();
      });
    },
    _onRowHighlighted: function (t, o) {
      this.setState({
        highlightedRow: {
          sectionID: t,
          rowID: o,
        },
      });
    },
    render: function () {
      for (
        var t = [],
          l = this.props.dataSource,
          h = l.rowIdentities,
          c = 0,
          u = [],
          f = this.props.renderSectionHeader,
          w = this.props.renderHeader && this.props.renderHeader(),
          R = this.props.renderFooter && this.props.renderFooter(),
          v = w ? 1 : 0,
          b = 0;
        b < h.length;
        b++
      ) {
        var module487 = l.sectionIdentities[b],
          E = h[b];

        if (0 === E.length) {
          if (undefined === this.props.enableEmptySections) {
            require('./487')(
              false,
              "In next release empty section headers will be rendered. In this release you can use 'enableEmptySections' flag to render empty section headers."
            );

            continue;
          }

          require('./13')(
            this.props.enableEmptySections,
            "In next release 'enableEmptySections' flag will be deprecated, empty section headers will always be rendered. If empty section headers are not desirable their indices should be excluded from sectionIDs object. In this release 'enableEmptySections' may only have value 'true' to allow empty section headers rendering."
          );
        }

        if (f) {
          var I = f(l.getSectionHeaderData(b), module487);

          if (I) {
            t.push(
              React.cloneElement(I, {
                key: 's_' + module487,
              })
            );
            if (this.props.stickySectionHeadersEnabled) u.push(v);
            v++;
          }
        }

        for (var P = 0; P < E.length; P++) {
          var L = E[P],
            D = module487 + '_' + L,
            F = c >= this._prevRenderedRowsCount && l.rowShouldUpdate(b, P),
            O = <module489 key={'r_' + D} shouldUpdate={!!F} render={this.props.renderRow.bind(null, l.getRowData(b, P), module487, L, this._onRowHighlighted)} />;

          if ((t.push(O), v++, this.props.renderSeparator && (P !== E.length - 1 || b === h.length - 1))) {
            var N = this.state.highlightedRow.sectionID === module487 && (this.state.highlightedRow.rowID === L || this.state.highlightedRow.rowID === E[P + 1]),
              A = this.props.renderSeparator(module487, L, N);

            if (A) {
              t.push(<S key={'s_' + D}>{A}</S>);
              v++;
            }
          }

          if (++c === this.state.curRenderedRowsCount) break;
        }

        if (c >= this.state.curRenderedRowsCount) break;
      }

      var H = this.props,
        z = H.renderScrollComponent,
        V = module55(H, s);
      if (!V.scrollEventThrottle) V.scrollEventThrottle = 50;
      if (undefined === V.removeClippedSubviews) V.removeClippedSubviews = true;
      module21(V, {
        onScroll: this._onScroll,
        stickyHeaderIndices: this.props.stickyHeaderIndices.concat(u),
        onKeyboardWillShow: undefined,
        onKeyboardWillHide: undefined,
        onKeyboardDidShow: undefined,
        onKeyboardDidHide: undefined,
      });
      return module490(
        z(V),
        {
          ref: this._setScrollComponentRef,
          onContentSizeChange: this._onContentSizeChange,
          onLayout: this._onLayout,
          DEPRECATED_sendUpdatedChildFrames: undefined !== typeof V.onChangeVisibleRows,
        },
        w,
        t,
        R
      );
    },
    _requestAnimationFrame: function (t) {
      var o = this,
        n = requestAnimationFrame(function () {
          o._rafIds = o._rafIds.filter(function (t) {
            return t !== n;
          });
          t();
        });

      this._rafIds.push(n);
    },
    _measureAndUpdateScrollProps: function () {
      var t = this.getScrollResponder();
      if (t && t.getInnerViewNode && f && f.calculateChildFrames) f.calculateChildFrames(module12.findNodeHandle(t), this._updateVisibleRows);
    },
    _setScrollComponentRef: function (t) {
      this._scrollComponent = t;
    },
    _onContentSizeChange: function (t, o) {
      var n = this.props.horizontal ? t : o;

      if (n !== this.scrollProperties.contentLength) {
        this.scrollProperties.contentLength = n;

        this._updateVisibleRows();

        this._renderMoreRowsIfNeeded();
      }

      if (this.props.onContentSizeChange) this.props.onContentSizeChange(t, o);
    },
    _onLayout: function (t) {
      var o = t.nativeEvent.layout,
        n = o.width,
        s = o.height,
        l = this.props.horizontal ? n : s;

      if (l !== this.scrollProperties.visibleLength) {
        this.scrollProperties.visibleLength = l;

        this._updateVisibleRows();

        this._renderMoreRowsIfNeeded();
      }

      if (this.props.onLayout) this.props.onLayout(t);
    },
    _maybeCallOnEndReached: function (t) {
      return (
        !!(
          this.props.onEndReached &&
          this.scrollProperties.contentLength !== this._sentEndForContentLength &&
          this._getDistanceFromEnd(this.scrollProperties) < this.props.onEndReachedThreshold &&
          this.state.curRenderedRowsCount === (this.props.enableEmptySections ? this.props.dataSource.getRowAndSectionCount() : this.props.dataSource.getRowCount())
        ) && ((this._sentEndForContentLength = this.scrollProperties.contentLength), this.props.onEndReached(t), true)
      );
    },
    _renderMoreRowsIfNeeded: function () {
      if (
        null !== this.scrollProperties.contentLength &&
        null !== this.scrollProperties.visibleLength &&
        this.state.curRenderedRowsCount !== (this.props.enableEmptySections ? this.props.dataSource.getRowAndSectionCount() : this.props.dataSource.getRowCount())
      ) {
        if (this._getDistanceFromEnd(this.scrollProperties) < this.props.scrollRenderAheadDistance) this._pageInNewRows();
      } else this._maybeCallOnEndReached();
    },
    _pageInNewRows: function () {
      var t = this;
      this.setState(
        function (o, n) {
          var s = (o.curRenderedRowsCount + n.pageSize) ** (n.enableEmptySections ? n.dataSource.getRowAndSectionCount() : n.dataSource.getRowCount());
          t._prevRenderedRowsCount = o.curRenderedRowsCount;
          return {
            curRenderedRowsCount: s,
          };
        },
        function () {
          t._measureAndUpdateScrollProps();

          t._prevRenderedRowsCount = t.state.curRenderedRowsCount;
        }
      );
    },
    _getDistanceFromEnd: function (t) {
      return t.contentLength - t.visibleLength - t.offset;
    },
    _updateVisibleRows: function (t) {
      var o = this;

      if (this.props.onChangeVisibleRows) {
        if (t)
          t.forEach(function (t) {
            o._childFrames[t.index] = h({}, t);
          });

        for (
          var n = !this.props.horizontal,
            s = this.props.dataSource,
            l = this.scrollProperties.offset,
            c = l + this.scrollProperties.visibleLength,
            p = s.rowIdentities,
            u = this.props.renderHeader && this.props.renderHeader() ? 1 : 0,
            f = false,
            w = {},
            R = 0;
          R < p.length;
          R++
        ) {
          var _ = p[R];

          if (0 !== _.length) {
            var S = s.sectionIdentities[R];
            if (this.props.renderSectionHeader) u++;
            var C = this._visibleRows[S];
            if (!C) C = {};

            for (var v = 0; v < _.length; v++) {
              var y = _[v],
                E = this._childFrames[u];
              if ((u++, !this.props.renderSeparator || (v === _.length - 1 && R !== p.length - 1) || u++, !E)) break;
              var I = C[y],
                P = n ? E.y : E.x,
                L = P + (n ? E.height : E.width);
              if ((!P && !L) || P === L) break;
              if (P > c || L < l) {
                if (I) {
                  f = true;
                  delete C[y];
                  if (!w[S]) w[S] = {};
                  w[S][y] = false;
                }
              } else if (!I) {
                f = true;
                C[y] = true;
                if (!w[S]) w[S] = {};
                w[S][y] = true;
              }
            }

            if (module486(C)) {
              if (this._visibleRows[S]) delete this._visibleRows[S];
            } else this._visibleRows[S] = C;
          }
        }

        if (f) this.props.onChangeVisibleRows(this._visibleRows, w);
      }
    },
    _onScroll: function (t) {
      var o = !this.props.horizontal;
      this.scrollProperties.visibleLength = t.nativeEvent.layoutMeasurement[o ? 'height' : 'width'];
      this.scrollProperties.contentLength = t.nativeEvent.contentSize[o ? 'height' : 'width'];
      this.scrollProperties.offset = t.nativeEvent.contentOffset[o ? 'y' : 'x'];

      this._updateVisibleRows(t.nativeEvent.updatedChildFrames);

      if (!this._maybeCallOnEndReached(t)) this._renderMoreRowsIfNeeded();
      if (this.props.onEndReached && this._getDistanceFromEnd(this.scrollProperties) > this.props.onEndReachedThreshold) this._sentEndForContentLength = null;
      if (this.props.onScroll) this.props.onScroll(t);
    },
  });

module.exports = module13;
