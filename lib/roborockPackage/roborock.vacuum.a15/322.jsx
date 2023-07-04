var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module22 = require('./22');

function p() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ('function' == typeof Proxy) return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

require('./324');

require('./52');

require('./47');

var u,
  module323 = require('./323'),
  module286 = require('./286'),
  React = require('react'),
  module86 = require('./86'),
  module61 = require('./61'),
  module198 = require('./198'),
  module203 = require('./203'),
  module163 = require('./163'),
  module214 = require('./214'),
  module215 = require('./215'),
  module13 = require('./13'),
  module182 = require('./182');

require('./15');

u = module182('AndroidTextInput');

(function (c) {
  module7(v, c);

  var u = v,
    module323 = p(),
    f = function () {
      var t,
        n = module11(u);

      if (module323) {
        var s = module11(this).constructor;
        t = Reflect.construct(n, arguments, s);
      } else t = n.apply(this, arguments);

      return module9(this, t);
    };

  function v() {
    module4(this, v);
    return f.apply(this, arguments);
  }

  module5(v, [
    {
      key: 'clear',
      value: function () {},
    },
    {
      key: 'isFocused',
      value: function () {},
    },
  ]);
})(module86.NativeComponent);

var F = function () {
    return true;
  },
  N = module215({
    displayName: 'TextInput',
    statics: {
      State: {
        currentlyFocusedField: module163.currentlyFocusedField,
        focusTextInput: module163.focusTextInput,
        blurTextInput: module163.blurTextInput,
      },
    },
    propTypes: module323,
    getDefaultProps: function () {
      return {
        allowFontScaling: true,
        rejectResponderTermination: true,
        underlineColorAndroid: 'transparent',
      };
    },
    mixins: [module286],
    isFocused: function () {
      return module163.currentlyFocusedField() === module86.findNodeHandle(this._inputRef);
    },
    _inputRef: undefined,
    _focusSubscription: undefined,
    _lastNativeText: undefined,
    _lastNativeSelection: undefined,
    _rafId: null,
    componentDidMount: function () {
      this._lastNativeText = this.props.value;
      var t = module86.findNodeHandle(this._inputRef);
      if (null != t) module163.registerInput(t);
      if (this.props.autoFocus) this._rafId = requestAnimationFrame(this.focus);
    },
    componentWillUnmount: function () {
      if (this._focusSubscription) this._focusSubscription.remove();
      if (this.isFocused()) this.blur();
      var t = module86.findNodeHandle(this._inputRef);
      if (null != t) module163.unregisterInput(t);
      if (null != this._rafId) cancelAnimationFrame(this._rafId);
    },
    clear: function () {
      this.setNativeProps({
        text: '',
      });
    },
    render: function () {
      var module4;
      module4 = this._renderAndroid();
      return <module203.Provider value>{module4}</module203.Provider>;
    },
    _getText: function () {
      return 'string' == typeof this.props.value ? this.props.value : 'string' == typeof this.props.defaultValue ? this.props.defaultValue : '';
    },
    _setNativeRef: function (t) {
      this._inputRef = t;
    },
    _renderIOSLegacy: function () {
      var t,
        n = module22({}, this.props);

      if (
        ((n.style = [this.props.style]),
        n.selection &&
          null == n.selection.end &&
          (n.selection = {
            start: n.selection.start,
            end: n.selection.start,
          }),
        n.multiline)
      ) {
        var s = n.children,
          o = 0;
        React.Children.forEach(s, function () {
          return ++o;
        });
        module13(!(n.value && o), 'Cannot specify both value and children.');
        if (o >= 1)
          s = (
            <module198 style={n.style} allowFontScaling={n.allowFontScaling} maxFontSizeMultiplier={n.maxFontSizeMultiplier}>
              {s}
            </module198>
          );
        if (n.inputView) s = [s, n.inputView];
        n.style.unshift(E.multilineInput);
        t = <undefined />;
      } else t = <undefined />;

      return (
        <module214
          onLayout={n.onLayout}
          onPress={this._onPress}
          rejectResponderTermination
          accessible={n.accessible}
          accessibilityLabel={n.accessibilityLabel}
          accessibilityRole={n.accessibilityRole}
          accessibilityStates={n.accessibilityStates}
          accessibilityState={n.accessibilityState}
          nativeID={this.props.nativeID}
          testID={n.testID}
        >
          {t}
        </module214>
      );
    },
    _renderIOS: function () {
      var t = module22({}, this.props);
      t.style = [this.props.style];
      if (t.selection && null == t.selection.end)
        t.selection = {
          start: t.selection.start,
          end: t.selection.start,
        };
      var n = void t.multiline;
      if (t.multiline) t.style.unshift(E.multilineInput);
      var s = <n />;
      return (
        <module214
          onLayout={t.onLayout}
          onPress={this._onPress}
          rejectResponderTermination={t.rejectResponderTermination}
          accessible={t.accessible}
          accessibilityLabel={t.accessibilityLabel}
          accessibilityRole={t.accessibilityRole}
          accessibilityStates={t.accessibilityStates}
          accessibilityState={t.accessibilityState}
          nativeID={this.props.nativeID}
          testID={t.testID}
        >
          {s}
        </module214>
      );
    },
    _renderAndroid: function () {
      var t = module22({}, this.props);
      t.style = [this.props.style];
      t.autoCapitalize = t.autoCapitalize || 'sentences';
      var n = this.props.children,
        s = 0;
      React.Children.forEach(n, function () {
        return ++s;
      });
      module13(!(this.props.value && s), 'Cannot specify both value and children.');
      if (s > 1) n = <module198>{n}</module198>;
      if (t.selection && null == t.selection.end)
        t.selection = {
          start: t.selection.start,
          end: t.selection.start,
        };
      var o = <u />;
      return (
        <module214
          onLayout={t.onLayout}
          onPress={this._onPress}
          accessible={this.props.accessible}
          accessibilityLabel={this.props.accessibilityLabel}
          accessibilityRole={this.props.accessibilityRole}
          accessibilityStates={this.props.accessibilityStates}
          accessibilityState={this.props.accessibilityState}
          nativeID={this.props.nativeID}
          testID={this.props.testID}
        >
          {o}
        </module214>
      );
    },
    _onFocus: function (t) {
      if (this.props.onFocus) this.props.onFocus(t);
      if (this.props.selectionState) this.props.selectionState.focus();
    },
    _onPress: function (t) {
      if (this.props.editable || undefined === this.props.editable) this.focus();
    },
    _onChange: function (t) {
      if (this._inputRef && this._inputRef.setNativeProps)
        module86.setNativeProps(this._inputRef, {
          mostRecentEventCount: t.nativeEvent.eventCount,
        });
      var n = t.nativeEvent.text;
      if (this.props.onChange) this.props.onChange(t);
      if (this.props.onChangeText) this.props.onChangeText(n);

      if (this._inputRef) {
        this._lastNativeText = n;
        this.forceUpdate();
      }
    },
    _onSelectionChange: function (t) {
      if (this.props.onSelectionChange) this.props.onSelectionChange(t);

      if (this._inputRef) {
        this._lastNativeSelection = t.nativeEvent.selection;
        if (this.props.selection || this.props.selectionState) this.forceUpdate();
      }
    },
    componentDidUpdate: function () {
      var t = {};
      if (this._lastNativeText !== this.props.value && 'string' == typeof this.props.value) t.text = this.props.value;
      var n = this.props.selection;
      if (this._lastNativeSelection && n && (this._lastNativeSelection.start !== n.start || this._lastNativeSelection.end !== n.end)) t.selection = this.props.selection;
      if (Object.keys(t).length > 0 && this._inputRef && this._inputRef.setNativeProps) module86.setNativeProps(this._inputRef, t);
      if (this.props.selectionState && n) this.props.selectionState.update(n.start, n.end);
    },
    _onBlur: function (t) {
      this.blur();
      if (this.props.onBlur) this.props.onBlur(t);
      if (this.props.selectionState) this.props.selectionState.blur();
    },
    _onTextInput: function (t) {
      if (this.props.onTextInput) this.props.onTextInput(t);
    },
    _onScroll: function (t) {
      if (this.props.onScroll) this.props.onScroll(t);
    },
  }),
  D = N,
  E = module61.create({
    multilineInput: {
      paddingTop: 5,
    },
  });

module.exports = D;
