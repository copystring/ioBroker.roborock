exports.default = function (t) {
  var F = (function (p) {
    module9.default(b, p);

    var module1333 = b,
      F = y(),
      R = function () {
        var t,
          n = module12.default(module1333);

        if (F) {
          var o = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function b(t) {
      var n;
      module6.default(this, b);
      (n = R.call(this, t)).state = {
        isFocused: !!t.navigation && t.navigation.isFocused(),
      };
      return n;
    }

    module7.default(b, [
      {
        key: 'componentDidMount',
        value: function () {
          var t = this,
            n = this.props.navigation;
          module1223.default(
            !!n,
            'withNavigationFocus can only be used on a view hierarchy of a navigator. The wrapped component is unable to get access to navigation from props or context.'
          );
          this.subscriptions = [
            n.addListener('didFocus', function () {
              return t.setState({
                isFocused: true,
              });
            }),
            n.addListener('willBlur', function () {
              return t.setState({
                isFocused: false,
              });
            }),
          ];
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          this.subscriptions.forEach(function (t) {
            return t.remove();
          });
        },
      },
      {
        key: 'render',
        value: function () {
          return React.default.createElement(
            t,
            module22.default({}, this.props, {
              isFocused: this.state.isFocused,
              ref: this.props.onRef,
            })
          );
        },
      },
    ]);
    return b;
  })(React.default.Component);

  F.displayName = 'withNavigationFocus(' + (t.displayName || t.name) + ')';
  return module1310.default(module1333.default(F), t);
};

require('prop-types');

var module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module1310 = require('./1310'),
  module1223 = require('./1223'),
  module1333 = require('./1333');

function y() {
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
