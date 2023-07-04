var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module391 = require('./391'),
  module385 = require('./385'),
  module394 = require('./394'),
  module1138 = require('./1138'),
  module1121 = require('./1121'),
  module1265 = require('./1265');

function w() {
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

require('./393');

var module505 = require('./505').strings,
  x = (function (t) {
    module7.default(E, t);

    var o = E,
      module1121 = w(),
      x = function () {
        var t,
          n = module11.default(o);

        if (module1121) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, l);
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
            o = this.context.theme.howSaveMap,
            n = module1265.AppBorderRadius;
          return React.default.createElement(
            module1138.default,
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
                    borderRadius: n,
                    height: module394.default.sharedCache().ScreenHeight - module391.default.statusbarHeight(),
                  },
                ],
              },
              React.default.createElement(
                module12.View,
                {
                  style: [
                    T.wrap,
                    {
                      backgroundColor: o.backgroundColor,
                    },
                    this.props.style,
                  ],
                },
                React.default.createElement(
                  module12.View,
                  {
                    style: {
                      maxHeight: (module394.default.sharedCache().ScreenHeight - module391.default.statusbarHeight()) / 2,
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
                              color: o.titleColor,
                            },
                          ],
                        },
                        module505.how_to_save_map
                      ),
                      React.default.createElement(
                        module12.Text,
                        {
                          style: [
                            T.content,
                            {
                              color: o.detailColor,
                            },
                          ],
                        },
                        '' + module505.first_map_handler
                      ),
                      React.default.createElement(
                        module12.Text,
                        {
                          style: [
                            T.content,
                            {
                              color: o.detailColor,
                            },
                          ],
                        },
                        '' + module505.multi_map_handler
                      ),
                      React.default.createElement(
                        module12.Text,
                        {
                          style: [
                            T.content,
                            {
                              color: o.detailColor,
                            },
                          ],
                        },
                        '' + module505.manual_save_handler
                      ),
                      React.default.createElement(
                        module12.Text,
                        {
                          style: [
                            T.sectionTitle,
                            {
                              marginTop: 10,
                              color: o.titleColor,
                            },
                          ],
                        },
                        module505.attention_on_multi_map
                      ),
                      React.default.createElement(
                        module12.Text,
                        {
                          style: [
                            T.content,
                            {
                              color: o.detailColor,
                            },
                          ],
                        },
                        '' + module505.map_edit_map_lab_save_map_kindly_remind3
                      )
                    )
                  )
                ),
                React.default.createElement(module12.View, {
                  style: {
                    backgroundColor: o.borderColor,
                    height: 0.8,
                    alignSelf: 'stretch',
                  },
                }),
                React.default.createElement(module385.PureButton, {
                  funcId: 'question_and_answer_in_multiMap_confirm',
                  title: module505.localization_strings_Setting_RemoteControlPage_51,
                  textColor: o.titleColor,
                  style: [
                    T.button,
                    {
                      backgroundColor: o.backgroundColor,
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
x.contextType = module1121.AppConfigContext;
x.defaultProps = {
  shouldShow: false,
};
var T = module12.StyleSheet.create({
  container: {
    alignSelf: 'stretch',
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
