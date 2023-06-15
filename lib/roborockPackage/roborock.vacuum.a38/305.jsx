var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11');

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

require('./44');

require('./40');

require('./86');

var PropTypes = require('prop-types'),
  React = require('react'),
  module306 = require('./306'),
  module61 = require('./61'),
  module84 = require('./84');

class y {
  constructor() {
    var n;
    module4(this, x);
    (n = b.call(this, ...args)).state = {
      inspector: null,
      mainKey: 1,
    };
    n._subscription = null;
    return n;
  }

  getChildContext() {
    return {
      rootTag: this.props.rootTag,
    };
  }

  componentDidMount() {}

  componentWillUnmount() {
    if (null != this._subscription) this._subscription.remove();
  }

  render() {
    var t = this,
      n = (
        <module84
          collapsable={!this.state.inspector}
          key={this.state.mainKey}
          pointerEvents="box-none"
          style={C.appContainer}
          ref={function (n) {
            t._mainRef = n;
          }}
        >
          {this.props.children}
        </module84>
      ),
      o = this.props.WrapperComponent;
    if (null != o) n = <o>{n}</o>;
    return (
      <module306.Provider value={this.props.rootTag}>
        <module84 style={C.appContainer} pointerEvents="box-none">
          {n}
          {null}
          {this.state.inspector}
        </module84>
      </module306.Provider>
    );
  }
}

y.childContextTypes = {
  rootTag: PropTypes.number,
};
var C = module61.create({
  appContainer: {
    flex: 1,
  },
});
module.exports = y;
