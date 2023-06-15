exports.default = function (t) {
  var c = Object.keys(module934.VideoError).map(function (t) {
      return module934.VideoError[t];
    }),
    p = t.navigation.state.params.isPortrait;
  return React.default.createElement(module12.FlatList, {
    style: [
      s.wrap,
      {
        paddingLeft: p ? 0 : module934.AppBarMarginTop + 20,
      },
    ],
    data: c,
    showsVerticalScrollIndicator: false,
    renderItem: function (t) {
      var n = t.item;
      return React.default.createElement(
        module12.View,
        {
          style: s.row,
        },
        React.default.createElement(
          module12.View,
          {
            style: s.top,
          },
          React.default.createElement(
            module12.Text,
            {
              style: s.code,
            },
            'Error ',
            n.code,
            '  '
          )
        ),
        React.default.createElement(
          module12.View,
          {
            style: s.bottom,
          },
          React.default.createElement(
            module12.Text,
            {
              style: s.resolve,
            },
            n.resolve
          )
        )
      );
    },
  });
};

var React = require('react'),
  module12 = require('./12'),
  module934 = require('./934'),
  c = globals.isRTL;

var s = module12.StyleSheet.create({
  wrap: {
    backgroundColor: 'white',
    paddingLeft: module934.AppBarMarginTop > 0 ? module934.AppBarMarginTop + 20 : 0,
  },
  row: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 0.6,
  },
  top: {
    flexDirection: c ? 'row-reverse' : 'row',
    marginBottom: 15,
  },
  code: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 20,
  },
  msg: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 16,
  },
  resolve: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: 14,
  },
  bottom: {
    flexDirection: c ? 'row-reverse' : 'row',
  },
});
