var t =
  Object.assign ||
  function (t) {
    for (var n = 1; n < arguments.length; n++) {
      var o = arguments[n];

      for (var h in o) Object.prototype.hasOwnProperty.call(o, h) && (t[h] = o[h]);
    }

    return t;
  };

function o(t, n) {
  var o = {};

  for (var h in t) n.indexOf(h) >= 0 || (Object.prototype.hasOwnProperty.call(t, h) && (o[h] = t[h]));

  return o;
}

function h(t, n) {
  if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return !n || ('object' != typeof n && 'function' != typeof n) ? t : n;
}

function u(t, n) {
  if ('function' != typeof n && null !== n) throw new TypeError('Super expression must either be null or a function, not ' + typeof n);
  t.prototype = Object.create(n && n.prototype, {
    constructor: {
      value: t,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
  if (n) Object.setPrototypeOf ? Object.setPrototypeOf(t, n) : (t.__proto__ = n);
}

function _(t, n) {
  if (!(t instanceof n)) throw new TypeError('Cannot call a class as a function');
}

var module1828 = require('./1828');

class v {
  constructor(n, o) {
    _(this, v);

    var u = h(this, (v.__proto__ || Object.getPrototypeOf(v)).call(this));
    u._data = t({}, n, {
      contextChildren: n.contextChildren.map(function (t) {
        return new v(t);
      }),
      children: n.children.map(function (t) {
        return new v(t);
      }),
      uniforms: new s(n.uniforms),
    });
    if (o) u.update = o;

    u.__attach();

    return u;
  }

  __getValue() {
    var t = this._data,
      n = t.contextChildren,
      h = t.width,
      u = t.height,
      _ = t.children,
      l = t.uniforms,
      f = o(t, ['contextChildren', 'width', 'height', 'children', 'uniforms']);
    f.width = module1828(h) ? h.__getValue() : h;
    f.height = module1828(u) ? u.__getValue() : u;
    f.contextChildren = n.map(function (t) {
      return t.__getValue();
    });
    f.children = _.map(function (t) {
      return t.__getValue();
    });
    f.uniforms = l.__getValue();
    return f;
  }

  __attach() {
    var t = this,
      n = this._data,
      o = n.contextChildren,
      h = n.children,
      u = n.uniforms,
      _ = n.width,
      l = n.height;
    if (module1828(_)) _.__addChild(this);
    if (module1828(l)) l.__addChild(this);
    o.forEach(function (n) {
      return n.__addChild(t);
    });
    h.forEach(function (n) {
      return n.__addChild(t);
    });

    u.__addChild(this);
  }

  __detach() {
    var t = this,
      n = this._data,
      o = n.contextChildren,
      h = n.children,
      u = n.uniforms,
      _ = n.width,
      l = n.height;
    if (module1828(_)) _.__removeChild(this);
    if (module1828(l)) l.__removeChild(this);
    o.forEach(function (n) {
      return n.__removeChild(t);
    });
    h.forEach(function (n) {
      return n.__removeChild(t);
    });

    u.__removeChild(this);
  }
}

class s {
  constructor(t) {
    _(this, o);

    var n = h(this, (o.__proto__ || Object.getPrototypeOf(o)).call(this));
    n._uniforms = t;

    n.__attach();

    return n;
  }

  __getValue() {
    var t = {},
      n = this._uniforms;

    for (var o in n) {
      var h = n[o];

      if (h instanceof Array) {
        for (var u = [], _ = 0; _ < h.length; _++) {
          var l = h[_];
          u[_] = module1828(l) ? l.__getValue() : l;
        }

        t[o] = u;
      } else module1828(h) ? (t[o] = h.__getValue()) : (t[o] = h);
    }

    return t;
  }

  __attach() {
    var t = this._uniforms;

    for (var n in t) {
      var o = t[n];
      if (o instanceof Array)
        for (var h = 0; h < o.length; h++) {
          var u = o[h];
          if (module1828(u)) u.__addChild(this);
        }
      else module1828(o) && o.__addChild(this);
    }
  }

  __detach() {
    var t = this._uniforms;

    for (var n in t) {
      var o = t[n];
      if (o instanceof Array)
        for (var h = 0; h < o.length; h++) {
          var u = o[h];
          if (module1828(u)) u.__removeChild(this);
        }
      else module1828(o) && o.__removeChild(this);
    }
  }
}

class f {
  constructor() {
    _(this, o);

    var t = h(this, (o.__proto__ || Object.getPrototypeOf(o)).call(this));
    t._children = [];
    return t;
  }

  __addChild(t) {
    if (0 === this._children.length) this.__attach();

    this._children.push(t);
  }

  __removeChild(t) {
    var n = this._children.indexOf(t);

    if (-1 !== n) {
      this._children.splice(n, 1);

      if (0 === this._children.length) this.__detach();
    } else console.warn("Trying to remove a child that doesn't exist");
  }

  __getChildren() {
    return this._children;
  }
}

class l {
  constructor() {
    _(this, t);
  }

  __attach() {}

  __detach() {}

  __getValue() {}

  __getAnimatedValue() {
    return this.__getValue();
  }

  __addChild() {}

  __removeChild() {}

  __getChildren() {
    return [];
  }
}

module.exports = v;
