var regeneratorRuntime = require('regenerator-runtime'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module1936 = require('./1936'),
  module1121 = require('./1121');

function T() {
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

var module505 = require('./505').strings,
  module1565 = require('./1565'),
  R = (function (t) {
    module7.default(k, t);

    var o = k,
      module1121 = T(),
      R = function () {
        var t,
          s = module11.default(o);

        if (module1121) {
          var n = module11.default(this).constructor;
          t = Reflect.construct(s, arguments, n);
        } else t = s.apply(this, arguments);

        return module9.default(this, t);
      };

    function k(t) {
      var o;
      module4.default(this, k);
      (o = R.call(this, t)).state = {
        selected: false,
      };
      return o;
    }

    module5.default(k, [
      {
        key: 'UNSAFE_componentWillReceiveProps',
        value: function (t) {
          this.applyPropsToState(t);
        },
      },
      {
        key: 'applyPropsToState',
        value: function (t) {
          if (!(t.selected == this.state.selected && t.progress == this.state.progress && t.update == this.state.update))
            this.setState({
              selected: t.selected,
              progress: t.progress,
              update: t.update,
            });
        },
      },
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          this.applyPropsToState(this.props);
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this.context.theme.soundPackage,
            o = module12.Dimensions.get('window').width,
            s = o > 375 ? o - 220 : o - 150,
            n = this.state.selected ? '#3384FF' : t.rightButtonColor,
            l = this.state.update ? '#18CA6C' : n,
            u = this.state.update ? '#18CA6C' : this.state.selected ? '#3384FF' : t.rightButtonColor,
            c = this.state.update
              ? module505.soundpackage_update
              : this.state.selected
              ? module505.localization_strings_Setting_SoundPackagePage_3
              : module505.localization_strings_Setting_SoundPackagePage_2,
            p = React.default.createElement(module385.PureButton, {
              funcId: 'sound_package_use_' + this.props.rowId,
              title: c,
              textColor: u,
              style: [
                b.rightButton,
                globals.isRTL
                  ? {
                      left: 15,
                    }
                  : {
                      right: 15,
                    },
                {
                  borderColor: l,
                },
              ],
              onPress: this._onPressUseButton.bind(this),
            }),
            v = React.default.createElement(module1936.default, {
              progress: this.state.progress,
              style: b.progressView,
            }),
            T = this.state.progress >= 0 && this.state.progress < 1 ? v : p,
            R = '';

          if (this.props.data.validEndTime) {
            var k = module1565.convertTimeFromSourceZoneToPhoneZoneByTimestamp(this.props.data.validEndTime, 0);
            R = module505.soundpackage_valid_end_time_title + ' ' + k.year + '.' + k.month + '.' + k.day;
            if (k.year >= 2099) R = module505.soundpackage_valid_end_time_title + ' ' + module505.voice_package_end_validtime_forever;
          }

          var w = React.default.createElement(
              module12.View,
              {
                style: [
                  b.textWrap,
                  {
                    maxWidth: s,
                  },
                ],
              },
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    b.title,
                    {
                      color: t.itemTitleColor,
                    },
                  ],
                  numberOfLines: 1,
                },
                ' ',
                this.props.data.voice_title
              ),
              this.props.data.validEndTime &&
                React.default.createElement(
                  module12.Text,
                  {
                    style: [
                      b.desc,
                      {
                        color: t.itemDetailColor,
                        fontSize: 11,
                      },
                    ],
                  },
                  R
                )
            ),
            P = React.default.createElement(
              module12.View,
              {
                style: b.left,
              },
              globals.isRTL && w,
              !globals.isRTL && w
            ),
            S = React.default.createElement(
              module12.View,
              {
                style: b.right,
              },
              T
            );
          return React.default.createElement(
            module12.View,
            {
              style: [
                b.wrap,
                {
                  backgroundColor: t.itemBackgroundColor,
                },
                this.props.borderStyle,
              ],
            },
            globals.isRTL && S,
            globals.isRTL && P,
            !globals.isRTL && P,
            !globals.isRTL && S,
            this.props.showBottomLine &&
              React.default.createElement(module12.View, {
                style: [
                  b.bottomLine,
                  {
                    backgroundColor: t.lineColor,
                    marginLeft: this.props.isBottomLoneLine ? 0 : 20,
                  },
                ],
              })
          );
        },
      },
      {
        key: '_onPressUseButton',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    if (!this.state.selected || this.state.update) {
                      t.next = 2;
                      break;
                    }

                    return t.abrupt('return');

                  case 2:
                    if (this.props.onPressUseButton) this.props.onPressUseButton();

                  case 3:
                  case 'end':
                    return t.stop();
                }
            },
            null,
            this,
            null,
            Promise
          );
        },
      },
    ]);
    return k;
  })(React.Component);

exports.default = R;
R.contextType = module1121.AppConfigContext;
var b = module12.StyleSheet.create({
  wrap: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
  },
  coverWrap: {
    marginLeft: globals.isRTL ? 10 : 15,
    marginRight: globals.isRTL ? 15 : 10,
    justifyContent: 'center',
  },
  textWrap: {
    height: 70,
    marginLeft: globals.isRTL ? 10 : 15,
    marginRight: globals.isRTL ? 15 : 10,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.8)',
    textAlign: globals.isRTL ? 'right' : 'left',
  },
  desc: {
    marginTop: 5,
    marginLeft: 4,
    fontSize: 13,
    color: 'rgba(0,0,0,0.4)',
    textAlign: globals.isRTL ? 'right' : 'left',
  },
  right: {
    justifyContent: 'center',
  },
  rightButton: {
    position: 'absolute',
    height: 32,
    backgroundColor: 'transparent',
    borderColor: '#3384FF',
    borderWidth: 0.8,
    borderRadius: 16,
    paddingHorizontal: 15,
    minWidth: 75,
  },
  progressView: {
    marginLeft: 15,
    marginRight: 15,
  },
  bottomLine: {
    height: 0.8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
