var module22 = require('./22'),
  module23 = require('@babel/runtime/helpers/slicedToArray'),
  module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  React = require('react'),
  module13 = require('./13'),
  module1199 = require('./1199'),
  C = module13.StyleSheet.create({
    title: {
      fontSize: 15,
      paddingHorizontal: 8,
    },
    subtitle: {
      fontSize: 11,
      color: 'gray',
    },
    itemRoot: {
      paddingVertical: 10,
      backgroundColor: 'transparent',
    },
    textInputContainer: {},
    inputStyleBase: {
      paddingLeft: 19,
      borderRadius: 8,
      fontSize: 14,
      backgroundColor: 'white',
      marginTop: 15,
      paddingTop: 15,
      paddingBottom: 15,
      maxHeight: 132,
      textAlignVertical: 'center',
    },
  }),
  s = function (t) {
    var l = t.title,
      s = t.subtitle,
      x = t.placeholder,
      h = t.maxLength,
      b = t.multiline,
      T = undefined !== b && b,
      y = t.onContentTextChange,
      S = module56.default(t, ['title', 'subtitle', 'placeholder', 'maxLength', 'multiline', 'onContentTextChange']),
      v = React.useState(''),
      k = module23.default(v, 2),
      B = k[0],
      E = k[1],
      w = React.useContext(module1199.AppConfigContext).theme,
      z = React.useCallback(function (t) {
        E(t);
      }, []),
      L = React.useCallback(
        function () {
          if (!(null == y)) y(B);
        },
        [B, y]
      );
    return React.default.createElement(
      module13.View,
      module22.default(
        {
          style: C.itemRoot,
        },
        S
      ),
      React.default.createElement(
        module13.Text,
        {
          style: [
            C.title,
            {
              color: w.mainTextColor,
            },
          ],
        },
        l,
        ' ',
        React.default.createElement(
          module13.Text,
          {
            style: [
              C.subtitle,
              {
                color: 'gray',
              },
            ],
          },
          s
        )
      ),
      React.default.createElement(
        module13.View,
        {
          style: C.textInputContainer,
        },
        React.default.createElement(module13.TextInput, {
          value: B,
          onChangeText: z,
          placeholder: x,
          style: [
            C.inputStyleBase,
            {
              backgroundColor: w.componentBackgroundColor,
              color: w.mainTextColor,
            },
          ],
          placeholderTextColor: w.subTextColor,
          clearButtonMode: 'while-editing',
          maxLength: h,
          multiline: T,
          onBlur: L,
        })
      )
    );
  };

exports.default = s;
