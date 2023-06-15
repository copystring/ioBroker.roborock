var module4 = require('./4'),
  module5 = require('./5'),
  module224 = require('./224'),
  _ = module224.API,
  module13 = require('./13'),
  o = 1,
  v = (function () {
    function v() {
      module4(this, v);
      this._listeners = {};
    }

    module5(v, [
      {
        key: '__attach',
        value: function () {},
      },
      {
        key: '__detach',
        value: function () {
          if (this.__isNative && null != this.__nativeTag) {
            module224.API.dropAnimatedNode(this.__nativeTag);
            this.__nativeTag = undefined;
          }
        },
      },
      {
        key: '__getValue',
        value: function () {},
      },
      {
        key: '__getAnimatedValue',
        value: function () {
          return this.__getValue();
        },
      },
      {
        key: '__addChild',
        value: function (t) {},
      },
      {
        key: '__removeChild',
        value: function (t) {},
      },
      {
        key: '__getChildren',
        value: function () {
          return [];
        },
      },
      {
        key: '__makeNative',
        value: function () {
          if (!this.__isNative) throw new Error('This node cannot be made a "native" animated node');
          if (this.hasListeners()) this._startListeningToNativeValueUpdates();
        },
      },
      {
        key: 'addListener',
        value: function (t) {
          var n = String(o++);
          this._listeners[n] = t;
          if (this.__isNative) this._startListeningToNativeValueUpdates();
          return n;
        },
      },
      {
        key: 'removeListener',
        value: function (t) {
          delete this._listeners[t];
          if (this.__isNative && !this.hasListeners()) this._stopListeningForNativeValueUpdates();
        },
      },
      {
        key: 'removeAllListeners',
        value: function () {
          this._listeners = {};
          if (this.__isNative) this._stopListeningForNativeValueUpdates();
        },
      },
      {
        key: 'hasListeners',
        value: function () {
          return !!Object.keys(this._listeners).length;
        },
      },
      {
        key: '_startListeningToNativeValueUpdates',
        value: function () {
          var t = this;

          if (!(this.__nativeAnimatedValueListener && !this.__shouldUpdateListenersForNewNativeTag)) {
            if (this.__shouldUpdateListenersForNewNativeTag) {
              this.__shouldUpdateListenersForNewNativeTag = false;

              this._stopListeningForNativeValueUpdates();
            }

            _.startListeningToAnimatedNodeValue(this.__getNativeTag());

            this.__nativeAnimatedValueListener = module224.nativeEventEmitter.addListener('onAnimatedValueUpdate', function (n) {
              if (n.tag === t.__getNativeTag()) t._onAnimatedValueUpdateReceived(n.value);
            });
          }
        },
      },
      {
        key: '_onAnimatedValueUpdateReceived',
        value: function (t) {
          this.__callListeners(t);
        },
      },
      {
        key: '__callListeners',
        value: function (t) {
          for (var n in this._listeners)
            this._listeners[n]({
              value: t,
            });
        },
      },
      {
        key: '_stopListeningForNativeValueUpdates',
        value: function () {
          if (this.__nativeAnimatedValueListener) {
            this.__nativeAnimatedValueListener.remove();

            this.__nativeAnimatedValueListener = null;

            _.stopListeningToAnimatedNodeValue(this.__getNativeTag());
          }
        },
      },
      {
        key: '__getNativeTag',
        value: function () {
          if ((module224.assertNativeAnimatedModule(), module13(this.__isNative, 'Attempt to get native tag from node not marked as "native"'), null == this.__nativeTag)) {
            var t = module224.generateNewNodeTag();
            this.__nativeTag = t;
            module224.API.createAnimatedNode(t, this.__getNativeConfig());
            this.__shouldUpdateListenersForNewNativeTag = true;
          }

          return this.__nativeTag;
        },
      },
      {
        key: '__getNativeConfig',
        value: function () {
          throw new Error('This JS animated node type cannot be used as native animated node');
        },
      },
      {
        key: 'toJSON',
        value: function () {
          return this.__getValue();
        },
      },
    ]);
    return v;
  })();

module.exports = v;
