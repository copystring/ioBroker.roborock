var module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = v(n);
    if (o && o.has(t)) return o.get(t);
    var l = {},
      u = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var f = u ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (f && (f.get || f.set)) Object.defineProperty(l, c, f);
        else l[c] = t[c];
      }

    l.default = t;
    if (o) o.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  module2047 = require('./2047'),
  module387 = require('./387'),
  module381 = require('./381'),
  module506 = require('./506');

function v(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (v = function (t) {
    return t ? o : n;
  })(t);
}

function b() {
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

var module491 = require('./491').strings,
  O = (function (t) {
    module7.default(O, t);

    var module387 = O,
      module506 = b(),
      v = function () {
        var t,
          n = module11.default(module387);

        if (module506) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function O(t) {
      var o;
      module4.default(this, O);
      (o = v.call(this, t)).state = {
        shouldShow: false,
      };
      return o;
    }

    module5.default(O, [
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
                  style: S.container,
                },
                React.default.createElement(
                  module12.View,
                  {
                    style: [
                      S.record,
                      {
                        width: 0.515 * ((t = true), t ? module12.Dimensions.get('screen').width : module12.Dimensions.get('window').width),
                      },
                    ],
                  },
                  React.default.createElement(
                    module12.View,
                    {
                      style: [
                        S.top,
                        {
                          backgroundColor: o.monitor.soundRecord,
                        },
                      ],
                    },
                    React.default.createElement(
                      module12.Text,
                      {
                        style: [
                          S.title,
                          {
                            color: o.monitor.tabTitleColor,
                          },
                        ],
                      },
                      module491.send_voice_record
                    ),
                    React.default.createElement(module381.PureImageButton, {
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
                      style: S.closeButton,
                      onPress: function () {
                        return n._hide();
                      },
                    })
                  ),
                  React.default.createElement(
                    module12.View,
                    {
                      style: S.list,
                    },
                    React.default.createElement(module2047.default, {
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
    return O;
  })(React.Component);

exports.default = O;
O.contextType = module506.AppConfigContext;
var S = module12.StyleSheet.create({
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
    right: 12 + (module387.default.isIphoneX() ? 24 : 0),
    width: 24,
    height: 24,
  },
});
