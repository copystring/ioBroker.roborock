var module22 = require('./22'),
  module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12');

function u() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ('function' == typeof Proxy) return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

var module275 = require('./275'),
  React = require('react'),
  module61 = require('./61'),
  module84 = require('./84');

class R {
  constructor() {
    var t;
    module6(this, S);
    (t = P.call(this, ...args))._viewRef = null;

    t._captureRef = function (n) {
      t._viewRef = n;
    };

    return t;
  }

  setNativeProps(t) {
    var n = this._viewRef;
    if (n) n.setNativeProps(t);
  }

  render() {
    var c = this.props,
      o = c.children,
      f = c.style,
      l = c.imageStyle,
      s = c.imageRef,
      u = module56(c, ['children', 'style', 'imageStyle', 'imageRef']);
    return (
      <module84 accessibilityIgnoresInvertColors style={f} ref={this._captureRef}>
        <module275 />
        {o}
      </module84>
    );
  }
}

module.exports = R;
