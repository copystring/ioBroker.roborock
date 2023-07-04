require('./51');

var module4 = require('./4'),
  module5 = require('./5'),
  module61 = require('./61'),
  module178 = require('./178'),
  module13 = require('./13');

function l(t) {
  var s = c.pickScale(t.scales, module61.get()),
    o = 1 === s ? '' : '@' + s + 'x';
  return module178.getBasePath(t) + '/' + t.name + o + '.' + t.type;
}

function h(t) {
  var s = c.pickScale(t.scales, module61.get());
  return module178.getAndroidResourceFolderName(t, s) + '/' + module178.getAndroidResourceIdentifier(t) + '.' + t.type;
}

var c = (function () {
  function c(s, n, u) {
    module4(this, c);
    this.serverUrl = s;
    this.jsbundleUrl = n;
    this.asset = u;
  }

  module5(
    c,
    [
      {
        key: 'isLoadedFromServer',
        value: function () {
          return !!this.serverUrl;
        },
      },
      {
        key: 'isLoadedFromFileSystem',
        value: function () {
          return !(!this.jsbundleUrl || !this.jsbundleUrl.startsWith('file://'));
        },
      },
      {
        key: 'defaultAsset',
        value: function () {
          return this.isLoadedFromServer() ? this.assetServerURL() : this.isLoadedFromFileSystem() ? this.drawableFolderInBundle() : this.resourceIdentifierWithoutScale();
        },
      },
      {
        key: 'assetServerURL',
        value: function () {
          module13(!!this.serverUrl, 'need server to load from');
          return this.fromSource(this.serverUrl + l(this.asset) + '?platform=android&hash=' + this.asset.hash);
        },
      },
      {
        key: 'scaledAssetPath',
        value: function () {
          return this.fromSource(l(this.asset));
        },
      },
      {
        key: 'scaledAssetURLNearBundle',
        value: function () {
          var t = this.jsbundleUrl || 'file://';
          return this.fromSource(t + l(this.asset));
        },
      },
      {
        key: 'resourceIdentifierWithoutScale',
        value: function () {
          module13(true, 'resource identifiers work on Android');
          return this.fromSource(module178.getAndroidResourceIdentifier(this.asset));
        },
      },
      {
        key: 'drawableFolderInBundle',
        value: function () {
          var t = this.jsbundleUrl || 'file://';
          return this.fromSource(t + h(this.asset));
        },
      },
      {
        key: 'fromSource',
        value: function (t) {
          return {
            __packager_asset: true,
            width: this.asset.width,
            height: this.asset.height,
            uri: t,
            scale: c.pickScale(this.asset.scales, module61.get()),
          };
        },
      },
    ],
    [
      {
        key: 'pickScale',
        value: function (t, s) {
          for (var n = 0; n < t.length; n++) if (t[n] >= s) return t[n];

          return t[t.length - 1] || 1;
        },
      },
    ]
  );
  return c;
})();

module.exports = c;
