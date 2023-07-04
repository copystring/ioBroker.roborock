var module13 = require('./13');

module.exports = function (s) {
  module13(!(s.delayPressIn < 0 || s.delayPressOut < 0 || s.delayLongPress < 0), 'Touchable components cannot have negative delay properties');
};
