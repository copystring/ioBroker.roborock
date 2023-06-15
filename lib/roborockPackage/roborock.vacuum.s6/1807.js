require('./387');

require('./390');

var React = (function (t, o) {
    if (!o && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var n = u(o);
    if (n && n.has(t)) return n.get(t);
    var l = {},
      c = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var f in t)
      if ('default' !== f && Object.prototype.hasOwnProperty.call(t, f)) {
        var p = c ? Object.getOwnPropertyDescriptor(t, f) : null;
        if (p && (p.get || p.set)) Object.defineProperty(l, f, p);
        else l[f] = t[f];
      }

    l.default = t;
    if (n) n.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module506 = require('./506');

function u(t) {
  if ('function' != typeof WeakMap) return null;
  var o = new WeakMap(),
    n = new WeakMap();
  return (u = function (t) {
    return t ? n : o;
  })(t);
}

var module491 = require('./491'),
  p = module491.strings;

function y(t) {
  var l = React.useContext(module506.AppConfigContext).theme.alert,
    u = module12.StyleSheet.create({
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
    });
  return React.default.createElement(
    module12.View,
    {
      style: [
        u.container,
        {
          backgroundColor: l.backgroundColor,
        },
      ],
    },
    React.default.createElement(
      module12.Text,
      {
        style: [
          u.title,
          {
            color: l.textColor,
          },
        ],
      },
      p.map_object_privacy_title
    ),
    React.default.createElement(
      module12.Text,
      null,
      React.default.createElement(
        module12.Text,
        {
          style: [
            u.content,
            {
              color: l.detailColor,
            },
          ],
          numberOfLines: 0,
        },
        p.map_object_privacy_alert + module491.wordSeperator(),
        React.default.createElement(
          module12.Text,
          {
            style: u.link,
            onPress: t.onPressLink,
          },
          p.map_object_privacy_alert_link
        )
      )
    )
  );
}

var s = module381.HocAlert(y, false, false, true);
exports.PhotoFeaturePrivacyDialog = s;
var v = module381.HocAlert(y, true, false, true);
exports.PhotoFeaturePrivacyModalDialog = v;
