module.exports = {
  get createBottomTabNavigator() {
    return require('./1122').default;
  },

  get createMaterialTopTabNavigator() {
    return require('./1129').default;
  },

  get BottomTabBar() {
    return require('./1124').default;
  },

  get MaterialTopTabBar() {
    return require('./1141').default;
  },

  get createTabNavigator() {
    return require('./1123').default;
  },
};
