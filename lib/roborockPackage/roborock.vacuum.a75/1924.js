require('./416');

var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1203 = require('./1203'),
  module385 = require('./385'),
  module393 = require('./393');

function _() {
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

var module510 = require('./510').strings,
  S = [
    '\u8bb0\u5f97\u53ca\u65f6\u6e05\u7406\u4e3b\u5237\u4e0a\u7684\u6bdb\u53d1\u54e6',
    '\u6e05\u626b\u4e2d\u4e0d\u8981\u8fdc\u8ddd\u79bb\u642c\u52a8\u673a\u5668\u4eba\uff0c\u53ef\u80fd\u4f1a\u8ff7\u8def',
    '\u6ee4\u7f51\u53ef\u7528\u6e05\u6c34\u6e05\u6d17\uff0c\u4f46\u9700\u8981\u667e\u6652\u540e\u518d\u4f7f\u7528',
    '\u673a\u5668\u4eba\u8fd0\u884c\u4e00\u6bb5\u65f6\u95f4\u540e\u8981\u64e6\u62ed\u4e0b\u4f20\u611f\u5668',
    '\u6e05\u626b\u524d\u8bf7\u53ca\u65f6\u6e05\u7406\u5730\u9762\u7ebf\u6750\u3001\u73a9\u5177\u7b49\u7269\u54c1',
    '\u673a\u5668\u4eba\u653e\u5728\u5145\u7535\u5ea7\u4f1a\u76f4\u63a5\u5f00\u673a\u54e6',
    '\u4f11\u7720\u65f6\u95f4\u8d85\u8fc712\u5c0f\u65f6\u673a\u5668\u4eba\u5c06\u81ea\u52a8\u5173\u673a ',
    '\u5efa\u8bae\u6309\u7167\u771f\u5b9e\u6237\u578b\u5206\u5272\u6216\u5408\u5e76\u5730\u56fe',
    '\u4e0d\u8981\u4f9d\u8d56\u7981\u533a\u6216\u865a\u62df\u5899\u9694\u79bb\u5371\u9669\u533a\u57df',
  ],
  module1925 = (function (t) {
    module9.default(V, t);

    var n = V,
      module1925 = _(),
      R = function () {
        var t,
          o = module12.default(n);

        if (module1925) {
          var l = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, l);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function V(t) {
      var n;
      module6.default(this, V);
      (n = R.call(this, t)).state = {
        isOvertimed: false,
      };
      n.tip = S[Math.floor(Math.random() * S.length)];
      return n;
    }

    module7.default(V, [
      {
        key: 'componentWillUnmount',
        value: function () {
          clearTimeout(this.timerId);
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          var t = this;
          if (this.lottieView) this.lottieView.play();
          this.timerId = setTimeout(function () {
            return t.setState({
              isOvertimed: true,
            });
          }, 16e3);
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = 'cn' == module510.getResourceLanguageCode() && this.props.shouldShowTip ? this.tip : module510.map_loading_view_tip;
          if (this.state.isOvertimed) n = module510.load_map_overime_tip;
          return React.default.createElement(
            module13.View,
            {
              style: b.containter,
            },
            module393.isMiApp
              ? React.default.createElement(module385.Spinner, null)
              : React.default.createElement(module1203.default, {
                  ref: function (n) {
                    return (t.lottieView = n);
                  },
                  style: [b.lottieView, this.props.style],
                  source: require('./1925'),
                }),
            React.default.createElement(
              module13.Text,
              {
                style: [
                  b.desc,
                  {
                    color: globals.app.state.theme.mapTipView.textColor,
                  },
                ],
              },
              this.props.isLocating ? module510.map_locating : this.props.isWarmUp ? module510.robot_is_warm_up_tip : n
            )
          );
        },
      },
    ]);
    return V;
  })(React.Component);

exports.default = module1925;
module1925.defaultProps = {
  shouldShowTip: false,
  isLocating: false,
  isWarmUp: false,
};
var b = module13.StyleSheet.create({
  containter: {
    alignItems: 'center',
  },
  lottieView: {
    width: 300,
    height: 300,
  },
  desc: {
    marginTop: 15,
    fontSize: 14,
    color: 'rgba(0,0,0,0.5)',
    textAlign: 'center',
  },
  cancelButton: {
    borderColor: 'rgba(0,0,0,0.3)',
    borderWidth: 0.4,
    marginTop: 20,
    width: 100,
    height: 40,
    borderRadius: 8,
  },
});
