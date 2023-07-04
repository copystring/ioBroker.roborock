var module21 = require('./21'),
  module49 = require('./49'),
  module4 = require('./4'),
  module5 = require('./5'),
  module6 = require('./6'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11');

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
        module49(t, o, s[o]);
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
      s = module11(t);

    if (n) {
      var c = module11(this).constructor;
      o = Reflect.construct(s, arguments, c);
    } else o = s.apply(this, arguments);

    return module9(this, o);
  };
}

function v() {
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

var React = require('react'),
  module83 = require('./83'),
  module251 = require('./251'),
  module13 = require('./13'),
  b = (function (n) {
    module7(u, n);
    var p = S(u);

    function u(t, n) {
      var s;
      module4(this, u);

      (s = p.call(this, t, n))._keyExtractor = function (t, n) {
        var o = s._subExtractor(n);

        return o ? o.key : String(n);
      };

      s._convertViewable = function (t) {
        module13(null != t.index, 'Received a broken ViewToken');

        var n = s._subExtractor(t.index);

        if (!n) return null;
        var o = n.section.keyExtractor || s.props.keyExtractor;
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

      s._onViewableItemsChanged = function (t) {
        var n = t.viewableItems,
          o = t.changed;
        if (s.props.onViewableItemsChanged)
          s.props.onViewableItemsChanged({
            viewableItems: n.map(s._convertViewable, module6(s)).filter(Boolean),
            changed: o.map(s._convertViewable, module6(s)).filter(Boolean),
          });
      };

      s._renderItem = function (t) {
        var n = t.item,
          o = t.index,
          c = s._subExtractor(o);

        if (!c) return null;
        var l = c.index;

        if (null == l) {
          var p = c.section;

          if (true === c.header) {
            var u = s.props.renderSectionHeader;
            return u
              ? u({
                  section: p,
                })
              : null;
          }

          var f = s.props.renderSectionFooter;
          return f
            ? f({
                section: p,
              })
            : null;
        }

        var h = c.section.renderItem || s.props.renderItem,
          S = s._getSeparatorComponent(o, c);

        module13(h, 'no renderItem!');
        return (
          <P
            SeparatorComponent={S}
            LeadingSeparatorComponent={0 === l ? s.props.SectionSeparatorComponent : undefined}
            cellKey={c.key}
            index={l}
            item={n}
            leadingItem={c.leadingItem}
            leadingSection={c.leadingSection}
            onUpdateSeparator={s._onUpdateSeparator}
            prevCellKey={(s._subExtractor(o - 1) || {}).key}
            ref={function (t) {
              s._cellRefs[c.key] = t;
            }}
            renderItem={h}
            section={c.section}
            trailingItem={c.trailingItem}
            trailingSection={c.trailingSection}
          />
        );
      };

      s._onUpdateSeparator = function (t, n) {
        var o = s._cellRefs[t];
        if (o) o.updateSeparatorProps(n);
      };

      s._cellRefs = {};

      s._captureRef = function (t) {
        s._listRef = t;
      };

      s.state = s._computeState(t);
      return s;
    }

    module5(u, [
      {
        key: 'scrollToLocation',
        value: function (t) {
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
        },
      },
      {
        key: 'getListRef',
        value: function () {
          return this._listRef;
        },
      },
      {
        key: 'UNSAFE_componentWillReceiveProps',
        value: function (t) {
          this.setState(this._computeState(t));
        },
      },
      {
        key: '_computeState',
        value: function (t) {
          var n = t.ListHeaderComponent ? 1 : 0,
            o = [],
            s = t.sections
              ? t.sections.reduce(function (s, c) {
                  o.push(s + n);
                  return s + t.getItemCount(c.data) + 2;
                }, 0)
              : 0;
          return {
            childProps: h(
              h({}, t),
              {},
              {
                renderItem: this._renderItem,
                ItemSeparatorComponent: undefined,
                data: t.sections,
                getItemCount: function () {
                  return s;
                },
                getItem: function (n, o) {
                  return k(t, n, o);
                },
                keyExtractor: this._keyExtractor,
                onViewableItemsChanged: t.onViewableItemsChanged ? this._onViewableItemsChanged : undefined,
                stickyHeaderIndices: t.stickySectionHeadersEnabled ? o : undefined,
              }
            ),
          };
        },
      },
      {
        key: 'render',
        value: function () {
          return <module251 />;
        },
      },
      {
        key: '_subExtractor',
        value: function (t) {
          for (var n = t, o = this.props, s = o.getItem, c = o.getItemCount, l = o.keyExtractor, p = o.sections, u = 0; u < p.length; u++) {
            var f = p[u],
              h = f.data,
              S = f.key || String(u);
            if ((n -= 1) >= c(h) + 1) n -= c(h) + 1;
            else
              return -1 === n
                ? {
                    section: f,
                    key: S + ':header',
                    index: null,
                    header: true,
                    trailingSection: p[u + 1],
                  }
                : n === c(h)
                ? {
                    section: f,
                    key: S + ':footer',
                    index: null,
                    header: false,
                    trailingSection: p[u + 1],
                  }
                : {
                    section: f,
                    key: S + ':' + (f.keyExtractor || l)(s(h, n), n),
                    index: n,
                    leadingItem: s(h, n - 1),
                    leadingSection: p[u - 1],
                    trailingItem: s(h, n + 1),
                    trailingSection: p[u + 1],
                  };
          }
        },
      },
      {
        key: '_getSeparatorComponent',
        value: function (t, n) {
          if (!(n = n || this._subExtractor(t))) return null;
          var o = n.section.ItemSeparatorComponent || this.props.ItemSeparatorComponent,
            s = this.props.SectionSeparatorComponent,
            c = t === this.state.childProps.getItemCount() - 1,
            l = n.index === this.props.getItemCount(n.section.data) - 1;
          return s && l ? s : !o || l || c ? null : o;
        },
      },
    ]);
    return u;
  })(React.PureComponent);

b.defaultProps = h(
  h({}, module251.defaultProps),
  {},
  {
    data: [],
  }
);

var P = (function (t, ...args) {
  module7(c, t);
  var n = S(c);

  function c() {
    var t;
    module4(this, c);
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

  module5(
    c,
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
            <module83>
              {u}
              {p}
              {f}
            </module83>
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
  return c;
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
