var t = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
  n = {
    encode: function (n) {
      var c,
        h,
        o,
        A,
        f,
        l = '',
        u = '',
        C = '',
        s = 0;

      do {
        o = (c = n.charCodeAt(s++)) >> 2;
        A = ((3 & c) << 4) | ((h = n.charCodeAt(s++)) >> 4);
        f = ((15 & h) << 2) | ((u = n.charCodeAt(s++)) >> 6);
        C = 63 & u;
        if (isNaN(h)) f = C = 64;
        else if (isNaN(u)) C = 64;
        l = l + t.charAt(o) + t.charAt(A) + t.charAt(f) + t.charAt(C);
        c = h = u = '';
        o = A = f = C = '';
      } while (s < n.length);

      return l;
    },
    decode: function (n) {
      var c,
        h,
        o,
        A,
        f = '',
        l = '',
        u = '',
        C = 0;
      if (/[^A-Za-z0-9\+\/\=]/g.exec(n))
        window.alert("There were invalid base64 characters in the input text.\nValid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\nExpect errors in decoding.");
      n = n.replace(/[^A-Za-z0-9\+\/\=]/g, '');

      do {
        c = (t.indexOf(n.charAt(C++)) << 2) | ((o = t.indexOf(n.charAt(C++))) >> 4);
        h = ((15 & o) << 4) | ((A = t.indexOf(n.charAt(C++))) >> 2);
        l = ((3 & A) << 6) | (u = t.indexOf(n.charAt(C++)));
        f += String.fromCharCode(c);
        if (64 != A) f += String.fromCharCode(h);
        if (64 != u) f += String.fromCharCode(l);
        c = h = l = '';
        o = A = u = '';
      } while (C < n.length);

      return f;
    },
  };
exports.default = n;
