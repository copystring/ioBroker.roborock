require('./381');

var regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module407 = require('./407'),
  React = require('react'),
  module483 = require('./483');

function v() {
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

var module491 = require('./491').strings,
  module12 = require('./12'),
  p = module12.StyleSheet,
  w = module12.View,
  I = module12.Text,
  module936 = require('./936'),
  R = (function (t) {
    module7.default(R, t);

    var module12 = R,
      p = v(),
      N = function () {
        var t,
          n = module11.default(module12);

        if (p) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function R(t) {
      var n;
      module4.default(this, R);
      (n = N.call(this, t)).fetchNetworkInfo();
      n.state = {
        dataSource: new module483.default.DataSource({
          rowHasChanged: function (t, n) {
            return t !== n;
          },
        }),
      };
      var l = [
        {
          name: module491.localization_strings_Setting_General_NetInfoPage_0,
          value: '\u83b7\u53d6\u4e2d...',
        },
        {
          name: 'RSSI',
          value: '',
        },
        {
          name: module491.localization_strings_Setting_General_NetInfoPage_1,
          value: '\u83b7\u53d6\u4e2d...',
        },
        {
          name: module491.localization_strings_Setting_General_NetInfoPage_2,
          value: '\u83b7\u53d6\u4e2d...',
        },
      ];
      n.setState({
        dataSource: n.state.dataSource.cloneWithRows(l),
      });
      return n;
    }

    module5.default(R, [
      {
        key: 'fetchNetworkInfo',
        value: function () {
          var t, o;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    l.prev = 0;
                    l.next = 3;
                    return regeneratorRuntime.default.awrap(module407.default.getNetworkInfo());

                  case 3:
                    t = l.sent;
                    console.log('fetchNetworkInfo --- ' + JSON.stringify(t));
                    o = [
                      {
                        name: module491.localization_strings_Setting_General_NetInfoPage_0,
                        value: t.result.ssid,
                      },
                      {
                        name: 'RSSI',
                        value: t.result.rssi,
                      },
                      {
                        name: module491.localization_strings_Setting_General_NetInfoPage_1,
                        value: t.result.ip,
                      },
                      {
                        name: module491.localization_strings_Setting_General_NetInfoPage_2,
                        value: t.result.mac,
                      },
                    ];
                    this.setState({
                      dataSource: this.state.dataSource.cloneWithRows(o),
                    });
                    l.next = 13;
                    break;

                  case 9:
                    l.prev = 9;
                    l.t0 = l.catch(0);
                    globals.showToast(module491.robot_communication_exception);
                    console.log('fetchNetworkInfo  error: ' + ('object' == typeof l.t0 ? JSON.stringify(l.t0) : l.t0));

                  case 13:
                  case 'end':
                    return l.stop();
                }
            },
            null,
            this,
            [[0, 9]],
            Promise
          );
        },
      },
      {
        key: 'render',
        value: function () {
          return React.default.createElement(
            w,
            {
              style: x.container,
            },
            React.default.createElement(module483.default, {
              dataSource: this.state.dataSource,
              renderRow: this.renderRow.bind(this),
              enableEmptySections: true,
            })
          );
        },
      },
      {
        key: 'renderRow',
        value: function (t, n, o) {
          return React.default.createElement(
            w,
            {
              style: {
                flex: 1,
              },
            },
            React.default.createElement(
              w,
              {
                style: x.rowContainer,
              },
              React.default.createElement(
                I,
                {
                  style: x.title,
                },
                t.name
              ),
              React.default.createElement(w, {
                style: x.placeholder,
              }),
              React.default.createElement(
                I,
                {
                  style: x.info,
                },
                t.value
              )
            ),
            React.default.createElement(w, {
              style: x.separator,
            })
          );
        },
      },
    ]);
    return R;
  })(React.default.Component);

exports.default = R;
var x = p.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'stretch',
    backgroundColor: '#ffffff',
    marginBottom: 0,
    marginTop: module936.NavigationBarHeight,
  },
  rowContainer: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    height: 50,
    marginLeft: 22,
    marginRight: 22,
  },
  title: {
    fontSize: 15,
    color: 'rgba(0,0,0,0.8)',
    alignItems: 'center',
  },
  info: {
    fontSize: 15,
    color: '#rgba(120,120,120,0.8)',
    alignItems: 'center',
  },
  placeholder: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd',
    marginLeft: 22,
    marginRight: 22,
  },
});
