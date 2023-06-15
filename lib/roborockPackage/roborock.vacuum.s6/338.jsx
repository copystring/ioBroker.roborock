var React = require('react'),
  module60 = require('./60'),
  module196 = require('./196'),
  module83 = require('./83');

var f = module60.create({
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
    <module83 style={f.container}>
      <module196 style={f.text}>FABRIC</module196>
    </module83>
  );
};
