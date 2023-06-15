var module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  module50 = require('./50');

function f() {
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
        module50(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      p(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

require('./52');

var module164 = require('./164'),
  React = require('react'),
  module84 = require('./84'),
  module255 = require('./255'),
  module61 = require('./61'),
  module14 = require('./14'),
  I = h(
    h({}, module255.defaultProps),
    {},
    {
      numColumns: 1,
      removeClippedSubviews: true,
    }
  );

class k {
  constructor(t) {
    var o;
    module6(this, O);
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
        module14(
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

      return module50({}, n ? 'ListItemComponent' : 'renderItem', function (t) {
        if (l > 1) {
          var n = t.item,
            o = t.index;
          module14(Array.isArray(n), 'Expected array of items with numColumns > 1');
          return (
            <module84 style={module61.compose(P.row, u)}>
              {n.map(function (n, s) {
                var u = f({
                  item: n,
                  index: o * l + s,
                  separators: t.separators,
                });
                return null != u ? <React.Fragment key={s}>{u}</React.Fragment> : null;
              })}
            </module84>
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

  scrollToEnd(t) {
    if (this._listRef) this._listRef.scrollToEnd(t);
  }

  scrollToIndex(t) {
    if (this._listRef) this._listRef.scrollToIndex(t);
  }

  scrollToItem(t) {
    if (this._listRef) this._listRef.scrollToItem(t);
  }

  scrollToOffset(t) {
    if (this._listRef) this._listRef.scrollToOffset(t);
  }

  recordInteraction() {
    if (this._listRef) this._listRef.recordInteraction();
  }

  flashScrollIndicators() {
    if (this._listRef) this._listRef.flashScrollIndicators();
  }

  getScrollResponder() {
    if (this._listRef) return this._listRef.getScrollResponder();
  }

  getScrollableNode() {
    if (this._listRef) return this._listRef.getScrollableNode();
  }

  setNativeProps(t) {
    if (this._listRef) this._listRef.setNativeProps(t);
  }
}

k.defaultProps = I;
var P = module61.create({
  row: {
    flexDirection: 'row',
  },
});
module.exports = k;
