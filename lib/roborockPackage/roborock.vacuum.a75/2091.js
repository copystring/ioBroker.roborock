var module23 = require('@babel/runtime/helpers/slicedToArray'),
  module385 = require('./385'),
  React = require('react'),
  module13 = require('./13'),
  module1199 = require('./1199'),
  f = React.memo(function (t) {
    var n = t.types,
      f = undefined === n ? [] : n,
      w = t.onSelectedTypeChange,
      v = t.onSelectedQuestionChange,
      p = t.onSelectedDateChange,
      C = React.useState(0),
      y = module23.default(C, 2),
      E = y[0],
      D = y[1],
      V = React.useState(null),
      b = module23.default(V, 2),
      k = b[0],
      x = b[1],
      R = React.useState(null),
      A = module23.default(R, 2),
      B = A[0],
      I = A[1],
      L = React.useState(null),
      M = module23.default(L, 2),
      P = M[0],
      T = M[1],
      _ = React.useState(false),
      j = module23.default(_, 2),
      q = j[0],
      H = j[1],
      O = React.useRef(null),
      Q = React.useContext(module1199.AppConfigContext).theme,
      z = React.useMemo(
        function () {
          return 0 === f.length ? [] : f[E].typeQuestions;
        },
        [E, f]
      ),
      N = React.useMemo(
        function () {
          var t;
          return k ? (null != (t = k.category) ? t : '') + (k.detail ? ': ' + k.detail : '') : null;
        },
        [k]
      ),
      W = React.useCallback(
        function (t) {
          if (t != E) {
            D(t);
            x(null);
          }
        },
        [f, E]
      ),
      U = React.useCallback(
        function (t) {
          var n;
          x(f[E].typeQuestions[t]);
          if (!(null == (n = O.current))) n.hide();
        },
        [E, f]
      ),
      F = React.useCallback(function (t) {
        t.setSeconds(0);
        T(t);
        H(false);
      }, []);

    React.useEffect(
      function () {
        if (!(null == w)) w(f[E].key);
      },
      [E, f]
    );
    React.useEffect(
      function () {
        if (!(null == v)) v(k);
      },
      [k]
    );
    React.useEffect(
      function () {
        var t;
        I(null != (t = null == P ? undefined : null == P.toLocaleString ? undefined : P.toLocaleString()) ? t : null);
        if (!(null == p)) p(P);
      },
      [P]
    );
    return React.default.createElement(
      module13.View,
      {
        style: [
          S.questionTypeRoot,
          {
            backgroundColor: Q.componentBackgroundColor,
          },
        ],
      },
      React.default.createElement(module385.LevelSelectView, {
        style: S.levelSelect,
        items: f.map(function (t) {
          return t.typeName;
        }),
        defaultSelectedIndex: E,
        onSelectItemAtIndex: W,
        viewStyle: 0,
        isAnimatable: true,
      }),
      React.default.createElement(
        module13.View,
        {
          style: {
            marginVertical: 8,
          },
        },
        z.length > 0 &&
          React.default.createElement(module385.SettingListItemView, {
            title: '\u95ee\u9898\u7c7b\u578b',
            shouldShowRightArrow: true,
            detail: null != N ? N : '\u8bf7\u9009\u62e9\u95ee\u9898\u7c7b\u578b',
            detailWidth: 180,
            shouldShowBottomLine: false,
            onPress: function () {
              var t;
              return null == (t = O.current) ? undefined : t.show();
            },
          }),
        React.default.createElement(module385.SettingListItemView, {
          title: '\u53d1\u751f\u65f6\u95f4',
          shouldShowRightArrow: true,
          detail: null != B ? B : '\u8bf7\u9009\u62e9\u53d1\u751f\u65f6\u95f4',
          detailWidth: 180,
          shouldShowBottomLine: false,
          onPress: function () {
            return H(true);
          },
        })
      ),
      React.default.createElement(module385.ActionSheetView, {
        ref: O,
        mode: 'select',
        shouldUseNativeModal: true,
        actions: z.map(function (t) {
          return t.category;
        }),
        details: z.map(function (t) {
          return t.detail;
        }),
        didSelectRow: U,
        onPressCancel: function () {
          var t;
          return null == (t = O.current) ? undefined : t.hide();
        },
      }),
      q &&
        React.default.createElement(h, {
          onClose: function () {
            return H(false);
          },
          onSelectTime: F,
        })
    );
  }),
  h = function (t) {
    var n,
      c = t.onClose,
      f = t.onSelectTime,
      h = React.useState(new Date()),
      w = module23.default(h, 2),
      v = w[0];
    w[1];
    return React.default.createElement(
      module385.BaseModal,
      {
        transparent: true,
        onRequestClose: function () {
          return c();
        },
      },
      React.default.createElement(
        module13.Animated.View,
        {
          style: S.modal,
        },
        React.default.createElement(
          module13.View,
          {
            style: [S.timerOutView, S.pickerView],
          },
          React.default.createElement(module385.CustomDatePicker, {
            minDate: ((n = new Date()), n.setDate(n.getDate() - 5), n.setHours(0), n.setMinutes(0), n.setSeconds(0), n),
            maxDate: (function () {
              var t = new Date();
              t.setDate(t.getDate());
              t.setHours(23);
              t.setMinutes(59);
              t.setSeconds(0);
              return t;
            })(),
            showDate: v,
            title: '\u95ee\u9898\u53d1\u751f\u65f6\u95f4',
            mode: 'datetime',
            onPressCancelButton: c,
            onPressConfirmButton: f,
          })
        )
      )
    );
  },
  S = module13.StyleSheet.create({
    questionTypeRoot: {
      paddingTop: 12,
      backgroundColor: 'white',
      borderRadius: 8,
      marginTop: 15,
    },
    levelSelect: {
      paddingHorizontal: 8,
    },
    modal: {
      alignSelf: 'stretch',
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0,0,0,0.6)',
      borderRadius: 8,
      alignItems: 'stretch',
      height: module13.Dimensions.get('window').height,
    },
    timerOutView: {
      flex: 1,
      alignSelf: 'stretch',
    },
    pickerView: {
      flex: 1,
      alignSelf: 'stretch',
      zIndex: 99999,
      justifyContent: 'flex-end',
      paddingBottom: 20,
      overflow: 'hidden',
    },
  }),
  w = f;

exports.default = w;
