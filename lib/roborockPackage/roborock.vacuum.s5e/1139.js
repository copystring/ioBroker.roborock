module.exports = {
  get createNavigationContainer() {
    return require('./1140').default;
  },

  get StateUtils() {
    return require('./1157').default;
  },

  get getNavigation() {
    return require('./1143').default;
  },

  get createNavigator() {
    return require('./1158').default;
  },

  get createKeyboardAwareNavigator() {
    return require('./1159').default;
  },

  get NavigationProvider() {
    return require('./1160').default.NavigationProvider;
  },

  get NavigationConsumer() {
    return require('./1160').default.NavigationConsumer;
  },

  get createStackNavigator() {
    return require('./1164').createStackNavigator;
  },

  get StackNavigator() {
    console.warn('The StackNavigator function name is deprecated, please use createStackNavigator instead');
    return require('./1164').createStackNavigator;
  },

  get createSwitchNavigator() {
    return require('./1190').default;
  },

  get SwitchNavigator() {
    console.warn('The SwitchNavigator function name is deprecated, please use createSwitchNavigator instead');
    return require('./1190').default;
  },

  get createDrawerNavigator() {
    return require('./1200').createDrawerNavigator;
  },

  get DrawerNavigator() {
    console.warn('The DrawerNavigator function name is deprecated, please use createDrawerNavigator instead');
    return require('./1200').createDrawerNavigator;
  },

  get createTabNavigator() {
    console.warn('createTabNavigator is deprecated. Please use the createBottomTabNavigator or createMaterialTopTabNavigator instead.');
    return require('./1210').createTabNavigator;
  },

  get TabNavigator() {
    console.warn('TabNavigator is deprecated. Please use the createBottomTabNavigator or createMaterialTopTabNavigator instead.');
    return require('./1210').createTabNavigator;
  },

  get createBottomTabNavigator() {
    return require('./1226').createBottomTabNavigator;
  },

  get createMaterialTopTabNavigator() {
    return require('./1226').createMaterialTopTabNavigator;
  },

  get NavigationActions() {
    return require('./1142').default;
  },

  get StackActions() {
    return require('./1196').default;
  },

  get DrawerActions() {
    return require('./1200').DrawerActions;
  },

  get StackRouter() {
    return require('./1247').default;
  },

  get TabRouter() {
    return require('./1249').default;
  },

  get DrawerRouter() {
    return require('./1200').DrawerRouter;
  },

  get SwitchRouter() {
    return require('./1192').default;
  },

  get createConfigGetter() {
    return require('./1194').default;
  },

  get getScreenForRouteName() {
    return require('./1193').default;
  },

  get validateRouteConfigMap() {
    return require('./1197').default;
  },

  get pathUtils() {
    return require('./1150').default;
  },

  get Transitioner() {
    return require('./1164').Transitioner;
  },

  get StackView() {
    return require('./1164').StackView;
  },

  get StackViewCard() {
    return require('./1164').StackViewCard;
  },

  get StackViewTransitionConfigs() {
    return require('./1164').StackViewTransitionConfigs;
  },

  get SafeAreaView() {
    return require('./1251').default;
  },

  get SceneView() {
    return require('./1199').default;
  },

  get ResourceSavingSceneView() {
    return require('./1253').default;
  },

  get Header() {
    return require('./1164').Header;
  },

  get HeaderTitle() {
    return require('./1164').HeaderTitle;
  },

  get HeaderBackButton() {
    return require('./1164').HeaderBackButton;
  },

  get HeaderStyleInterpolator() {
    return require('./1164').HeaderStyleInterpolator;
  },

  get DrawerView() {
    return require('./1200').DrawerView;
  },

  get DrawerItems() {
    return require('./1200').DrawerNavigatorItems;
  },

  get DrawerSidebar() {
    return require('./1200').DrawerSidebar;
  },

  get TabView() {
    console.warn('TabView is deprecated. Please use the react-navigation-tabs package instead: https://github.com/react-navigation/react-navigation-tabs');
    return require('./1210').TabView;
  },

  get TabBarTop() {
    console.warn('TabBarTop is deprecated. Please use the react-navigation-tabs package instead: https://github.com/react-navigation/react-navigation-tabs');
    return require('./1210').TabBarTop;
  },

  get TabBarBottom() {
    console.warn('TabBarBottom is deprecated. Please use the react-navigation-tabs package instead: https://github.com/react-navigation/react-navigation-tabs');
    return require('./1210').TabBarBottom;
  },

  get SwitchView() {
    return require('./1198').default;
  },

  get NavigationEvents() {
    return require('./1254').default;
  },

  get withNavigation() {
    return require('./1255').default;
  },

  get withNavigationFocus() {
    return require('./1256').default;
  },

  get withOrientation() {
    return require('./1257').default;
  },
};
