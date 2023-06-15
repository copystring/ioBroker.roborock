var PropTypes = require('prop-types'),
  module13 = require('./13'),
  o = PropTypes.default.shape({
    title: PropTypes.default.string,
    key: PropTypes.default.string.isRequired,
  });

exports.NavigationRoutePropType = o;
var l = PropTypes.default.shape({
  routes: PropTypes.default.arrayOf(o).isRequired,
  index: PropTypes.default.number.isRequired,
});
exports.NavigationStatePropType = l;
var f = {
  panX: PropTypes.default.object.isRequired,
  offsetX: PropTypes.default.object.isRequired,
  layout: PropTypes.default.shape({
    measured: PropTypes.default.bool.isRequired,
    height: PropTypes.default.number.isRequired,
    width: PropTypes.default.number.isRequired,
  }).isRequired,
  navigationState: l.isRequired,
  position: PropTypes.default.object.isRequired,
  jumpTo: PropTypes.default.func.isRequired,
  useNativeDriver: PropTypes.default.bool,
};
exports.SceneRendererPropType = f;
var s = {
  layout: PropTypes.default.shape({
    measured: PropTypes.default.bool.isRequired,
    height: PropTypes.default.number.isRequired,
    width: PropTypes.default.number.isRequired,
  }).isRequired,
  navigationState: l.isRequired,
  panX: PropTypes.default.instanceOf(module13.Animated.Value).isRequired,
  offsetX: PropTypes.default.instanceOf(module13.Animated.Value).isRequired,
  canJumpToTab: PropTypes.default.func.isRequired,
  jumpTo: PropTypes.default.func.isRequired,
  animationEnabled: PropTypes.default.bool,
  swipeEnabled: PropTypes.default.bool,
  useNativeDriver: PropTypes.default.bool,
  onSwipeStart: PropTypes.default.func,
  onSwipeEnd: PropTypes.default.func,
  onAnimationEnd: PropTypes.default.func,
  children: PropTypes.default.node.isRequired,
};
exports.PagerRendererPropType = s;
