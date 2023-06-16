var n = [],
  t = {
    name: 'default',
  },
  c = {
    setActiveScene: function (c) {
      t = c;
      n.forEach(function (n) {
        return n(t);
      });
    },
    getActiveScene: function () {
      return t;
    },
    addActiveSceneChangedListener: function (t) {
      n.push(t);
      return {
        remove: function () {
          n = n.filter(function (n) {
            return t !== n;
          });
        },
      };
    },
  };
module.exports = c;
