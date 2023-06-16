var module4 = require('./4'),
  module5 = require('./5'),
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
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

var h = (function (t) {
  module7.default(C, t);

  var h = C,
    v = p(),
    I = function () {
      var t,
        o = module11.default(h);

      if (v) {
        var l = module11.default(this).constructor;
        t = Reflect.construct(o, arguments, l);
      } else t = o.apply(this, arguments);

      return module9.default(this, t);
    };

  function C(t) {
    var l;
    module4.default(this, C);

    (l = I.call(this, t)).onClick = function () {
      if (!l.props.disabled) l.props.onClick(l.props.child);
    };

    return l;
  }

  module5.default(C, [
    {
      key: 'render',
      value: function () {
        var module1226 = this.props.radioSelect ? this.props.seledImg || require('./1225') : this.props.selImg || require('./1226');
        return React.default.createElement(
          module12.TouchableOpacity,
          {
            activeOpacity: 1,
            underlayColor: 'transparent',
            style: [y.radioItem, this.props.innerStyle],
            onPress: this.onClick,
          },
          React.default.createElement(module12.Image, {
            source: module1226,
            style: y.seltedImgs,
          }),
          React.default.createElement(
            module12.Text,
            {
              style: {
                color: this.props.txtColor ? this.props.txtColor : '#333',
              },
            },
            this.props.text
          )
        );
      },
    },
  ]);
  return C;
})(React.default.Component);

exports.default = h;
h.defaultProps = {
  disabled: false,
};
var y = module12.StyleSheet.create({
  seltedImgs: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    height: 45,
  },
});
