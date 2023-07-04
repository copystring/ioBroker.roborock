require('./1925');

var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1931 = require('./1931');

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
  module7.default(P, t);

  var n = P,
    y = v(),
    _ = function () {
      var t,
        o = module11.default(n);

      if (y) {
        var s = module11.default(this).constructor;
        t = Reflect.construct(o, arguments, s);
      } else t = o.apply(this, arguments);

      return module9.default(this, t);
    };

  function P(t) {
    var n;
    module4.default(this, P);

    (n = _.call(this, t))._onPress = function () {
      n.props.onPressItem(n.props.item, n.props.index);
    };

    return n;
  }

  module5.default(P, [
    {
      key: 'render',
      value: function () {
        this.props.index;
        return this.props.item.visible
          ? React.default.createElement(module1931.default, {
              hasTopSeparator: this.props.item.hasTopSeparator,
              onPress: this._onPress,
              name: this.props.item.name,
              accessibilityLabelKey: 'guideNormalItemView_' + this.props.index,
              guideUrl: this.props.item.guideUrl,
              shortSeparator: this.props.item.short_separator,
            })
          : React.default.createElement(module12.View, null);
      },
    },
  ]);
  return P;
})(React.default.PureComponent);

exports.default = y;
