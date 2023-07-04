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
  module387 = require('./387'),
  module381 = require('./381'),
  module390 = require('./390'),
  module935 = require('./935'),
  module506 = require('./506'),
  module934 = require('./934');

function v(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (v = function (t) {
    return t ? o : n;
  })(t);
}

function C() {
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

require('./389');

var module491 = require('./491').strings,
  x = (function (t) {
    module7.default(E, t);

    var module506 = E,
      v = C(),
      x = function () {
        var t,
          n = module11.default(module506);

        if (v) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function E(t) {
      var o;
      module4.default(this, E);
      (o = x.call(this, t)).state = {
        shouldShow: false,
      };
      return o;
    }

    module5.default(E, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme.howSaveMap,
            o = module934.AppBorderRadius;
          return React.default.createElement(
            module935.default,
            {
              transparent: true,
              visible: this.state.shouldShow,
              onRequestClose: function () {},
            },
            React.default.createElement(
              module12.View,
              {
                style: [
                  T.container,
                  {
                    borderRadius: o,
                    height: module390.default.sharedCache().ScreenHeight - module387.default.statusbarHeight(),
                  },
                ],
              },
              React.default.createElement(
                module12.View,
                {
                  style: [
                    T.wrap,
                    {
                      backgroundColor: n.backgroundColor,
                    },
                    this.props.style,
                  ],
                },
                React.default.createElement(
                  module12.View,
                  {
                    style: {
                      maxHeight: (module390.default.sharedCache().ScreenHeight - module387.default.statusbarHeight()) / 2,
                      paddingVertical: 20,
                      paddingHorizontal: 15,
                    },
                  },
                  React.default.createElement(
                    module12.ScrollView,
                    {
                      contentContainerStyle: {
                        alignItems: 'flex-start',
                      },
                      style: {
                        flexGrow: 0,
                        paddingBottom: 20,
                      },
                    },
                    React.default.createElement(
                      module12.View,
                      {
                        style: T.middle,
                      },
                      React.default.createElement(
                        module12.Text,
                        {
                          style: [
                            T.sectionTitle,
                            {
                              color: n.titleColor,
                            },
                          ],
                        },
                        module491.how_to_save_map
                      ),
                      React.default.createElement(
                        module12.Text,
                        {
                          style: [
                            T.content,
                            {
                              color: n.detailColor,
                            },
                          ],
                        },
                        '' + module491.first_map_handler
                      ),
                      React.default.createElement(
                        module12.Text,
                        {
                          style: [
                            T.content,
                            {
                              color: n.detailColor,
                            },
                          ],
                        },
                        '' + module491.multi_map_handler
                      ),
                      React.default.createElement(
                        module12.Text,
                        {
                          style: [
                            T.content,
                            {
                              color: n.detailColor,
                            },
                          ],
                        },
                        '' + module491.manual_save_handler
                      ),
                      React.default.createElement(
                        module12.Text,
                        {
                          style: [
                            T.sectionTitle,
                            {
                              marginTop: 10,
                              color: n.titleColor,
                            },
                          ],
                        },
                        module491.attention_on_multi_map
                      ),
                      React.default.createElement(
                        module12.Text,
                        {
                          style: [
                            T.content,
                            {
                              color: n.detailColor,
                            },
                          ],
                        },
                        '' + module491.map_edit_map_lab_save_map_kindly_remind3
                      )
                    )
                  )
                ),
                React.default.createElement(module12.View, {
                  style: {
                    backgroundColor: n.borderColor,
                    height: 0.8,
                    alignSelf: 'stretch',
                  },
                }),
                React.default.createElement(module381.PureButton, {
                  funcId: 'question_and_answer_in_multiMap_confirm',
                  title: module491.localization_strings_Setting_RemoteControlPage_51,
                  textColor: n.titleColor,
                  style: [
                    T.button,
                    {
                      backgroundColor: n.backgroundColor,
                    },
                  ],
                  fontSize: 16,
                  onPress: function () {
                    t.setState({
                      shouldShow: false,
                    });
                  },
                })
              )
            )
          );
        },
      },
    ]);
    return E;
  })(React.Component);

exports.default = x;
x.contextType = module506.AppConfigContext;
x.defaultProps = {
  shouldShow: false,
};
var T = module12.StyleSheet.create({
  container: {
    width: module12.Dimensions.get('window').width,
    height: module12.Dimensions.get('window').height,
    backgroundColor: 'rgba(00, 00, 00, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrap: {
    flexDirection: 'column',
    marginHorizontal: 37,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 14,
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
    paddingTop: 5,
    paddingHorizontal: 17,
    alignItems: globals.isRTL ? 'flex-end' : 'flex-start',
  },
  sectionTitle: {
    paddingTop: 10,
    color: '#4A4A4A',
    fontSize: 16,
    lineHeight: 24,
  },
  content: {
    color: '#9B9B9B',
    marginTop: 9,
    fontSize: 12,
    lineHeight: 20,
  },
  button: {
    paddingVertical: 15,
  },
  line: {
    height: 0.8,
  },
});
