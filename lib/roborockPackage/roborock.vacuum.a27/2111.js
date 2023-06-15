var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module2112 = require('./2112'),
  module391 = require('./391'),
  module385 = require('./385'),
  module1121 = require('./1121');

function S() {
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
  C = (function (t) {
    module7.default(C, t);

    var n = C,
      module391 = S(),
      v = function () {
        var t,
          o = module11.default(n);

        if (module391) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, l);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function C(t) {
      var n;
      module4.default(this, C);
      (n = v.call(this, t)).state = {
        shouldShow: false,
      };
      return n;
    }

    module5.default(C, [
      {
        key: 'render',
        value: function () {
          var t,
            n = this,
            o = this.context.theme;
          return this.state.shouldShow
            ? React.default.createElement(
                module12.View,
                {
                  style: _.container,
                },
                React.default.createElement(
                  module12.View,
                  {
                    style: [
                      _.record,
                      {
                        width: 0.515 * ((t = true), t ? module12.Dimensions.get('screen').width : module12.Dimensions.get('window').width),
                      },
                    ],
                  },
                  React.default.createElement(
                    module12.View,
                    {
                      style: [
                        _.top,
                        {
                          backgroundColor: o.monitor.soundRecord,
                        },
                      ],
                    },
                    React.default.createElement(
                      module12.Text,
                      {
                        style: [
                          _.title,
                          {
                            color: o.monitor.tabTitleColor,
                          },
                        ],
                      },
                      module505.send_voice_record
                    ),
                    React.default.createElement(module385.PureImageButton, {
                      funcId: 'soundRecordClose',
                      hitSlop: {
                        top: 30,
                        bottom: 30,
                        left: 30,
                        right: 30,
                      },
                      image: o.monitor.closeMap,
                      imageWidth: 35,
                      imageHeight: 35,
                      style: _.closeButton,
                      onPress: function () {
                        return n._hide();
                      },
                    })
                  ),
                  React.default.createElement(
                    module12.View,
                    {
                      style: _.list,
                    },
                    React.default.createElement(module2112.default, {
                      isLandscape: true,
                      alertOwner: this.props.parent,
                    })
                  )
                )
              )
            : null;
        },
      },
      {
        key: '_hide',
        value: function () {
          this.setState({
            shouldShow: false,
          });
        },
      },
      {
        key: 'show',
        value: function () {
          this.setState({
            shouldShow: true,
          });
        },
      },
    ]);
    return C;
  })(React.Component);

exports.default = C;
C.contextType = module1121.AppConfigContext;

var _ = module12.StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 101,
  },
  record: {
    flex: 1,
    backgroundColor: '#fff',
    alignSelf: 'flex-end',
  },
  list: {
    flex: 1,
  },
  top: {
    height: 58,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.8)',
  },
  closeButton: {
    position: 'absolute',
    right: 12 + (module391.default.isIphoneX() ? 24 : 0),
    width: 24,
    height: 24,
  },
});
