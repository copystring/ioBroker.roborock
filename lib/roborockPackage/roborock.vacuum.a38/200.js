var PropTypes = require('prop-types'),
  n = PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number,
    bottom: PropTypes.number,
    right: PropTypes.number,
  });

module.exports = n;
