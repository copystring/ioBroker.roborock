module.exports = {
  get createBottomTabNavigator() {
    return require('./1227').default;
  },

  get createMaterialTopTabNavigator() {
    return require('./1234').default;
  },

  get BottomTabBar() {
    return require('./1229').default;
  },

  get MaterialTopTabBar() {
    return require('./1246').default;
  },

  get createTabNavigator() {
    return require('./1228').default;
  },
};
