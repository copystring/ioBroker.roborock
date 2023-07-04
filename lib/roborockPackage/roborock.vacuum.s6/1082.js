exports.pickNotNil = function (n) {
  var t = {};

  for (var o in n)
    if (n.hasOwnProperty(o)) {
      var u = n[o];
      if (undefined !== u && null !== u) t[o] = u;
    }

  return t;
};

exports.idPattern = /#([^)]+)\)?$/;
