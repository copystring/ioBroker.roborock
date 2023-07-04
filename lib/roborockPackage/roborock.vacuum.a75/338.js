module.exports = function () {
  try {
    return 'React tree dumps have been temporarily disabled while React is upgraded to Fiber.';
  } catch (t) {
    return 'Failed to dump react tree: ' + t;
  }
};
