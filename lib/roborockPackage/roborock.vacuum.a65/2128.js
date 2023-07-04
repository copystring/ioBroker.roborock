var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module385 = require('./385'),
  module1200 = require('./1200');

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

var y = (function (t) {
  module9.default(k, t);

  var module1200 = k,
    y = v(),
    C = function () {
      var t,
        n = module12.default(module1200);

      if (y) {
        var o = module12.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module11.default(this, t);
    };

  function k(t) {
    var o;
    module6.default(this, k);
    (o = C.call(this, t)).state = {
      current: 0,
    };
    return o;
  }

  module7.default(k, [
    {
      key: 'UNSAFE_componentWillMount',
      value: function () {
        this.setMode();
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this,
          n = this.context.theme.ModeSettingPanel,
          o = (module13.Dimensions.get('window').width - 70) / this.props.items.length,
          u = this.props.items.map(function (u, s) {
            var l = s == t.state.current,
              h = React.default.createElement(module385.PureButton, {
                key: s,
                onPress: t.onPressButton.bind(t, s),
                fontSize: 14,
                selectedTextColor: n.buttonTextSelectedColor,
                textColor: n.buttonTextColor,
                selected: l,
                title: u.name,
                maxTextWidth: 90,
                style: [
                  b.button,
                  {
                    width: o,
                    backgroundColor: 'transparent',
                  },
                ],
              }),
              v = React.default.createElement(
                module13.View,
                {
                  key: s,
                  style: {
                    backgroundColor: '#5c9dfc',
                    borderRadius: 20,
                  },
                },
                h
              );
            return l ? v : h;
          });
        return React.default.createElement(
          module13.View,
          {
            style: [
              b.containter,
              {
                backgroundColor: this.props.enabled ? n.itemEnableBackgroundColor : n.itemDisableBackgroundColor,
              },
              this.props.style,
            ],
          },
          u
        );
      },
    },
    {
      key: 'setMode',
      value: function () {
        var t = this,
          n = this.props.items.findIndex(function (n) {
            return n.value == t.props.value;
          });
        this.setState({
          current: n,
        });
      },
    },
    {
      key: 'onPressButton',
      value: function (t) {
        if (t != this.state.current) {
          var n = this.props.items[t].value;
          this.setState({
            current: t,
          });
          if (this.props.onPressButton) this.props.onPressButton(n);
        }
      },
    },
  ]);
  return k;
})(React.default.PureComponent);

exports.default = y;
y.contextType = module1200.AppConfigContext;
y.defaultProps = {
  enabled: true,
};
var b = module13.StyleSheet.create({
  containter: {
    backgroundColor: 'rgba(0,0,0,0.03)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
  },
  button: {
    flex: 0,
    height: 40,
    backgroundColor: 'transparent',
  },
});
