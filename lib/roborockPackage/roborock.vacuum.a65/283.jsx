var module22 = require('./22'),
  module50 = require('./50'),
  module6 = require('./6'),
  module8 = require('./8'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12');

function f(t, n) {
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
  for (var o = 1; o < arguments.length; o++) {
    var s = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      f(Object(s), true).forEach(function (o) {
        module50(t, o, s[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      f(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

function S(t) {
  var n = v();
  return function () {
    var o,
      s = module12(t);

    if (n) {
      var c = module12(this).constructor;
      o = Reflect.construct(s, arguments, c);
    } else o = s.apply(this, arguments);

    return module11(this, o);
  };
}

function v() {
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

var React = require('react'),
  module84 = require('./84'),
  module255 = require('./255'),
  module14 = require('./14');

class b {
  constructor(t, n) {
    var c;
    module6(this, u);

    (c = p.call(this, t, n))._keyExtractor = function (t, n) {
      var o = c._subExtractor(n);

      return o ? o.key : String(n);
    };

    c._convertViewable = function (t) {
      module14(null != t.index, 'Received a broken ViewToken');

      var n = c._subExtractor(t.index);

      if (!n) return null;
      var o = n.section.keyExtractor || c.props.keyExtractor;
      return h(
        h({}, t),
        {},
        {
          index: n.index,
          key: o(t.item, n.index),
          section: n.section,
        }
      );
    };

    c._onViewableItemsChanged = function (t) {
      var n = t.viewableItems,
        o = t.changed;
      if (c.props.onViewableItemsChanged)
        c.props.onViewableItemsChanged({
          viewableItems: n.map(c._convertViewable, module8(c)).filter(Boolean),
          changed: o.map(c._convertViewable, module8(c)).filter(Boolean),
        });
    };

    c._renderItem = function (t) {
      var n = t.item,
        o = t.index,
        s = c._subExtractor(o);

      if (!s) return null;
      var l = s.index;

      if (null == l) {
        var p = s.section;

        if (true === s.header) {
          var u = c.props.renderSectionHeader;
          return u
            ? u({
                section: p,
              })
            : null;
        }

        var f = c.props.renderSectionFooter;
        return f
          ? f({
              section: p,
            })
          : null;
      }

      var h = s.section.renderItem || c.props.renderItem,
        S = c._getSeparatorComponent(o, s);

      module14(h, 'no renderItem!');
      return (
        <P
          SeparatorComponent={S}
          LeadingSeparatorComponent={0 === l ? c.props.SectionSeparatorComponent : undefined}
          cellKey={s.key}
          index={l}
          item={n}
          leadingItem={s.leadingItem}
          leadingSection={s.leadingSection}
          onUpdateSeparator={c._onUpdateSeparator}
          prevCellKey={(c._subExtractor(o - 1) || {}).key}
          ref={function (t) {
            c._cellRefs[s.key] = t;
          }}
          renderItem={h}
          section={s.section}
          trailingItem={s.trailingItem}
          trailingSection={s.trailingSection}
        />
      );
    };

    c._onUpdateSeparator = function (t, n) {
      var o = c._cellRefs[t];
      if (o) o.updateSeparatorProps(n);
    };

    c._cellRefs = {};

    c._captureRef = function (t) {
      c._listRef = t;
    };

    c.state = c._computeState(t);
    return c;
  }

  scrollToLocation(t) {
    for (var n = t.itemIndex, o = 0; o < t.sectionIndex; o++) n += this.props.getItemCount(this.props.sections[o].data) + 2;

    var s = t.viewOffset || 0;
    if (t.itemIndex > 0 && this.props.stickySectionHeadersEnabled) s += this._listRef._getFrameMetricsApprox(n - t.itemIndex).length;
    var c = h(
      h({}, t),
      {},
      {
        viewOffset: s,
        index: n,
      }
    );

    this._listRef.scrollToIndex(c);
  }

  getListRef() {
    return this._listRef;
  }
}

b.defaultProps = h(
  h({}, module255.defaultProps),
  {},
  {
    data: [],
  }
);

var P = (function (t, ...args) {
  module9(s, t);
  var n = S(s);

  function s() {
    var t;
    module6(this, s);
    (t = n.call(this, ...args)).state = {
      separatorProps: {
        highlighted: false,
        leadingItem: t.props.item,
        leadingSection: t.props.leadingSection,
        section: t.props.section,
        trailingItem: t.props.trailingItem,
        trailingSection: t.props.trailingSection,
      },
      leadingSeparatorProps: {
        highlighted: false,
        leadingItem: t.props.leadingItem,
        leadingSection: t.props.leadingSection,
        section: t.props.section,
        trailingItem: t.props.item,
        trailingSection: t.props.trailingSection,
      },
    };
    t._separators = {
      highlight: function () {
        ['leading', 'trailing'].forEach(function (n) {
          return t._separators.updateProps(n, {
            highlighted: true,
          });
        });
      },
      unhighlight: function () {
        ['leading', 'trailing'].forEach(function (n) {
          return t._separators.updateProps(n, {
            highlighted: false,
          });
        });
      },
      updateProps: function (n, o) {
        var s = t.props,
          c = s.LeadingSeparatorComponent,
          l = s.cellKey,
          p = s.prevCellKey;
        if ('leading' === n && null != c)
          t.setState(function (t) {
            return {
              leadingSeparatorProps: h(h({}, t.leadingSeparatorProps), o),
            };
          });
        else t.props.onUpdateSeparator(('leading' === n && p) || l, o);
      },
    };
    return t;
  }

  module7(
    s,
    [
      {
        key: 'updateSeparatorProps',
        value: function (t) {
          this.setState(function (n) {
            return {
              separatorProps: h(h({}, n.separatorProps), t),
            };
          });
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this.props,
            n = t.LeadingSeparatorComponent,
            o = t.SeparatorComponent,
            s = t.item,
            c = t.index,
            l = t.section,
            p = this.props.renderItem({
              item: s,
              index: c,
              section: l,
              separators: this._separators,
            }),
            u = n && <n />,
            f = o && <o />;
          return u || f ? (
            <module84>
              {u}
              {p}
              {f}
            </module84>
          ) : (
            p
          );
        },
      },
    ],
    [
      {
        key: 'getDerivedStateFromProps',
        value: function (t, n) {
          return {
            separatorProps: h(
              h({}, n.separatorProps),
              {},
              {
                leadingItem: t.item,
                leadingSection: t.leadingSection,
                section: t.section,
                trailingItem: t.trailingItem,
                trailingSection: t.trailingSection,
              }
            ),
            leadingSeparatorProps: h(
              h({}, n.leadingSeparatorProps),
              {},
              {
                leadingItem: t.leadingItem,
                leadingSection: t.leadingSection,
                section: t.section,
                trailingItem: t.item,
                trailingSection: t.trailingSection,
              }
            ),
          };
        },
      },
    ]
  );
  return s;
})(React.Component);

function k(t, n, o) {
  if (!n) return null;

  for (var s = o - 1, c = 0; c < n.length; c++) {
    var l = n[c],
      p = l.data,
      u = t.getItemCount(p);
    if (-1 === s || s === u) return l;
    if (s < u) return t.getItem(p, s);
    s -= u + 2;
  }

  return null;
}

module.exports = b;
