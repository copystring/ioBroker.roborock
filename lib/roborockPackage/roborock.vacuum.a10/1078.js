function n(t, u, o, f) {
  this.message = t;
  this.expected = u;
  this.found = o;
  this.location = f;
  this.name = 'SyntaxError';
  if ('function' == typeof Error.captureStackTrace) Error.captureStackTrace(this, n);
}

!(function (n, t) {
  function u() {
    this.constructor = n;
  }

  u.prototype = t.prototype;
  n.prototype = new u();
})(n, Error);

n.buildMessage = function (n, t) {
  var u = {
    literal: function (n) {
      return '"' + f(n.text) + '"';
    },
    class: function (n) {
      var t,
        u = '';

      for (t = 0; t < n.parts.length; t++) u += n.parts[t] instanceof Array ? s(n.parts[t][0]) + '-' + s(n.parts[t][1]) : s(n.parts[t]);

      return '[' + (n.inverted ? '^' : '') + u + ']';
    },
    any: function (n) {
      return 'any character';
    },
    end: function (n) {
      return 'end of input';
    },
    other: function (n) {
      return n.description;
    },
  };

  function o(n) {
    return n.charCodeAt(0).toString(16).toUpperCase();
  }

  function f(n) {
    return n
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"')
      .replace(/\0/g, '\\0')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/[\x00-\x0F]/g, function (n) {
        return '\\x0' + o(n);
      })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function (n) {
        return '\\x' + o(n);
      });
  }

  function s(n) {
    return n
      .replace(/\\/g, '\\\\')
      .replace(/\]/g, '\\]')
      .replace(/\^/g, '\\^')
      .replace(/-/g, '\\-')
      .replace(/\0/g, '\\0')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/[\x00-\x0F]/g, function (n) {
        return '\\x0' + o(n);
      })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function (n) {
        return '\\x' + o(n);
      });
  }

  return (
    'Expected ' +
    (function (n) {
      var t,
        o,
        f,
        s = new Array(n.length);

      for (t = 0; t < n.length; t++) s[t] = ((f = n[t]), u[f.type](f));

      if ((s.sort(), s.length > 0)) {
        for (t = 1, o = 1; t < s.length; t++) s[t - 1] !== s[t] && ((s[o] = s[t]), o++);

        s.length = o;
      }

      switch (s.length) {
        case 1:
          return s[0];

        case 2:
          return s[0] + ' or ' + s[1];

        default:
          return s.slice(0, -1).join(', ') + ', or ' + s[s.length - 1];
      }
    })(n) +
    ' but ' +
    (function (n) {
      return n ? '"' + f(n) + '"' : 'end of input';
    })(t) +
    ' found.'
  );
};

module.exports = {
  SyntaxError: n,
  parse: function (t, u) {
    u = undefined !== u ? u : {};

    var o,
      f = {},
      s = {
        transformList: ve,
      },
      l = ve,
      c = function (n) {
        return n;
      },
      h = function (n, t) {
        o = t;
        f = (u = n)[0];
        s = u[1];
        l = u[2];
        c = u[3];
        h = u[4];
        p = u[5];
        v = o[0];
        A = o[1];
        x = o[2];
        C = o[3];
        y = o[4];
        j = o[5];
        return [f * v + s * C, f * A + s * y, f * x + s * j + l, c * v + h * C, c * A + h * y, c * x + h * j + p];
        var u, o, f, s, l, c, h, p, v, A, x, C, y, j;
      },
      p = 'matrix',
      v = ce('matrix', false),
      A = '(',
      x = ce('(', false),
      C = ')',
      y = ce(')', false),
      j = function (n, t, u, o, f, s) {
        return [n, u, f, t, o, s];
      },
      w = 'translate',
      b = ce('translate', false),
      E = function (n, t) {
        return [1, 0, n, 0, 1, t || 0];
      },
      F = 'scale',
      M = ce('scale', false),
      k = function (n, t) {
        return [n, 0, 0, 0, null === t ? n : t, 0];
      },
      S = 'rotate',
      R = ce('rotate', false),
      I = function (n, t) {
        var u = Math.cos(Be * n),
          o = Math.sin(Be * n);

        if (null !== t) {
          var f = t[0],
            s = t[1];
          return [u, -o, u * -f + -o * -s + f, o, u, o * -f + u * -s + s];
        }

        return [u, -o, 0, o, u, 0];
      },
      T = 'skewX',
      X = ce('skewX', false),
      Y = function (n) {
        return [1, Math.tan(Be * n), 0, 0, 1, 0];
      },
      _ = 'skewY',
      L = ce('skewY', false),
      P = function (n) {
        return [1, 0, 0, Math.tan(Be * n), 1, 0];
      },
      U = function (n) {
        return parseFloat(n.join(''));
      },
      q = function (n) {
        return parseInt(n.join(''));
      },
      z = function (n) {
        return n;
      },
      B = function (n, t) {
        return [n, t];
      },
      D = ',',
      G = ce(',', false),
      H = function (n) {
        return n.join('');
      },
      J = function (n) {
        return n.join('');
      },
      K = function (n) {
        return n.join('');
      },
      N = {
        type: 'other',
        description: 'fractionalConstant',
      },
      O = '.',
      Q = ce('.', false),
      V = function (n, t) {
        return [n ? n.join('') : null, '.', t.join('')].join('');
      },
      W = /^[eE]/,
      Z = he(['e', 'E'], false, false),
      $ = function (n) {
        return [n[0], n[1], n[2].join('')].join('');
      },
      ee = /^[+\-]/,
      re = he(['+', '-'], false, false),
      ne = /^[0-9]/,
      te = he([['0', '9']], false, false),
      ue = /^[ \t\r\n]/,
      oe = he([' ', '\t', '\r', '\n'], false, false),
      ie = 0,
      fe = [
        {
          line: 1,
          column: 1,
        },
      ],
      se = 0,
      le = [],
      ae = 0;

    if ('startRule' in u) {
      if (!(u.startRule in s)) throw new Error('Can\'t start parsing from rule "' + u.startRule + '".');
      l = s[u.startRule];
    }

    function ce(n, t) {
      return {
        type: 'literal',
        text: n,
        ignoreCase: t,
      };
    }

    function he(n, t, u) {
      return {
        type: 'class',
        parts: n,
        inverted: t,
        ignoreCase: u,
      };
    }

    function pe(n) {
      var u,
        o = fe[n];
      if (o) return o;

      for (u = n - 1; !fe[u]; ) u--;

      for (
        o = {
          line: (o = fe[u]).line,
          column: o.column,
        };
        u < n;

      ) {
        if (10 === t.charCodeAt(u)) {
          o.line++;
          o.column = 1;
        } else o.column++;

        u++;
      }

      fe[n] = o;
      return o;
    }

    function ge(n, t) {
      var u = pe(n),
        o = pe(t);
      return {
        start: {
          offset: n,
          line: u.line,
          column: u.column,
        },
        end: {
          offset: t,
          line: o.line,
          column: o.column,
        },
      };
    }

    function de(n) {
      if (!(ie < se)) {
        if (ie > se) {
          se = ie;
          le = [];
        }

        le.push(n);
      }
    }

    function ve() {
      var n, t, u, o, s;

      for (n = ie, t = [], u = Pe(); u !== f; ) {
        t.push(u);
        u = Pe();
      }

      if (t !== f) {
        if (((u = Ae()) === f && (u = null), u !== f)) {
          for (o = [], s = Pe(); s !== f; ) {
            o.push(s);
            s = Pe();
          }

          if (o !== f) n = t = c(u);
          else {
            ie = n;
            n = f;
          }
        } else {
          ie = n;
          n = f;
        }
      } else {
        ie = n;
        n = f;
      }
      return n;
    }

    function Ae() {
      var n, t, u, o;

      if (((n = ie), (t = xe()) !== f)) {
        for (u = [], o = ke(); o !== f; ) {
          u.push(o);
          o = ke();
        }

        if (u !== f && (o = Ae()) !== f) n = t = h(t, o);
        else {
          ie = n;
          n = f;
        }
      } else {
        ie = n;
        n = f;
      }

      if (n === f) n = xe();
      return n;
    }

    function xe() {
      var n;
      if ((n = Ce()) === f && (n = me()) === f && (n = ye()) === f && (n = je()) === f && (n = we()) === f) n = be();
      return n;
    }

    function Ce() {
      var n, u, o, s, l, c, h, w, b, E, F, M, k;

      if (((n = ie), t.substr(ie, 6) === p ? ((u = p), (ie += 6)) : ((u = f), 0 === ae && de(v)), u !== f)) {
        for (o = [], s = Pe(); s !== f; ) {
          o.push(s);
          s = Pe();
        }

        if (o !== f) {
          if ((40 === t.charCodeAt(ie) ? ((s = A), ie++) : ((s = f), 0 === ae && de(x)), s !== f)) {
            for (l = [], c = Pe(); c !== f; ) {
              l.push(c);
              c = Pe();
            }

            if (l !== f) {
              if ((c = Ee()) !== f) {
                if (ke() !== f) {
                  if ((h = Ee()) !== f) {
                    if (ke() !== f) {
                      if ((w = Ee()) !== f) {
                        if (ke() !== f) {
                          if ((b = Ee()) !== f) {
                            if (ke() !== f) {
                              if ((E = Ee()) !== f) {
                                if (ke() !== f) {
                                  if ((F = Ee()) !== f) {
                                    for (M = [], k = Pe(); k !== f; ) {
                                      M.push(k);
                                      k = Pe();
                                    }

                                    if (M !== f) {
                                      if (41 === t.charCodeAt(ie)) {
                                        k = C;
                                        ie++;
                                      } else {
                                        k = f;
                                        if (0 === ae) de(y);
                                      }

                                      if (k !== f) n = u = j(c, h, w, b, E, F);
                                      else {
                                        ie = n;
                                        n = f;
                                      }
                                    } else {
                                      ie = n;
                                      n = f;
                                    }
                                  } else {
                                    ie = n;
                                    n = f;
                                  }
                                } else {
                                  ie = n;
                                  n = f;
                                }
                              } else {
                                ie = n;
                                n = f;
                              }
                            } else {
                              ie = n;
                              n = f;
                            }
                          } else {
                            ie = n;
                            n = f;
                          }
                        } else {
                          ie = n;
                          n = f;
                        }
                      } else {
                        ie = n;
                        n = f;
                      }
                    } else {
                      ie = n;
                      n = f;
                    }
                  } else {
                    ie = n;
                    n = f;
                  }
                } else {
                  ie = n;
                  n = f;
                }
              } else {
                ie = n;
                n = f;
              }
            } else {
              ie = n;
              n = f;
            }
          } else {
            ie = n;
            n = f;
          }
        } else {
          ie = n;
          n = f;
        }
      } else {
        ie = n;
        n = f;
      }

      return n;
    }

    function me() {
      var n, u, o, s, l, c, h, p, v;

      if (((n = ie), t.substr(ie, 9) === w ? ((u = w), (ie += 9)) : ((u = f), 0 === ae && de(b)), u !== f)) {
        for (o = [], s = Pe(); s !== f; ) {
          o.push(s);
          s = Pe();
        }

        if (o !== f) {
          if ((40 === t.charCodeAt(ie) ? ((s = A), ie++) : ((s = f), 0 === ae && de(x)), s !== f)) {
            for (l = [], c = Pe(); c !== f; ) {
              l.push(c);
              c = Pe();
            }

            if (l !== f) {
              if ((c = Ee()) !== f) {
                if (((h = Fe()) === f && (h = null), h !== f)) {
                  for (p = [], v = Pe(); v !== f; ) {
                    p.push(v);
                    v = Pe();
                  }

                  if (p !== f) {
                    if (41 === t.charCodeAt(ie)) {
                      v = C;
                      ie++;
                    } else {
                      v = f;
                      if (0 === ae) de(y);
                    }

                    if (v !== f) n = u = E(c, h);
                    else {
                      ie = n;
                      n = f;
                    }
                  } else {
                    ie = n;
                    n = f;
                  }
                } else {
                  ie = n;
                  n = f;
                }
              } else {
                ie = n;
                n = f;
              }
            } else {
              ie = n;
              n = f;
            }
          } else {
            ie = n;
            n = f;
          }
        } else {
          ie = n;
          n = f;
        }
      } else {
        ie = n;
        n = f;
      }

      return n;
    }

    function ye() {
      var n, u, o, s, l, c, h, p, v;

      if (((n = ie), t.substr(ie, 5) === F ? ((u = F), (ie += 5)) : ((u = f), 0 === ae && de(M)), u !== f)) {
        for (o = [], s = Pe(); s !== f; ) {
          o.push(s);
          s = Pe();
        }

        if (o !== f) {
          if ((40 === t.charCodeAt(ie) ? ((s = A), ie++) : ((s = f), 0 === ae && de(x)), s !== f)) {
            for (l = [], c = Pe(); c !== f; ) {
              l.push(c);
              c = Pe();
            }

            if (l !== f) {
              if ((c = Ee()) !== f) {
                if (((h = Fe()) === f && (h = null), h !== f)) {
                  for (p = [], v = Pe(); v !== f; ) {
                    p.push(v);
                    v = Pe();
                  }

                  if (p !== f) {
                    if (41 === t.charCodeAt(ie)) {
                      v = C;
                      ie++;
                    } else {
                      v = f;
                      if (0 === ae) de(y);
                    }

                    if (v !== f) n = u = k(c, h);
                    else {
                      ie = n;
                      n = f;
                    }
                  } else {
                    ie = n;
                    n = f;
                  }
                } else {
                  ie = n;
                  n = f;
                }
              } else {
                ie = n;
                n = f;
              }
            } else {
              ie = n;
              n = f;
            }
          } else {
            ie = n;
            n = f;
          }
        } else {
          ie = n;
          n = f;
        }
      } else {
        ie = n;
        n = f;
      }

      return n;
    }

    function je() {
      var n, u, o, s, l, c, h, p, v;

      if (((n = ie), t.substr(ie, 6) === S ? ((u = S), (ie += 6)) : ((u = f), 0 === ae && de(R)), u !== f)) {
        for (o = [], s = Pe(); s !== f; ) {
          o.push(s);
          s = Pe();
        }

        if (o !== f) {
          if ((40 === t.charCodeAt(ie) ? ((s = A), ie++) : ((s = f), 0 === ae && de(x)), s !== f)) {
            for (l = [], c = Pe(); c !== f; ) {
              l.push(c);
              c = Pe();
            }

            if (l !== f) {
              if ((c = Ee()) !== f) {
                if (((h = Me()) === f && (h = null), h !== f)) {
                  for (p = [], v = Pe(); v !== f; ) {
                    p.push(v);
                    v = Pe();
                  }

                  if (p !== f) {
                    if (41 === t.charCodeAt(ie)) {
                      v = C;
                      ie++;
                    } else {
                      v = f;
                      if (0 === ae) de(y);
                    }

                    if (v !== f) n = u = I(c, h);
                    else {
                      ie = n;
                      n = f;
                    }
                  } else {
                    ie = n;
                    n = f;
                  }
                } else {
                  ie = n;
                  n = f;
                }
              } else {
                ie = n;
                n = f;
              }
            } else {
              ie = n;
              n = f;
            }
          } else {
            ie = n;
            n = f;
          }
        } else {
          ie = n;
          n = f;
        }
      } else {
        ie = n;
        n = f;
      }

      return n;
    }

    function we() {
      var n, u, o, s, l, c, h, p;

      if (((n = ie), t.substr(ie, 5) === T ? ((u = T), (ie += 5)) : ((u = f), 0 === ae && de(X)), u !== f)) {
        for (o = [], s = Pe(); s !== f; ) {
          o.push(s);
          s = Pe();
        }

        if (o !== f) {
          if ((40 === t.charCodeAt(ie) ? ((s = A), ie++) : ((s = f), 0 === ae && de(x)), s !== f)) {
            for (l = [], c = Pe(); c !== f; ) {
              l.push(c);
              c = Pe();
            }

            if (l !== f) {
              if ((c = Ee()) !== f) {
                for (h = [], p = Pe(); p !== f; ) {
                  h.push(p);
                  p = Pe();
                }

                if (h !== f) {
                  if (41 === t.charCodeAt(ie)) {
                    p = C;
                    ie++;
                  } else {
                    p = f;
                    if (0 === ae) de(y);
                  }

                  if (p !== f) n = u = Y(c);
                  else {
                    ie = n;
                    n = f;
                  }
                } else {
                  ie = n;
                  n = f;
                }
              } else {
                ie = n;
                n = f;
              }
            } else {
              ie = n;
              n = f;
            }
          } else {
            ie = n;
            n = f;
          }
        } else {
          ie = n;
          n = f;
        }
      } else {
        ie = n;
        n = f;
      }

      return n;
    }

    function be() {
      var n, u, o, s, l, c, h, p;

      if (((n = ie), t.substr(ie, 5) === _ ? ((u = _), (ie += 5)) : ((u = f), 0 === ae && de(L)), u !== f)) {
        for (o = [], s = Pe(); s !== f; ) {
          o.push(s);
          s = Pe();
        }

        if (o !== f) {
          if ((40 === t.charCodeAt(ie) ? ((s = A), ie++) : ((s = f), 0 === ae && de(x)), s !== f)) {
            for (l = [], c = Pe(); c !== f; ) {
              l.push(c);
              c = Pe();
            }

            if (l !== f) {
              if ((c = Ee()) !== f) {
                for (h = [], p = Pe(); p !== f; ) {
                  h.push(p);
                  p = Pe();
                }

                if (h !== f) {
                  if (41 === t.charCodeAt(ie)) {
                    p = C;
                    ie++;
                  } else {
                    p = f;
                    if (0 === ae) de(y);
                  }

                  if (p !== f) n = u = P(c);
                  else {
                    ie = n;
                    n = f;
                  }
                } else {
                  ie = n;
                  n = f;
                }
              } else {
                ie = n;
                n = f;
              }
            } else {
              ie = n;
              n = f;
            }
          } else {
            ie = n;
            n = f;
          }
        } else {
          ie = n;
          n = f;
        }
      } else {
        ie = n;
        n = f;
      }

      return n;
    }

    function Ee() {
      var n, t, u, o;
      n = ie;
      t = ie;
      if ((u = Ye()) === f) u = null;
      if (u !== f && (o = Ie()) !== f) t = u = [u, o];
      else {
        ie = t;
        t = f;
      }
      if (t !== f) t = U(t);

      if ((n = t) === f) {
        n = ie;
        t = ie;
        if ((u = Ye()) === f) u = null;
        if (u !== f && (o = Re()) !== f) t = u = [u, o];
        else {
          ie = t;
          t = f;
        }
        if (t !== f) t = q(t);
        n = t;
      }

      return n;
    }

    function Fe() {
      var n, t;
      n = ie;
      if (ke() !== f && (t = Ee()) !== f) n = z(t);
      else {
        ie = n;
        n = f;
      }
      return n;
    }

    function Me() {
      var n, t, u;
      n = ie;
      if (ke() !== f && (t = Ee()) !== f && ke() !== f && (u = Ee()) !== f) n = B(t, u);
      else {
        ie = n;
        n = f;
      }
      return n;
    }

    function ke() {
      var n, t, u, o, s;
      if (((n = ie), (t = []), (u = Pe()) !== f))
        for (; u !== f; ) {
          t.push(u);
          u = Pe();
        }
      else t = f;
      if (t !== f) {
        if (((u = Se()) === f && (u = null), u !== f)) {
          for (o = [], s = Pe(); s !== f; ) {
            o.push(s);
            s = Pe();
          }

          if (o !== f) n = t = [t, u, o];
          else {
            ie = n;
            n = f;
          }
        } else {
          ie = n;
          n = f;
        }
      } else {
        ie = n;
        n = f;
      }
      if (n === f)
        if (((n = ie), (t = Se()) !== f)) {
          for (u = [], o = Pe(); o !== f; ) {
            u.push(o);
            o = Pe();
          }

          if (u !== f) n = t = [t, u];
          else {
            ie = n;
            n = f;
          }
        } else {
          ie = n;
          n = f;
        }
      return n;
    }

    function Se() {
      var n;

      if (44 === t.charCodeAt(ie)) {
        n = D;
        ie++;
      } else {
        n = f;
        if (0 === ae) de(G);
      }

      return n;
    }

    function Re() {
      var n;
      ie;
      if ((n = _e()) !== f) n = H(n);
      return n;
    }

    function Ie() {
      var n, t, u, o;
      n = ie;
      t = ie;

      if ((u = Te()) !== f) {
        if ((o = Xe()) === f) o = null;
        if (o !== f) t = u = [u, o];
        else {
          ie = t;
          t = f;
        }
      } else {
        ie = t;
        t = f;
      }

      if (t !== f) t = J(t);

      if ((n = t) === f) {
        n = ie;
        t = ie;
        if ((u = _e()) !== f && (o = Xe()) !== f) t = u = [u, o];
        else {
          ie = t;
          t = f;
        }
        if (t !== f) t = K(t);
        n = t;
      }

      return n;
    }

    function Te() {
      var n, u, o, s;
      ae++;
      n = ie;
      if ((u = _e()) === f) u = null;

      if (u !== f) {
        if (46 === t.charCodeAt(ie)) {
          o = O;
          ie++;
        } else {
          o = f;
          if (0 === ae) de(Q);
        }

        if (o !== f && (s = _e()) !== f) n = u = V(u, s);
        else {
          ie = n;
          n = f;
        }
      } else {
        ie = n;
        n = f;
      }

      if (n === f) {
        n = ie;

        if ((u = _e()) !== f) {
          if (46 === t.charCodeAt(ie)) {
            o = O;
            ie++;
          } else {
            o = f;
            if (0 === ae) de(Q);
          }

          if (o !== f) n = u = K(u);
          else {
            ie = n;
            n = f;
          }
        } else {
          ie = n;
          n = f;
        }
      }

      ae--;

      if (n === f) {
        u = f;
        if (0 === ae) de(N);
      }

      return n;
    }

    function Xe() {
      var n, u, o, s;
      ie;
      n = ie;

      if (W.test(t.charAt(ie))) {
        u = t.charAt(ie);
        ie++;
      } else {
        u = f;
        if (0 === ae) de(Z);
      }

      if (u !== f) {
        if ((o = Ye()) === f) o = null;
        if (o !== f && (s = _e()) !== f) n = u = [u, o, s];
        else {
          ie = n;
          n = f;
        }
      } else {
        ie = n;
        n = f;
      }

      if (n !== f) n = $(n);
      return n;
    }

    function Ye() {
      var n;

      if (ee.test(t.charAt(ie))) {
        n = t.charAt(ie);
        ie++;
      } else {
        n = f;
        if (0 === ae) de(re);
      }

      return n;
    }

    function _e() {
      var n, t;
      if (((n = []), (t = Le()) !== f))
        for (; t !== f; ) {
          n.push(t);
          t = Le();
        }
      else n = f;
      return n;
    }

    function Le() {
      var n;

      if (ne.test(t.charAt(ie))) {
        n = t.charAt(ie);
        ie++;
      } else {
        n = f;
        if (0 === ae) de(te);
      }

      return n;
    }

    function Pe() {
      var n;

      if (ue.test(t.charAt(ie))) {
        n = t.charAt(ie);
        ie++;
      } else {
        n = f;
        if (0 === ae) de(oe);
      }

      return n;
    }

    var Ue,
      qe,
      ze,
      Be = Math.PI / 180;
    if ((o = l()) !== f && ie === t.length) return o;
    throw (
      (o !== f &&
        ie < t.length &&
        de({
          type: 'end',
        }),
      (Ue = le),
      (qe = se < t.length ? t.charAt(se) : null),
      (ze = se < t.length ? ge(se, se + 1) : ge(se, se)),
      new n(n.buildMessage(Ue, qe), Ue, qe, ze))
    );
  },
};
