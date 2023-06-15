var module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11');

function s() {
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

require('./43');

require('./39');

require('./85');

var PropTypes = require('prop-types'),
  React = require('react'),
  module302 = require('./302'),
  module60 = require('./60'),
  module83 = require('./83'),
  y = (function (u, ...args) {
    module7(x, u);

    var module60 = x,
      y = s(),
      b = function () {
        var t,
          n = module11(module60);

        if (y) {
          var o = module11(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9(this, t);
      };

    function x() {
      var n;
      module4(this, x);
      (n = b.call(this, ...args)).state = {
        inspector: null,
        mainKey: 1,
      };
      n._subscription = null;
      return n;
    }

    module5(x, [
      {
        key: 'getChildContext',
        value: function () {
          return {
            rootTag: this.props.rootTag,
          };
        },
      },
      {
        key: 'componentDidMount',
        value: function () {},
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          if (null != this._subscription) this._subscription.remove();
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = (
              <module83
                collapsable={!this.state.inspector}
                key={this.state.mainKey}
                pointerEvents="box-none"
                style={C.appContainer}
                ref={function (n) {
                  t._mainRef = n;
                }}
              >
                {this.props.children}
              </module83>
            ),
            o = this.props.WrapperComponent;
          if (null != o) n = <o>{n}</o>;
          return (
            <module302.Provider value={this.props.rootTag}>
              <module83 style={C.appContainer} pointerEvents="box-none">
                {n}
                {null}
                {this.state.inspector}
              </module83>
            </module302.Provider>
          );
        },
      },
    ]);
    return x;
  })(React.Component);

y.childContextTypes = {
  rootTag: PropTypes.number,
};
var C = module60.create({
  appContainer: {
    flex: 1,
  },
});
module.exports = y;
