var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12');

function s() {
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

var React = require('react'),
  module61 = require('./61'),
  h = module61.create({
    unimplementedView: {},
  });

class p {
  constructor() {
    module6(this, R);
    return v.apply(this, arguments);
  }

  render() {
    var module84 = require('./84');

    return <module84 style={[h.unimplementedView, this.props.style]}>{this.props.children}</module84>;
  }
}

module.exports = p;
