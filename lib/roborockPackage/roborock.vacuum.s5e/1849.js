require('./391');

require('./394');

var React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module1121 = require('./1121'),
  module505 = require('./505').strings;

function f(t) {
  var o = React.useContext(module1121.AppConfigContext).theme.alert,
    c = module12.StyleSheet.create({
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
    f = t.noTitle,
    u = t.desc1,
    y = t.desc2,
    _ = t.title,
    b = t.privacyTitle;
  return React.default.createElement(
    module12.View,
    {
      style: [
        c.container,
        {
          backgroundColor: o.backgroundColor,
        },
      ],
    },
    !f &&
      React.default.createElement(
        module12.Text,
        {
          style: [
            c.title,
            {
              color: o.textColor,
            },
          ],
        },
        _ || module505.camera_monitor_privacy_title
      ),
    React.default.createElement(
      module12.Text,
      null,
      React.default.createElement(
        module12.Text,
        {
          style: [
            c.content,
            {
              color: o.detailColor,
            },
          ],
          numberOfLines: 0,
        },
        u || module505.real_time_monitor_privacy_desc,
        React.default.createElement(
          module12.Text,
          {
            style: c.link,
            onPress: t.onPressLink,
          },
          ' ' + b || module505.monitor_privacy_dialog_title
        )
      )
    ),
    y &&
      React.default.createElement(
        module12.Text,
        {
          style: [
            c.content,
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

var u = module385.HocAlert(f, false, false, true);
exports.MonitorPrivacyDialog = u;
var y = module385.HocAlert(f, false, false, false);
exports.MonitorPrivacyDialogWithNavbar = y;

var _ = module385.HocAlert(f, true, false, true);

exports.MonitorPrivacyModalDialog = _;
