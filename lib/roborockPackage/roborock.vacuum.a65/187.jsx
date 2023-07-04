var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12');

function f(t) {
  var n = s();
  return function () {
    var o,
      f = module12(t);

    if (n) {
      var s = module12(this).constructor;
      o = Reflect.construct(f, arguments, s);
    } else o = f.apply(this, arguments);

    return module11(this, o);
  };
}

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

var module188 = require('./188'),
  module189 = require('./189'),
  module192 = require('./192'),
  React = require('react'),
  PropTypes = require('prop-types'),
  module193 = require('./193'),
  module183 = require('./183'),
  module194 = require('./194'),
  module14 = require('./14');

function x(t, n) {
  if (null == t || null == n) return true;
  if (t.length !== n.length) return true;

  for (var o = 0; o < t.length; o++) if (t[o] !== n[o]) return true;

  return false;
}

var C = module194(module193.UIView, {}),
  R = {
    transform: {
      diff: x,
    },
    opacity: true,
  },
  T = module194(R, {
    clipping: {
      diff: x,
    },
  }),
  _ = module194(R, {
    fill: {
      diff: x,
    },
    stroke: {
      diff: x,
    },
    strokeWidth: true,
    strokeCap: true,
    strokeJoin: true,
    strokeDash: {
      diff: x,
    },
  }),
  A = module194(_, {
    d: {
      diff: x,
    },
  }),
  W = module194(_, {
    alignment: true,
    frame: {
      diff: function (t, n) {
        if (t === n) return false;

        if (t.font !== n.font) {
          if (null === t.font) return true;
          if (null === n.font) return true;
          if (t.font.fontFamily !== n.font.fontFamily || t.font.fontSize !== n.font.fontSize || t.font.fontWeight !== n.font.fontWeight || t.font.fontStyle !== n.font.fontStyle)
            return true;
        }

        return x(t.lines, n.lines);
      },
    },
    path: {
      diff: x,
    },
  }),
  D = module183('ARTSurfaceView', function () {
    return {
      validAttributes: C,
      uiViewClassName: 'ARTSurfaceView',
    };
  }),
  J = module183('ARTGroup', function () {
    return {
      validAttributes: T,
      uiViewClassName: 'ARTGroup',
    };
  }),
  V = module183('ARTShape', function () {
    return {
      validAttributes: A,
      uiViewClassName: 'ARTShape',
    };
  }),
  G = module183('ARTText', function () {
    return {
      validAttributes: W,
      uiViewClassName: 'ARTText',
    };
  });

function I(t) {
  return t ? ('string' == typeof t ? t : t.length ? t.join('\n') : '') : '';
}

class N {
  constructor() {
    module6(this, s);
    return l.apply(this, arguments);
  }

  getChildContext() {
    return {
      isInSurface: true,
    };
  }

  render() {
    var t = z(this.props.height, 0),
      n = z(this.props.width, 0);
    return (
      <D
        style={[
          this.props.style,
          {
            height: t,
            width: n,
          },
        ]}
      >
        {this.props.children}
      </D>
    );
  }
}

function z(t, n) {
  return null == t ? n : +t;
}

N.childContextTypes = {
  isInSurface: PropTypes.bool,
};
var E = new module192();

function F(t) {
  var n = null != t.scaleX ? t.scaleX : null != t.scale ? t.scale : 1,
    o = null != t.scaleY ? t.scaleY : null != t.scale ? t.scale : 1;
  E.transformTo(1, 0, 0, 1, 0, 0)
    .move(t.x || 0, t.y || 0)
    .rotate(t.rotation || 0, t.originX, t.originY)
    .scale(n, o, t.originX, t.originY);
  if (null != t.transform) E.transform(t.transform);
  return [E.xx, E.yx, E.xy, E.yy, E.x, E.y];
}

function M(t) {
  return false === t.visible ? 0 : null == t.opacity ? 1 : +t.opacity;
}

class P {
  constructor() {
    module6(this, s);
    return l.apply(this, arguments);
  }

  render() {
    var t = this.props;
    module14(this.context.isInSurface, 'ART: <Group /> must be a child of a <Surface />');
    return (
      <J opacity={M(t)} transform={F(t)}>
        {this.props.children}
      </J>
    );
  }
}

P.contextTypes = {
  isInSurface: PropTypes.bool.isRequired,
};
var Y = 0,
  O = 1,
  q = 2,
  j = 3;

class X {
  constructor() {
    module6(this, s);
    return l.apply(this, arguments);
  }

  render() {
    var t = this.props,
      n = [z(t.x, 0), z(t.y, 0), z(t.width, 0), z(t.height, 0)],
      o = module194(t);
    delete o.x;
    delete o.y;
    return (
      <J clipping={n} opacity={M(t)} transform={F(o)}>
        {this.props.children}
      </J>
    );
  }
}

function L(t, n, o) {
  var u = new module188(t);
  n[o + 0] = u.red / 255;
  n[o + 1] = u.green / 255;
  n[o + 2] = u.blue / 255;
  n[o + 3] = u.alpha;
}

function U(t, n, o) {
  var u = 0;
  if ('length' in t)
    for (; u < t.length; ) {
      L(t[u], n, o + 4 * u);
      u++;
    }
  else
    for (var l in t) {
      L(t[l], n, o + 4 * u);
      u++;
    }
  return o + 4 * u;
}

function $(t, n, o, u, l) {
  var f,
    s = 0;
  if ('length' in t)
    for (; s < t.length; ) {
      f = (s / (t.length - 1)) * u;
      n[o + s] = l ? 1 - f : f;
      s++;
    }
  else
    for (var c in t) {
      f = +c * u;
      n[o + s] = l ? 1 - f : f;
      s++;
    }
  return o + s;
}

function B(t, n, o) {
  $(t, n, U(t, n, o), 1, false);
}

function H(t, n, o) {
  var u = U(t, n, o);
  $(t, n, (u = $(t, n, (u = U(t, n, u)), 0.5, false)), 0.5, true);
}

function K(t, n) {
  var o = t[0],
    u = +n.width,
    l = +n.height;

  if (o === O) {
    t[1] *= u;
    t[2] *= l;
    t[3] *= u;
    t[4] *= l;
  } else if (o === q) {
    t[1] *= u;
    t[2] *= l;
    t[3] *= u;
    t[4] *= l;
    t[5] *= u;
    t[6] *= l;
  }
}

function Q(t, n) {
  if (null == t) return null;

  if (t._brush) {
    if (t._bb) {
      K(t._brush, n);
      t._bb = false;
    }

    return t._brush;
  }

  var o = new module188(t);
  return [Y, o.red / 255, o.green / 255, o.blue / 255, o.alpha];
}

function Z(t) {
  if (null == t) return null;
  var n = new module188(t);
  return [n.red / 255, n.green / 255, n.blue / 255, n.alpha];
}

function tt(t) {
  switch (t) {
    case 'butt':
      return 0;

    case 'square':
      return 2;

    default:
      return 1;
  }
}

function nt(t) {
  switch (t) {
    case 'miter':
      return 0;

    case 'bevel':
      return 2;

    default:
      return 1;
  }
}

var rt = {},
  it = /^[\s"']*/,
  ot = /[\s"']*$/;

class et {
  constructor() {
    module6(this, s);
    return l.apply(this, arguments);
  }

  render() {
    var t = this.props,
      n = t.d || I(t.children),
      o = (n instanceof module189 ? n : new module189(n)).toJSON();
    return (
      <V
        fill={Q(t.fill, t)}
        opacity={M(t)}
        stroke={Z(t.stroke)}
        strokeCap={tt(t.strokeCap)}
        strokeDash={t.strokeDash || null}
        strokeJoin={nt(t.strokeJoin)}
        strokeWidth={z(t.strokeWidth, 1)}
        transform={F(t)}
        d={o}
      />
    );
  }
}

function ut(t) {
  return t.split(',')[0].replace(it, '').replace(ot, '');
}

function at(t) {
  if (rt.hasOwnProperty(t)) return rt[t];
  var n = /^\s*((?:(?:normal|bold|italic)\s+)*)(?:(\d+(?:\.\d+)?)[ptexm\%]*(?:\s*\/.*?)?\s+)?\s*\"?([^\"]*)/i.exec(t);
  if (!n) return null;
  var o = ut(n[3]),
    u = +n[2] || 12,
    l = /bold/.exec(n[1]),
    f = /italic/.exec(n[1]);
  rt[t] = {
    fontFamily: o,
    fontSize: u,
    fontWeight: l ? 'bold' : 'normal',
    fontStyle: f ? 'italic' : 'normal',
  };
  return rt[t];
}

function lt(t) {
  return null == t
    ? null
    : 'string' == typeof t
    ? at(t)
    : {
        fontFamily: ut(t.fontFamily),
        fontSize: +t.fontSize || 12,
        fontWeight: null != t.fontWeight ? t.fontWeight.toString() : '400',
        fontStyle: t.fontStyle,
      };
}

var ft = /\n/g;

function st(t) {
  switch (t) {
    case 'right':
      return 1;

    case 'center':
      return 2;

    default:
      return 0;
  }
}

class ct {
  constructor() {
    module6(this, s);
    return l.apply(this, arguments);
  }

  render() {
    var module6 = o.font,
      module7 = I(o.children),
      o = this.props,
      u = o.path,
      l = u ? (u instanceof module189 ? u : new module189(u)).toJSON() : null,
      f = {
        font: lt(module6),
        lines: module7.split(ft),
      };
    return (
      <G
        fill={Q(o.fill, o)}
        opacity={M(o)}
        stroke={Z(o.stroke)}
        strokeCap={tt(o.strokeCap)}
        strokeDash={o.strokeDash || null}
        strokeJoin={nt(o.strokeJoin)}
        strokeWidth={z(o.strokeWidth, 1)}
        transform={F(o)}
        alignment={st(o.alignment)}
        frame={f}
        path={l}
      />
    );
  }
}

var ht = {
  LinearGradient: function (t, n, o, u, l) {
    var f = O;

    if (arguments.length < 5) {
      var s = ((null == n ? 270 : n) * Math.PI) / 180,
        c = Math.cos(s),
        h = -Math.sin(s),
        p = (Math.abs(c) + Math.abs(h)) / 2;
      n = 0.5 - (c *= p);
      u = 0.5 + c;
      o = 0.5 - (h *= p);
      l = 0.5 + h;
      this._bb = true;
    } else this._bb = false;

    var v = [f, +n, +o, +u, +l];
    B(t, v, 5);
    this._brush = v;
  },
  RadialGradient: function (t, n, o, u, l, f, s) {
    if (null == l) l = u;
    if (null == f) f = n;
    if (null == s) s = o;

    if (null == n) {
      n = o = u = l = f = s = 0.5;
      this._bb = true;
    } else this._bb = false;

    var c = [q, +n, +o, 2 * +u, 2 * +l, +f, +s];
    H(t, c, 7);
    this._brush = c;
  },
  Pattern: function (t, n, o, u, l) {
    this._brush = [j, t, +u || 0, +l || 0, +n, +o];
  },
  Transform: module192,
  Path: module189,
  Surface: N,
  Group: P,
  ClippingRectangle: X,
  Shape: et,
  Text: ct,
};
module.exports = ht;
