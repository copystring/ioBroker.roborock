function n(n) {
  return 3.62 * (n - 30) + 194;
}

function t(n) {
  return 3 * (n - 8) + 25;
}

module.exports = {
  fromOrigamiTensionAndFriction: function (o, u) {
    return {
      stiffness: n(o),
      damping: t(u),
    };
  },
  fromBouncinessAndSpeed: function (o, u) {
    function f(n, t, o) {
      return (n - t) / (o - t);
    }

    function c(n, t, o) {
      return t + n * (o - t);
    }

    function s(n, t, o) {
      return n * o + (1 - n) * t;
    }

    function p(n) {
      return 44e-6 * n ** 3 - 0.006 * n ** 2 + 0.36 * n + 2;
    }

    function h(n) {
      return 4.5e-7 * n ** 3 - 332e-6 * n ** 2 + 0.1078 * n + 5.84;
    }

    var w = f(o / 1.7, 0, 20);
    w = c(w, 0, 0.8);

    var M = w,
      v = (A = x) <= 18 ? ((_ = A), 7e-4 * _ ** 3 - 0.031 * _ ** 2 + 0.64 * _ + 1.28) : A > 18 && A <= 44 ? p(A) : h(A),
      A,
      _,
      x = c(f(u / 1.7, 0, 20), 0.5, 200),
      B = s(2 * M - M * M, v, 0.01);

    return {
      stiffness: n(x),
      damping: t(B),
    };
  },
};
