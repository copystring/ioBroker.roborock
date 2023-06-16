var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12');

function h() {
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

var v = (function (t) {
  module7.default(V, t);

  var n = V,
    v = h(),
    p = function () {
      var t,
        u = module11.default(n);

      if (v) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(u, arguments, o);
      } else t = u.apply(this, arguments);

      return module9.default(this, t);
    };

  function V(t) {
    module4.default(this, V);
    return p.call(this, t);
  }

  module5.default(V, [
    {
      key: 'getViewDatas',
      value: function () {
        return [
          {
            View: 1,
          },
          {
            View: 2,
          },
          {
            View: 3,
          },
          {
            View: 4,
          },
          {
            View: 5,
          },
          {
            View: 6,
          },
          {
            View: 7,
          },
          {
            View: 8,
          },
        ];
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this.props,
          n = t.volume,
          u = t.isCalling,
          o = this.getViewDatas(),
          c = o.map(function (t, c) {
            var l = u ? (c >= o.length - n ? 1 : 0.3) : c + 1 <= n ? 1 : 0.3;
            return React.default.createElement(module12.View, {
              style: [
                y.modeView,
                {
                  opacity: l,
                },
              ],
            });
          });
        return React.default.createElement(
          module12.View,
          {
            style: y.container,
          },
          c
        );
      },
    },
    {
      key: 'componentDidMount',
      value: function () {},
    },
    {
      key: 'componentWillUnmount',
      value: function () {},
    },
  ]);
  return V;
})(React.Component);

exports.default = v;
var y = module12.StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    height: 12,
    width: 45,
  },
  modeView: {
    height: 12,
    width: 3,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
  },
});
