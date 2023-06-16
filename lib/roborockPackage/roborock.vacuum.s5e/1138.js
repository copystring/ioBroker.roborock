var module22 = require('./22'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1139 = require('./1139');

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
  module7.default(D, t);

  var module1139 = D,
    y = v(),
    b = function () {
      var t,
        n = module11.default(module1139);

      if (y) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function D() {
    module4.default(this, D);
    return b.apply(this, arguments);
  }

  module5.default(D, [
    {
      key: 'componentWillUnmount',
      value: function () {
        this.props.navigation.setParams({
          gesturesEnabled: true,
        });
      },
    },
    {
      key: 'onShow',
      value: function () {
        if (this.props.autoGestureEnable)
          this.props.navigation.setParams({
            gesturesEnabled: false,
          });
        if (this.props.onShow) this.props.onShow();
      },
    },
    {
      key: 'onDismiss',
      value: function () {
        if (this.props.autoGestureEnable)
          this.props.navigation.setParams({
            gesturesEnabled: true,
          });
        if (this.props.onDismiss) this.props.onDismiss();
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this;
        return React.default.createElement(
          module12.Modal,
          module22.default({}, this.props, {
            onShow: function () {
              t.onShow();
            },
            onDismiss: function () {
              t.onDismiss();
            },
          })
        );
      },
    },
  ]);
  return D;
})(React.default.Component);

y.defaultProps = {
  autoGestureEnable: true,
};
var b = module1139.withNavigation(y);
exports.default = b;
