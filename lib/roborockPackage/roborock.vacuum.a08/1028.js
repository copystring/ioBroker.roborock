module.exports = {
  get createBottomTabNavigator() {
    return require('./1029').default;
  },

  get createMaterialTopTabNavigator() {
    return require('./1036').default;
  },

  get BottomTabBar() {
    return require('./1031').default;
  },

  get MaterialTopTabBar() {
    return require('./1048').default;
  },

  get createTabNavigator() {
    return require('./1030').default;
  },
};
