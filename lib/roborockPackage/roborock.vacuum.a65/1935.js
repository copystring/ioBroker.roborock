var React = require('react'),
  module13 = require('./13'),
  module385 = require('./385'),
  module1200 = require('./1200'),
  module510 = require('./510'),
  f = module510.strings;

function s(t) {
  var n = React.useContext(module1200.AppConfigContext).theme.alert,
    s = module13.StyleSheet.create({
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
    module13.View,
    {
      style: [
        s.container,
        {
          backgroundColor: n.backgroundColor,
        },
      ],
    },
    React.default.createElement(
      module13.Text,
      {
        style: [
          s.title,
          {
            color: n.textColor,
          },
        ],
      },
      f.map_object_privacy_title
    ),
    React.default.createElement(
      module13.Text,
      null,
      React.default.createElement(
        module13.Text,
        {
          style: [
            s.content,
            {
              color: n.detailColor,
            },
          ],
          numberOfLines: 0,
        },
        f.map_object_privacy_alert + module510.wordSeperator(),
        React.default.createElement(
          module13.Text,
          {
            style: s.link,
            onPress: t.onPressLink,
          },
          f.map_object_privacy_alert_link
        )
      )
    )
  );
}

var v = module385.HocAlert(s, false, false, true);
exports.PhotoFeaturePrivacyDialog = v;

var _ = module385.HocAlert(s, true, false, true);

exports.PhotoFeaturePrivacyModalDialog = _;
