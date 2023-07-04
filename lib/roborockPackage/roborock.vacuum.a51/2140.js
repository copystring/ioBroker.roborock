var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module394 = require('./394');

function p() {
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
  module9.default(w, t);

  var n = w,
    v = p(),
    k = function () {
      var t,
        o = module12.default(n);

      if (v) {
        var u = module12.default(this).constructor;
        t = Reflect.construct(o, arguments, u);
      } else t = o.apply(this, arguments);

      return module11.default(this, t);
    };

  function w(t) {
    var n;
    module6.default(this, w);
    (n = k.call(this, t)).state = {};
    return n;
  }

  module7.default(w, [
    {
      key: 'componentDidMount',
      value: function () {
        this.onPressCopyButton();
      },
    },
    {
      key: 'UNSAFE_componentWillMount',
      value: function () {},
    },
    {
      key: 'render',
      value: function () {
        return React.default.createElement(
          module13.View,
          {
            style: C.container,
          },
          React.default.createElement(
            module13.ScrollView,
            null,
            React.default.createElement(
              module13.Text,
              {
                style: C.textInfoView,
              },
              module394.default.sharedCache().soundPackageListData
            )
          )
        );
      },
    },
    {
      key: 'onPressCopyButton',
      value: function () {
        var t = module394.default.sharedCache().soundPackageListData;
        module13.Clipboard.setString(t);
        globals.showToast('\u590d\u5236\u6210\u529f');
      },
    },
  ]);
  return w;
})(React.Component);

exports.default = v;
var C = module13.StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  textInfoView: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    fontSize: 16,
    color: '#000000',
  },
});
