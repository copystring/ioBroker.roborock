var module30 = require('./30'),
  o = ['tabBar'];

exports.default = function (n, f) {
  var c = Object.keys(n).find(function (n) {
    return o.includes(n);
  });
  if ('function' == typeof n.title)
    throw new Error(
      [
        '`title` cannot be defined as a function in navigation options for `' + f.routeName + '` screen. \n',
        'Try replacing the following:',
        '{',
        '    title: ({ state }) => state...',
        '}',
        '',
        'with:',
        '({ navigation }) => ({',
        '    title: navigation.state...',
        '})',
      ].join('\n')
    );
  if (c && 'function' == typeof n[c])
    throw new Error(
      [
        '`' + c + '` cannot be defined as a function in navigation options for `' + f.routeName + '` screen. \n',
        'Try replacing the following:',
        '{',
        '    ' + c + ': ({ state }) => ({',
        '         key: state...',
        '    })',
        '}',
        '',
        'with:',
        '({ navigation }) => ({',
        '    ' + c + 'Key: navigation.state...',
        '})',
      ].join('\n')
    );
  if (c && 'object' == typeof n[c])
    throw new Error(
      ['Invalid key `' + c + '` defined in navigation options for `' + f.routeName + '` screen.', '\n', 'Try replacing the following navigation options:', '{', '    ' + c + ': {']
        .concat(
          module30.default(
            Object.keys(n[c]).map(function (n) {
              return '        ' + n + ': ...,';
            })
          ),
          ['    },', '}', '\n', 'with:', '{'],
          module30.default(
            Object.keys(n[c]).map(function (n) {
              return '    ' + (c + n[0].toUpperCase() + n.slice(1)) + ': ...,';
            })
          ),
          ['}']
        )
        .join('\n')
    );
};
