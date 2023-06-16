require('react');

require('./390');

var module6 = require('./6'),
  o = null,
  l = (function () {
    function t() {
      module6.default(this, t);

      if (!o) {
        o = this;
        this.isDisableTitleBarActions = false;
      }

      return o;
    }

    module7.default(
      t,
      [
        {
          key: 'enableBackAndMore',
          value: function () {
            this.isDisableTitleBarActions = false;
          },
        },
        {
          key: 'disableBackAndMore',
          value: function () {
            this.isDisableTitleBarActions = true;
          },
        },
        {
          key: 'navigation',
          get: function () {
            return globals.navigation;
          },
        },
        {
          key: 'settings',
          get: function () {
            return this.navigation.state.params;
          },
          set: function (t) {
            this.navigation.setParams(t);
          },
        },
        {
          key: 'title',
          get: function () {
            return this.settings.title;
          },
          set: function (t) {
            this.navigation.setParams({
              title: t,
            });
          },
        },
        {
          key: 'subTitle',
          get: function () {
            return this.settings.subTitle;
          },
          set: function (t) {
            this.navigation.setParams({
              subTitle: t,
            });
          },
        },
        {
          key: 'popGestureEnabled',
          get: function () {
            return this.settings && this.settings.gesturesEnabled;
          },
          set: function (t) {
            if (t !== this.popGestureEnabled)
              this.navigation.setParams({
                gesturesEnabled: t,
              });
          },
        },
        {
          key: 'rightItems',
          get: function () {
            return this.settings.rightItems;
          },
          set: function (t) {
            this.navigation.setParams({
              rightItems: t,
            });
          },
        },
      ],
      [
        {
          key: 'shared',
          value: function () {
            return new t();
          },
        },
      ]
    );
    return t;
  })();

exports.default = l;
