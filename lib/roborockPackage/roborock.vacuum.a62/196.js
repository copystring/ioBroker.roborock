var module13 = require('./13'),
  n = function (t) {
    return 'object' != typeof t || t instanceof Date || null === t;
  },
  c = {
    MAX_MERGE_DEPTH: 36,
    isTerminal: n,
    normalizeMergeArg: function (t) {
      return undefined === t || null === t ? {} : t;
    },
    checkMergeArrayArgs: function (n, c) {
      module13(Array.isArray(n) && Array.isArray(c), 'Tried to merge arrays, instead got %s and %s.', n, c);
    },
    checkMergeObjectArgs: function (t, n) {
      c.checkMergeObjectArg(t);
      c.checkMergeObjectArg(n);
    },
    checkMergeObjectArg: function (c) {
      module13(!n(c) && !Array.isArray(c), 'Tried to merge an object, instead got %s.', c);
    },
    checkMergeIntoObjectArg: function (c) {
      module13(!((n(c) && 'function' != typeof c) || Array.isArray(c)), 'Tried to merge into an object, instead got %s.', c);
    },
    checkMergeLevel: function (n) {
      module13(n < 36, 'Maximum deep merge depth exceeded. You may be attempting to merge circular structures in an unsupported way.');
    },
    checkArrayStrategy: function (n) {
      module13(
        undefined === n || n in c.ArrayStrategies,
        'You must provide an array strategy to deep merge functions to instruct the deep merge how to resolve merging two arrays.'
      );
    },
    ArrayStrategies: {
      Clobber: 'Clobber',
      Concat: 'Concat',
      IndexByIndex: 'IndexByIndex',
    },
  };

module.exports = c;
