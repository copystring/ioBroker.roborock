var module4 = require('./4'),
  module5 = require('./5'),
  module51 = require('./51'),
  module140 = require('./140'),
  module141 = require('./141'),
  c = (function () {
    function t() {
      module4.default(this, t);
    }

    module5.default(t, null, [
      {
        key: 'alert',
        value: function (n, o, u, c) {
          if ('ios' === module51.default.OS) t.prompt(n, o, u, 'default');
          else if ('android' === module51.default.OS) {
            if (!module140.default) return;
            var f = module140.default.getConstants(),
              p = {
                title: n || '',
                message: o || '',
                cancelable: false,
              };
            if (c && c.cancelable) p.cancelable = c.cancelable;
            var v = u
                ? u.slice(0, 3)
                : [
                    {
                      text: 'OK',
                    },
                  ],
              y = v.pop(),
              b = v.pop(),
              h = v.pop();
            if (h) p.buttonNeutral = h.text || '';
            if (b) p.buttonNegative = b.text || '';
            if (y) p.buttonPositive = y.text || 'OK';
            module140.default.showAlert(
              p,
              function (t) {
                return console.warn(t);
              },
              function (t, n) {
                if (t === f.buttonClicked)
                  n === f.buttonNeutral ? h.onPress && h.onPress() : n === f.buttonNegative ? b.onPress && b.onPress() : n === f.buttonPositive && y.onPress && y.onPress();
                else if (t === f.dismissed && c && c.onDismiss) c.onDismiss();
              }
            );
          }
        },
      },
      {
        key: 'prompt',
        value: function (t, n, o) {
          var s = arguments.length > 3 && undefined !== arguments[3] ? arguments[3] : 'plain-text',
            c = arguments.length > 4 ? arguments[4] : undefined,
            f = arguments.length > 5 ? arguments[5] : undefined;

          if ('ios' === module51.default.OS) {
            if ('function' == typeof s) {
              console.warn(
                'You passed a callback function as the "type" argument to Alert.prompt(). React Native is assuming  you want to use the deprecated Alert.prompt(title, defaultValue, buttons, callback) signature. The current signature is Alert.prompt(title, message, callbackOrButtons, type, defaultValue, keyboardType) and the old syntax will be removed in a future version.'
              );
              var p = s;
              return void module141.default.alertWithArgs(
                {
                  title: t || '',
                  type: 'plain-text',
                  defaultValue: n || '',
                },
                function (t, n) {
                  p(n);
                }
              );
            }

            var v,
              y,
              b = [],
              h = [];
            if ('function' == typeof o) b = [o];
            else if (Array.isArray(o))
              o.forEach(function (t, n) {
                if (((b[n] = t.onPress), 'cancel' === t.style ? (v = String(n)) : 'destructive' === t.style && (y = String(n)), t.text || n < (o || []).length - 1)) {
                  var l = {};
                  l[n] = t.text || '';
                  h.push(l);
                }
              });
            module141.default.alertWithArgs(
              {
                title: t || '',
                message: n || undefined,
                buttons: h,
                type: s || undefined,
                defaultValue: c,
                cancelButtonKey: v,
                destructiveButtonKey: y,
                keyboardType: f,
              },
              function (t, n) {
                var o = b[t];
                if (o) o(n);
              }
            );
          }
        },
      },
    ]);
    return t;
  })();

module.exports = c;
