var module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
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
    module9.default(x, t);

    var n = x,
      L = b(),
      C = function () {
        var t,
          o = module12.default(n);

        if (L) {
          var l = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, l);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function x(t) {
      module6.default(this, x);
      return C.call(this, t);
    }

    module7.default(x, [
      {
        key: 'render',
        value: function () {
          var module2007 =
              '' == this.props.guideUrl
                ? React.default.createElement(module13.View, null)
                : React.default.createElement(module13.Image, {
                    style: [
                      R.listArrow,
                      {
                        tintColor: module393.isDarkMode() ? 'xmwhite' : null,
                      },
                    ],
                    source: require('./2007'),
                  }),
            n = '' == this.props.name,
            l = React.default.createElement(
              module13.Text,
              {
                style: R.title,
                numberOfLines: 1,
              },
              this.props.name
            );
          return React.default.createElement(
            module13.TouchableHighlight,
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
              module13.View,
              {
                style: n ? R.blankRowContainer : R.rowContainer,
              },
              this.props.hasTopSeparator &&
                React.default.createElement(module13.View, {
                  style: R.topLine,
                }),
              React.default.createElement(
                module13.View,
                {
                  style: R.rowView,
                },
                globals.isRTL && module2007,
                globals.isRTL && l,
                !globals.isRTL && l,
                !globals.isRTL && module2007
              ),
              React.default.createElement(module13.View, {
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
var R = module13.StyleSheet.create({
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
    height: 'ios' == module13.Platform.OS ? 0.5 : 0.4,
    marginTop: 5,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginLeft: 20,
  },
  separatorLong: {
    height: 'ios' == module13.Platform.OS ? 0.5 : 0.4,
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
    height: 'ios' == module13.Platform.OS ? 0.5 : 0.4,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});
