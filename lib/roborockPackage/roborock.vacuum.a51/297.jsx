var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  module298 = require('./298');

function f() {
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

require('./67');

require('./52');

var React = require('react'),
  module61 = require('./61'),
  y = (function (t) {
    module9.default(C, t);

    var module61 = C,
      y = f(),
      R = function () {
        var t,
          n = module12.default(module61);

        if (y) {
          var o = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function C() {
      module6.default(this, C);
      return R.apply(this, arguments);
    }

    module7.default(C, [
      {
        key: 'render',
        value: function () {
          console.warn('<InputAccessoryView> is only supported on iOS.');
          return 0 === React.Children.count(this.props.children) ? null : (
            <module298.default style={[this.props.style, v.container]} nativeID={this.props.nativeID} backgroundColor={this.props.backgroundColor}>
              {this.props.children}
            </module298.default>
          );
        },
      },
    ]);
    return C;
  })(React.Component),
  v = module61.create({
    container: {
      position: 'absolute',
    },
  });

module.exports = y;
