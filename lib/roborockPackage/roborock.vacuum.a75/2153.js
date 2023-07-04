exports.default = function (t) {
  var n = this,
    C = t.data,
    v = undefined === C ? new module1968.CommandListSectionData('', []) : C,
    x = t.titleStyle,
    y =
      undefined === x
        ? {
            fontSize: 18,
            flexDirection: globals.isRTL ? 'row' : 'row-reverse',
          }
        : x,
    A = t.isSorting,
    w = undefined !== A && A,
    E = t.onPressCustomCommandAddAtIndex,
    P = t.onPressCustomCommandMoreAtIndex,
    p = t.onPressRecommendCommandAddAtIndex,
    R = t.onSortCompleted,
    S = t.onStartDragging,
    h = t.onEndDragging,
    T = React.useContext(module1199.AppConfigContext).theme,
    M = function (t) {
      var n = t.data;
      t.active;
      return React.default.createElement(module2154.default, {
        isSorting: w,
        key: n.name,
        data: n,
        onPressCustomCommandAdd: function () {
          return null == E ? undefined : E(n.index);
        },
        onPressCustomCommandMore: function () {
          return null == P ? undefined : P(n.index);
        },
        onPressRecommendCommandAdd: function () {
          return null == p ? undefined : p(n.index);
        },
      });
    },
    D = function (t) {
      n.order = (function (t, n) {
        for (var o = [], l = 0; l < n.length; l++) o.push(t[n[l]]);

        return o;
      })(v.cards, t);
    },
    F = React.useMemo(
      function () {
        return React.default.createElement(
          React.default.Fragment,
          null,
          React.default.createElement(
            module13.View,
            {
              style: {
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            },
            React.default.createElement(
              module13.Text,
              {
                style: [
                  {
                    color: T.mainTextColor,
                    paddingBottom: 10,
                  },
                  y,
                ],
              },
              v.name
            ),
            React.default.createElement(
              module13.TouchableWithoutFeedback,
              {
                onPress: function () {
                  return null == R ? undefined : R(n.order);
                },
              },
              React.default.createElement(
                module13.Text,
                {
                  style: {
                    color: '#007AFF',
                    fontSize: 14,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                  },
                },
                '\u5b8c\u6210'
              )
            )
          ),
          React.default.createElement(module2158.default, {
            style: {
              flex: 1,
            },
            contentContainerStyle: {},
            data: v.cards.slice(0, -1),
            renderRow: M,
            onChangeOrder: D,
            manuallyActivateRows: false,
            onActivateRow: function (t) {
              return null == S ? undefined : S();
            },
            onReleaseRow: function (t, n) {
              return null == h ? undefined : h();
            },
            onPressRow: function () {},
          })
        );
      },
      [v, w]
    ),
    b = React.useMemo(
      function () {
        return React.default.createElement(
          React.default.Fragment,
          null,
          React.default.createElement(
            module13.Text,
            {
              style: [
                {
                  color: T.mainTextColor,
                  paddingBottom: 10,
                },
                y,
              ],
            },
            v.name
          ),
          v.cards.map(function (t, n) {
            return React.default.createElement(module2154.default, {
              key: n,
              data: t,
              onPressCustomCommandAdd: function () {
                return null == E ? undefined : E(n);
              },
              onPressCustomCommandMore: function (t) {
                var o = t.x,
                  l = t.y;
                return null == P
                  ? undefined
                  : P(n, {
                      x: o,
                      y: l,
                    });
              },
              onPressRecommendCommandAdd: function () {
                return null == p ? undefined : p(n);
              },
            });
          })
        );
      },
      [v, w]
    );

  return React.default.createElement(
    module13.View,
    {
      style: {
        paddingHorizontal: 20,
      },
    },
    w && F,
    !w && b
  );
};

var React = require('react'),
  module13 = require('./13'),
  module2154 = require('./2154'),
  module1968 = require('./1968'),
  module1199 = require('./1199'),
  module2158 = require('./2158');
