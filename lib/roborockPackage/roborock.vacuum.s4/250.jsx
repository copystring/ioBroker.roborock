var module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module49 = require('./49');

function f() {
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

function p(t, n) {
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

function h(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      p(Object(o), true).forEach(function (n) {
        module49(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      p(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

require('./51');

var module162 = require('./162'),
  React = require('react'),
  module83 = require('./83'),
  module251 = require('./251'),
  module60 = require('./60'),
  module13 = require('./13'),
  I = h(
    h({}, module251.defaultProps),
    {},
    {
      numColumns: 1,
      removeClippedSubviews: true,
    }
  ),
  k = (function (p) {
    module7(O, p);

    var I = O,
      k = f(),
      R = function () {
        var t,
          n = module11(I);

        if (k) {
          var o = module11(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9(this, t);
      };

    function O(t) {
      var o;
      module4(this, O);
      (o = R.call(this, t))._virtualizedListPairs = [];

      o._captureRef = function (t) {
        o._listRef = t;
      };

      o._getItem = function (t, n) {
        var s = o.props.numColumns;

        if (s > 1) {
          for (var l = [], u = 0; u < s; u++) {
            var c = t[n * s + u];
            if (null != c) l.push(c);
          }

          return l;
        }

        return t[n];
      };

      o._getItemCount = function (t) {
        return t ? Math.ceil(t.length / o.props.numColumns) : 0;
      };

      o._keyExtractor = function (t, n) {
        var s = o.props,
          l = s.keyExtractor,
          u = s.numColumns;

        if (u > 1) {
          module13(
            Array.isArray(t),
            'FlatList: Encountered internal consistency error, expected each item to consist of an array with 1-%s columns; instead, received a single item.',
            u
          );
          return t
            .map(function (t, o) {
              return l(t, n * u + o);
            })
            .join(':');
        } else return l(t, n);
      };

      o._renderer = function () {
        var t = o.props,
          n = t.ListItemComponent,
          s = t.renderItem,
          l = t.numColumns,
          u = t.columnWrapperStyle,
          f = function (t) {
            return n ? <n /> : s ? s(t) : null;
          };

        return module49({}, n ? 'ListItemComponent' : 'renderItem', function (t) {
          if (l > 1) {
            var n = t.item,
              o = t.index;
            module13(Array.isArray(n), 'Expected array of items with numColumns > 1');
            return (
              <module83 style={module60.compose(P.row, u)}>
                {n.map(function (n, s) {
                  var u = f({
                    item: n,
                    index: o * l + s,
                    separators: t.separators,
                  });
                  return null != u ? <React.Fragment key={s}>{u}</React.Fragment> : null;
                })}
              </module83>
            );
          }

          return f(t);
        });
      };

      o._checkProps(o.props);

      if (o.props.viewabilityConfigCallbackPairs)
        o._virtualizedListPairs = o.props.viewabilityConfigCallbackPairs.map(function (t) {
          return {
            viewabilityConfig: t.viewabilityConfig,
            onViewableItemsChanged: o._createOnViewableItemsChanged(t.onViewableItemsChanged),
          };
        });
      else if (o.props.onViewableItemsChanged)
        o._virtualizedListPairs.push({
          viewabilityConfig: o.props.viewabilityConfig,
          onViewableItemsChanged: o._createOnViewableItemsChanged(o.props.onViewableItemsChanged),
        });
      return o;
    }

    module5(O, [
      {
        key: 'scrollToEnd',
        value: function (t) {
          if (this._listRef) this._listRef.scrollToEnd(t);
        },
      },
      {
        key: 'scrollToIndex',
        value: function (t) {
          if (this._listRef) this._listRef.scrollToIndex(t);
        },
      },
      {
        key: 'scrollToItem',
        value: function (t) {
          if (this._listRef) this._listRef.scrollToItem(t);
        },
      },
      {
        key: 'scrollToOffset',
        value: function (t) {
          if (this._listRef) this._listRef.scrollToOffset(t);
        },
      },
      {
        key: 'recordInteraction',
        value: function () {
          if (this._listRef) this._listRef.recordInteraction();
        },
      },
      {
        key: 'flashScrollIndicators',
        value: function () {
          if (this._listRef) this._listRef.flashScrollIndicators();
        },
      },
      {
        key: 'getScrollResponder',
        value: function () {
          if (this._listRef) return this._listRef.getScrollResponder();
        },
      },
      {
        key: 'getScrollableNode',
        value: function () {
          if (this._listRef) return this._listRef.getScrollableNode();
        },
      },
      {
        key: 'setNativeProps',
        value: function (t) {
          if (this._listRef) this._listRef.setNativeProps(t);
        },
      },
      {
        key: 'componentDidUpdate',
        value: function (t) {
          module13(
            t.numColumns === this.props.numColumns,
            'Changing numColumns on the fly is not supported. Change the key prop on FlatList when changing the number of columns to force a fresh render of the component.'
          );
          module13(t.onViewableItemsChanged === this.props.onViewableItemsChanged, 'Changing onViewableItemsChanged on the fly is not supported');
          module13(!module162(t.viewabilityConfig, this.props.viewabilityConfig), 'Changing viewabilityConfig on the fly is not supported');
          module13(t.viewabilityConfigCallbackPairs === this.props.viewabilityConfigCallbackPairs, 'Changing viewabilityConfigCallbackPairs on the fly is not supported');

          this._checkProps(this.props);
        },
      },
      {
        key: '_checkProps',
        value: function (t) {
          var n = t.getItem,
            o = t.getItemCount,
            s = t.horizontal,
            l = t.numColumns,
            u = t.columnWrapperStyle,
            c = t.onViewableItemsChanged,
            f = t.viewabilityConfigCallbackPairs;
          module13(!n && !o, 'FlatList does not support custom data formats.');
          if (l > 1) module13(!s, 'numColumns does not support horizontal.');
          else module13(!u, 'columnWrapperStyle not supported for single column lists');
          module13(!(c && f), 'FlatList does not support setting both onViewableItemsChanged and viewabilityConfigCallbackPairs.');
        },
      },
      {
        key: '_pushMultiColumnViewable',
        value: function (t, n) {
          var o = this.props,
            s = o.numColumns,
            l = o.keyExtractor;
          n.item.forEach(function (o, u) {
            module13(null != n.index, 'Missing index!');
            var c = n.index * s + u;
            t.push(
              h(
                h({}, n),
                {},
                {
                  item: o,
                  key: l(o, c),
                  index: c,
                }
              )
            );
          });
        },
      },
      {
        key: '_createOnViewableItemsChanged',
        value: function (t) {
          var n = this;
          return function (o) {
            var s = n.props.numColumns;
            if (t)
              if (s > 1) {
                var l = [],
                  u = [];
                o.viewableItems.forEach(function (t) {
                  return n._pushMultiColumnViewable(u, t);
                });
                o.changed.forEach(function (t) {
                  return n._pushMultiColumnViewable(l, t);
                });
                t({
                  viewableItems: u,
                  changed: l,
                });
              } else t(o);
          };
        },
      },
      {
        key: 'render',
        value: function () {
          return <module251 />;
        },
      },
    ]);
    return O;
  })(React.PureComponent);

k.defaultProps = I;
var P = module60.create({
  row: {
    flexDirection: 'row',
  },
});
module.exports = k;
