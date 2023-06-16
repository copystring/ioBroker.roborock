module.exports = function (...args) {
  if (1 === args.length && args[0] instanceof Error) {
    var t = args[0];
    console.error('Error: "' + t.message + '".  Stack:\n' + t.stack);
  } else console.error.apply(console, args);
};
