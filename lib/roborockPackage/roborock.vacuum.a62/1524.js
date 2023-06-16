var module1476 = require('./1476'),
  module1477 = require('./1477'),
  module1481 = require('./1481'),
  module1515 = require('./1515'),
  React = require('react'),
  module12 = require('./12'),
  module1525 = require('./1525');

module12.PixelRatio.get();

var p = module12.StyleSheet.create({
    indicator: {
      position: 'absolute',
      left: 0,
      top: -99,
    },
    scrollView: {
      height: 0,
    },
    selectedItemText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000',
      paddingVertical: 10,
    },
    itemText: {
      fontSize: 20,
      color: '#aaa',
      textAlign: 'center',
      paddingVertical: 10,
    },
  }),
  h = (function (f) {
    function s() {
      module1476.default(this, s);
      var o = module1481.default(this, (s.__proto__ || Object.getPrototypeOf(s)).apply(this, arguments));

      o.onItemLayout = function (t) {
        var l = t.nativeEvent.layout,
          n = l.height,
          c = l.width;

        if (!(o.itemHeight === n && o.itemWidth === c)) {
          o.itemWidth = c;
          if (o.indicatorRef)
            o.indicatorRef.setNativeProps({
              style: [
                p.indicator,
                {
                  top: 2 * n,
                  height: n,
                  width: c,
                  backgroundColor: o.props.selectedBackgroundColor,
                },
              ],
            });
        }

        if (o.itemHeight !== n) {
          o.itemHeight = n;
          if (o.scrollerRef)
            o.scrollerRef.setNativeProps({
              style: {
                height: 5 * n,
              },
            });
          if (o.contentRef)
            o.contentRef.setNativeProps({
              style: {
                paddingTop: 2 * n,
                paddingBottom: 2 * n,
              },
            });
          setTimeout(function () {
            o.props.select(o.props.selectedValue, o.itemHeight, o.scrollTo);
          }, 0);
        }
      };

      o.scrollTo = function (t) {
        if (o.scrollerRef)
          o.scrollerRef.scrollTo({
            y: t,
            animated: false,
          });
      };

      o.fireValueChange = function (t) {
        if (o.props.onValueChange) o.props.onValueChange(t);
      };

      o.onScroll = function (t) {
        var l = t.nativeEvent.contentOffset.y;
        o.clearScrollBuffer();
        o.scrollBuffer = setTimeout(function () {
          o.clearScrollBuffer();
          o.props.doScrollingComplete(l, o.itemHeight, o.fireValueChange);
        }, 100);
      };

      return o;
    }

    module1515.default(s, f);
    module1477.default(s, [
      {
        key: 'componentDidUpdate',
        value: function () {
          this.props.select(this.props.selectedValue, this.itemHeight, this.scrollTo);
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          this.clearScrollBuffer();
        },
      },
      {
        key: 'clearScrollBuffer',
        value: function () {
          if (this.scrollBuffer) clearTimeout(this.scrollBuffer);
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            o = this.props,
            l = o.children,
            n = o.itemStyle,
            f = o.selectedValue,
            s = o.style,
            h = React.default.Children.map(l, function (o, l) {
              var s = [p.itemText];
              if (f === o.props.value) s.push(p.selectedItemText);
              s.push(n);
              return React.default.createElement(
                module12.View,
                {
                  ref: function (o) {
                    return (t['item' + l] = o);
                  },
                  onLayout: 0 === l ? t.onItemLayout : undefined,
                  key: o.key,
                },
                React.default.createElement(
                  module12.Text,
                  {
                    style: s,
                    numberOfLines: 1,
                  },
                  o.props.label
                )
              );
            });
          return React.default.createElement(
            module12.View,
            {
              style: s,
            },
            React.default.createElement(module12.View, {
              ref: function (o) {
                return (t.indicatorRef = o);
              },
              style: p.indicator,
            }),
            React.default.createElement(
              module12.ScrollView,
              {
                style: p.scrollView,
                ref: function (o) {
                  return (t.scrollerRef = o);
                },
                onScroll: this.onScroll,
                showsVerticalScrollIndicator: false,
                overScrollMode: 'never',
              },
              React.default.createElement(
                module12.View,
                {
                  ref: function (o) {
                    return (t.contentRef = o);
                  },
                },
                h
              )
            )
          );
        },
      },
    ]);
    return s;
  })(React.default.Component);

exports.default = module1525.default(h);
module.exports = exports.default;
