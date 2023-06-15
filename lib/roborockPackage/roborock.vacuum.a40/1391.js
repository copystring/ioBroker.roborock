exports.showFinishCurrentTastAlertIfNeeded = function () {
  var n = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : null;
  return new Promise(function (o, c) {
    if (module381.RSM.isRunning) {
      var s = {
          text: module500.localization_strings_Main_MainPage_11,
        },
        u = {
          text: module500.map_object_cancel_privacy_stop,
          onPress: function () {
            module414.default
              .stop()
              .then(function () {
                o();
              })
              .catch(function (n) {
                c(n);
              });
          },
        };
      if (n) n('', module500.auto_split_will_trigger_after_cleaning_and_charing, [s, u]);
      else globals.Alert.alert('', module500.auto_split_will_trigger_after_cleaning_and_charing, [s, u]);
    } else o();
  });
};

var module381 = require('./381'),
  module414 = require('./414'),
  module500 = require('./500').strings;
