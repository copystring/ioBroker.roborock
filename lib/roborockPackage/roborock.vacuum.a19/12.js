require('./13');

var module14 = require('./14');

module.exports = {
  get AccessibilityInfo() {
    return require('./17');
  },

  get ActivityIndicator() {
    return require('./54');
  },

  get ART() {
    module14(
      'art-moved',
      "React Native ART has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-community/art' instead of 'react-native'. See https://github.com/react-native-community/art"
    );
    return require('./185');
  },

  get Button() {
    return require('./195');
  },

  get CheckBox() {
    module14(
      'checkBox-moved',
      "CheckBox has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-community/checkbox' instead of 'react-native'. See https://github.com/react-native-community/react-native-checkbox"
    );
    return require('./283');
  },

  get DatePickerIOS() {
    module14(
      'DatePickerIOS-merged',
      "DatePickerIOS has been merged with DatePickerAndroid and will be removed in a future release. It can now be installed and imported from '@react-native-community/datetimepicker' instead of 'react-native'. See https://github.com/react-native-community/react-native-datetimepicker"
    );
    return require('./286');
  },

  get DrawerLayoutAndroid() {
    return require('./287');
  },

  get FlatList() {
    return require('./250');
  },

  get Image() {
    return require('./271');
  },

  get ImageBackground() {
    return require('./292');
  },

  get InputAccessoryView() {
    return require('./293');
  },

  get KeyboardAvoidingView() {
    return require('./295');
  },

  get MaskedViewIOS() {
    module14(
      'maskedviewios-moved',
      "MaskedViewIOS has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-community/masked-view' instead of 'react-native'. See https://github.com/react-native-community/react-native-masked-view"
    );
    return require('./297');
  },

  get Modal() {
    return require('./298');
  },

  get Picker() {
    return require('./305');
  },

  get PickerIOS() {
    return require('./297');
  },

  get ProgressBarAndroid() {
    return require('./182');
  },

  get ProgressViewIOS() {
    return require('./310');
  },

  get SafeAreaView() {
    return require('./311');
  },

  get ScrollView() {
    return require('./257');
  },

  get SectionList() {
    return require('./278');
  },

  get SegmentedControlIOS() {
    return require('./312');
  },

  get Slider() {
    module14(
      'slider-moved',
      "Slider has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-community/slider' instead of 'react-native'. See https://github.com/react-native-community/react-native-slider"
    );
    return require('./313');
  },

  get Switch() {
    return require('./315');
  },

  get RefreshControl() {
    return require('./254');
  },

  get StatusBar() {
    return require('./290');
  },

  get Text() {
    return require('./196');
  },

  get TextInput() {
    return require('./318');
  },

  get Touchable() {
    return require('./202');
  },

  get TouchableHighlight() {
    return require('./325');
  },

  get TouchableNativeFeedback() {
    return require('./211');
  },

  get TouchableOpacity() {
    return require('./217');
  },

  get TouchableWithoutFeedback() {
    return require('./212');
  },

  get View() {
    return require('./83');
  },

  get VirtualizedList() {
    return require('./251');
  },

  get VirtualizedSectionList() {
    return require('./279');
  },

  get ActionSheetIOS() {
    return require('./326');
  },

  get Alert() {
    return require('./139');
  },

  get Animated() {
    return require('./218');
  },

  get AppRegistry() {
    return require('./328');
  },

  get AppState() {
    return require('./343');
  },

  get AsyncStorage() {
    module14(
      'async-storage-moved',
      "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-community/async-storage' instead of 'react-native'. See https://github.com/react-native-community/react-native-async-storage"
    );
    return require('./346');
  },

  get BackHandler() {
    return require('./339');
  },

  get Clipboard() {
    return require('./348');
  },

  get DatePickerAndroid() {
    module14(
      'DatePickerAndroid-merged',
      "DatePickerAndroid has been merged with DatePickerIOS and will be removed in a future release. It can now be installed and imported from '@react-native-community/datetimepicker' instead of 'react-native'. See https://github.com/react-native-community/react-native-datetimepicker"
    );
    return require('./350');
  },

  get DeviceInfo() {
    return require('./352');
  },

  get Dimensions() {
    return require('./62');
  },

  get Easing() {
    return require('./246');
  },

  get findNodeHandle() {
    return require('./85').findNodeHandle;
  },

  get I18nManager() {
    return require('./303');
  },

  get ImagePickerIOS() {
    module14(
      'imagePickerIOS-moved',
      "ImagePickerIOS has been extracted from react-native core and will be removed in a future release. Please upgrade to use either '@react-native-community/react-native-image-picker' or 'expo-image-picker'. If you cannot upgrade to a different library, please install the deprecated '@react-native-community/image-picker-ios' package. See https://github.com/react-native-community/react-native-image-picker-ios"
    );
    return require('./353');
  },

  get InteractionManager() {
    return require('./227');
  },

  get Keyboard() {
    return require('./261');
  },

  get LayoutAnimation() {
    return require('./263');
  },

  get Linking() {
    return require('./355');
  },

  get NativeDialogManagerAndroid() {
    return require('./140').default;
  },

  get NativeEventEmitter() {
    return require('./123');
  },

  get PanResponder() {
    return require('./357');
  },

  get PermissionsAndroid() {
    return require('./359');
  },

  get PixelRatio() {
    return require('./61');
  },

  get PushNotificationIOS() {
    module14(
      'pushNotificationIOS-moved',
      "PushNotificationIOS has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-community/push-notification-ios' instead of 'react-native'. See https://github.com/react-native-community/react-native-push-notification-ios"
    );
    return require('./361');
  },

  get Settings() {
    return require('./363');
  },

  get Share() {
    return require('./364');
  },

  get StatusBarIOS() {
    module14('StatusBarIOS-merged', 'StatusBarIOS has been merged with StatusBar and will be removed in a future release. Use StatusBar for mutating the status bar');
    return require('./366');
  },

  get StyleSheet() {
    return require('./60');
  },

  get Systrace() {
    return require('./35');
  },

  get TimePickerAndroid() {
    module14(
      'TimePickerAndroid-merged',
      "TimePickerAndroid has been merged with DatePickerIOS and DatePickerAndroid and will be removed in a future release. It can now be installed and imported from '@react-native-community/datetimepicker' instead of 'react-native'. See https://github.com/react-native-community/react-native-datetimepicker"
    );
    return require('./367');
  },

  get ToastAndroid() {
    return require('./369');
  },

  get TurboModuleRegistry() {
    return require('./19');
  },

  get TVEventHandler() {
    return require('./206');
  },

  get UIManager() {
    return require('./46');
  },

  get unstable_batchedUpdates() {
    return require('./85').unstable_batchedUpdates;
  },

  get useWindowDimensions() {
    return require('./371').default;
  },

  get UTFSequence() {
    return require('./372');
  },

  get Vibration() {
    return require('./373');
  },

  get YellowBox() {
    return require('./375');
  },

  get DeviceEventEmitter() {
    return require('./39');
  },

  get NativeAppEventEmitter() {
    return require('./149');
  },

  get NativeModules() {
    return require('./20');
  },

  get Platform() {
    return require('./51');
  },

  get processColor() {
    return require('./77');
  },

  get requireNativeComponent() {
    return require('./180');
  },

  get unstable_RootTagContext() {
    return require('./302');
  },

  get ColorPropType() {
    return require('./66');
  },

  get EdgeInsetsPropType() {
    return require('./198');
  },

  get PointPropType() {
    return require('./376');
  },

  get ViewPropTypes() {
    return require('./272');
  },
};
