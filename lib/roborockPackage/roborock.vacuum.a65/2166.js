var module23 = require('@babel/runtime/helpers/slicedToArray'),
  React = require('react'),
  module13 = require('./13'),
  module1200 = require('./1200'),
  f = React.default.forwardRef(function (t, n) {
    var f = t.didSelectRow,
      h = t.actions,
      x = React.useState({
        x: 0,
        y: 0,
      }),
      C = module23.default(x, 2),
      p = C[0],
      b = C[1],
      v = React.useState(false),
      w = module23.default(v, 2),
      y = w[0],
      E = w[1],
      S = React.useState(h),
      k = module23.default(S, 2),
      T = k[0],
      V = k[1],
      W = React.useContext(module1200.AppConfigContext).theme,
      I = function (t, n) {
        var l, o;
        E(true);
        V(n);
        b({
          x: null != (l = t.x) ? l : 0,
          y: null != (o = t.y) ? o : 0,
        });
      };

    React.useImperativeHandle(n, function () {
      return {
        show: function (t, n) {
          return I(t, n);
        },
        hide: function () {
          return L();
        },
      };
    });

    var L = function () {
      E(false);
    };

    return React.default.createElement(
      module13.Modal,
      {
        visible: y,
        animationType: 'fade',
        transparent: true,
        onRequestClose: L,
      },
      React.default.createElement(
        module13.TouchableWithoutFeedback,
        {
          onPress: L,
        },
        React.default.createElement(
          module13.View,
          {
            style: {
              flex: 1,
              backgroundColor: '#0000004D',
            },
          },
          React.default.createElement(
            module13.View,
            {
              style: {
                position: 'absolute',
                top: p.y,
                right: module13.Dimensions.get('window').width - p.x,
                backgroundColor: W.BackgroundColors.CardColor,
                maxWidth: 240,
                minWidth: 200,
                paddingVertical: 16,
                borderRadius: 16,
              },
            },
            React.default.createElement(
              module13.View,
              {
                style: {
                  alignSelf: 'stretch',
                  alignItems: 'flex-end',
                },
              },
              (null != T ? T : []).map(function (t, n) {
                return React.default.createElement(s, {
                  action: t.text,
                  icon: t.icon,
                  didSelect: function () {
                    return null == f ? undefined : f(n);
                  },
                });
              })
            )
          )
        )
      )
    );
  }),
  s = function (t) {
    var n = t.action,
      l = t.icon,
      f = t.didSelect,
      s = React.useContext(module1200.AppConfigContext).theme;
    return React.default.createElement(
      module13.TouchableWithoutFeedback,
      {
        onPress: f,
      },
      React.default.createElement(
        module13.View,
        {
          style: {
            backgroundColor: 'transparent',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 48,
            alignSelf: 'stretch',
            paddingHorizontal: 16,
          },
        },
        React.default.createElement(
          module13.Text,
          {
            numberOfLines: 2,
            style: {
              flexShrink: 1,
              fontSize: 16,
              lineHeight: 22,
              fontWeight: '400',
              color: s.TextColors.Level1,
            },
          },
          n
        ),
        React.default.createElement(module13.Image, {
          source: l,
          style: {
            marginLeft: 24,
            width: 20,
            height: 20,
            tintColor: s.TextColors.Level1,
          },
        })
      )
    );
  },
  h = f;

exports.default = h;
