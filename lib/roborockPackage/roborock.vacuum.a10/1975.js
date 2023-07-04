var regeneratorRuntime = require('regenerator-runtime'),
  module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = h(n);
    if (o && o.has(t)) return o.get(t);
    var u = {},
      l = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var f = l ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (f && (f.get || f.set)) Object.defineProperty(u, c, f);
        else u[c] = t[c];
      }

    u.default = t;
    if (o) o.set(t, u);
    return u;
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381');

function h(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (h = function (t) {
    return t ? o : n;
  })(t);
}

function w() {
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

var module934 = require('./934'),
  module389 = require('./389'),
  k = (function (t) {
    module7.default(P, t);

    var h = P,
      module934 = w(),
      k = function () {
        var t,
          n = module11.default(h);

        if (module934) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function P(t) {
      var n;
      module4.default(this, P);
      (n = k.call(this, t)).state = {
        cloludKeyValue: ' ',
      };
      return n;
    }

    module5.default(P, [
      {
        key: 'componentDidMount',
        value: function () {
          this.getCloudData();
        },
      },
      {
        key: 'getMenuDatas',
        value: function () {
          return [
            {
              title: '\u4e91\u7aefKey\u503c',
              funcId: 'debug_view_page_cloud_key',
              visible: true,
              bottomDetail: this.state.cloludKeyValue,
              titleColor: 'rgba(0,0,0,0.8)',
              bottomDetailWidth: module12.Dimensions.get('window').width - 50,
              shouldShowBottomLine: true,
              shouldShowBottomLongLine: true,
              shouldShowRightArrow: false,
            },
          ];
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this.getMenuDatas().map(function (t, n) {
            return t.visible
              ? t.title
                ? React.default.createElement(
                    module381.SettingListItemView,
                    module21.default({}, t, {
                      key: n,
                      titleColor: 'rgba(0,0,0,0.8)',
                      style: {
                        width: module12.Dimensions.get('window').width,
                      },
                    })
                  )
                : React.default.createElement(module12.View, {
                    style: K.section,
                    key: n,
                  })
              : React.default.createElement(module12.View, {
                  key: n,
                });
          });
          return React.default.createElement(
            module12.View,
            {
              style: K.containterView,
            },
            React.default.createElement(
              module12.ScrollView,
              {
                style: K.containter,
                showsVerticalScrollIndicator: false,
              },
              t
            )
          );
        },
      },
      {
        key: 'openCloudKeyPage',
        value: function () {
          this.props.navigation.navigate('CloudKeyViewPage', {
            title: '\u8c03\u8bd5\u6a21\u5f0f',
          });
        },
      },
      {
        key: 'getCloudData',
        value: function () {
          var t, o, u, l;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    c.next = 2;
                    return regeneratorRuntime.default.awrap(module389.getPrivacyAgreementByKey(module389.CloudStorageKeys.PrivacyAgreementStatusWithVersionKey));

                  case 2:
                    t = c.sent;
                    c.next = 5;
                    return regeneratorRuntime.default.awrap(module389.getPrivacyAgreementByKey(module389.CloudStorageKeys.PrivacyAgreementStatusKey));

                  case 5:
                    o = c.sent;
                    u =
                      '\u4e91\u7aef\u5b58\u50a8\u969c\u788d\u7269\u9690\u79c1\u8bb0\u5f55\nkey:' +
                      module389.CloudStorageKeys.PrivacyAgreementStatusWithVersionKey +
                      ' \n' +
                      JSON.stringify(t) +
                      ' \n';
                    l = '\u4e91\u7aef\u7167\u7247\u9690\u79c1\u8bb0\u5f55\nkey:' + module389.CloudStorageKeys.PrivacyAgreementStatusKey + '  \n' + JSON.stringify(o);
                    this.setState({
                      cloludKeyValue: '' + u + l,
                    });

                  case 9:
                  case 'end':
                    return c.stop();
                }
            },
            null,
            this,
            null,
            Promise
          );
        },
      },
    ]);
    return P;
  })(React.Component);

exports.default = k;
var K = module12.StyleSheet.create({
  containterView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  containter: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop: module934.NavigationBarHeight,
    paddingBottom: 20,
  },
});
