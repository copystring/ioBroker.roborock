require('./299');

var t,
  module49 = require('./49'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module300 = require('./300');

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

require('./301');

require('./123');

require('./51');

var module303 = require('./303'),
  React = require('react'),
  PropTypes = require('prop-types'),
  module257 = require('./257'),
  module60 = require('./60'),
  module83 = require('./83'),
  b = 0,
  k = (function (t) {
    module7.default(S, t);

    var n = S,
      module49 = h(),
      v = function () {
        var t,
          s = module11.default(n);

        if (module49) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(s, arguments, l);
        } else t = s.apply(this, arguments);

        return module9.default(this, t);
      };

    function S(t) {
      var n;
      module4.default(this, S);
      n = v.call(this, t);

      S._confirmProps(t);

      n._identifier = b++;
      return n;
    }

    module5.default(
      S,
      [
        {
          key: 'getChildContext',
          value: function () {
            return {
              virtualizedList: null,
            };
          },
        },
        {
          key: 'componentDidMount',
          value: function () {},
        },
        {
          key: 'componentWillUnmount',
          value: function () {
            if (this._eventSubscription) this._eventSubscription.remove();
          },
        },
        {
          key: 'UNSAFE_componentWillReceiveProps',
          value: function (t) {
            S._confirmProps(t);
          },
        },
        {
          key: 'render',
          value: function () {
            if (true !== this.props.visible) return null;
            var t = {
                backgroundColor: this.props.transparent ? 'transparent' : 'white',
              },
              n = this.props.animationType;

            if (!n) {
              n = 'none';
              if (this.props.animated) n = 'slide';
            }

            var o = this.props.presentationStyle;

            if (!o) {
              o = 'fullScreen';
              if (this.props.transparent) o = 'overFullScreen';
            }

            var s = this.props.children;
            return (
              <module300.default
                animationType={n}
                presentationStyle={o}
                transparent={this.props.transparent}
                hardwareAccelerated={this.props.hardwareAccelerated}
                onRequestClose={this.props.onRequestClose}
                onShow={this.props.onShow}
                identifier={this._identifier}
                style={x.modal}
                onStartShouldSetResponder={this._shouldSetResponder}
                supportedOrientations={this.props.supportedOrientations}
                onOrientationChange={this.props.onOrientationChange}
              >
                {React.createElement(
                  module257.Context.Provider,
                  {
                    value: null,
                  },
                  React.createElement(
                    module83,
                    {
                      style: [x.container, t],
                    },
                    s
                  )
                )}
              </module300.default>
            );
          },
        },
        {
          key: '_shouldSetResponder',
          value: function () {
            return true;
          },
        },
      ],
      [
        {
          key: '_confirmProps',
          value: function (t) {
            if (t.presentationStyle && 'overFullScreen' !== t.presentationStyle && t.transparent)
              console.warn("Modal with '" + t.presentationStyle + "' presentation style and 'transparent' value is not supported.");
          },
        },
      ]
    );
    return S;
  })(React.Component);

k.defaultProps = {
  visible: true,
  hardwareAccelerated: false,
};
k.contextTypes = {
  rootTag: PropTypes.number,
};
k.childContextTypes = {
  virtualizedList: PropTypes.object,
};
var w = module303.getConstants().isRTL ? 'right' : 'left',
  x = module60.create({
    modal: {
      position: 'absolute',
    },
    container: ((t = {}), module49.default(t, w, 0), module49.default(t, 'top', 0), module49.default(t, 'flex', 1), t),
  });
module.exports = k;
