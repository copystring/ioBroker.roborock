exports.showFinishCurrentTastAlertIfNeeded = function () {
  var n = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : null;
  return new Promise(function (o, c) {
    if (module381.RSM.isRunning) {
      var s = {
          text: module505.localization_strings_Main_MainPage_11,
        },
        u = {
          text: module505.map_object_cancel_privacy_stop,
          onPress: function () {
            module415.default
              .stop()
              .then(function () {
                o();
              })
              .catch(function (n) {
                c(n);
              });
          },
        };
      if (n) n('', module505.auto_split_will_trigger_after_cleaning_and_charing, [s, u]);
      else globals.Alert.alert('', module505.auto_split_will_trigger_after_cleaning_and_charing, [s, u]);
    } else o();
  });
};

var module381 = require('./381'),
  module415 = require('./415'),
  module505 = require('./505').strings;
