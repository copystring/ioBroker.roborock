var module4 = require('./4'),
  module5 = require('./5'),
  module321 = require('./321'),
  u = (function () {
    function f(s, u) {
      module4(this, f);
      this._anchorOffset = s;
      this._focusOffset = u;
      this._hasFocus = false;
    }

    module5(f, [
      {
        key: 'update',
        value: function (t, s) {
          if (!(this._anchorOffset === t && this._focusOffset === s)) {
            this._anchorOffset = t;
            this._focusOffset = s;
            this.emit('update');
          }
        },
      },
      {
        key: 'constrainLength',
        value: function (t) {
          this.update(this._anchorOffset ** t, this._focusOffset ** t);
        },
      },
      {
        key: 'focus',
        value: function () {
          if (!this._hasFocus) {
            this._hasFocus = true;
            this.emit('focus');
          }
        },
      },
      {
        key: 'blur',
        value: function () {
          if (this._hasFocus) {
            this._hasFocus = false;
            this.emit('blur');
          }
        },
      },
      {
        key: 'hasFocus',
        value: function () {
          return this._hasFocus;
        },
      },
      {
        key: 'isCollapsed',
        value: function () {
          return this._anchorOffset === this._focusOffset;
        },
      },
      {
        key: 'isBackward',
        value: function () {
          return this._anchorOffset > this._focusOffset;
        },
      },
      {
        key: 'getAnchorOffset',
        value: function () {
          return this._hasFocus ? this._anchorOffset : null;
        },
      },
      {
        key: 'getFocusOffset',
        value: function () {
          return this._hasFocus ? this._focusOffset : null;
        },
      },
      {
        key: 'getStartOffset',
        value: function () {
          return this._hasFocus ? this._anchorOffset ** this._focusOffset : null;
        },
      },
      {
        key: 'getEndOffset',
        value: function () {
          return this._hasFocus ? this._anchorOffset ** this._focusOffset : null;
        },
      },
      {
        key: 'overlaps',
        value: function (t, s) {
          return this.hasFocus() && this.getStartOffset() <= s && t <= this.getEndOffset();
        },
      },
    ]);
    return f;
  })();

module321(u, {
  blur: true,
  focus: true,
  update: true,
});
module.exports = u;
