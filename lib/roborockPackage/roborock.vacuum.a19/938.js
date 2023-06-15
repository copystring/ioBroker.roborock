module.exports = {
  get createNavigationContainer() {
    return require('./939').default;
  },

  get StateUtils() {
    return require('./957').default;
  },

  get getNavigation() {
    return require('./942').default;
  },

  get createNavigator() {
    return require('./958').default;
  },

  get createKeyboardAwareNavigator() {
    return require('./959').default;
  },

  get NavigationProvider() {
    return require('./960').default.NavigationProvider;
  },

  get NavigationConsumer() {
    return require('./960').default.NavigationConsumer;
  },

  get createStackNavigator() {
    return require('./966').createStackNavigator;
  },

  get StackNavigator() {
    console.warn('The StackNavigator function name is deprecated, please use createStackNavigator instead');
    return require('./966').createStackNavigator;
  },

  get createSwitchNavigator() {
    return require('./992').default;
  },

  get SwitchNavigator() {
    console.warn('The SwitchNavigator function name is deprecated, please use createSwitchNavigator instead');
    return require('./992').default;
  },

  get createDrawerNavigator() {
    return require('./1002').createDrawerNavigator;
  },

  get DrawerNavigator() {
    console.warn('The DrawerNavigator function name is deprecated, please use createDrawerNavigator instead');
    return require('./1002').createDrawerNavigator;
  },

  get createTabNavigator() {
    console.warn('createTabNavigator is deprecated. Please use the createBottomTabNavigator or createMaterialTopTabNavigator instead.');
    return require('./1012').createTabNavigator;
  },

  get TabNavigator() {
    console.warn('TabNavigator is deprecated. Please use the createBottomTabNavigator or createMaterialTopTabNavigator instead.');
    return require('./1012').createTabNavigator;
  },

  get createBottomTabNavigator() {
    return require('./1028').createBottomTabNavigator;
  },

  get createMaterialTopTabNavigator() {
    return require('./1028').createMaterialTopTabNavigator;
  },

  get NavigationActions() {
    return require('./941').default;
  },

  get StackActions() {
    return require('./998').default;
  },

  get DrawerActions() {
    return require('./1002').DrawerActions;
  },

  get StackRouter() {
    return require('./1049').default;
  },

  get TabRouter() {
    return require('./1051').default;
  },

  get DrawerRouter() {
    return require('./1002').DrawerRouter;
  },

  get SwitchRouter() {
    return require('./994').default;
  },

  get createConfigGetter() {
    return require('./996').default;
  },

  get getScreenForRouteName() {
    return require('./995').default;
  },

  get validateRouteConfigMap() {
    return require('./999').default;
  },

  get pathUtils() {
    return require('./949').default;
  },

  get Transitioner() {
    return require('./966').Transitioner;
  },

  get StackView() {
    return require('./966').StackView;
  },

  get StackViewCard() {
    return require('./966').StackViewCard;
  },

  get StackViewTransitionConfigs() {
    return require('./966').StackViewTransitionConfigs;
  },

  get SafeAreaView() {
    return require('./1053').default;
  },

  get SceneView() {
    return require('./1001').default;
  },

  get ResourceSavingSceneView() {
    return require('./1055').default;
  },

  get Header() {
    return require('./966').Header;
  },

  get HeaderTitle() {
    return require('./966').HeaderTitle;
  },

  get HeaderBackButton() {
    return require('./966').HeaderBackButton;
  },

  get HeaderStyleInterpolator() {
    return require('./966').HeaderStyleInterpolator;
  },

  get DrawerView() {
    return require('./1002').DrawerView;
  },

  get DrawerItems() {
    return require('./1002').DrawerNavigatorItems;
  },

  get DrawerSidebar() {
    return require('./1002').DrawerSidebar;
  },

  get TabView() {
    console.warn('TabView is deprecated. Please use the react-navigation-tabs package instead: https://github.com/react-navigation/react-navigation-tabs');
    return require('./1012').TabView;
  },

  get TabBarTop() {
    console.warn('TabBarTop is deprecated. Please use the react-navigation-tabs package instead: https://github.com/react-navigation/react-navigation-tabs');
    return require('./1012').TabBarTop;
  },

  get TabBarBottom() {
    console.warn('TabBarBottom is deprecated. Please use the react-navigation-tabs package instead: https://github.com/react-navigation/react-navigation-tabs');
    return require('./1012').TabBarBottom;
  },

  get SwitchView() {
    return require('./1000').default;
  },

  get NavigationEvents() {
    return require('./1056').default;
  },

  get withNavigation() {
    return require('./1057').default;
  },

  get withNavigationFocus() {
    return require('./1058').default;
  },

  get withOrientation() {
    return require('./1059').default;
  },
};
