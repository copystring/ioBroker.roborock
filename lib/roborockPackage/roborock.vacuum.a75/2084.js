var regeneratorRuntime = require('regenerator-runtime'),
  module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module385 = require('./385');

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

var module1343 = require('./1343'),
  module393 = require('./393'),
  V = (function (t) {
    module9.default(C, t);

    var n = C,
      module1343 = p(),
      V = function () {
        var t,
          o = module12.default(n);

        if (module1343) {
          var l = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, l);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function C(t) {
      var n;
      module6.default(this, C);
      (n = V.call(this, t)).state = {
        cloludKeyValue: ' ',
      };
      return n;
    }

    module7.default(C, [
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
              bottomDetailWidth: module13.Dimensions.get('window').width - 50,
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
                    module385.SettingListItemView,
                    module22.default({}, t, {
                      key: n,
                      titleColor: 'rgba(0,0,0,0.8)',
                      style: {
                        width: module13.Dimensions.get('window').width,
                      },
                    })
                  )
                : React.default.createElement(module13.View, {
                    style: k.section,
                    key: n,
                  })
              : React.default.createElement(module13.View, {
                  key: n,
                });
          });
          return React.default.createElement(
            module13.View,
            {
              style: k.containterView,
            },
            React.default.createElement(
              module13.ScrollView,
              {
                style: k.containter,
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
          var t, n, l, u;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    c.next = 2;
                    return regeneratorRuntime.default.awrap(module393.getPrivacyAgreementByKey(module393.CloudStorageKeys.PrivacyAgreementStatusWithVersionKey));

                  case 2:
                    t = c.sent;
                    c.next = 5;
                    return regeneratorRuntime.default.awrap(module393.getPrivacyAgreementByKey(module393.CloudStorageKeys.PrivacyAgreementStatusKey));

                  case 5:
                    n = c.sent;
                    l =
                      '\u4e91\u7aef\u5b58\u50a8\u969c\u788d\u7269\u9690\u79c1\u8bb0\u5f55\nkey:' +
                      module393.CloudStorageKeys.PrivacyAgreementStatusWithVersionKey +
                      ' \n' +
                      JSON.stringify(t) +
                      ' \n';
                    u = '\u4e91\u7aef\u7167\u7247\u9690\u79c1\u8bb0\u5f55\nkey:' + module393.CloudStorageKeys.PrivacyAgreementStatusKey + '  \n' + JSON.stringify(n);
                    this.setState({
                      cloludKeyValue: '' + l + u,
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
    return C;
  })(React.Component);

exports.default = V;
var k = module13.StyleSheet.create({
  containterView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  containter: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop: module1343.NavigationBarHeight,
    paddingBottom: 20,
  },
});
