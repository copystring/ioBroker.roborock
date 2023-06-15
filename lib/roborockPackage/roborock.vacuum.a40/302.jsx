require('./303');

var t,
  module50 = require('./50'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module304 = require('./304');

function h() {
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

require('./305');

require('./125');

require('./52');

var module307 = require('./307'),
  React = require('react'),
  PropTypes = require('prop-types'),
  module261 = require('./261'),
  module61 = require('./61'),
  module84 = require('./84'),
  b = 0,
  k = (function (t) {
    module7.default(S, t);

    var n = S,
      module50 = h(),
      v = function () {
        var t,
          s = module11.default(n);

        if (module50) {
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
              <module304.default
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
                  module261.Context.Provider,
                  {
                    value: null,
                  },
                  React.createElement(
                    module84,
                    {
                      style: [x.container, t],
                    },
                    s
                  )
                )}
              </module304.default>
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
var w = module307.getConstants().isRTL ? 'right' : 'left',
  x = module61.create({
    modal: {
      position: 'absolute',
    },
    container: ((t = {}), module50.default(t, w, 0), module50.default(t, 'top', 0), module50.default(t, 'flex', 1), t),
  });
module.exports = k;
