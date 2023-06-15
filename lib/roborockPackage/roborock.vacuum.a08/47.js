module.exports = {
  getViewManagerConfig: function (n) {
    console.warn('Attempting to get config for view manager: ' + n);
    return null;
  },
  getConstants: function () {
    return {};
  },
  getConstantsForViewManager: function (n) {},
  getDefaultEventTypes: function () {
    return [];
  },
  playTouchSound: function () {},
  lazilyLoadView: function (n) {},
  createView: function (n, t, o, u) {},
  updateView: function (n, t, o) {},
  focus: function (n) {},
  blur: function (n) {},
  findSubviewIn: function (n, t, o) {},
  dispatchViewManagerCommand: function (n, t, o) {},
  measure: function (n, t) {},
  measureInWindow: function (n, t) {},
  viewIsDescendantOf: function (n, t, o) {},
  measureLayout: function (n, t, o, u) {},
  measureLayoutRelativeToParent: function (n, t, o) {},
  setJSResponder: function (n, t) {},
  clearJSResponder: function () {},
  configureNextLayoutAnimation: function (n, t, o) {},
  removeSubviewsFromContainerWithID: function (n) {},
  replaceExistingNonRootView: function (n, t) {},
  setChildren: function (n, t) {},
  manageChildren: function (n, t, o, u, c, f) {},
  setLayoutAnimationEnabledExperimental: function (n) {},
  sendAccessibilityEvent: function (n, t) {},
  showPopupMenu: function (n, t, o, u) {},
  dismissPopupMenu: function () {},
};
