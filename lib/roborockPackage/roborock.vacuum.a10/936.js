module.exports = {
  get createNavigationContainer() {
    return require('./937').default;
  },

  get StateUtils() {
    return require('./955').default;
  },

  get getNavigation() {
    return require('./940').default;
  },

  get createNavigator() {
    return require('./956').default;
  },

  get createKeyboardAwareNavigator() {
    return require('./957').default;
  },

  get NavigationProvider() {
    return require('./958').default.NavigationProvider;
  },

  get NavigationConsumer() {
    return require('./958').default.NavigationConsumer;
  },

  get createStackNavigator() {
    return require('./964').createStackNavigator;
  },

  get StackNavigator() {
    console.warn('The StackNavigator function name is deprecated, please use createStackNavigator instead');
    return require('./964').createStackNavigator;
  },

  get createSwitchNavigator() {
    return require('./990').default;
  },

  get SwitchNavigator() {
    console.warn('The SwitchNavigator function name is deprecated, please use createSwitchNavigator instead');
    return require('./990').default;
  },

  get createDrawerNavigator() {
    return require('./1000').createDrawerNavigator;
  },

  get DrawerNavigator() {
    console.warn('The DrawerNavigator function name is deprecated, please use createDrawerNavigator instead');
    return require('./1000').createDrawerNavigator;
  },

  get createTabNavigator() {
    console.warn('createTabNavigator is deprecated. Please use the createBottomTabNavigator or createMaterialTopTabNavigator instead.');
    return require('./1010').createTabNavigator;
  },

  get TabNavigator() {
    console.warn('TabNavigator is deprecated. Please use the createBottomTabNavigator or createMaterialTopTabNavigator instead.');
    return require('./1010').createTabNavigator;
  },

  get createBottomTabNavigator() {
    return require('./1026').createBottomTabNavigator;
  },

  get createMaterialTopTabNavigator() {
    return require('./1026').createMaterialTopTabNavigator;
  },

  get NavigationActions() {
    return require('./939').default;
  },

  get StackActions() {
    return require('./996').default;
  },

  get DrawerActions() {
    return require('./1000').DrawerActions;
  },

  get StackRouter() {
    return require('./1047').default;
  },

  get TabRouter() {
    return require('./1049').default;
  },

  get DrawerRouter() {
    return require('./1000').DrawerRouter;
  },

  get SwitchRouter() {
    return require('./992').default;
  },

  get createConfigGetter() {
    return require('./994').default;
  },

  get getScreenForRouteName() {
    return require('./993').default;
  },

  get validateRouteConfigMap() {
    return require('./997').default;
  },

  get pathUtils() {
    return require('./947').default;
  },

  get Transitioner() {
    return require('./964').Transitioner;
  },

  get StackView() {
    return require('./964').StackView;
  },

  get StackViewCard() {
    return require('./964').StackViewCard;
  },

  get StackViewTransitionConfigs() {
    return require('./964').StackViewTransitionConfigs;
  },

  get SafeAreaView() {
    return require('./1051').default;
  },

  get SceneView() {
    return require('./999').default;
  },

  get ResourceSavingSceneView() {
    return require('./1053').default;
  },

  get Header() {
    return require('./964').Header;
  },

  get HeaderTitle() {
    return require('./964').HeaderTitle;
  },

  get HeaderBackButton() {
    return require('./964').HeaderBackButton;
  },

  get HeaderStyleInterpolator() {
    return require('./964').HeaderStyleInterpolator;
  },

  get DrawerView() {
    return require('./1000').DrawerView;
  },

  get DrawerItems() {
    return require('./1000').DrawerNavigatorItems;
  },

  get DrawerSidebar() {
    return require('./1000').DrawerSidebar;
  },

  get TabView() {
    console.warn('TabView is deprecated. Please use the react-navigation-tabs package instead: https://github.com/react-navigation/react-navigation-tabs');
    return require('./1010').TabView;
  },

  get TabBarTop() {
    console.warn('TabBarTop is deprecated. Please use the react-navigation-tabs package instead: https://github.com/react-navigation/react-navigation-tabs');
    return require('./1010').TabBarTop;
  },

  get TabBarBottom() {
    console.warn('TabBarBottom is deprecated. Please use the react-navigation-tabs package instead: https://github.com/react-navigation/react-navigation-tabs');
    return require('./1010').TabBarBottom;
  },

  get SwitchView() {
    return require('./998').default;
  },

  get NavigationEvents() {
    return require('./1054').default;
  },

  get withNavigation() {
    return require('./1055').default;
  },

  get withNavigationFocus() {
    return require('./1056').default;
  },

  get withOrientation() {
    return require('./1057').default;
  },
};
