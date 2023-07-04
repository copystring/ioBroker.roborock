var _ = '__global_unique_id__';

module.exports = function () {
  return (globals[_] = (globals[_] || 0) + 1);
};
