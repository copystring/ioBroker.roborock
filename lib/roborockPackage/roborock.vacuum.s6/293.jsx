var module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module294 = require('./294');

function f() {
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

require('./66');

require('./51');

var React = require('react'),
  module60 = require('./60'),
  y = (function (t) {
    module7.default(C, t);

    var module60 = C,
      y = f(),
      R = function () {
        var t,
          n = module11.default(module60);

        if (y) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function C() {
      module4.default(this, C);
      return R.apply(this, arguments);
    }

    module5.default(C, [
      {
        key: 'render',
        value: function () {
          console.warn('<InputAccessoryView> is only supported on iOS.');
          return 0 === React.Children.count(this.props.children) ? null : (
            <module294.default style={[this.props.style, v.container]} nativeID={this.props.nativeID} backgroundColor={this.props.backgroundColor}>
              {this.props.children}
            </module294.default>
          );
        },
      },
    ]);
    return C;
  })(React.Component),
  v = module60.create({
    container: {
      position: 'absolute',
    },
  });

module.exports = y;
