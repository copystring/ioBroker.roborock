module.exports = {
  get createDrawerNavigator() {
    return require('./1003').default;
  },

  get DrawerRouter() {
    return require('./1004').default;
  },

  get DrawerActions() {
    return require('./1005').default;
  },

  get DrawerNavigatorItems() {
    return require('./1010').default;
  },

  get DrawerSidebar() {
    return require('./1008').default;
  },

  get DrawerView() {
    return require('./1006').default;
  },
};
