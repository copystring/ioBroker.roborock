require('./2012');

var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module2018 = require('./2018');

function v() {
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

var y = (function (t) {
  module9.default(P, t);

  var n = P,
    y = v(),
    _ = function () {
      var t,
        o = module12.default(n);

      if (y) {
        var s = module12.default(this).constructor;
        t = Reflect.construct(o, arguments, s);
      } else t = o.apply(this, arguments);

      return module11.default(this, t);
    };

  function P(t) {
    var n;
    module6.default(this, P);

    (n = _.call(this, t))._onPress = function () {
      n.props.onPressItem(n.props.item, n.props.index);
    };

    return n;
  }

  module7.default(P, [
    {
      key: 'render',
      value: function () {
        this.props.index;
        return this.props.item.visible
          ? React.default.createElement(module2018.default, {
              hasTopSeparator: this.props.item.hasTopSeparator,
              onPress: this._onPress,
              name: this.props.item.name,
              accessibilityLabelKey: 'guideNormalItemView_' + this.props.index,
              guideUrl: this.props.item.guideUrl,
              shortSeparator: this.props.item.short_separator,
            })
          : React.default.createElement(module13.View, null);
      },
    },
  ]);
  return P;
})(React.default.PureComponent);

exports.default = y;
