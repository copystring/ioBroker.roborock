exports.showFinishCurrentTastAlertIfNeeded = function () {
  var n = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : null;
  return new Promise(function (o, c) {
    if (module377.RSM.isRunning) {
      var s = {
          text: module491.localization_strings_Main_MainPage_11,
        },
        u = {
          text: module491.map_object_cancel_privacy_stop,
          onPress: function () {
            module407.default
              .stop()
              .then(function () {
                o();
              })
              .catch(function (n) {
                c(n);
              });
          },
        };
      if (n) n('', module491.auto_split_will_trigger_after_cleaning_and_charing, [s, u]);
      else globals.Alert.alert('', module491.auto_split_will_trigger_after_cleaning_and_charing, [s, u]);
    } else o();
  });
};

var module377 = require('./377'),
  module407 = require('./407'),
  module491 = require('./491').strings;
