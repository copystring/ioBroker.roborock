var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1343 = require('./1343');

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

module13.NativeModules.Orientation;

var y = globals.isRTL,
  h = (function (t) {
    module9.default(E, t);

    var y = E,
      h = v(),
      b = function () {
        var t,
          o = module12.default(y);

        if (h) {
          var n = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, n);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function E() {
      module6.default(this, E);
      return b.apply(this, arguments);
    }

    module7.default(E, [
      {
        key: 'componentDidMount',
        value: function () {
          if (!this.isPortrait)
            globals.navigation.setParams({
              isLandscape: true,
            });
        },
      },
      {
        key: 'render',
        value: function () {
          var t = Object.keys(module1343.VideoError).map(function (t) {
            return module1343.VideoError[t];
          });
          return React.default.createElement(module13.FlatList, {
            style: [
              w.wrap,
              {
                paddingLeft: this.isPortrait ? 0 : module1343.AppBarMarginTop + 20,
              },
            ],
            data: t,
            showsVerticalScrollIndicator: false,
            renderItem: function (t) {
              var o = t.item;
              return React.default.createElement(
                module13.View,
                {
                  style: w.row,
                },
                React.default.createElement(
                  module13.View,
                  {
                    style: w.top,
                  },
                  React.default.createElement(
                    module13.Text,
                    {
                      style: w.code,
                    },
                    'Error ',
                    o.code,
                    '  '
                  )
                ),
                React.default.createElement(
                  module13.View,
                  {
                    style: w.bottom,
                  },
                  React.default.createElement(
                    module13.Text,
                    {
                      style: w.resolve,
                    },
                    o.resolve
                  )
                )
              );
            },
          });
        },
      },
      {
        key: 'isPortrait',
        get: function () {
          var t, o, n, l, u;
          return (
            null ==
              (t =
                null == (o = this.props)
                  ? undefined
                  : null == (n = o.navigation)
                  ? undefined
                  : null == (l = n.state)
                  ? undefined
                  : null == (u = l.params)
                  ? undefined
                  : u.isPortrait) || t
          );
        },
      },
    ]);
    return E;
  })(React.default.Component);

exports.default = h;
var w = module13.StyleSheet.create({
  wrap: {
    backgroundColor: 'white',
    paddingLeft: module1343.AppBarMarginTop > 0 ? module1343.AppBarMarginTop + 20 : 0,
  },
  row: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 0.6,
  },
  top: {
    flexDirection: y ? 'row-reverse' : 'row',
    marginBottom: 15,
  },
  code: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 20,
  },
  msg: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 16,
  },
  resolve: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: 14,
  },
  bottom: {
    flexDirection: y ? 'row-reverse' : 'row',
  },
});
