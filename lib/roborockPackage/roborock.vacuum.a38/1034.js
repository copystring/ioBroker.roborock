module.exports = {
  get createNavigationContainer() {
    return require('./1035').default;
  },

  get StateUtils() {
    return require('./1052').default;
  },

  get getNavigation() {
    return require('./1038').default;
  },

  get createNavigator() {
    return require('./1053').default;
  },

  get createKeyboardAwareNavigator() {
    return require('./1054').default;
  },

  get NavigationProvider() {
    return require('./1055').default.NavigationProvider;
  },

  get NavigationConsumer() {
    return require('./1055').default.NavigationConsumer;
  },

  get createStackNavigator() {
    return require('./1059').createStackNavigator;
  },

  get StackNavigator() {
    console.warn('The StackNavigator function name is deprecated, please use createStackNavigator instead');
    return require('./1059').createStackNavigator;
  },

  get createSwitchNavigator() {
    return require('./1085').default;
  },

  get SwitchNavigator() {
    console.warn('The SwitchNavigator function name is deprecated, please use createSwitchNavigator instead');
    return require('./1085').default;
  },

  get createDrawerNavigator() {
    return require('./1095').createDrawerNavigator;
  },

  get DrawerNavigator() {
    console.warn('The DrawerNavigator function name is deprecated, please use createDrawerNavigator instead');
    return require('./1095').createDrawerNavigator;
  },

  get createTabNavigator() {
    console.warn('createTabNavigator is deprecated. Please use the createBottomTabNavigator or createMaterialTopTabNavigator instead.');
    return require('./1105').createTabNavigator;
  },

  get TabNavigator() {
    console.warn('TabNavigator is deprecated. Please use the createBottomTabNavigator or createMaterialTopTabNavigator instead.');
    return require('./1105').createTabNavigator;
  },

  get createBottomTabNavigator() {
    return require('./1121').createBottomTabNavigator;
  },

  get createMaterialTopTabNavigator() {
    return require('./1121').createMaterialTopTabNavigator;
  },

  get NavigationActions() {
    return require('./1037').default;
  },

  get StackActions() {
    return require('./1091').default;
  },

  get DrawerActions() {
    return require('./1095').DrawerActions;
  },

  get StackRouter() {
    return require('./1142').default;
  },

  get TabRouter() {
    return require('./1144').default;
  },

  get DrawerRouter() {
    return require('./1095').DrawerRouter;
  },

  get SwitchRouter() {
    return require('./1087').default;
  },

  get createConfigGetter() {
    return require('./1089').default;
  },

  get getScreenForRouteName() {
    return require('./1088').default;
  },

  get validateRouteConfigMap() {
    return require('./1092').default;
  },

  get pathUtils() {
    return require('./1045').default;
  },

  get Transitioner() {
    return require('./1059').Transitioner;
  },

  get StackView() {
    return require('./1059').StackView;
  },

  get StackViewCard() {
    return require('./1059').StackViewCard;
  },

  get StackViewTransitionConfigs() {
    return require('./1059').StackViewTransitionConfigs;
  },

  get SafeAreaView() {
    return require('./1146').default;
  },

  get SceneView() {
    return require('./1094').default;
  },

  get ResourceSavingSceneView() {
    return require('./1148').default;
  },

  get Header() {
    return require('./1059').Header;
  },

  get HeaderTitle() {
    return require('./1059').HeaderTitle;
  },

  get HeaderBackButton() {
    return require('./1059').HeaderBackButton;
  },

  get HeaderStyleInterpolator() {
    return require('./1059').HeaderStyleInterpolator;
  },

  get DrawerView() {
    return require('./1095').DrawerView;
  },

  get DrawerItems() {
    return require('./1095').DrawerNavigatorItems;
  },

  get DrawerSidebar() {
    return require('./1095').DrawerSidebar;
  },

  get TabView() {
    console.warn('TabView is deprecated. Please use the react-navigation-tabs package instead: https://github.com/react-navigation/react-navigation-tabs');
    return require('./1105').TabView;
  },

  get TabBarTop() {
    console.warn('TabBarTop is deprecated. Please use the react-navigation-tabs package instead: https://github.com/react-navigation/react-navigation-tabs');
    return require('./1105').TabBarTop;
  },

  get TabBarBottom() {
    console.warn('TabBarBottom is deprecated. Please use the react-navigation-tabs package instead: https://github.com/react-navigation/react-navigation-tabs');
    return require('./1105').TabBarBottom;
  },

  get SwitchView() {
    return require('./1093').default;
  },

  get NavigationEvents() {
    return require('./1149').default;
  },

  get withNavigation() {
    return require('./1150').default;
  },

  get withNavigationFocus() {
    return require('./1151').default;
  },

  get withOrientation() {
    return require('./1152').default;
  },
};
