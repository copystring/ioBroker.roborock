module.exports = {
  get createNavigationContainer() {
    return require('./1219').default;
  },

  get StateUtils() {
    return require('./1236').default;
  },

  get getNavigation() {
    return require('./1222').default;
  },

  get createNavigator() {
    return require('./1237').default;
  },

  get createKeyboardAwareNavigator() {
    return require('./1238').default;
  },

  get NavigationProvider() {
    return require('./1239').default.NavigationProvider;
  },

  get NavigationConsumer() {
    return require('./1239').default.NavigationConsumer;
  },

  get createStackNavigator() {
    return require('./1243').createStackNavigator;
  },

  get StackNavigator() {
    console.warn('The StackNavigator function name is deprecated, please use createStackNavigator instead');
    return require('./1243').createStackNavigator;
  },

  get createSwitchNavigator() {
    return require('./1269').default;
  },

  get SwitchNavigator() {
    console.warn('The SwitchNavigator function name is deprecated, please use createSwitchNavigator instead');
    return require('./1269').default;
  },

  get createDrawerNavigator() {
    return require('./1279').createDrawerNavigator;
  },

  get DrawerNavigator() {
    console.warn('The DrawerNavigator function name is deprecated, please use createDrawerNavigator instead');
    return require('./1279').createDrawerNavigator;
  },

  get createTabNavigator() {
    console.warn('createTabNavigator is deprecated. Please use the createBottomTabNavigator or createMaterialTopTabNavigator instead.');
    return require('./1289').createTabNavigator;
  },

  get TabNavigator() {
    console.warn('TabNavigator is deprecated. Please use the createBottomTabNavigator or createMaterialTopTabNavigator instead.');
    return require('./1289').createTabNavigator;
  },

  get createBottomTabNavigator() {
    return require('./1305').createBottomTabNavigator;
  },

  get createMaterialTopTabNavigator() {
    return require('./1305').createMaterialTopTabNavigator;
  },

  get NavigationActions() {
    return require('./1221').default;
  },

  get StackActions() {
    return require('./1275').default;
  },

  get DrawerActions() {
    return require('./1279').DrawerActions;
  },

  get StackRouter() {
    return require('./1326').default;
  },

  get TabRouter() {
    return require('./1328').default;
  },

  get DrawerRouter() {
    return require('./1279').DrawerRouter;
  },

  get SwitchRouter() {
    return require('./1271').default;
  },

  get createConfigGetter() {
    return require('./1273').default;
  },

  get getScreenForRouteName() {
    return require('./1272').default;
  },

  get validateRouteConfigMap() {
    return require('./1276').default;
  },

  get pathUtils() {
    return require('./1229').default;
  },

  get Transitioner() {
    return require('./1243').Transitioner;
  },

  get StackView() {
    return require('./1243').StackView;
  },

  get StackViewCard() {
    return require('./1243').StackViewCard;
  },

  get StackViewTransitionConfigs() {
    return require('./1243').StackViewTransitionConfigs;
  },

  get SafeAreaView() {
    return require('./1330').default;
  },

  get SceneView() {
    return require('./1278').default;
  },

  get ResourceSavingSceneView() {
    return require('./1332').default;
  },

  get Header() {
    return require('./1243').Header;
  },

  get HeaderTitle() {
    return require('./1243').HeaderTitle;
  },

  get HeaderBackButton() {
    return require('./1243').HeaderBackButton;
  },

  get HeaderStyleInterpolator() {
    return require('./1243').HeaderStyleInterpolator;
  },

  get DrawerView() {
    return require('./1279').DrawerView;
  },

  get DrawerItems() {
    return require('./1279').DrawerNavigatorItems;
  },

  get DrawerSidebar() {
    return require('./1279').DrawerSidebar;
  },

  get TabView() {
    console.warn('TabView is deprecated. Please use the react-navigation-tabs package instead: https://github.com/react-navigation/react-navigation-tabs');
    return require('./1289').TabView;
  },

  get TabBarTop() {
    console.warn('TabBarTop is deprecated. Please use the react-navigation-tabs package instead: https://github.com/react-navigation/react-navigation-tabs');
    return require('./1289').TabBarTop;
  },

  get TabBarBottom() {
    console.warn('TabBarBottom is deprecated. Please use the react-navigation-tabs package instead: https://github.com/react-navigation/react-navigation-tabs');
    return require('./1289').TabBarBottom;
  },

  get SwitchView() {
    return require('./1277').default;
  },

  get NavigationEvents() {
    return require('./1333').default;
  },

  get withNavigation() {
    return require('./1334').default;
  },

  get withNavigationFocus() {
    return require('./1335').default;
  },

  get withOrientation() {
    return require('./1336').default;
  },
};
