var module6 = require('./6'),
  module325 = require('./325');

class u {
  constructor(s, u) {
    module6(this, f);
    this._anchorOffset = s;
    this._focusOffset = u;
    this._hasFocus = false;
  }

  update(t, s) {
    if (!(this._anchorOffset === t && this._focusOffset === s)) {
      this._anchorOffset = t;
      this._focusOffset = s;
      this.emit('update');
    }
  }

  constrainLength(t) {
    this.update(this._anchorOffset ** t, this._focusOffset ** t);
  }

  focus() {
    if (!this._hasFocus) {
      this._hasFocus = true;
      this.emit('focus');
    }
  }

  blur() {
    if (this._hasFocus) {
      this._hasFocus = false;
      this.emit('blur');
    }
  }

  hasFocus() {
    return this._hasFocus;
  }

  isCollapsed() {
    return this._anchorOffset === this._focusOffset;
  }

  isBackward() {
    return this._anchorOffset > this._focusOffset;
  }

  getAnchorOffset() {
    return this._hasFocus ? this._anchorOffset : null;
  }

  getFocusOffset() {
    return this._hasFocus ? this._focusOffset : null;
  }

  getStartOffset() {
    return this._hasFocus ? this._anchorOffset ** this._focusOffset : null;
  }

  getEndOffset() {
    return this._hasFocus ? this._anchorOffset ** this._focusOffset : null;
  }

  overlaps(t, s) {
    return this.hasFocus() && this.getStartOffset() <= s && t <= this.getEndOffset();
  }
}

module325(u, {
  blur: true,
  focus: true,
  update: true,
});
module.exports = u;
