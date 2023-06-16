var module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module1609 = require('./1609'),
  React = require('react'),
  module13 = require('./13'),
  s = function (t) {
    var s = t.enabled,
      c = t.onPress,
      f = module56.default(t, ['enabled', 'onPress']);
    return React.default.createElement(
      module13.View,
      f,
      React.default.createElement(
        module13.TouchableWithoutFeedback,
        {
          onPress: c,
          disabled: !s,
        },
        React.default.createElement(
          module1609.default,
          {
            style: {
              height: 42,
              borderRadius: 21,
              justifyContent: 'center',
              alignItems: 'center',
              opacity: s ? 1 : 0.5,
            },
            colors: ['#ACC2FF', '#4E6FC9'],
            start: {
              x: 0,
              y: 0,
            },
            end: {
              x: 1,
              y: 0,
            },
          },
          React.default.createElement(
            module13.Text,
            {
              style: {
                color: 'white',
              },
            },
            '\u63d0\u4ea4\u95ee\u9898\u53cd\u9988'
          )
        )
      )
    );
  };

exports.default = s;
