var module50 = require('./50'),
  module22 = require('./22'),
  module56 = require('@babel/runtime/helpers/defineEnumerableProperties');

function s(t, o) {
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

function l(o) {
  for (var n = 1; n < arguments.length; n++) {
    var l = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      s(Object(l), true).forEach(function (n) {
        module50(o, n, l[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(o, Object.getOwnPropertyDescriptors(l));
    else
      s(Object(l)).forEach(function (t) {
        Object.defineProperty(o, t, Object.getOwnPropertyDescriptor(l, t));
      });
  }

  return o;
}

require('./492');

var module493 = require('./493'),
  React = require('react'),
  module12 = require('./12'),
  u = module12.NativeModules.ScrollViewManager,
  f = module12.ScrollView,
  module262 = require('./262').Mixin,
  module498 = require('./498'),
  _ = module12.View,
  module499 = require('./499'),
  module215 = require('./215'),
  module495 = require('./495'),
  module494 = module215({
    displayName: 'ListView',
    _rafIds: [],
    _childFrames: [],
    _sentEndForContentLength: null,
    _scrollComponent: null,
    _prevRenderedRowsCount: 0,
    _visibleRows: {},
    scrollProperties: {},
    mixins: [module262],
    statics: {
      DataSource: module493,
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
          return <f />;
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
          s = this.props.dataSource,
          l = s.rowIdentities,
          h = 0,
          p = [],
          u = this.props.renderSectionHeader,
          f = this.props.renderHeader && this.props.renderHeader(),
          w = this.props.renderFooter && this.props.renderFooter(),
          C = f ? 1 : 0,
          v = 0;
        v < l.length;
        v++
      ) {
        var module496 = s.sectionIdentities[v],
          y = l[v];

        if (0 === y.length) {
          if (undefined === this.props.enableEmptySections) {
            require('./496')(
              false,
              "In next release empty section headers will be rendered. In this release you can use 'enableEmptySections' flag to render empty section headers."
            );

            continue;
          }

          require('./494')(
            this.props.enableEmptySections,
            "In next release 'enableEmptySections' flag will be deprecated, empty section headers will always be rendered. If empty section headers are not desirable their indices should be excluded from sectionIDs object. In this release 'enableEmptySections' may only have value 'true' to allow empty section headers rendering."
          );
        }

        if (u) {
          var E = u(s.getSectionHeaderData(v), module496);

          if (E) {
            t.push(
              React.cloneElement(E, {
                key: 's_' + module496,
              })
            );
            if (this.props.stickySectionHeadersEnabled) p.push(C);
            C++;
          }
        }

        for (var I = 0; I < y.length; I++) {
          var P = y[I],
            L = module496 + '_' + P,
            D = h >= this._prevRenderedRowsCount && s.rowShouldUpdate(v, I),
            F = <module498 key={'r_' + L} shouldUpdate={!!D} render={this.props.renderRow.bind(null, s.getRowData(v, I), module496, P, this._onRowHighlighted)} />;

          if ((t.push(F), C++, this.props.renderSeparator && (I !== y.length - 1 || v === l.length - 1))) {
            var O = this.state.highlightedRow.sectionID === module496 && (this.state.highlightedRow.rowID === P || this.state.highlightedRow.rowID === y[I + 1]),
              N = this.props.renderSeparator(module496, P, O);

            if (N) {
              t.push(<_ key={'s_' + L}>{N}</_>);
              C++;
            }
          }

          if (++h === this.state.curRenderedRowsCount) break;
        }

        if (h >= this.state.curRenderedRowsCount) break;
      }

      var A = this.props,
        H = A.renderScrollComponent,
        z = module56(A, ['renderScrollComponent']);
      if (!z.scrollEventThrottle) z.scrollEventThrottle = 50;
      if (undefined === z.removeClippedSubviews) z.removeClippedSubviews = true;
      module22(z, {
        onScroll: this._onScroll,
        stickyHeaderIndices: this.props.stickyHeaderIndices.concat(p),
        onKeyboardWillShow: undefined,
        onKeyboardWillHide: undefined,
        onKeyboardDidShow: undefined,
        onKeyboardDidHide: undefined,
      });
      return module499(
        H(z),
        {
          ref: this._setScrollComponentRef,
          onContentSizeChange: this._onContentSizeChange,
          onLayout: this._onLayout,
          DEPRECATED_sendUpdatedChildFrames: undefined !== typeof z.onChangeVisibleRows,
        },
        f,
        t,
        w
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
      if (t && t.getInnerViewNode && u && u.calculateChildFrames) u.calculateChildFrames(module12.findNodeHandle(t), this._updateVisibleRows);
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
            o._childFrames[t.index] = l({}, t);
          });

        for (
          var n = !this.props.horizontal,
            s = this.props.dataSource,
            h = this.scrollProperties.offset,
            c = h + this.scrollProperties.visibleLength,
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

            for (var b = 0; b < _.length; b++) {
              var y = _[b],
                E = this._childFrames[u];
              if ((u++, !this.props.renderSeparator || (b === _.length - 1 && R !== p.length - 1) || u++, !E)) break;
              var I = C[y],
                P = n ? E.y : E.x,
                L = P + (n ? E.height : E.width);
              if ((!P && !L) || P === L) break;
              if (P > c || L < h) {
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

            if (module495(C)) {
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

module.exports = module494;
