var React = require('react'),
  module61 = require('./61'),
  module198 = require('./198'),
  module84 = require('./84');

var f = module61.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0, 0.25)',
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 2,
  },
  text: {
    fontSize: 6,
    color: '#ffffff',
  },
});

module.exports = function () {
  return (
    <module84 style={f.container}>
      <module198 style={f.text}>FABRIC</module198>
    </module84>
  );
};
