var module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11');

function f(t) {
  var n = s();
  return function () {
    var o,
      f = module11(t);

    if (n) {
      var s = module11(this).constructor;
      o = Reflect.construct(f, arguments, s);
    } else o = f.apply(this, arguments);

    return module9(this, o);
  };
}

function s() {
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

var module186 = require('./186'),
  module187 = require('./187'),
  module190 = require('./190'),
  React = require('react'),
  PropTypes = require('prop-types'),
  module191 = require('./191'),
  module181 = require('./181'),
  module192 = require('./192'),
  module13 = require('./13');

function x(t, n) {
  if (null == t || null == n) return true;
  if (t.length !== n.length) return true;

  for (var o = 0; o < t.length; o++) if (t[o] !== n[o]) return true;

  return false;
}

var C = module192(module191.UIView, {}),
  R = {
    transform: {
      diff: x,
    },
    opacity: true,
  },
  T = module192(R, {
    clipping: {
      diff: x,
    },
  }),
  _ = module192(R, {
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
  A = module192(_, {
    d: {
      diff: x,
    },
  }),
  W = module192(_, {
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
  J = module181('ARTSurfaceView', function () {
    return {
      validAttributes: C,
      uiViewClassName: 'ARTSurfaceView',
    };
  }),
  V = module181('ARTGroup', function () {
    return {
      validAttributes: T,
      uiViewClassName: 'ARTGroup',
    };
  }),
  G = module181('ARTShape', function () {
    return {
      validAttributes: A,
      uiViewClassName: 'ARTShape',
    };
  }),
  I = module181('ARTText', function () {
    return {
      validAttributes: W,
      uiViewClassName: 'ARTText',
    };
  });

function N(t) {
  return t ? ('string' == typeof t ? t : t.length ? t.join('\n') : '') : '';
}

var z = (function (u) {
  module7(s, u);
  var l = f(s);

  function s() {
    module4(this, s);
    return l.apply(this, arguments);
  }

  module5(s, [
    {
      key: 'getChildContext',
      value: function () {
        return {
          isInSurface: true,
        };
      },
    },
    {
      key: 'render',
      value: function () {
        var t = D(this.props.height, 0),
          n = D(this.props.width, 0);
        return (
          <J
            style={[
              this.props.style,
              {
                height: t,
                width: n,
              },
            ]}
          >
            {this.props.children}
          </J>
        );
      },
    },
  ]);
  return s;
})(React.Component);

function D(t, n) {
  return null == t ? n : +t;
}

z.childContextTypes = {
  isInSurface: PropTypes.bool,
};
var E = new module190();

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

var P = (function (u) {
  module7(s, u);
  var l = f(s);

  function s() {
    module4(this, s);
    return l.apply(this, arguments);
  }

  module5(s, [
    {
      key: 'render',
      value: function () {
        var t = this.props;
        module13(this.context.isInSurface, 'ART: <Group /> must be a child of a <Surface />');
        return (
          <V opacity={M(t)} transform={F(t)}>
            {this.props.children}
          </V>
        );
      },
    },
  ]);
  return s;
})(React.Component);

P.contextTypes = {
  isInSurface: PropTypes.bool.isRequired,
};

var O = (function (u) {
    module7(s, u);
    var l = f(s);

    function s() {
      module4(this, s);
      return l.apply(this, arguments);
    }

    module5(s, [
      {
        key: 'render',
        value: function () {
          var t = this.props,
            n = [D(t.x, 0), D(t.y, 0), D(t.width, 0), D(t.height, 0)],
            o = module192(t);
          delete o.x;
          delete o.y;
          return (
            <V clipping={n} opacity={M(t)} transform={F(o)}>
              {this.props.children}
            </V>
          );
        },
      },
    ]);
    return s;
  })(React.Component),
  X = 0,
  Y = 1,
  q = 2,
  B = 3;

function j(t, n, o) {
  var u = new module186(t);
  n[o + 0] = u.red / 255;
  n[o + 1] = u.green / 255;
  n[o + 2] = u.blue / 255;
  n[o + 3] = u.alpha;
}

function L(t, n, o) {
  var u = 0;
  if ('length' in t)
    for (; u < t.length; ) {
      j(t[u], n, o + 4 * u);
      u++;
    }
  else
    for (var l in t) {
      j(t[l], n, o + 4 * u);
      u++;
    }
  return o + 4 * u;
}

function U(t, n, o, u, l) {
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

function $(t, n, o) {
  U(t, n, L(t, n, o), 1, false);
}

function H(t, n, o) {
  var u = L(t, n, o);
  U(t, n, (u = U(t, n, (u = L(t, n, u)), 0.5, false)), 0.5, true);
}

function K(t, n) {
  var o = t[0],
    u = +n.width,
    l = +n.height;

  if (o === Y) {
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

  var o = new module186(t);
  return [X, o.red / 255, o.green / 255, o.blue / 255, o.alpha];
}

function Z(t) {
  if (null == t) return null;
  var n = new module186(t);
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

var et = (function (u) {
    module7(s, u);
    var l = f(s);

    function s() {
      module4(this, s);
      return l.apply(this, arguments);
    }

    module5(s, [
      {
        key: 'render',
        value: function () {
          var t = this.props,
            n = t.d || N(t.children),
            o = (n instanceof module187 ? n : new module187(n)).toJSON();
          return (
            <G
              fill={Q(t.fill, t)}
              opacity={M(t)}
              stroke={Z(t.stroke)}
              strokeCap={tt(t.strokeCap)}
              strokeDash={t.strokeDash || null}
              strokeJoin={nt(t.strokeJoin)}
              strokeWidth={D(t.strokeWidth, 1)}
              transform={F(t)}
              d={o}
            />
          );
        },
      },
    ]);
    return s;
  })(React.Component),
  rt = {},
  it = /^[\s"']*/,
  ot = /[\s"']*$/;

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

var ct = (function (u) {
  module7(s, u);
  var l = f(s);

  function s() {
    module4(this, s);
    return l.apply(this, arguments);
  }

  module5(s, [
    {
      key: 'render',
      value: function () {
        var module4 = o.font,
          module5 = N(o.children),
          o = this.props,
          u = o.path,
          l = u ? (u instanceof module187 ? u : new module187(u)).toJSON() : null,
          f = {
            font: lt(module4),
            lines: module5.split(ft),
          };
        return (
          <I
            fill={Q(o.fill, o)}
            opacity={M(o)}
            stroke={Z(o.stroke)}
            strokeCap={tt(o.strokeCap)}
            strokeDash={o.strokeDash || null}
            strokeJoin={nt(o.strokeJoin)}
            strokeWidth={D(o.strokeWidth, 1)}
            transform={F(o)}
            alignment={st(o.alignment)}
            frame={f}
            path={l}
          />
        );
      },
    },
  ]);
  return s;
})(React.Component);

var ht = {
  LinearGradient: function (t, n, o, u, l) {
    var f = Y;

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
    $(t, v, 5);
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
    this._brush = [B, t, +u || 0, +l || 0, +n, +o];
  },
  Transform: module190,
  Path: module187,
  Surface: z,
  Group: P,
  ClippingRectangle: O,
  Shape: et,
  Text: ct,
};
module.exports = ht;
