var React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module515 = require('./515'),
  module500 = require('./500').strings;

function f(t) {
  var n = React.useContext(module515.AppConfigContext).theme.alert,
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
    u = t.noTitle,
    v = t.desc1,
    p = t.desc2;
  return React.default.createElement(
    module12.View,
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
        module12.Text,
        {
          style: [
            f.title,
            {
              color: n.textColor,
            },
          ],
        },
        module500.armap_privacy_dialog_title
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
              color: n.detailColor,
            },
          ],
          numberOfLines: 0,
        },
        v || module500.armap_privacy_dialog_title1,
        React.default.createElement(
          module12.Text,
          {
            style: f.link,
            onPress: t.onPressLink,
          },
          ' ' + module500.armap_privacy_dialog_title
        )
      )
    ),
    p &&
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
        p
      )
  );
}

var u = module385.HocAlert(f, false, false, false);
exports.MapARPrivacyDialogWithNavbar = u;
var v = module385.HocAlert(f, true, false, true);
exports.MapARPrivacyModalDialog = v;
