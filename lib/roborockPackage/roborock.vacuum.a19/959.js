var module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12');

function h() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ('function' == typeof Proxy) return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

exports.default = function (t, v) {
  var T, y;

  y = T = (function (T, ...args) {
    module7.default(F, T);

    var y = F,
      _ = h(),
      x = function () {
        var t,
          n = module11.default(y);

        if (_) {
          var u = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, u);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function F() {
      var t;
      module4.default(this, F);
      (t = x.call(this, ...args))._previouslyFocusedTextInput = null;

      t._handleGestureBegin = function () {
        t._previouslyFocusedTextInput = module12.TextInput.State.currentlyFocusedField();
        if (t._previouslyFocusedTextInput) module12.TextInput.State.blurTextInput(t._previouslyFocusedTextInput);
        if (t.props.onGestureBegin) t.props.onGestureBegin();
      };

      t._handleGestureCanceled = function () {
        if (t._previouslyFocusedTextInput) module12.TextInput.State.focusTextInput(t._previouslyFocusedTextInput);
        if (t.props.onGestureCanceled) t.props.onGestureCanceled();
      };

      t._handleGestureFinish = function () {
        t._previouslyFocusedTextInput = null;
        if (t.props.onGestureFinish) t.props.onGestureFinish();
      };

      t._handleTransitionStart = function (n, u) {
        if (n.index !== u.index) {
          var o = module12.TextInput.State.currentlyFocusedField();
          if (o) module12.TextInput.State.blurTextInput(o);
        }

        var s = t.props.onTransitionStart || v.onTransitionStart;
        if (s) s(n, u);
      };

      return t;
    }

    module5.default(F, [
      {
        key: 'render',
        value: function () {
          return React.default.createElement(
            t,
            module21.default({}, this.props, {
              onGestureBegin: this._handleGestureBegin,
              onGestureCanceled: this._handleGestureCanceled,
              onGestureFinish: this._handleGestureFinish,
              onTransitionStart: this._handleTransitionStart,
            })
          );
        },
      },
    ]);
    return F;
  })(React.default.Component);

  T.router = t.router;
  return y;
};
