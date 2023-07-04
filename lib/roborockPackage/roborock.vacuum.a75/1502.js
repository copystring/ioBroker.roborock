exports.default = function (t, n) {
  var o, O;

  O = o = (function (o) {
    module9.default(P, o);

    var module1199 = P,
      O = w(),
      j = function () {
        var t,
          n = module12.default(module1199);

        if (O) {
          var o = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function P(t) {
      var n;
      module6.default(this, P);

      (n = j.call(this, t))._onLayout = function (t) {
        var o = t.width,
          c = t.height,
          u = Math.round(o),
          f = Math.round(c);
        console.log('ShadowTab layout', o, c, u, f);
        if (o > 0 && c > 0 && (Math.abs(u - n.state.contentWidth) >= 5 || Math.abs(f - n.state.contentHeight) >= 5))
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

    module7.default(P, [
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
              module1408.BoxShadow,
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

  o.contextType = module1199.AppConfigContext;
  return O;
};

var module50 = require('./50'),
  module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module1408 = require('./1408'),
  module1199 = require('./1199');

function O(t, n) {
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
      O(Object(c), true).forEach(function (n) {
        module50.default(t, n, c[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(c));
    else
      O(Object(c)).forEach(function (n) {
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
