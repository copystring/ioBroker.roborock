!(function (t) {
  if ('object' == typeof exports && undefined !== module) module.exports = t();
  else if ('function' == typeof define && define.amd) define([], t);
  else ('undefined' != typeof window ? window : undefined !== globals ? globals : 'undefined' != typeof self ? self : this).pako = t();
})(function () {
  return (function t(n, s, h) {
    function l(_, u) {
      if (!s[_]) {
        if (!n[_]) {
          var f = 'function' == typeof require && require;
          if (!u && f) return f(_, true);
          if (o) return o(_, true);
          var c = new Error("Cannot find module '" + _ + "'");
          throw ((c.code = 'MODULE_NOT_FOUND'), c);
        }

        var p = (s[_] = {
          exports: {},
        });

        n[_][0].call(
          p.exports,
          function (t) {
            return l(n[_][1][t] || t);
          },
          p,
          p.exports,
          t,
          n,
          s,
          h
        );
      }

      return s[_].exports;
    }

    for (var o = 'function' == typeof require && require, _ = 0; _ < h.length; _++) l(h[_]);

    return l;
  })(
    {
      1: [
        function (t, n, s) {
          'use strict';

          function h(t, n) {
            return Object.prototype.hasOwnProperty.call(t, n);
          }

          var l = 'undefined' != typeof Uint8Array && 'undefined' != typeof Uint16Array && 'undefined' != typeof Int32Array;

          s.assign = function (t) {
            for (var n = Array.prototype.slice.call(arguments, 1); n.length; ) {
              var s = n.shift();

              if (s) {
                if ('object' != typeof s) throw new TypeError(s + 'must be non-object');

                for (var l in s) h(s, l) && (t[l] = s[l]);
              }
            }

            return t;
          };

          s.shrinkBuf = function (t, n) {
            return t.length === n ? t : t.subarray ? t.subarray(0, n) : ((t.length = n), t);
          };

          var o = {
              arraySet: function (t, n, s, h, l) {
                if (n.subarray && t.subarray) t.set(n.subarray(s, s + h), l);
                else for (var o = 0; o < h; o++) t[l + o] = n[s + o];
              },
              flattenChunks: function (t) {
                var n, s, h, l, o, _;

                for (h = 0, n = 0, s = t.length; n < s; n++) h += t[n].length;

                for (_ = new Uint8Array(h), l = 0, n = 0, s = t.length; n < s; n++) {
                  o = t[n];

                  _.set(o, l);

                  l += o.length;
                }

                return _;
              },
            },
            _ = {
              arraySet: function (t, n, s, h, l) {
                for (var o = 0; o < h; o++) t[l + o] = n[s + o];
              },
              flattenChunks: function (t) {
                return [].concat.apply([], t);
              },
            };

          s.setTyped = function (t) {
            if (t) {
              s.Buf8 = Uint8Array;
              s.Buf16 = Uint16Array;
              s.Buf32 = Int32Array;
              s.assign(s, o);
            } else {
              s.Buf8 = Array;
              s.Buf16 = Array;
              s.Buf32 = Array;
              s.assign(s, _);
            }
          };

          s.setTyped(l);
        },
        {},
      ],
      2: [
        function (t, n, s) {
          'use strict';

          function h(t, n) {
            if (n < 65537 && ((t.subarray && _) || (!t.subarray && o))) return String.fromCharCode.apply(null, l.shrinkBuf(t, n));

            for (var s = '', h = 0; h < n; h++) s += String.fromCharCode(t[h]);

            return s;
          }

          var l = t('./common'),
            o = true,
            _ = true;

          try {
            String.fromCharCode.apply(null, [0]);
          } catch (t) {
            o = false;
          }

          try {
            String.fromCharCode.apply(null, new Uint8Array(1));
          } catch (t) {
            _ = false;
          }

          for (var u = new l.Buf8(256), f = 0; f < 256; f++) u[f] = f >= 252 ? 6 : f >= 248 ? 5 : f >= 240 ? 4 : f >= 224 ? 3 : f >= 192 ? 2 : 1;

          u[254] = u[254] = 1;

          s.string2buf = function (t) {
            var n,
              s,
              h,
              o,
              _,
              u = t.length,
              f = 0;

            for (o = 0; o < u; o++) {
              if (55296 == (64512 & (s = t.charCodeAt(o))) && o + 1 < u && 56320 == (64512 & (h = t.charCodeAt(o + 1)))) {
                s = 65536 + ((s - 55296) << 10) + (h - 56320);
                o++;
              }

              f += s < 128 ? 1 : s < 2048 ? 2 : s < 65536 ? 3 : 4;
            }

            for (n = new l.Buf8(f), _ = 0, o = 0; _ < f; o++) {
              if (55296 == (64512 & (s = t.charCodeAt(o))) && o + 1 < u && 56320 == (64512 & (h = t.charCodeAt(o + 1)))) {
                s = 65536 + ((s - 55296) << 10) + (h - 56320);
                o++;
              }

              if (s < 128) n[_++] = s;
              else if (s < 2048) {
                n[_++] = 192 | (s >>> 6);
                n[_++] = 128 | (63 & s);
              } else if (s < 65536) {
                n[_++] = 224 | (s >>> 12);
                n[_++] = 128 | ((s >>> 6) & 63);
                n[_++] = 128 | (63 & s);
              } else {
                n[_++] = 240 | (s >>> 18);
                n[_++] = 128 | ((s >>> 12) & 63);
                n[_++] = 128 | ((s >>> 6) & 63);
                n[_++] = 128 | (63 & s);
              }
            }

            return n;
          };

          s.buf2binstring = function (t) {
            return h(t, t.length);
          };

          s.binstring2buf = function (t) {
            for (var n = new l.Buf8(t.length), s = 0, h = n.length; s < h; s++) n[s] = t.charCodeAt(s);

            return n;
          };

          s.buf2string = function (t, n) {
            var s,
              l,
              o,
              _,
              f = n || t.length,
              c = new Array(2 * f);

            for (l = 0, s = 0; s < f; )
              if ((o = t[s++]) < 128) c[l++] = o;
              else if ((_ = u[o]) > 4) {
                c[l++] = 65533;
                s += _ - 1;
              } else {
                for (o &= 2 === _ ? 31 : 3 === _ ? 15 : 7; _ > 1 && s < f; ) {
                  o = (o << 6) | (63 & t[s++]);
                  _--;
                }

                if (_ > 1) c[l++] = 65533;
                else if (o < 65536) c[l++] = o;
                else {
                  o -= 65536;
                  c[l++] = 55296 | ((o >> 10) & 1023);
                  c[l++] = 56320 | (1023 & o);
                }
              }

            return h(c, l);
          };

          s.utf8border = function (t, n) {
            var s;

            for ((n = n || t.length) > t.length && (n = t.length), s = n - 1; s >= 0 && 128 == (192 & t[s]); ) s--;

            return s < 0 ? n : 0 === s ? n : s + u[t[s]] > n ? s : n;
          };
        },
        {
          './common': 1,
        },
      ],
      3: [
        function (t, n, s) {
          'use strict';

          n.exports = function (t, n, s, h) {
            for (var l = (65535 & t) | 0, o = ((t >>> 16) & 65535) | 0, _ = 0; 0 !== s; ) {
              s -= _ = s > 2e3 ? 2e3 : s;

              do {
                o = (o + (l = (l + n[h++]) | 0)) | 0;
              } while (--_);

              l %= 65521;
              o %= 65521;
            }

            return l | (o << 16) | 0;
          };
        },
        {},
      ],
      4: [
        function (t, n, s) {
          'use strict';

          var h = (function () {
            for (var t, n = [], s = 0; s < 256; s++) {
              t = s;

              for (var h = 0; h < 8; h++) t = 1 & t ? 3988292384 ^ (t >>> 1) : t >>> 1;

              n[s] = t;
            }

            return n;
          })();

          n.exports = function (t, n, s, l) {
            var o = h,
              _ = l + s;

            t ^= -1;

            for (var u = l; u < _; u++) t = (t >>> 8) ^ o[255 & (t ^ n[u])];

            return -1 ^ t;
          };
        },
        {},
      ],
      5: [
        function (t, n, s) {
          'use strict';

          function h(t, n) {
            t.msg = T[n];
            return n;
          }

          function l(t) {
            return (t << 1) - (t > 4 ? 9 : 0);
          }

          function o(t) {
            for (var n = t.length; --n >= 0; ) t[n] = 0;
          }

          function _(t) {
            var n = t.state,
              s = n.pending;
            if (s > t.avail_out) s = t.avail_out;

            if (0 !== s) {
              U.arraySet(t.output, n.pending_buf, n.pending_out, s, t.next_out);
              t.next_out += s;
              n.pending_out += s;
              t.total_out += s;
              t.avail_out -= s;
              n.pending -= s;
              if (0 === n.pending) n.pending_out = 0;
            }
          }

          function u(t, n) {
            D._tr_flush_block(t, t.block_start >= 0 ? t.block_start : -1, t.strstart - t.block_start, n);

            t.block_start = t.strstart;

            _(t.strm);
          }

          function f(t, n) {
            t.pending_buf[t.pending++] = n;
          }

          function c(t, n) {
            t.pending_buf[t.pending++] = (n >>> 8) & 255;
            t.pending_buf[t.pending++] = 255 & n;
          }

          function p(t, n, s, h) {
            var l = t.avail_in;
            if (l > h) l = h;
            if (0 === l) return 0;
            else {
              t.avail_in -= l;
              U.arraySet(n, t.input, t.next_in, l, s);
              if (1 === t.state.wrap) t.adler = I(t.adler, n, l, s);
              else if (2 === t.state.wrap) t.adler = O(t.adler, n, l, s);
              t.next_in += l;
              t.total_in += l;
              return l;
            }
          }

          function b(t, n) {
            var s,
              h,
              l = t.max_chain_length,
              o = t.strstart,
              _ = t.prev_length,
              u = t.nice_match,
              f = t.strstart > t.w_size - $ ? t.strstart - (t.w_size - $) : 0,
              c = t.window,
              p = t.w_mask,
              b = t.prev,
              w = t.strstart + Z,
              v = c[o + _ - 1],
              y = c[o + _];
            if (t.prev_length >= t.good_match) l >>= 2;
            if (u > t.lookahead) u = t.lookahead;

            do {
              if (c[(s = n) + _] === y && c[s + _ - 1] === v && c[s] === c[o] && c[++s] === c[o + 1]) {
                o += 2;
                s++;

                do {} while (
                  c[++o] === c[++s] &&
                  c[++o] === c[++s] &&
                  c[++o] === c[++s] &&
                  c[++o] === c[++s] &&
                  c[++o] === c[++s] &&
                  c[++o] === c[++s] &&
                  c[++o] === c[++s] &&
                  c[++o] === c[++s] &&
                  o < w
                );

                if (((h = Z - (w - o)), (o = w - Z), h > _)) {
                  if (((t.match_start = n), (_ = h), h >= u)) break;
                  v = c[o + _ - 1];
                  y = c[o + _];
                }
              }
            } while ((n = b[n & p]) > f && 0 != --l);

            return _ <= t.lookahead ? _ : t.lookahead;
          }

          function w(t) {
            var n,
              s,
              h,
              l,
              o,
              _ = t.w_size;

            do {
              if (((l = t.window_size - t.lookahead - t.strstart), t.strstart >= _ + (_ - $))) {
                U.arraySet(t.window, t.window, _, _, 0);
                t.match_start -= _;
                t.strstart -= _;
                t.block_start -= _;
                n = s = t.hash_size;

                do {
                  h = t.head[--n];
                  t.head[n] = h >= _ ? h - _ : 0;
                } while (--s);

                n = s = _;

                do {
                  h = t.prev[--n];
                  t.prev[n] = h >= _ ? h - _ : 0;
                } while (--s);

                l += _;
              }

              if (0 === t.strm.avail_in) break;
              if (((s = p(t.strm, t.window, t.strstart + t.lookahead, l)), (t.lookahead += s), t.lookahead + t.insert >= Y))
                for (
                  o = t.strstart - t.insert, t.ins_h = t.window[o], t.ins_h = ((t.ins_h << t.hash_shift) ^ t.window[o + 1]) & t.hash_mask;
                  t.insert &&
                  ((t.ins_h = ((t.ins_h << t.hash_shift) ^ t.window[o + Y - 1]) & t.hash_mask),
                  (t.prev[o & t.w_mask] = t.head[t.ins_h]),
                  (t.head[t.ins_h] = o),
                  o++,
                  t.insert--,
                  !(t.lookahead + t.insert < Y));

                );
            } while (t.lookahead < $ && 0 !== t.strm.avail_in);
          }

          function v(t, n) {
            for (var s, h; ; ) {
              if (t.lookahead < $) {
                if ((w(t), t.lookahead < $ && n === L)) return at;
                if (0 === t.lookahead) break;
              }

              if (
                ((s = 0),
                t.lookahead >= Y &&
                  ((t.ins_h = ((t.ins_h << t.hash_shift) ^ t.window[t.strstart + Y - 1]) & t.hash_mask),
                  (s = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]),
                  (t.head[t.ins_h] = t.strstart)),
                0 !== s && t.strstart - s <= t.w_size - $ && (t.match_length = b(t, s)),
                t.match_length >= Y)
              ) {
                if (
                  ((h = D._tr_tally(t, t.strstart - t.match_start, t.match_length - Y)), (t.lookahead -= t.match_length), t.match_length <= t.max_lazy_match && t.lookahead >= Y)
                ) {
                  t.match_length--;

                  do {
                    t.strstart++;
                    t.ins_h = ((t.ins_h << t.hash_shift) ^ t.window[t.strstart + Y - 1]) & t.hash_mask;
                    s = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h];
                    t.head[t.ins_h] = t.strstart;
                  } while (0 != --t.match_length);

                  t.strstart++;
                } else {
                  t.strstart += t.match_length;
                  t.match_length = 0;
                  t.ins_h = t.window[t.strstart];
                  t.ins_h = ((t.ins_h << t.hash_shift) ^ t.window[t.strstart + 1]) & t.hash_mask;
                }
              } else {
                h = D._tr_tally(t, 0, t.window[t.strstart]);
                t.lookahead--;
                t.strstart++;
              }
              if (h && (u(t, false), 0 === t.strm.avail_out)) return at;
            }

            t.insert = t.strstart < Y - 1 ? t.strstart : Y - 1;

            if (n === N) {
              u(t, true);
              return 0 === t.strm.avail_out ? rt : it;
            } else return t.last_lit && (u(t, false), 0 === t.strm.avail_out) ? at : nt;
          }

          function y(t, n) {
            for (var s, h, l; ; ) {
              if (t.lookahead < $) {
                if ((w(t), t.lookahead < $ && n === L)) return at;
                if (0 === t.lookahead) break;
              }

              if (
                ((s = 0),
                t.lookahead >= Y &&
                  ((t.ins_h = ((t.ins_h << t.hash_shift) ^ t.window[t.strstart + Y - 1]) & t.hash_mask),
                  (s = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]),
                  (t.head[t.ins_h] = t.strstart)),
                (t.prev_length = t.match_length),
                (t.prev_match = t.match_start),
                (t.match_length = Y - 1),
                0 !== s &&
                  t.prev_length < t.max_lazy_match &&
                  t.strstart - s <= t.w_size - $ &&
                  ((t.match_length = b(t, s)),
                  t.match_length <= 5 && (t.strategy === K || (t.match_length === Y && t.strstart - t.match_start > 4096)) && (t.match_length = Y - 1)),
                t.prev_length >= Y && t.match_length <= t.prev_length)
              ) {
                l = t.strstart + t.lookahead - Y;
                h = D._tr_tally(t, t.strstart - 1 - t.prev_match, t.prev_length - Y);
                t.lookahead -= t.prev_length - 1;
                t.prev_length -= 2;

                do {
                  if (++t.strstart <= l) {
                    t.ins_h = ((t.ins_h << t.hash_shift) ^ t.window[t.strstart + Y - 1]) & t.hash_mask;
                    s = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h];
                    t.head[t.ins_h] = t.strstart;
                  }
                } while (0 != --t.prev_length);

                if (((t.match_available = 0), (t.match_length = Y - 1), t.strstart++, h && (u(t, false), 0 === t.strm.avail_out))) return at;
              } else if (t.match_available) {
                if (((h = D._tr_tally(t, 0, t.window[t.strstart - 1])) && u(t, false), t.strstart++, t.lookahead--, 0 === t.strm.avail_out)) return at;
              } else {
                t.match_available = 1;
                t.strstart++;
                t.lookahead--;
              }
            }

            if (t.match_available) {
              h = D._tr_tally(t, 0, t.window[t.strstart - 1]);
              t.match_available = 0;
            }

            t.insert = t.strstart < Y - 1 ? t.strstart : Y - 1;

            if (n === N) {
              u(t, true);
              return 0 === t.strm.avail_out ? rt : it;
            } else return t.last_lit && (u(t, false), 0 === t.strm.avail_out) ? at : nt;
          }

          function k(t, n) {
            for (var s, h, l, o, _ = t.window; ; ) {
              if (t.lookahead <= Z) {
                if ((w(t), t.lookahead <= Z && n === L)) return at;
                if (0 === t.lookahead) break;
              }

              if (((t.match_length = 0), t.lookahead >= Y && t.strstart > 0 && (h = _[(l = t.strstart - 1)]) === _[++l] && h === _[++l] && h === _[++l])) {
                o = t.strstart + Z;

                do {} while (h === _[++l] && h === _[++l] && h === _[++l] && h === _[++l] && h === _[++l] && h === _[++l] && h === _[++l] && h === _[++l] && l < o);

                t.match_length = Z - (o - l);
                if (t.match_length > t.lookahead) t.match_length = t.lookahead;
              }

              if (
                (t.match_length >= Y
                  ? ((s = D._tr_tally(t, 1, t.match_length - Y)), (t.lookahead -= t.match_length), (t.strstart += t.match_length), (t.match_length = 0))
                  : ((s = D._tr_tally(t, 0, t.window[t.strstart])), t.lookahead--, t.strstart++),
                s && (u(t, false), 0 === t.strm.avail_out))
              )
                return at;
            }

            t.insert = 0;

            if (n === N) {
              u(t, true);
              return 0 === t.strm.avail_out ? rt : it;
            } else return t.last_lit && (u(t, false), 0 === t.strm.avail_out) ? at : nt;
          }

          function z(t, n) {
            for (var s; ; ) {
              if (0 === t.lookahead && (w(t), 0 === t.lookahead)) {
                if (n === L) return at;
                break;
              }

              if (((t.match_length = 0), (s = D._tr_tally(t, 0, t.window[t.strstart])), t.lookahead--, t.strstart++, s && (u(t, false), 0 === t.strm.avail_out))) return at;
            }

            t.insert = 0;

            if (n === N) {
              u(t, true);
              return 0 === t.strm.avail_out ? rt : it;
            } else return t.last_lit && (u(t, false), 0 === t.strm.avail_out) ? at : nt;
          }

          function x(t, n, s, h, l) {
            this.good_length = t;
            this.max_lazy = n;
            this.nice_length = s;
            this.max_chain = h;
            this.func = l;
          }

          function B(t) {
            t.window_size = 2 * t.w_size;
            o(t.head);
            t.max_lazy_match = E[t.level].max_lazy;
            t.good_match = E[t.level].good_length;
            t.nice_match = E[t.level].nice_length;
            t.max_chain_length = E[t.level].max_chain;
            t.strstart = 0;
            t.block_start = 0;
            t.lookahead = 0;
            t.insert = 0;
            t.match_length = t.prev_length = Y - 1;
            t.match_available = 0;
            t.ins_h = 0;
          }

          function A() {
            this.strm = null;
            this.status = 0;
            this.pending_buf = null;
            this.pending_buf_size = 0;
            this.pending_out = 0;
            this.pending = 0;
            this.wrap = 0;
            this.gzhead = null;
            this.gzindex = 0;
            this.method = q;
            this.last_flush = -1;
            this.w_size = 0;
            this.w_bits = 0;
            this.w_mask = 0;
            this.window = null;
            this.window_size = 0;
            this.prev = null;
            this.head = null;
            this.ins_h = 0;
            this.hash_size = 0;
            this.hash_bits = 0;
            this.hash_mask = 0;
            this.hash_shift = 0;
            this.block_start = 0;
            this.match_length = 0;
            this.prev_match = 0;
            this.match_available = 0;
            this.strstart = 0;
            this.match_start = 0;
            this.lookahead = 0;
            this.prev_length = 0;
            this.max_chain_length = 0;
            this.max_lazy_match = 0;
            this.level = 0;
            this.strategy = 0;
            this.good_match = 0;
            this.nice_match = 0;
            this.dyn_ltree = new U.Buf16(2 * W);
            this.dyn_dtree = new U.Buf16(2 * (2 * Q + 1));
            this.bl_tree = new U.Buf16(2 * (2 * V + 1));
            o(this.dyn_ltree);
            o(this.dyn_dtree);
            o(this.bl_tree);
            this.l_desc = null;
            this.d_desc = null;
            this.bl_desc = null;
            this.bl_count = new U.Buf16(X + 1);
            this.heap = new U.Buf16(2 * J + 1);
            o(this.heap);
            this.heap_len = 0;
            this.heap_max = 0;
            this.depth = new U.Buf16(2 * J + 1);
            o(this.depth);
            this.l_buf = 0;
            this.lit_bufsize = 0;
            this.last_lit = 0;
            this.d_buf = 0;
            this.opt_len = 0;
            this.static_len = 0;
            this.matches = 0;
            this.insert = 0;
            this.bi_buf = 0;
            this.bi_valid = 0;
          }

          function C(t) {
            var n;

            if (t && t.state) {
              t.total_in = t.total_out = 0;
              t.data_type = P;
              (n = t.state).pending = 0;
              n.pending_out = 0;
              if (n.wrap < 0) n.wrap = -n.wrap;
              n.status = n.wrap ? tt : et;
              t.adler = 2 === n.wrap ? 0 : 1;
              n.last_flush = L;

              D._tr_init(n);

              return R;
            } else return h(t, H);
          }

          function S(t) {
            var n = C(t);
            if (n === R) B(t.state);
            return n;
          }

          function j(t, n, s, l, o, _) {
            if (!t) return H;
            var u = 1;
            if (
              (n === F && (n = 6), l < 0 ? ((u = 0), (l = -l)) : l > 15 && ((u = 2), (l -= 16)), o < 1 || o > G || s !== q || l < 8 || l > 15 || n < 0 || n > 9 || _ < 0 || _ > M)
            )
              return h(t, H);
            if (8 === l) l = 9;
            var f = new A();
            t.state = f;
            f.strm = t;
            f.wrap = u;
            f.gzhead = null;
            f.w_bits = l;
            f.w_size = 1 << f.w_bits;
            f.w_mask = f.w_size - 1;
            f.hash_bits = o + 7;
            f.hash_size = 1 << f.hash_bits;
            f.hash_mask = f.hash_size - 1;
            f.hash_shift = ~~((f.hash_bits + Y - 1) / Y);
            f.window = new U.Buf8(2 * f.w_size);
            f.head = new U.Buf16(f.hash_size);
            f.prev = new U.Buf16(f.w_size);
            f.lit_bufsize = 1 << (o + 6);
            f.pending_buf_size = 4 * f.lit_bufsize;
            f.pending_buf = new U.Buf8(f.pending_buf_size);
            f.d_buf = 1 * f.lit_bufsize;
            f.l_buf = 3 * f.lit_bufsize;
            f.level = n;
            f.strategy = _;
            f.method = s;
            return S(t);
          }

          var E,
            U = t('../utils/common'),
            D = t('./trees'),
            I = t('./adler32'),
            O = t('./crc32'),
            T = t('./messages'),
            L = 0,
            N = 4,
            R = 0,
            H = -2,
            F = -1,
            K = 1,
            M = 4,
            P = 2,
            q = 8,
            G = 9,
            J = 286,
            Q = 30,
            V = 19,
            W = 573,
            X = 15,
            Y = 3,
            Z = 258,
            $ = 262,
            tt = 42,
            et = 113,
            at = 1,
            nt = 2,
            rt = 3,
            it = 4;
          E = [
            new x(0, 0, 0, 0, function (t, n) {
              var s = 65535;

              for (s > t.pending_buf_size - 5 && (s = t.pending_buf_size - 5); ; ) {
                if (t.lookahead <= 1) {
                  if ((w(t), 0 === t.lookahead && n === L)) return at;
                  if (0 === t.lookahead) break;
                }

                t.strstart += t.lookahead;
                t.lookahead = 0;
                var h = t.block_start + s;
                if ((0 === t.strstart || t.strstart >= h) && ((t.lookahead = t.strstart - h), (t.strstart = h), u(t, false), 0 === t.strm.avail_out)) return at;
                if (t.strstart - t.block_start >= t.w_size - $ && (u(t, false), 0 === t.strm.avail_out)) return at;
              }

              t.insert = 0;

              if (n === N) {
                u(t, true);
                return 0 === t.strm.avail_out ? rt : it;
              } else {
                if (t.strstart > t.block_start) {
                  u(t, false);
                  t.strm.avail_out;
                }

                return at;
              }
            }),
            new x(4, 4, 8, 4, v),
            new x(4, 5, 16, 8, v),
            new x(4, 6, 32, 32, v),
            new x(4, 4, 16, 16, y),
            new x(8, 16, 32, 32, y),
            new x(8, 16, 128, 128, y),
            new x(8, 32, 128, 256, y),
            new x(32, 128, 258, 1024, y),
            new x(32, 258, 258, 4096, y),
          ];

          s.deflateInit = function (t, n) {
            return j(t, n, q, 15, 8, 0);
          };

          s.deflateInit2 = j;
          s.deflateReset = S;
          s.deflateResetKeep = C;

          s.deflateSetHeader = function (t, n) {
            return t && t.state ? (2 !== t.state.wrap ? H : ((t.state.gzhead = n), R)) : H;
          };

          s.deflate = function (t, n) {
            var s, u, p, b;
            if (!t || !t.state || n > 5 || n < 0) return t ? h(t, H) : H;
            if (((u = t.state), !t.output || (!t.input && 0 !== t.avail_in) || (666 === u.status && n !== N))) return h(t, 0 === t.avail_out ? -5 : H);
            if (((u.strm = t), (s = u.last_flush), (u.last_flush = n), u.status === tt))
              if (2 === u.wrap) {
                t.adler = 0;
                f(u, 31);
                f(u, 139);
                f(u, 8);

                if (u.gzhead) {
                  f(u, (u.gzhead.text ? 1 : 0) + (u.gzhead.hcrc ? 2 : 0) + (u.gzhead.extra ? 4 : 0) + (u.gzhead.name ? 8 : 0) + (u.gzhead.comment ? 16 : 0));
                  f(u, 255 & u.gzhead.time);
                  f(u, (u.gzhead.time >> 8) & 255);
                  f(u, (u.gzhead.time >> 16) & 255);
                  f(u, (u.gzhead.time >> 24) & 255);
                  f(u, 9 === u.level ? 2 : u.strategy >= 2 || u.level < 2 ? 4 : 0);
                  f(u, 255 & u.gzhead.os);

                  if (u.gzhead.extra && u.gzhead.extra.length) {
                    f(u, 255 & u.gzhead.extra.length);
                    f(u, (u.gzhead.extra.length >> 8) & 255);
                  }

                  if (u.gzhead.hcrc) t.adler = O(t.adler, u.pending_buf, u.pending, 0);
                  u.gzindex = 0;
                  u.status = 69;
                } else {
                  f(u, 0);
                  f(u, 0);
                  f(u, 0);
                  f(u, 0);
                  f(u, 0);
                  f(u, 9 === u.level ? 2 : u.strategy >= 2 || u.level < 2 ? 4 : 0);
                  f(u, 3);
                  u.status = et;
                }
              } else {
                var w = (q + ((u.w_bits - 8) << 4)) << 8;
                w |= (u.strategy >= 2 || u.level < 2 ? 0 : u.level < 6 ? 1 : 6 === u.level ? 2 : 3) << 6;
                if (0 !== u.strstart) w |= 32;
                w += 31 - (w % 31);
                u.status = et;
                c(u, w);

                if (0 !== u.strstart) {
                  c(u, t.adler >>> 16);
                  c(u, 65535 & t.adler);
                }

                t.adler = 1;
              }
            if (69 === u.status)
              if (u.gzhead.extra) {
                for (
                  p = u.pending;
                  u.gzindex < (65535 & u.gzhead.extra.length) &&
                  (u.pending !== u.pending_buf_size ||
                    (u.gzhead.hcrc && u.pending > p && (t.adler = O(t.adler, u.pending_buf, u.pending - p, p)), _(t), (p = u.pending), u.pending !== u.pending_buf_size));

                ) {
                  f(u, 255 & u.gzhead.extra[u.gzindex]);
                  u.gzindex++;
                }

                if (u.gzhead.hcrc && u.pending > p) t.adler = O(t.adler, u.pending_buf, u.pending - p, p);

                if (u.gzindex === u.gzhead.extra.length) {
                  u.gzindex = 0;
                  u.status = 73;
                }
              } else u.status = 73;
            if (73 === u.status)
              if (u.gzhead.name) {
                p = u.pending;

                do {
                  if (
                    u.pending === u.pending_buf_size &&
                    (u.gzhead.hcrc && u.pending > p && (t.adler = O(t.adler, u.pending_buf, u.pending - p, p)), _(t), (p = u.pending), u.pending === u.pending_buf_size)
                  ) {
                    b = 1;
                    break;
                  }

                  b = u.gzindex < u.gzhead.name.length ? 255 & u.gzhead.name.charCodeAt(u.gzindex++) : 0;
                  f(u, b);
                } while (0 !== b);

                if (u.gzhead.hcrc && u.pending > p) t.adler = O(t.adler, u.pending_buf, u.pending - p, p);

                if (0 === b) {
                  u.gzindex = 0;
                  u.status = 91;
                }
              } else u.status = 91;
            if (91 === u.status)
              if (u.gzhead.comment) {
                p = u.pending;

                do {
                  if (
                    u.pending === u.pending_buf_size &&
                    (u.gzhead.hcrc && u.pending > p && (t.adler = O(t.adler, u.pending_buf, u.pending - p, p)), _(t), (p = u.pending), u.pending === u.pending_buf_size)
                  ) {
                    b = 1;
                    break;
                  }

                  b = u.gzindex < u.gzhead.comment.length ? 255 & u.gzhead.comment.charCodeAt(u.gzindex++) : 0;
                  f(u, b);
                } while (0 !== b);

                if (u.gzhead.hcrc && u.pending > p) t.adler = O(t.adler, u.pending_buf, u.pending - p, p);
                if (0 === b) u.status = 103;
              } else u.status = 103;

            if (
              (103 === u.status &&
                (u.gzhead.hcrc
                  ? (u.pending + 2 > u.pending_buf_size && _(t),
                    u.pending + 2 <= u.pending_buf_size && (f(u, 255 & t.adler), f(u, (t.adler >> 8) & 255), (t.adler = 0), (u.status = et)))
                  : (u.status = et)),
              0 !== u.pending)
            ) {
              if ((_(t), 0 === t.avail_out)) {
                u.last_flush = -1;
                return R;
              }
            } else if (0 === t.avail_in && l(n) <= l(s) && n !== N) return h(t, -5);

            if (666 === u.status && 0 !== t.avail_in) return h(t, -5);

            if (0 !== t.avail_in || 0 !== u.lookahead || (n !== L && 666 !== u.status)) {
              var v = 2 === u.strategy ? z(u, n) : 3 === u.strategy ? k(u, n) : E[u.level].func(u, n);

              if (((v !== rt && v !== it) || (u.status = 666), v === at || v === rt)) {
                if (0 === t.avail_out) u.last_flush = -1;
                return R;
              }

              if (
                v === nt &&
                (1 === n
                  ? D._tr_align(u)
                  : 5 !== n && (D._tr_stored_block(u, 0, 0, false), 3 === n && (o(u.head), 0 === u.lookahead && ((u.strstart = 0), (u.block_start = 0), (u.insert = 0)))),
                _(t),
                0 === t.avail_out)
              ) {
                u.last_flush = -1;
                return R;
              }
            }

            return n !== N
              ? R
              : u.wrap <= 0
              ? 1
              : (2 === u.wrap
                  ? (f(u, 255 & t.adler),
                    f(u, (t.adler >> 8) & 255),
                    f(u, (t.adler >> 16) & 255),
                    f(u, (t.adler >> 24) & 255),
                    f(u, 255 & t.total_in),
                    f(u, (t.total_in >> 8) & 255),
                    f(u, (t.total_in >> 16) & 255),
                    f(u, (t.total_in >> 24) & 255))
                  : (c(u, t.adler >>> 16), c(u, 65535 & t.adler)),
                _(t),
                u.wrap > 0 && (u.wrap = -u.wrap),
                0 !== u.pending ? R : 1);
          };

          s.deflateEnd = function (t) {
            var n;
            return t && t.state
              ? (n = t.state.status) !== tt && 69 !== n && 73 !== n && 91 !== n && 103 !== n && n !== et && 666 !== n
                ? h(t, H)
                : ((t.state = null), n === et ? h(t, -3) : R)
              : H;
          };

          s.deflateSetDictionary = function (t, n) {
            var s,
              h,
              l,
              _,
              u,
              f,
              c,
              p,
              b = n.length;

            if (!t || !t.state) return H;
            if (2 === (_ = (s = t.state).wrap) || (1 === _ && s.status !== tt) || s.lookahead) return H;

            for (
              1 === _ && (t.adler = I(t.adler, n, b, 0)),
                s.wrap = 0,
                b >= s.w_size &&
                  (0 === _ && (o(s.head), (s.strstart = 0), (s.block_start = 0), (s.insert = 0)),
                  (p = new U.Buf8(s.w_size)),
                  U.arraySet(p, n, b - s.w_size, s.w_size, 0),
                  (n = p),
                  (b = s.w_size)),
                u = t.avail_in,
                f = t.next_in,
                c = t.input,
                t.avail_in = b,
                t.next_in = 0,
                t.input = n,
                w(s);
              s.lookahead >= Y;

            ) {
              h = s.strstart;
              l = s.lookahead - 2;

              do {
                s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[h + Y - 1]) & s.hash_mask;
                s.prev[h & s.w_mask] = s.head[s.ins_h];
                s.head[s.ins_h] = h;
                h++;
              } while (--l);

              s.strstart = h;
              s.lookahead = 2;
              w(s);
            }

            s.strstart += s.lookahead;
            s.block_start = s.strstart;
            s.insert = s.lookahead;
            s.lookahead = 0;
            s.match_length = s.prev_length = 2;
            s.match_available = 0;
            t.next_in = f;
            t.input = c;
            t.avail_in = u;
            s.wrap = _;
            return R;
          };

          s.deflateInfo = 'pako deflate (from Nodeca project)';
        },
        {
          '../utils/common': 1,
          './adler32': 3,
          './crc32': 4,
          './messages': 6,
          './trees': 7,
        },
      ],
      6: [
        function (t, n, s) {
          'use strict';

          n.exports = {
            2: 'need dictionary',
            1: 'stream end',
            0: '',
            '-1': 'file error',
            '-2': 'stream error',
            '-3': 'data error',
            '-4': 'insufficient memory',
            '-5': 'buffer error',
            '-6': 'incompatible version',
          };
        },
        {},
      ],
      7: [
        function (t, n, s) {
          'use strict';

          function h(t) {
            for (var n = t.length; --n >= 0; ) t[n] = 0;
          }

          function l(t, n, s, h, l) {
            this.static_tree = t;
            this.extra_bits = n;
            this.extra_base = s;
            this.elems = h;
            this.max_length = l;
            this.has_stree = t && t.length;
          }

          function o(t, n) {
            this.dyn_tree = t;
            this.max_code = 0;
            this.stat_desc = n;
          }

          function _(t) {
            return t < 256 ? rt[t] : rt[256 + (t >>> 7)];
          }

          function u(t, n) {
            t.pending_buf[t.pending++] = 255 & n;
            t.pending_buf[t.pending++] = (n >>> 8) & 255;
          }

          function f(t, n, s) {
            if (t.bi_valid > J - s) {
              t.bi_buf |= (n << t.bi_valid) & 65535;
              u(t, t.bi_buf);
              t.bi_buf = n >> (J - t.bi_valid);
              t.bi_valid += s - J;
            } else {
              t.bi_buf |= (n << t.bi_valid) & 65535;
              t.bi_valid += s;
            }
          }

          function c(t, n, s) {
            f(t, s[2 * n], s[2 * n + 1]);
          }

          function p(t, n) {
            var s = 0;

            do {
              s |= 1 & t;
              t >>>= 1;
              s <<= 1;
            } while (--n > 0);

            return s >>> 1;
          }

          function b(t) {
            if (16 === t.bi_valid) {
              u(t, t.bi_buf);
              t.bi_buf = 0;
              t.bi_valid = 0;
            } else if (t.bi_valid >= 8) {
              t.pending_buf[t.pending++] = 255 & t.bi_buf;
              t.bi_buf >>= 8;
              t.bi_valid -= 8;
            }
          }

          function w(t, n) {
            var s,
              h,
              l,
              o,
              _,
              u,
              f = n.dyn_tree,
              c = n.max_code,
              p = n.stat_desc.static_tree,
              b = n.stat_desc.has_stree,
              w = n.stat_desc.extra_bits,
              v = n.stat_desc.extra_base,
              y = n.stat_desc.max_length,
              k = 0;

            for (o = 0; o <= G; o++) t.bl_count[o] = 0;

            for (f[2 * t.heap[t.heap_max] + 1] = 0, s = t.heap_max + 1; s < q; s++) {
              if ((o = f[2 * f[2 * (h = t.heap[s]) + 1] + 1] + 1) > y) {
                o = y;
                k++;
              }

              f[2 * h + 1] = o;

              if (!(h > c)) {
                t.bl_count[o]++;
                _ = 0;
                if (h >= v) _ = w[h - v];
                u = f[2 * h];
                t.opt_len += u * (o + _);
                if (b) t.static_len += u * (p[2 * h + 1] + _);
              }
            }

            if (0 !== k) {
              do {
                for (o = y - 1; 0 === t.bl_count[o]; ) o--;

                t.bl_count[o]--;
                t.bl_count[o + 1] += 2;
                t.bl_count[y]--;
                k -= 2;
              } while (k > 0);

              for (o = y; 0 !== o; o--)
                for (h = t.bl_count[o]; 0 !== h; ) (l = t.heap[--s]) > c || (f[2 * l + 1] !== o && ((t.opt_len += (o - f[2 * l + 1]) * f[2 * l]), (f[2 * l + 1] = o)), h--);
            }
          }

          function v(t, n, s) {
            var h,
              l,
              o = new Array(G + 1),
              _ = 0;

            for (h = 1; h <= G; h++) o[h] = _ = (_ + s[h - 1]) << 1;

            for (l = 0; l <= n; l++) {
              var u = t[2 * l + 1];
              if (0 !== u) t[2 * l] = p(o[u]++, u);
            }
          }

          function y() {
            var t,
              n,
              s,
              h,
              o,
              _ = new Array(G + 1);

            for (s = 0, h = 0; h < H - 1; h++) for (st[h] = s, t = 0; t < 1 << Z[h]; t++) it[s++] = h;

            for (it[s - 1] = h, o = 0, h = 0; h < 16; h++) for (ht[h] = o, t = 0; t < 1 << $[h]; t++) rt[o++] = h;

            for (o >>= 7; h < M; h++) for (ht[h] = o << 7, t = 0; t < 1 << ($[h] - 7); t++) rt[256 + o++] = h;

            for (n = 0; n <= G; n++) _[n] = 0;

            for (t = 0; t <= 143; ) {
              at[2 * t + 1] = 8;
              t++;
              _[8]++;
            }

            for (; t <= 255; ) {
              at[2 * t + 1] = 9;
              t++;
              _[9]++;
            }

            for (; t <= 279; ) {
              at[2 * t + 1] = 7;
              t++;
              _[7]++;
            }

            for (; t <= 287; ) {
              at[2 * t + 1] = 8;
              t++;
              _[8]++;
            }

            for (v(at, K + 1, _), t = 0; t < M; t++) {
              nt[2 * t + 1] = 5;
              nt[2 * t] = p(t, 5);
            }

            lt = new l(at, Z, F + 1, K, G);
            ot = new l(nt, $, 0, M, G);
            _t = new l(new Array(0), tt, 0, P, Q);
          }

          function k(t) {
            var n;

            for (n = 0; n < K; n++) t.dyn_ltree[2 * n] = 0;

            for (n = 0; n < M; n++) t.dyn_dtree[2 * n] = 0;

            for (n = 0; n < P; n++) t.bl_tree[2 * n] = 0;

            t.dyn_ltree[2 * V] = 1;
            t.opt_len = t.static_len = 0;
            t.last_lit = t.matches = 0;
          }

          function z(t) {
            if (t.bi_valid > 8) u(t, t.bi_buf);
            else if (t.bi_valid > 0) t.pending_buf[t.pending++] = t.bi_buf;
            t.bi_buf = 0;
            t.bi_valid = 0;
          }

          function x(t, n, s, h) {
            z(t);

            if (h) {
              u(t, s);
              u(t, ~s);
            }

            T.arraySet(t.pending_buf, t.window, n, s, t.pending);
            t.pending += s;
          }

          function B(t, n, s, h) {
            var l = 2 * n,
              o = 2 * s;
            return t[l] < t[o] || (t[l] === t[o] && h[n] <= h[s]);
          }

          function A(t, n, s) {
            for (var h = t.heap[s], l = s << 1; l <= t.heap_len && (l < t.heap_len && B(n, t.heap[l + 1], t.heap[l], t.depth) && l++, !B(n, h, t.heap[l], t.depth)); ) {
              t.heap[s] = t.heap[l];
              s = l;
              l <<= 1;
            }

            t.heap[s] = h;
          }

          function C(t, n, s) {
            var h,
              l,
              o,
              u,
              p = 0;
            if (0 !== t.last_lit)
              do {
                h = (t.pending_buf[t.d_buf + 2 * p] << 8) | t.pending_buf[t.d_buf + 2 * p + 1];
                l = t.pending_buf[t.l_buf + p];
                p++;
                if (0 === h) c(t, l, n);
                else {
                  c(t, (o = it[l]) + F + 1, n);
                  if (0 !== (u = Z[o])) f(t, (l -= st[o]), u);
                  c(t, (o = _(--h)), s);
                  if (0 !== (u = $[o])) f(t, (h -= ht[o]), u);
                }
              } while (p < t.last_lit);
            c(t, V, n);
          }

          function S(t, n) {
            var s,
              h,
              l,
              o = n.dyn_tree,
              _ = n.stat_desc.static_tree,
              u = n.stat_desc.has_stree,
              f = n.stat_desc.elems,
              c = -1;

            for (t.heap_len = 0, t.heap_max = q, s = 0; s < f; s++) 0 !== o[2 * s] ? ((t.heap[++t.heap_len] = c = s), (t.depth[s] = 0)) : (o[2 * s + 1] = 0);

            for (; t.heap_len < 2; ) {
              o[2 * (l = t.heap[++t.heap_len] = c < 2 ? ++c : 0)] = 1;
              t.depth[l] = 0;
              t.opt_len--;
              if (u) t.static_len -= _[2 * l + 1];
            }

            for (n.max_code = c, s = t.heap_len >> 1; s >= 1; s--) A(t, o, s);

            l = f;

            do {
              s = t.heap[1];
              t.heap[1] = t.heap[t.heap_len--];
              A(t, o, 1);
              h = t.heap[1];
              t.heap[--t.heap_max] = s;
              t.heap[--t.heap_max] = h;
              o[2 * l] = o[2 * s] + o[2 * h];
              t.depth[l] = (t.depth[s] >= t.depth[h] ? t.depth[s] : t.depth[h]) + 1;
              o[2 * s + 1] = o[2 * h + 1] = l;
              t.heap[1] = l++;
              A(t, o, 1);
            } while (t.heap_len >= 2);

            t.heap[--t.heap_max] = t.heap[1];
            w(t, n);
            v(o, c, t.bl_count);
          }

          function j(t, n, s) {
            var h,
              l,
              o = -1,
              _ = n[1],
              u = 0,
              f = 7,
              c = 4;

            for (0 === _ && ((f = 138), (c = 3)), n[2 * (s + 1) + 1] = 65535, h = 0; h <= s; h++) {
              l = _;
              _ = n[2 * (h + 1) + 1];

              if (!(++u < f && l === _)) {
                if (u < c) t.bl_tree[2 * l] += u;
                else if (0 !== l) {
                  if (l !== o) t.bl_tree[2 * l]++;
                  t.bl_tree[2 * W]++;
                } else if (u <= 10) t.bl_tree[2 * X]++;
                else t.bl_tree[2 * Y]++;
                u = 0;
                o = l;

                if (0 === _) {
                  f = 138;
                  c = 3;
                } else if (l === _) {
                  f = 6;
                  c = 3;
                } else {
                  f = 7;
                  c = 4;
                }
              }
            }
          }

          function E(t, n, s) {
            var h,
              l,
              o = -1,
              _ = n[1],
              u = 0,
              p = 7,
              b = 4;

            for (0 === _ && ((p = 138), (b = 3)), h = 0; h <= s; h++)
              if (((l = _), (_ = n[2 * (h + 1) + 1]), !(++u < p && l === _))) {
                if (u < b)
                  do {
                    c(t, l, t.bl_tree);
                  } while (0 != --u);
                else
                  0 !== l
                    ? (l !== o && (c(t, l, t.bl_tree), u--), c(t, W, t.bl_tree), f(t, u - 3, 2))
                    : u <= 10
                    ? (c(t, X, t.bl_tree), f(t, u - 3, 3))
                    : (c(t, Y, t.bl_tree), f(t, u - 11, 7));
                u = 0;
                o = l;

                if (0 === _) {
                  p = 138;
                  b = 3;
                } else if (l === _) {
                  p = 6;
                  b = 3;
                } else {
                  p = 7;
                  b = 4;
                }
              }
          }

          function U(t) {
            var n;

            for (j(t, t.dyn_ltree, t.l_desc.max_code), j(t, t.dyn_dtree, t.d_desc.max_code), S(t, t.bl_desc), n = P - 1; n >= 3 && 0 === t.bl_tree[2 * et[n] + 1]; n--);

            t.opt_len += 3 * (n + 1) + 5 + 5 + 4;
            return n;
          }

          function D(t, n, s, h) {
            var l;

            for (f(t, n - 257, 5), f(t, s - 1, 5), f(t, h - 4, 4), l = 0; l < h; l++) f(t, t.bl_tree[2 * et[l] + 1], 3);

            E(t, t.dyn_ltree, n - 1);
            E(t, t.dyn_dtree, s - 1);
          }

          function I(t) {
            var n,
              s = 4093624447;

            for (n = 0; n <= 31; n++, s >>>= 1) if (1 & s && 0 !== t.dyn_ltree[2 * n]) return L;

            if (0 !== t.dyn_ltree[18] || 0 !== t.dyn_ltree[20] || 0 !== t.dyn_ltree[26]) return N;

            for (n = 32; n < F; n++) if (0 !== t.dyn_ltree[2 * n]) return N;

            return L;
          }

          function O(t, n, s, h) {
            f(t, (R << 1) + (h ? 1 : 0), 3);
            x(t, n, s, true);
          }

          var T = t('../utils/common'),
            L = 0,
            N = 1,
            R = 0,
            H = 29,
            F = 256,
            K = 286,
            M = 30,
            P = 19,
            q = 573,
            G = 15,
            J = 16,
            Q = 7,
            V = 256,
            W = 16,
            X = 17,
            Y = 18,
            Z = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0],
            $ = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
            tt = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
            et = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
            at = new Array(576);
          h(at);
          var nt = new Array(60);
          h(nt);
          var rt = new Array(512);
          h(rt);
          var it = new Array(256);
          h(it);
          var st = new Array(H);
          h(st);
          var ht = new Array(M);
          h(ht);

          var lt,
            ot,
            _t,
            dt = false;

          s._tr_init = function (t) {
            if (!dt) {
              y();
              dt = true;
            }

            t.l_desc = new o(t.dyn_ltree, lt);
            t.d_desc = new o(t.dyn_dtree, ot);
            t.bl_desc = new o(t.bl_tree, _t);
            t.bi_buf = 0;
            t.bi_valid = 0;
            k(t);
          };

          s._tr_stored_block = O;

          s._tr_flush_block = function (t, n, s, h) {
            var l,
              o,
              _ = 0;

            if (t.level > 0) {
              if (2 === t.strm.data_type) t.strm.data_type = I(t);
              S(t, t.l_desc);
              S(t, t.d_desc);
              _ = U(t);
              l = (t.opt_len + 3 + 7) >>> 3;
              if ((o = (t.static_len + 3 + 7) >>> 3) <= l) l = o;
            } else l = o = s + 5;

            if (s + 4 <= l && -1 !== n) O(t, n, s, h);
            else if (4 === t.strategy || o === l) {
              f(t, 2 + (h ? 1 : 0), 3);
              C(t, at, nt);
            } else {
              f(t, 4 + (h ? 1 : 0), 3);
              D(t, t.l_desc.max_code + 1, t.d_desc.max_code + 1, _ + 1);
              C(t, t.dyn_ltree, t.dyn_dtree);
            }
            k(t);
            if (h) z(t);
          };

          s._tr_tally = function (t, n, s) {
            t.pending_buf[t.d_buf + 2 * t.last_lit] = (n >>> 8) & 255;
            t.pending_buf[t.d_buf + 2 * t.last_lit + 1] = 255 & n;
            t.pending_buf[t.l_buf + t.last_lit] = 255 & s;
            t.last_lit++;
            if (0 === n) t.dyn_ltree[2 * s]++;
            else {
              t.matches++;
              n--;
              t.dyn_ltree[2 * (it[s] + F + 1)]++;
              t.dyn_dtree[2 * _(n)]++;
            }
            return t.last_lit === t.lit_bufsize - 1;
          };

          s._tr_align = function (t) {
            f(t, 2, 3);
            c(t, V, at);
            b(t);
          };
        },
        {
          '../utils/common': 1,
        },
      ],
      8: [
        function (t, n, s) {
          'use strict';

          n.exports = function () {
            this.input = null;
            this.next_in = 0;
            this.avail_in = 0;
            this.total_in = 0;
            this.output = null;
            this.next_out = 0;
            this.avail_out = 0;
            this.total_out = 0;
            this.msg = '';
            this.state = null;
            this.data_type = 2;
            this.adler = 0;
          };
        },
        {},
      ],
      '/lib/deflate.js': [
        function (t, n, s) {
          'use strict';

          function h(t) {
            if (!(this instanceof h)) return new h(t);
            this.options = _.assign(
              {
                level: w,
                method: y,
                chunkSize: 16384,
                windowBits: 15,
                memLevel: 8,
                strategy: v,
                to: '',
              },
              t || {}
            );
            var n = this.options;
            if (n.raw && n.windowBits > 0) n.windowBits = -n.windowBits;
            else if (n.gzip && n.windowBits > 0 && n.windowBits < 16) n.windowBits += 16;
            this.err = 0;
            this.msg = '';
            this.ended = false;
            this.chunks = [];
            this.strm = new c();
            this.strm.avail_out = 0;
            var s = o.deflateInit2(this.strm, n.level, n.method, n.windowBits, n.memLevel, n.strategy);
            if (s !== b) throw new Error(f[s]);

            if ((n.header && o.deflateSetHeader(this.strm, n.header), n.dictionary)) {
              var l;
              if (
                ((l = 'string' == typeof n.dictionary ? u.string2buf(n.dictionary) : '[object ArrayBuffer]' === p.call(n.dictionary) ? new Uint8Array(n.dictionary) : n.dictionary),
                (s = o.deflateSetDictionary(this.strm, l)) !== b)
              )
                throw new Error(f[s]);
              this._dict_set = true;
            }
          }

          function l(t, n) {
            var s = new h(n);
            if ((s.push(t, true), s.err)) throw s.msg || f[s.err];
            return s.result;
          }

          var o = t('./zlib/deflate'),
            _ = t('./utils/common'),
            u = t('./utils/strings'),
            f = t('./zlib/messages'),
            c = t('./zlib/zstream'),
            p = Object.prototype.toString,
            b = 0,
            w = -1,
            v = 0,
            y = 8;

          h.prototype.push = function (t, n) {
            var s,
              h,
              l = this.strm,
              f = this.options.chunkSize;
            if (this.ended) return false;
            h = n === ~~n ? n : true === n ? 4 : 0;
            if ('string' == typeof t) l.input = u.string2buf(t);
            else if ('[object ArrayBuffer]' === p.call(t)) l.input = new Uint8Array(t);
            else l.input = t;
            l.next_in = 0;
            l.avail_in = l.input.length;

            do {
              if ((0 === l.avail_out && ((l.output = new _.Buf8(f)), (l.next_out = 0), (l.avail_out = f)), 1 !== (s = o.deflate(l, h)) && s !== b)) {
                this.onEnd(s);
                this.ended = true;
                return false;
              }

              if (!(0 !== l.avail_out && (0 !== l.avail_in || (4 !== h && 2 !== h))))
                'string' === this.options.to ? this.onData(u.buf2binstring(_.shrinkBuf(l.output, l.next_out))) : this.onData(_.shrinkBuf(l.output, l.next_out));
            } while ((l.avail_in > 0 || 0 === l.avail_out) && 1 !== s);

            if (4 === h) {
              s = o.deflateEnd(this.strm);
              this.onEnd(s);
              this.ended = true;
              return s === b;
            } else return 2 !== h || (this.onEnd(b), (l.avail_out = 0), true);
          };

          h.prototype.onData = function (t) {
            this.chunks.push(t);
          };

          h.prototype.onEnd = function (t) {
            if (t === b) 'string' === this.options.to ? (this.result = this.chunks.join('')) : (this.result = _.flattenChunks(this.chunks));
            this.chunks = [];
            this.err = t;
            this.msg = this.strm.msg;
          };

          s.Deflate = h;
          s.deflate = l;

          s.deflateRaw = function (t, n) {
            (n = n || {}).raw = true;
            return l(t, n);
          };

          s.gzip = function (t, n) {
            (n = n || {}).gzip = true;
            return l(t, n);
          };
        },
        {
          './utils/common': 1,
          './utils/strings': 2,
          './zlib/deflate': 5,
          './zlib/messages': 6,
          './zlib/zstream': 8,
        },
      ],
    },
    {},
    []
  )('/lib/deflate.js');
});
