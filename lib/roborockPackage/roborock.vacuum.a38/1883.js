var module22 = require('./22'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module391 = require('./391');

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

var module393 = require('./393'),
  L = (function (t) {
    module7.default(x, t);

    var n = x,
      L = b(),
      C = function () {
        var t,
          o = module11.default(n);

        if (L) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, l);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function x(t) {
      module4.default(this, x);
      return C.call(this, t);
    }

    module5.default(x, [
      {
        key: 'render',
        value: function () {
          var module1884 =
              '' == this.props.guideUrl
                ? React.default.createElement(module12.View, null)
                : React.default.createElement(module12.Image, {
                    style: [
                      R.listArrow,
                      {
                        tintColor: module393.isDarkMode() ? 'xmwhite' : null,
                      },
                    ],
                    source: require('./1884'),
                  }),
            n = '' == this.props.name,
            l = React.default.createElement(
              module12.Text,
              {
                style: R.title,
                numberOfLines: 1,
              },
              this.props.name
            );
          return React.default.createElement(
            module12.TouchableHighlight,
            module22.default({}, module391.default.getAccessibilityLabel(this.props.accessibilityLabelKey), {
              disabled: n,
              onPress: this.props.onPress,
              style: n
                ? {
                    backgroundColor: 'rgba(239,239,244,1)',
                  }
                : {
                    backgroundColor: 'white',
                  },
              underlayColor: 'rgba(140,140,140,0.2)',
            }),
            React.default.createElement(
              module12.View,
              {
                style: n ? R.blankRowContainer : R.rowContainer,
              },
              this.props.hasTopSeparator &&
                React.default.createElement(module12.View, {
                  style: R.topLine,
                }),
              React.default.createElement(
                module12.View,
                {
                  style: R.rowView,
                },
                globals.isRTL && module1884,
                globals.isRTL && l,
                !globals.isRTL && l,
                !globals.isRTL && module1884
              ),
              React.default.createElement(module12.View, {
                style: this.props.shortSeparator ? R.separator : R.separatorLong,
              })
            )
          );
        },
      },
    ]);
    return x;
  })(React.default.PureComponent);

exports.default = L;
var R = module12.StyleSheet.create({
  rowView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'column',
    height: 50,
    alignItems: 'stretch',
  },
  title: {
    flex: 1,
    fontSize: 15,
    color: 'black',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    paddingRight: 3,
    textAlign: globals.isRTL ? 'right' : 'left',
  },
  separator: {
    height: 'ios' == module12.Platform.OS ? 0.5 : 0.4,
    marginTop: 5,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginLeft: 20,
  },
  separatorLong: {
    height: 'ios' == module12.Platform.OS ? 0.5 : 0.4,
    marginTop: 5,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginLeft: 0,
    marginRight: 0,
  },
  blankRowContainer: {
    flex: 1,
    flexDirection: 'column',
    height: 8,
    alignItems: 'stretch',
  },
  listArrow: {
    width: 7,
    height: 13,
    marginRight: 20,
    marginLeft: 20,
    transform: [
      {
        rotateY: globals.isRTL ? '180deg' : '0deg',
      },
    ],
  },
  topLine: {
    height: 'ios' == module12.Platform.OS ? 0.5 : 0.4,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});
