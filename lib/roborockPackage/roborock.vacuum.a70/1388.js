var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module391 = require('./391'),
  module385 = require('./385'),
  module394 = require('./394');

function b() {
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
  S = (function (t) {
    module9.default(R, t);

    var n = R,
      S = b(),
      E = function () {
        var t,
          l = module12.default(n);

        if (S) {
          var o = module12.default(this).constructor;
          t = Reflect.construct(l, arguments, o);
        } else t = l.apply(this, arguments);

        return module11.default(this, t);
      };

    function R(t) {
      var n;
      module6.default(this, R);
      (n = E.call(this, t)).state = {
        shouldShow: false,
      };
      return n;
    }

    module7.default(R, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'render',
        value: function () {
          var t = this;
          return React.default.createElement(
            module13.Modal,
            {
              transparent: true,
              visible: this.state.shouldShow,
              onRequestClose: function () {},
            },
            React.default.createElement(
              module13.View,
              {
                style: [
                  w.container,
                  {
                    height: module394.default.sharedCache().ScreenHeight - module391.default.statusbarHeight(),
                  },
                ],
              },
              React.default.createElement(
                module13.View,
                {
                  style: [w.wrap, this.props.style],
                },
                React.default.createElement(
                  module13.View,
                  {
                    style: w.top,
                  },
                  React.default.createElement(
                    module13.Text,
                    {
                      style: w.title,
                    },
                    module510.map_edit_map_lab_save_map_kindly_remind
                  )
                ),
                React.default.createElement(
                  module13.View,
                  {
                    style: w.middle,
                  },
                  React.default.createElement(
                    module13.Text,
                    {
                      style: w.content,
                    },
                    module510.map_edit_map_lab_save_map_kindly_remind1
                  ),
                  React.default.createElement(
                    module13.Text,
                    {
                      style: w.content,
                    },
                    module510.map_edit_map_lab_save_map_kindly_remind2
                  ),
                  React.default.createElement(
                    module13.Text,
                    {
                      style: w.content,
                    },
                    module510.map_edit_map_lab_save_map_kindly_remind3 + ' ' + (module391.default.isRRAndroid() ? '\n' : '')
                  )
                ),
                React.default.createElement(
                  module13.View,
                  null,
                  React.default.createElement(module385.PureButton, {
                    funcId: 'save_map_mode_tips_confirm',
                    title: module510.localization_strings_Setting_RemoteControlPage_51,
                    textColor: 'white',
                    style: w.button,
                    fontSize: 16,
                    onPress: function () {
                      t.setState({
                        shouldShow: false,
                      });
                    },
                  })
                )
              )
            )
          );
        },
      },
    ]);
    return R;
  })(React.Component);

exports.default = S;
S.defaultProps = {
  shouldShow: false,
};
var w = module13.StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    backgroundColor: 'rgba(00, 00, 00, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrap: {
    marginHorizontal: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 4,
    overflow: 'hidden',
  },
  top: {
    marginTop: 30,
  },
  title: {
    color: 'rgba(0, 0, 0, 0.8)',
    fontSize: 18,
  },
  subTitle: {
    color: 'rgba(0, 0, 0, 0.8)',
    fontSize: 14,
    fontWeight: 'bold',
  },
  middle: {
    marginTop: 10,
    paddingHorizontal: 20,
    alignItems: 'flex-start',
    borderTopColor: '#eeeeee',
    borderTopWidth: 1,
  },
  content: {
    color: 'rgba(0, 0, 0, 0.8)',
    marginTop: 20,
    fontSize: 15,
    textAlign: 'left',
    lineHeight: 24,
  },
  button: {
    marginTop: 30,
    marginBottom: 30,
    width: 268,
    height: 48,
    borderRadius: 2,
    backgroundColor: '#3384FF',
  },
});
