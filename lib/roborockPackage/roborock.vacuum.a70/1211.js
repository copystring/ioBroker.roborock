module.exports = {
  get createNavigationContainer() {
    return require('./1212').default;
  },

  get StateUtils() {
    return require('./1229').default;
  },

  get getNavigation() {
    return require('./1215').default;
  },

  get createNavigator() {
    return require('./1230').default;
  },

  get createKeyboardAwareNavigator() {
    return require('./1231').default;
  },

  get NavigationProvider() {
    return require('./1232').default.NavigationProvider;
  },

  get NavigationConsumer() {
    return require('./1232').default.NavigationConsumer;
  },

  get createStackNavigator() {
    return require('./1236').createStackNavigator;
  },

  get StackNavigator() {
    console.warn('The StackNavigator function name is deprecated, please use createStackNavigator instead');
    return require('./1236').createStackNavigator;
  },

  get createSwitchNavigator() {
    return require('./1262').default;
  },

  get SwitchNavigator() {
    console.warn('The SwitchNavigator function name is deprecated, please use createSwitchNavigator instead');
    return require('./1262').default;
  },

  get createDrawerNavigator() {
    return require('./1272').createDrawerNavigator;
  },

  get DrawerNavigator() {
    console.warn('The DrawerNavigator function name is deprecated, please use createDrawerNavigator instead');
    return require('./1272').createDrawerNavigator;
  },

  get createTabNavigator() {
    console.warn('createTabNavigator is deprecated. Please use the createBottomTabNavigator or createMaterialTopTabNavigator instead.');
    return require('./1282').createTabNavigator;
  },

  get TabNavigator() {
    console.warn('TabNavigator is deprecated. Please use the createBottomTabNavigator or createMaterialTopTabNavigator instead.');
    return require('./1282').createTabNavigator;
  },

  get createBottomTabNavigator() {
    return require('./1298').createBottomTabNavigator;
  },

  get createMaterialTopTabNavigator() {
    return require('./1298').createMaterialTopTabNavigator;
  },

  get NavigationActions() {
    return require('./1214').default;
  },

  get StackActions() {
    return require('./1268').default;
  },

  get DrawerActions() {
    return require('./1272').DrawerActions;
  },

  get StackRouter() {
    return require('./1319').default;
  },

  get TabRouter() {
    return require('./1321').default;
  },

  get DrawerRouter() {
    return require('./1272').DrawerRouter;
  },

  get SwitchRouter() {
    return require('./1264').default;
  },

  get createConfigGetter() {
    return require('./1266').default;
  },

  get getScreenForRouteName() {
    return require('./1265').default;
  },

  get validateRouteConfigMap() {
    return require('./1269').default;
  },

  get pathUtils() {
    return require('./1222').default;
  },

  get Transitioner() {
    return require('./1236').Transitioner;
  },

  get StackView() {
    return require('./1236').StackView;
  },

  get StackViewCard() {
    return require('./1236').StackViewCard;
  },

  get StackViewTransitionConfigs() {
    return require('./1236').StackViewTransitionConfigs;
  },

  get SafeAreaView() {
    return require('./1323').default;
  },

  get SceneView() {
    return require('./1271').default;
  },

  get ResourceSavingSceneView() {
    return require('./1325').default;
  },

  get Header() {
    return require('./1236').Header;
  },

  get HeaderTitle() {
    return require('./1236').HeaderTitle;
  },

  get HeaderBackButton() {
    return require('./1236').HeaderBackButton;
  },

  get HeaderStyleInterpolator() {
    return require('./1236').HeaderStyleInterpolator;
  },

  get DrawerView() {
    return require('./1272').DrawerView;
  },

  get DrawerItems() {
    return require('./1272').DrawerNavigatorItems;
  },

  get DrawerSidebar() {
    return require('./1272').DrawerSidebar;
  },

  get TabView() {
    console.warn('TabView is deprecated. Please use the react-navigation-tabs package instead: https://github.com/react-navigation/react-navigation-tabs');
    return require('./1282').TabView;
  },

  get TabBarTop() {
    console.warn('TabBarTop is deprecated. Please use the react-navigation-tabs package instead: https://github.com/react-navigation/react-navigation-tabs');
    return require('./1282').TabBarTop;
  },

  get TabBarBottom() {
    console.warn('TabBarBottom is deprecated. Please use the react-navigation-tabs package instead: https://github.com/react-navigation/react-navigation-tabs');
    return require('./1282').TabBarBottom;
  },

  get SwitchView() {
    return require('./1270').default;
  },

  get NavigationEvents() {
    return require('./1326').default;
  },

  get withNavigation() {
    return require('./1327').default;
  },

  get withNavigationFocus() {
    return require('./1328').default;
  },

  get withOrientation() {
    return require('./1329').default;
  },
};
