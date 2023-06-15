require('./256');

var module21 = require('./21'),
  module55 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module255 = require('./255'),
  p = ['tintColor', 'titleColor', 'title'];

function v() {
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

require('./51');

require('./210');

var R,
  React = require('react'),
  module46 = require('./46').getViewManagerConfig('AndroidSwipeRefreshLayout');

R = module46
  ? module46.Constants
  : {
      SIZE: {},
    };

var N = (function (t, ...args) {
  module7.default(C, t);

  var R = C,
    module46 = v(),
    N = function () {
      var t,
        n = module11.default(R);

      if (module46) {
        var s = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, s);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function C() {
    var t;
    module4.default(this, C);
    (t = N.call(this, ...args))._lastNativeRefreshing = false;

    t._onRefresh = function () {
      t._lastNativeRefreshing = true;
      if (t.props.onRefresh) t.props.onRefresh();
      t.forceUpdate();
    };

    return t;
  }

  module5.default(C, [
    {
      key: 'componentDidMount',
      value: function () {
        this._lastNativeRefreshing = this.props.refreshing;
      },
    },
    {
      key: 'componentDidUpdate',
      value: function (t) {
        if (this.props.refreshing !== t.refreshing) this._lastNativeRefreshing = this.props.refreshing;
        else if (this.props.refreshing !== this._lastNativeRefreshing && this._setNativePropsOnRef) {
          this._setNativePropsOnRef({
            refreshing: this.props.refreshing,
          });

          this._lastNativeRefreshing = this.props.refreshing;
        }
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this,
          o = this.props,
          f = module55.default(o, p);
        return <module255.default />;
      },
    },
  ]);
  return C;
})(React.Component);

N.SIZE = R.SIZE;
module.exports = N;
