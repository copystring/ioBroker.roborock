var module4 = require('./4'),
  module499 = require('./499'),
  module500 = require('./500'),
  module501 = require('./501');

function u(t, n, s) {
  return t[n][s];
}

function l(t, n) {
  return t[n];
}

class w {
  constructor(t) {
    module4(this, h);
    module499(t && 'function' == typeof t.rowHasChanged, 'Must provide a rowHasChanged function.');
    this._rowHasChanged = t.rowHasChanged;
    this._getRowData = t.getRowData || u;
    this._sectionHeaderHasChanged = t.sectionHeaderHasChanged;
    this._getSectionHeaderData = t.getSectionHeaderData || l;
    this._dataBlob = null;
    this._dirtyRows = [];
    this._dirtySections = [];
    this._cachedRowCount = 0;
    this.rowIdentities = [];
    this.sectionIdentities = [];
  }

  cloneWithRows(n, s) {
    var o = s ? [s] : null;
    if (!this._sectionHeaderHasChanged)
      this._sectionHeaderHasChanged = function () {
        return false;
      };
    return this.cloneWithRowsAndSections(
      {
        s1: n,
      },
      ['s1'],
      o
    );
  }

  cloneWithRowsAndSections(t, n, s) {
    module499('function' == typeof this._sectionHeaderHasChanged, 'Must provide a sectionHeaderHasChanged function with section data.');
    module499(!n || !s || n.length === s.length, 'row and section ids lengths must be the same');
    var c = new h({
      getRowData: this._getRowData,
      getSectionHeaderData: this._getSectionHeaderData,
      rowHasChanged: this._rowHasChanged,
      sectionHeaderHasChanged: this._sectionHeaderHasChanged,
    });
    c._dataBlob = t;
    c.sectionIdentities = n || Object.keys(t);
    if (s) c.rowIdentities = s;
    else {
      c.rowIdentities = [];
      c.sectionIdentities.forEach(function (n) {
        c.rowIdentities.push(Object.keys(t[n]));
      });
    }
    c._cachedRowCount = _(c.rowIdentities);

    c._calculateDirtyArrays(this._dataBlob, this.sectionIdentities, this.rowIdentities);

    return c;
  }

  getRowCount() {
    return this._cachedRowCount;
  }

  getRowAndSectionCount() {
    return this._cachedRowCount + this.sectionIdentities.length;
  }

  rowShouldUpdate(t, n) {
    var s = this._dirtyRows[t][n];
    module501(undefined !== s, 'missing dirtyBit for section, row: ' + t + ', ' + n);
    return s;
  }

  getRowData(t, n) {
    var s = this.sectionIdentities[t],
      o = this.rowIdentities[t][n];
    module501(undefined !== s && undefined !== o, 'rendering invalid section, row: ' + t + ', ' + n);
    return this._getRowData(this._dataBlob, s, o);
  }

  getRowIDForFlatIndex(t) {
    for (var n = t, s = 0; s < this.sectionIdentities.length; s++) {
      if (!(n >= this.rowIdentities[s].length)) return this.rowIdentities[s][n];
      n -= this.rowIdentities[s].length;
    }

    return null;
  }

  getSectionIDForFlatIndex(t) {
    for (var n = t, s = 0; s < this.sectionIdentities.length; s++) {
      if (!(n >= this.rowIdentities[s].length)) return this.sectionIdentities[s];
      n -= this.rowIdentities[s].length;
    }

    return null;
  }

  getSectionLengths() {
    for (var t = [], n = 0; n < this.sectionIdentities.length; n++) t.push(this.rowIdentities[n].length);

    return t;
  }

  sectionHeaderShouldUpdate(t) {
    var n = this._dirtySections[t];
    module501(undefined !== n, 'missing dirtyBit for section: ' + t);
    return n;
  }

  getSectionHeaderData(t) {
    if (!this._getSectionHeaderData) return null;
    var n = this.sectionIdentities[t];
    module501(undefined !== n, 'renderSection called on invalid section: ' + t);
    return this._getSectionHeaderData(this._dataBlob, n);
  }

  _calculateDirtyArrays(t, n, s) {
    for (var o, h = f(n), u = {}, l = 0; l < s.length; l++) {
      var w = n[l];
      module501(!u[w], 'SectionID appears more than once: ' + w);
      u[w] = f(s[l]);
    }

    this._dirtySections = [];
    this._dirtyRows = [];

    for (var _ = 0; _ < this.sectionIdentities.length; _++) {
      var v = this.sectionIdentities[_];
      o = !h[v];
      var H = this._sectionHeaderHasChanged;
      if (!o && H) o = H(this._getSectionHeaderData(t, v), this._getSectionHeaderData(this._dataBlob, v));

      this._dirtySections.push(!!o);

      this._dirtyRows[_] = [];

      for (var I = 0; I < this.rowIdentities[_].length; I++) {
        var y = this.rowIdentities[_][I];
        o = !h[v] || !u[v][y] || this._rowHasChanged(this._getRowData(t, v, y), this._getRowData(this._dataBlob, v, y));

        this._dirtyRows[_].push(!!o);
      }
    }
  }
}

function _(t) {
  for (var n = 0, s = 0; s < t.length; s++) {
    n += t[s].length;
  }

  return n;
}

function f(t) {
  if (module500(t)) return {};

  for (var n = {}, s = 0; s < t.length; s++) {
    var o = t[s];
    module501(!n[o], 'Value appears more than once in array: ' + o);
    n[o] = true;
  }

  return n;
}

module.exports = w;
