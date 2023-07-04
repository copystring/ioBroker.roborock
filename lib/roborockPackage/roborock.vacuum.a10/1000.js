module.exports = {
  get createDrawerNavigator() {
    return require('./1001').default;
  },

  get DrawerRouter() {
    return require('./1002').default;
  },

  get DrawerActions() {
    return require('./1003').default;
  },

  get DrawerNavigatorItems() {
    return require('./1008').default;
  },

  get DrawerSidebar() {
    return require('./1006').default;
  },

  get DrawerView() {
    return require('./1004').default;
  },
};
