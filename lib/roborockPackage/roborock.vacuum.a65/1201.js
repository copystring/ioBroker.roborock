exports.showFinishCurrentTastAlertIfNeeded = function () {
  var n = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : null;
  return new Promise(function (o, c) {
    if (module381.RSM.isRunning) {
      var s = {
          text: module510.localization_strings_Main_MainPage_11,
        },
        u = {
          text: module510.map_object_cancel_privacy_stop,
          onPress: function () {
            module416.default
              .stop()
              .then(function () {
                o();
              })
              .catch(function (n) {
                c(n);
              });
          },
        };
      if (n) n('', module510.auto_split_will_trigger_after_cleaning_and_charing, [s, u]);
      else globals.Alert.alert('', module510.auto_split_will_trigger_after_cleaning_and_charing, [s, u]);
    } else o();
  });
};

var module381 = require('./381'),
  module416 = require('./416'),
  module510 = require('./510').strings;
