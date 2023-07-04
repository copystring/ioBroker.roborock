exports.default = function (t, n) {
  var o, b;

  b = o = (function (o) {
    module7.default(P, o);

    var module515 = P,
      b = w(),
      j = function () {
        var t,
          n = module11.default(module515);

        if (b) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function P(t) {
      var n;
      module4.default(this, P);

      (n = j.call(this, t))._onLayout = function (t) {
        var o = t.width,
          c = t.height;
        console.log('ShadowTab layout', o, c);
        if (o > 0 && c > 0 && (o != n.state.contentWidth || c != n.state.contentHeight))
          n.setState({
            contentWidth: o,
            contentHeight: c,
          });
      };

      n.state = {
        contentWidth: 0,
        contentHeight: 0,
      };
      return n;
    }

    module5.default(P, [
      {
        key: 'render',
        value: function () {
          var o = this,
            u = this.context.theme,
            f = module22.default({}, this.props);
          console.log('ShadowTab render', this.state.contentWidth, this.state.contentHeight);
          var s = v(
              v(
                {
                  width: this.state.contentWidth,
                  height: this.state.contentHeight,
                },
                n
              ),
              {},
              {
                color: u.shadowColor,
              },
              u.shadowConfig
            ),
            h = React.default.createElement(
              t,
              module22.default({}, f, {
                onLayout: this._onLayout,
                ref: function (t) {
                  return (o.contentView = t);
                },
              })
            ),
            l = React.default.createElement(
              module1161.BoxShadow,
              {
                setting: s,
              },
              h
            );
          return this.state.contentWidth > 0 && this.state.contentHeight > 0 ? l : h;
        },
      },
    ]);
    return P;
  })(React.default.Component);

  o.contextType = module515.AppConfigContext;
  return b;
};

var module50 = require('./50'),
  module22 = require('./22'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module1161 = require('./1161'),
  module515 = require('./515');

function b(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var c = Object.getOwnPropertySymbols(t);
    if (n)
      c = c.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, c);
  }

  return o;
}

function v(t) {
  for (var n = 1; n < arguments.length; n++) {
    var c = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      b(Object(c), true).forEach(function (n) {
        module50.default(t, n, c[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(c));
    else
      b(Object(c)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(c, n));
      });
  }

  return t;
}

function w() {
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
