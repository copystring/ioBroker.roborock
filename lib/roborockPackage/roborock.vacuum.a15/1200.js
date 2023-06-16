module.exports = {
  get createDrawerNavigator() {
    return require('./1201').default;
  },

  get DrawerRouter() {
    return require('./1202').default;
  },

  get DrawerActions() {
    return require('./1203').default;
  },

  get DrawerNavigatorItems() {
    return require('./1208').default;
  },

  get DrawerSidebar() {
    return require('./1206').default;
  },

  get DrawerView() {
    return require('./1204').default;
  },
};
