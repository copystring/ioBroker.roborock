require('./387');

require('./390');

var React = (function (t, o) {
    if (!o && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var n = f(o);
    if (n && n.has(t)) return n.get(t);
    var l = {},
      c = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var u in t)
      if ('default' !== u && Object.prototype.hasOwnProperty.call(t, u)) {
        var s = c ? Object.getOwnPropertyDescriptor(t, u) : null;
        if (s && (s.get || s.set)) Object.defineProperty(l, u, s);
        else l[u] = t[u];
      }

    l.default = t;
    if (n) n.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module506 = require('./506');

function f(t) {
  if ('function' != typeof WeakMap) return null;
  var o = new WeakMap(),
    n = new WeakMap();
  return (f = function (t) {
    return t ? n : o;
  })(t);
}

var module491 = require('./491').strings;

function s(t) {
  var l = React.useContext(module506.AppConfigContext).theme.alert,
    f = module12.StyleSheet.create({
      container: {
        padding: 20,
        alignItems: 'center',
      },
      title: {
        color: 'rgba(0,0,0,0.8)',
        fontSize: 18,
        marginBottom: 20,
        fontWeight: 'bold',
      },
      content: {
        fontSize: 14,
        color: 'rgba(0,0,0,0.6)',
        lineHeight: 24,
        flexDirection: 'row',
      },
      link: {
        color: '#007AFF',
        fontSize: 14,
      },
    }),
    s = t.noTitle,
    v = t.desc1,
    y = t.desc2;
  return React.default.createElement(
    module12.View,
    {
      style: [
        f.container,
        {
          backgroundColor: l.backgroundColor,
        },
      ],
    },
    !s &&
      React.default.createElement(
        module12.Text,
        {
          style: [
            f.title,
            {
              color: l.textColor,
            },
          ],
        },
        module491.camera_monitor_privacy_title
      ),
    React.default.createElement(
      module12.Text,
      null,
      React.default.createElement(
        module12.Text,
        {
          style: [
            f.content,
            {
              color: l.detailColor,
            },
          ],
          numberOfLines: 0,
        },
        v || module491.real_time_monitor_privacy_desc,
        React.default.createElement(
          module12.Text,
          {
            style: f.link,
            onPress: t.onPressLink,
          },
          ' ' + module491.monitor_privacy_dialog_title
        )
      )
    ),
    y &&
      React.default.createElement(
        module12.Text,
        {
          style: [
            f.content,
            {
              marginTop: 15,
            },
          ],
          numberOfLines: 0,
        },
        y
      )
  );
}

var v = module381.HocAlert(s, false, false, true);
exports.MonitorPrivacyDialog = v;
var y = module381.HocAlert(s, false, false, false);
exports.MonitorPrivacyDialogWithNavbar = y;
var p = module381.HocAlert(s, true, false, true);
exports.MonitorPrivacyModalDialog = p;
