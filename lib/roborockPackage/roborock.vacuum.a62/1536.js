var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12');

function p() {
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

var h = (function (t) {
  module7.default(I, t);

  var h = I,
    v = p(),
    S = function () {
      var t,
        n = module11.default(h);

      if (v) {
        var l = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, l);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function I(t) {
    var l;
    module4.default(this, I);

    (l = S.call(this, t)).onClick = function () {
      if (!l.props.disabled) l.props.onClick(l.props.child);
    };

    return l;
  }

  module5.default(I, [
    {
      key: 'render',
      value: function () {
        var module1538 = this.props.radioSelect ? this.props.seledImg || require('./1537') : this.props.selImg || require('./1538');
        return React.default.createElement(
          module12.TouchableOpacity,
          {
            activeOpacity: 1,
            underlayColor: 'transparent',
            style: [y.radioItem, this.props.innerStyle],
            onPress: this.onClick,
          },
          React.default.createElement(module12.Image, {
            source: module1538,
            style: y.seltedImgs,
          }),
          React.default.createElement(
            module12.Text,
            {
              style: [y.textStyle, this.props.textStyle],
            },
            this.props.text
          )
        );
      },
    },
  ]);
  return I;
})(React.default.Component);

exports.default = h;
h.defaultProps = {
  disabled: false,
};
var y = module12.StyleSheet.create({
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    height: 45,
  },
  seltedImgs: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  textStyle: {
    fontSize: 16,
    color: '#333',
  },
});
