require('./13');

var module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module1199 = require('./1199'),
  module1346 = require('./1346');

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

var y = (function (t) {
  module9.default(P, t);

  var s = P,
    module1199 = w(),
    y = function () {
      var t,
        n = module12.default(s);

      if (module1199) {
        var o = module12.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module11.default(this, t);
    };

  function P(t) {
    var s, n;
    module6.default(this, P);
    (n = y.call(this, t)).state = {
      page: 0,
      confirmColor: '#007AFF',
      groups: null != (s = t.groups) ? s : [],
    };
    return n;
  }

  module7.default(P, [
    {
      key: 'dismissModalView',
      value: function () {
        var t,
          s = this,
          n = !(arguments.length > 0 && undefined !== arguments[0]) || arguments[0];
        if (!(null == (t = this.guideView) || null == t.dismissModalView)) t.dismissModalView(false);
        setTimeout(function () {
          if (n)
            s.setState({
              page: 0,
              groups: [],
            });
        }, 100);
      },
    },
    {
      key: 'show',
      value: function () {
        var t;
        if (this.state.groups.length > 0) null == (t = this.guideView) || null == t.show || t.show();
      },
    },
    {
      key: 'add',
      value: function (t) {
        this.setState({
          groups: this.state.groups.concat(t),
        });
      },
    },
    {
      key: 'next',
      value: function () {
        if (this.state.groups && 0 != this.state.groups.length) {
          var t = this.state.page + 1 >= this.state.groups.length ? this.state.groups.length - 1 : this.state.page + 1;
          this.setState({
            page: t,
          });
        } else {
          var s;
          if (!(null == (s = this.guideView) || null == s.dismissModalView)) s.dismissModalView(false);
        }
      },
    },
    {
      key: 'last',
      value: function () {
        if (this.state.groups) {
          var t = this.state.page - 1 < 0 ? 0 : this.state.page - 1;
          this.setState({
            page: t,
          });
        }
      },
    },
    {
      key: 'toggleSwitch',
      value: function (t) {
        var s = this.state.groups;
        s[this.state.page].switchInfo.on = t;
        this.setState({
          groups: s,
        });
      },
    },
    {
      key: 'render',
      value: function () {
        var t,
          s,
          o = this,
          u = (null != (t = null == (s = this.state.groups) ? undefined : s.length) ? t : 0) > 0 ? this.state.groups[this.state.page] : this.props,
          l = function () {
            var t, s;
            if (o.state.page == (null != (t = null == (s = o.state.groups) ? undefined : s.length) ? t : 1) - 1) o.dismissModalView();
            else o.next();
          };

        return React.default.createElement(
          module1346.default,
          module22.default({}, u, {
            ref: function (t) {
              o.guideView = t;
            },
            onPressLeft: function () {
              if (u.onPressLeft) u.onPressLeft();
              l();
            },
            onPressSingleButton: function () {
              if (u.onPressSingleButton) u.onPressSingleButton();
              l();
            },
            onPressGoSetting: function () {
              if (u.onPressGoSetting) u.onPressGoSetting();
              l();
            },
            onPressClose: function () {
              if (u.onPressClose) u.onPressClose();
              l();
            },
            isModal: this.props.isModal,
          })
        );
      },
    },
    {
      key: 'isSwitchOn',
      get: function () {
        var t, s, n;
        return null != (t = null == (s = this.state.groups[this.state.page]) ? undefined : null == (n = s.switchInfo) ? undefined : n.on) && t;
      },
    },
  ]);
  return P;
})(React.Component);

exports.default = y;
y.contextType = module1199.AppConfigContext;
