var n = {
  centroidDimension: function (t, o, u, c) {
    var f = t.touchBank,
      s = 0,
      h = 0,
      v = 1 === t.numberActiveTouches ? t.touchBank[t.indexOfSingleActiveTouch] : null;
    if (null !== v) v.touchActive && v.currentTimeStamp > o && ((s += c && u ? v.currentPageX : c && !u ? v.currentPageY : !c && u ? v.previousPageX : v.previousPageY), (h = 1));
    else
      for (var C = 0; C < f.length; C++) {
        var l = f[C];

        if (null !== l && undefined !== l && l.touchActive && l.currentTimeStamp >= o) {
          s += c && u ? l.currentPageX : c && !u ? l.currentPageY : !c && u ? l.previousPageX : l.previousPageY;
          h++;
        }
      }
    return h > 0 ? s / h : n.noCentroid;
  },
  currentCentroidXOfTouchesChangedAfter: function (t, o) {
    return n.centroidDimension(t, o, true, true);
  },
  currentCentroidYOfTouchesChangedAfter: function (t, o) {
    return n.centroidDimension(t, o, false, true);
  },
  previousCentroidXOfTouchesChangedAfter: function (t, o) {
    return n.centroidDimension(t, o, true, false);
  },
  previousCentroidYOfTouchesChangedAfter: function (t, o) {
    return n.centroidDimension(t, o, false, false);
  },
  currentCentroidX: function (t) {
    return n.centroidDimension(t, 0, true, true);
  },
  currentCentroidY: function (t) {
    return n.centroidDimension(t, 0, false, true);
  },
  noCentroid: -1,
};
module.exports = n;
