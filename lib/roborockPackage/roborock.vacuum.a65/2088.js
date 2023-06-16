var module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module23 = require('@babel/runtime/helpers/slicedToArray'),
  React = require('react'),
  module385 = require('./385'),
  module13 = require('./13'),
  module1200 = require('./1200'),
  module2089 = require('./2089'),
  module2090 = require('./2090'),
  module393 = require('./393'),
  v = React.memo(function (t) {
    var n = t.title,
      v = undefined === n ? '' : n,
      V = t.subtitle,
      C = undefined === V ? '' : V,
      b = t.onImagesChange,
      x = React.useState([]),
      P = module23.default(x, 2),
      S = P[0],
      z = P[1],
      k = React.useContext(module1200.AppConfigContext).theme;
    React.useEffect(
      function () {
        if (!(null == b)) b(S);
      },
      [S]
    );

    for (
      var T = React.useCallback(function () {
          var t;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.next = 2;
                    return regeneratorRuntime.default.awrap(module393.selectSystemMediaPaths());

                  case 2:
                    if ((t = n.sent).length > 0)
                      z(function (n) {
                        var l = module31.default(n),
                          o = new Set(
                            l.map(function (t) {
                              return t.sourceId;
                            })
                          );
                        t.forEach(function (t) {
                          if (o.has(t.sourceId)) globals.showToast('\u9009\u62e9\u56fe\u7247\u5df2\u5b58\u5728');
                          else l.push(t);
                        });
                        return l;
                      });

                  case 4:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            null,
            null,
            Promise
          );
        }, []),
        _ = React.useCallback(function (t) {
          var n = {
            text: '\u5220\u9664',
            onPress: function () {
              return A(t);
            },
          };
          globals.Alert.alert('\u662f\u5426\u5220\u9664\u9009\u4e2d\u56fe\u7247', '', [
            {
              text: '\u53d6\u6d88',
            },
            n,
          ]);
        }, []),
        A = React.useCallback(function (t) {
          z(function (n) {
            return n.filter(function (n) {
              return n.sourceId !== t.sourceId;
            });
          });
        }, []),
        B = React.default.createElement(
          module13.TouchableOpacity,
          {
            onPress: T,
          },
          React.default.createElement(module13.Image, {
            style: E.imageItemView,
            source: module2089,
          })
        ),
        H = arguments.length,
        M = new Array(H > 1 ? H - 1 : 0),
        j = 1;
      j < H;
      j++
    )
      M[j - 1] = arguments[j];

    return React.default.createElement(
      module13.View,
      module22.default(
        {
          style: E.itemRoot,
        },
        M
      ),
      React.default.createElement(
        module13.Text,
        {
          style: [
            E.title,
            {
              color: k.mainTextColor,
            },
          ],
        },
        v,
        ' ',
        React.default.createElement(
          module13.Text,
          {
            style: E.subtitle,
          },
          C
        )
      ),
      React.default.createElement(
        module13.View,
        {
          style: E.imageInfoView,
        },
        React.default.createElement(module13.FlatList, {
          data: S,
          renderItem: function (t) {
            var n = t.item;
            return React.default.createElement(
              module13.View,
              {
                style: E.flatItemView,
              },
              React.default.createElement(module13.Image, {
                source: {
                  uri: n.posterPath,
                },
                style: E.imageItemView,
              }),
              React.default.createElement(module385.PureImageButton, {
                style: E.deleteImageBtn,
                image: module2090,
                imageWidth: 22,
                imageHeight: 22,
                onPress: function () {
                  return _(n);
                },
              })
            );
          },
          keyExtractor: function (t) {
            var n;
            return null != (n = t.posterPath) ? n : '';
          },
          horizontal: true,
          ListFooterComponent: B,
        })
      )
    );
  }),
  E = module13.StyleSheet.create({
    title: {
      fontSize: 15,
      paddingHorizontal: 8,
    },
    subtitle: {
      fontSize: 11,
      color: 'gray',
    },
    itemRoot: {
      paddingVertical: 10,
    },
    imageItemView: {
      height: 75,
      width: 75,
      top: 11,
      resizeMode: 'contain',
    },
    flatItemView: {
      height: 86,
      width: 90,
    },
    deleteImageBtn: {
      position: 'absolute',
      top: 0,
      left: 64,
      height: 22,
      width: 22,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    imageInfoView: {
      height: 96,
      paddingVertical: 5,
      paddingHorizontal: 8,
    },
  }),
  V = v;

exports.default = V;
