var React = require('react'),
  module13 = require('./13'),
  module385 = require('./385'),
  module1200 = require('./1200'),
  module510 = require('./510').strings;

function f(t) {
  var n = React.useContext(module1200.AppConfigContext).theme.alert,
    f = module13.StyleSheet.create({
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
    u = t.noTitle,
    v = t.desc1,
    p = t.desc2;
  return React.default.createElement(
    module13.View,
    {
      style: [
        f.container,
        {
          backgroundColor: n.backgroundColor,
        },
      ],
    },
    !u &&
      React.default.createElement(
        module13.Text,
        {
          style: [
            f.title,
            {
              color: n.textColor,
            },
          ],
        },
        module510.armap_privacy_dialog_title
      ),
    React.default.createElement(
      module13.Text,
      null,
      React.default.createElement(
        module13.Text,
        {
          style: [
            f.content,
            {
              color: n.detailColor,
            },
          ],
          numberOfLines: 0,
        },
        v || module510.armap_privacy_dialog_title1,
        React.default.createElement(
          module13.Text,
          {
            style: f.link,
            onPress: t.onPressLink,
          },
          ' ' + module510.armap_privacy_dialog_title
        )
      )
    ),
    p &&
      React.default.createElement(
        module13.Text,
        {
          style: [
            f.content,
            {
              marginTop: 15,
            },
          ],
          numberOfLines: 0,
        },
        p
      )
  );
}

var u = module385.HocAlert(f, false, false, false);
exports.MapARPrivacyDialogWithNavbar = u;
var v = module385.HocAlert(f, true, false, true);
exports.MapARPrivacyModalDialog = v;
