var module49 = require('./49');

function o(n, o) {
  var t = Object.keys(n);

  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(n);
    if (o)
      l = l.filter(function (o) {
        return Object.getOwnPropertyDescriptor(n, o).enumerable;
      });
    t.push.apply(t, l);
  }

  return t;
}

function t(t) {
  for (var l = 1; l < arguments.length; l++) {
    var s = null != arguments[l] ? arguments[l] : {};
    if (l % 2)
      o(Object(s), true).forEach(function (o) {
        module49(t, o, s[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      o(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

var PropTypes = require('prop-types'),
  module66 = require('./66'),
  module272 = require('./272'),
  module320 = require('./320'),
  module196 = require('./196'),
  p = ['phoneNumber', 'link', 'address', 'calendarEvent', 'none', 'all'];

module.exports = t(
  t({}, module272),
  {},
  {
    autoCapitalize: PropTypes.oneOf(['none', 'sentences', 'words', 'characters']),
    autoCompleteType: PropTypes.oneOf([
      'cc-csc',
      'cc-exp',
      'cc-exp-month',
      'cc-exp-year',
      'cc-number',
      'email',
      'name',
      'password',
      'postal-code',
      'street-address',
      'tel',
      'username',
      'off',
    ]),
    autoCorrect: PropTypes.bool,
    spellCheck: PropTypes.bool,
    autoFocus: PropTypes.bool,
    allowFontScaling: PropTypes.bool,
    maxFontSizeMultiplier: PropTypes.number,
    editable: PropTypes.bool,
    keyboardType: PropTypes.oneOf([
      'default',
      'email-address',
      'numeric',
      'phone-pad',
      'number-pad',
      'ascii-capable',
      'numbers-and-punctuation',
      'url',
      'name-phone-pad',
      'decimal-pad',
      'twitter',
      'web-search',
      'visible-password',
    ]),
    keyboardAppearance: PropTypes.oneOf(['default', 'light', 'dark']),
    returnKeyType: PropTypes.oneOf(['done', 'go', 'next', 'search', 'send', 'none', 'previous', 'default', 'emergency-call', 'google', 'join', 'route', 'yahoo']),
    returnKeyLabel: PropTypes.string,
    maxLength: PropTypes.number,
    numberOfLines: PropTypes.number,
    disableFullscreenUI: PropTypes.bool,
    enablesReturnKeyAutomatically: PropTypes.bool,
    multiline: PropTypes.bool,
    textBreakStrategy: PropTypes.oneOf(['simple', 'highQuality', 'balanced']),
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onChange: PropTypes.func,
    onChangeText: PropTypes.func,
    onContentSizeChange: PropTypes.func,
    onTextInput: PropTypes.func,
    onEndEditing: PropTypes.func,
    onSelectionChange: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    onKeyPress: PropTypes.func,
    onLayout: PropTypes.func,
    onScroll: PropTypes.func,
    placeholder: PropTypes.string,
    placeholderTextColor: module66,
    scrollEnabled: PropTypes.bool,
    secureTextEntry: PropTypes.bool,
    selectionColor: module66,
    selectionState: PropTypes.instanceOf(module320),
    selection: PropTypes.shape({
      start: PropTypes.number.isRequired,
      end: PropTypes.number,
    }),
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    clearButtonMode: PropTypes.oneOf(['never', 'while-editing', 'unless-editing', 'always']),
    clearTextOnFocus: PropTypes.bool,
    selectTextOnFocus: PropTypes.bool,
    blurOnSubmit: PropTypes.bool,
    style: module196.propTypes.style,
    underlineColorAndroid: module66,
    inlineImageLeft: PropTypes.string,
    inlineImagePadding: PropTypes.number,
    rejectResponderTermination: PropTypes.bool,
    dataDetectorTypes: PropTypes.oneOfType([PropTypes.oneOf(p), PropTypes.arrayOf(PropTypes.oneOf(p))]),
    caretHidden: PropTypes.bool,
    contextMenuHidden: PropTypes.bool,
    inputAccessoryViewID: PropTypes.string,
    textContentType: PropTypes.oneOf([
      'none',
      'URL',
      'addressCity',
      'addressCityAndState',
      'addressState',
      'countryName',
      'creditCardNumber',
      'emailAddress',
      'familyName',
      'fullStreetAddress',
      'givenName',
      'jobTitle',
      'location',
      'middleName',
      'name',
      'namePrefix',
      'nameSuffix',
      'nickname',
      'organizationName',
      'postalCode',
      'streetAddressLine1',
      'streetAddressLine2',
      'sublocality',
      'telephoneNumber',
      'username',
      'password',
      'newPassword',
      'oneTimeCode',
    ]),
    showSoftInputOnFocus: PropTypes.bool,
  }
);
