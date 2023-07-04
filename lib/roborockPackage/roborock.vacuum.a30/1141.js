function t() {
  var t = this.constructor.getDerivedStateFromProps(this.props, this.state);
  if (null !== t && undefined !== t) this.setState(t);
}

function n(t) {
  this.setState(
    function (n) {
      var o = this.constructor.getDerivedStateFromProps(t, n);
      return null !== o && undefined !== o ? o : null;
    }.bind(this)
  );
}

function o(t, n) {
  try {
    var o = this.props,
      p = this.state;
    this.props = t;
    this.state = n;
    this.__reactInternalSnapshotFlag = true;
    this.__reactInternalSnapshot = this.getSnapshotBeforeUpdate(o, p);
  } finally {
    this.props = o;
    this.state = p;
  }
}

t.__suppressDeprecationWarning = true;
n.__suppressDeprecationWarning = true;
o.__suppressDeprecationWarning = true;

exports.polyfill = function (p) {
  var l = p.prototype;
  if (!l || !l.isReactComponent) throw new Error('Can only polyfill class components');
  if ('function' != typeof p.getDerivedStateFromProps && 'function' != typeof l.getSnapshotBeforeUpdate) return p;
  var s = null,
    c = null,
    f = null;

  if (
    ('function' == typeof l.componentWillMount ? (s = 'componentWillMount') : 'function' == typeof l.UNSAFE_componentWillMount && (s = 'UNSAFE_componentWillMount'),
    'function' == typeof l.componentWillReceiveProps
      ? (c = 'componentWillReceiveProps')
      : 'function' == typeof l.UNSAFE_componentWillReceiveProps && (c = 'UNSAFE_componentWillReceiveProps'),
    'function' == typeof l.componentWillUpdate ? (f = 'componentWillUpdate') : 'function' == typeof l.UNSAFE_componentWillUpdate && (f = 'UNSAFE_componentWillUpdate'),
    null !== s || null !== c || null !== f)
  ) {
    var u = p.displayName || p.name,
      h = 'function' == typeof p.getDerivedStateFromProps ? 'getDerivedStateFromProps()' : 'getSnapshotBeforeUpdate()';
    throw Error(
      'Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n' +
        u +
        ' uses ' +
        h +
        ' but also contains the following legacy lifecycles:' +
        (null !== s ? '\n  ' + s : '') +
        (null !== c ? '\n  ' + c : '') +
        (null !== f ? '\n  ' + f : '') +
        '\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://fb.me/react-async-component-lifecycle-hooks'
    );
  }

  if (('function' == typeof p.getDerivedStateFromProps && ((l.componentWillMount = t), (l.componentWillReceiveProps = n)), 'function' == typeof l.getSnapshotBeforeUpdate)) {
    if ('function' != typeof l.componentDidUpdate)
      throw new Error('Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype');
    l.componentWillUpdate = o;
    var y = l.componentDidUpdate;

    l.componentDidUpdate = function (t, n, o) {
      var p = this.__reactInternalSnapshotFlag ? this.__reactInternalSnapshot : o;
      y.call(this, t, n, p);
    };
  }

  return p;
};
