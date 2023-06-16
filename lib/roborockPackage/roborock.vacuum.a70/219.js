var module14 = require('./14');

module.exports = function (s) {
  module14(!(s.delayPressIn < 0 || s.delayPressOut < 0 || s.delayLongPress < 0), 'Touchable components cannot have negative delay properties');
};
