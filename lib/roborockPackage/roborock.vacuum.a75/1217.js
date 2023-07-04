module.exports = {
  get createNavigationContainer() {
    return require('./1218').default;
  },

  get StateUtils() {
    return require('./1235').default;
  },

  get getNavigation() {
    return require('./1221').default;
  },

  get createNavigator() {
    return require('./1236').default;
  },

  get createKeyboardAwareNavigator() {
    return require('./1237').default;
  },

  get NavigationProvider() {
    return require('./1238').default.NavigationProvider;
  },

  get NavigationConsumer() {
    return require('./1238').default.NavigationConsumer;
  },

  get createStackNavigator() {
    return require('./1242').createStackNavigator;
  },

  get StackNavigator() {
    console.warn('The StackNavigator function name is deprecated, please use createStackNavigator instead');
    return require('./1242').createStackNavigator;
  },

  get createSwitchNavigator() {
    return require('./1268').default;
  },

  get SwitchNavigator() {
    console.warn('The SwitchNavigator function name is deprecated, please use createSwitchNavigator instead');
    return require('./1268').default;
  },

  get createDrawerNavigator() {
    return require('./1278').createDrawerNavigator;
  },

  get DrawerNavigator() {
    console.warn('The DrawerNavigator function name is deprecated, please use createDrawerNavigator instead');
    return require('./1278').createDrawerNavigator;
  },

  get createTabNavigator() {
    console.warn('createTabNavigator is deprecated. Please use the createBottomTabNavigator or createMaterialTopTabNavigator instead.');
    return require('./1288').createTabNavigator;
  },

  get TabNavigator() {
    console.warn('TabNavigator is deprecated. Please use the createBottomTabNavigator or createMaterialTopTabNavigator instead.');
    return require('./1288').createTabNavigator;
  },

  get createBottomTabNavigator() {
    return require('./1304').createBottomTabNavigator;
  },

  get createMaterialTopTabNavigator() {
    return require('./1304').createMaterialTopTabNavigator;
  },

  get NavigationActions() {
    return require('./1220').default;
  },

  get StackActions() {
    return require('./1274').default;
  },

  get DrawerActions() {
    return require('./1278').DrawerActions;
  },

  get StackRouter() {
    return require('./1325').default;
  },

  get TabRouter() {
    return require('./1327').default;
  },

  get DrawerRouter() {
    return require('./1278').DrawerRouter;
  },

  get SwitchRouter() {
    return require('./1270').default;
  },

  get createConfigGetter() {
    return require('./1272').default;
  },

  get getScreenForRouteName() {
    return require('./1271').default;
  },

  get validateRouteConfigMap() {
    return require('./1275').default;
  },

  get pathUtils() {
    return require('./1228').default;
  },

  get Transitioner() {
    return require('./1242').Transitioner;
  },

  get StackView() {
    return require('./1242').StackView;
  },

  get StackViewCard() {
    return require('./1242').StackViewCard;
  },

  get StackViewTransitionConfigs() {
    return require('./1242').StackViewTransitionConfigs;
  },

  get SafeAreaView() {
    return require('./1329').default;
  },

  get SceneView() {
    return require('./1277').default;
  },

  get ResourceSavingSceneView() {
    return require('./1331').default;
  },

  get Header() {
    return require('./1242').Header;
  },

  get HeaderTitle() {
    return require('./1242').HeaderTitle;
  },

  get HeaderBackButton() {
    return require('./1242').HeaderBackButton;
  },

  get HeaderStyleInterpolator() {
    return require('./1242').HeaderStyleInterpolator;
  },

  get DrawerView() {
    return require('./1278').DrawerView;
  },

  get DrawerItems() {
    return require('./1278').DrawerNavigatorItems;
  },

  get DrawerSidebar() {
    return require('./1278').DrawerSidebar;
  },

  get TabView() {
    console.warn('TabView is deprecated. Please use the react-navigation-tabs package instead: https://github.com/react-navigation/react-navigation-tabs');
    return require('./1288').TabView;
  },

  get TabBarTop() {
    console.warn('TabBarTop is deprecated. Please use the react-navigation-tabs package instead: https://github.com/react-navigation/react-navigation-tabs');
    return require('./1288').TabBarTop;
  },

  get TabBarBottom() {
    console.warn('TabBarBottom is deprecated. Please use the react-navigation-tabs package instead: https://github.com/react-navigation/react-navigation-tabs');
    return require('./1288').TabBarBottom;
  },

  get SwitchView() {
    return require('./1276').default;
  },

  get NavigationEvents() {
    return require('./1332').default;
  },

  get withNavigation() {
    return require('./1333').default;
  },

  get withNavigationFocus() {
    return require('./1334').default;
  },

  get withOrientation() {
    return require('./1335').default;
  },
};
