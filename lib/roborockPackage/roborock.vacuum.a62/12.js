require('./13');

var module14 = require('./14');

module.exports = {
  get AccessibilityInfo() {
    return require('./17');
  },

  get ActivityIndicator() {
    return require('./55');
  },

  get ART() {
    module14(
      'art-moved',
      "React Native ART has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-community/art' instead of 'react-native'. See https://github.com/react-native-community/art"
    );
    return require('./187');
  },

  get Button() {
    return require('./197');
  },

  get CheckBox() {
    module14(
      'checkBox-moved',
      "CheckBox has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-community/checkbox' instead of 'react-native'. See https://github.com/react-native-community/react-native-checkbox"
    );
    return require('./287');
  },

  get DatePickerIOS() {
    module14(
      'DatePickerIOS-merged',
      "DatePickerIOS has been merged with DatePickerAndroid and will be removed in a future release. It can now be installed and imported from '@react-native-community/datetimepicker' instead of 'react-native'. See https://github.com/react-native-community/react-native-datetimepicker"
    );
    return require('./290');
  },

  get DrawerLayoutAndroid() {
    return require('./291');
  },

  get FlatList() {
    return require('./254');
  },

  get Image() {
    return require('./275');
  },

  get ImageBackground() {
    return require('./296');
  },

  get InputAccessoryView() {
    return require('./297');
  },

  get KeyboardAvoidingView() {
    return require('./299');
  },

  get MaskedViewIOS() {
    module14(
      'maskedviewios-moved',
      "MaskedViewIOS has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-community/masked-view' instead of 'react-native'. See https://github.com/react-native-community/react-native-masked-view"
    );
    return require('./301');
  },

  get Modal() {
    return require('./302');
  },

  get Picker() {
    return require('./309');
  },

  get PickerIOS() {
    return require('./301');
  },

  get ProgressBarAndroid() {
    return require('./184');
  },

  get ProgressViewIOS() {
    return require('./314');
  },

  get SafeAreaView() {
    return require('./315');
  },

  get ScrollView() {
    return require('./261');
  },

  get SectionList() {
    return require('./282');
  },

  get SegmentedControlIOS() {
    return require('./316');
  },

  get Slider() {
    module14(
      'slider-moved',
      "Slider has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-community/slider' instead of 'react-native'. See https://github.com/react-native-community/react-native-slider"
    );
    return require('./317');
  },

  get Switch() {
    return require('./319');
  },

  get RefreshControl() {
    return require('./258');
  },

  get StatusBar() {
    return require('./294');
  },

  get Text() {
    return require('./198');
  },

  get TextInput() {
    return require('./322');
  },

  get Touchable() {
    return require('./204');
  },

  get TouchableHighlight() {
    return require('./329');
  },

  get TouchableNativeFeedback() {
    return require('./213');
  },

  get TouchableOpacity() {
    return require('./221');
  },

  get TouchableWithoutFeedback() {
    return require('./214');
  },

  get View() {
    return require('./84');
  },

  get VirtualizedList() {
    return require('./255');
  },

  get VirtualizedSectionList() {
    return require('./283');
  },

  get ActionSheetIOS() {
    return require('./330');
  },

  get Alert() {
    return require('./141');
  },

  get Animated() {
    return require('./222');
  },

  get AppRegistry() {
    return require('./332');
  },

  get AppState() {
    return require('./347');
  },

  get AsyncStorage() {
    module14(
      'async-storage-moved',
      "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-community/async-storage' instead of 'react-native'. See https://github.com/react-native-community/react-native-async-storage"
    );
    return require('./350');
  },

  get BackHandler() {
    return require('./343');
  },

  get Clipboard() {
    return require('./352');
  },

  get DatePickerAndroid() {
    module14(
      'DatePickerAndroid-merged',
      "DatePickerAndroid has been merged with DatePickerIOS and will be removed in a future release. It can now be installed and imported from '@react-native-community/datetimepicker' instead of 'react-native'. See https://github.com/react-native-community/react-native-datetimepicker"
    );
    return require('./354');
  },

  get DeviceInfo() {
    return require('./356');
  },

  get Dimensions() {
    return require('./63');
  },

  get Easing() {
    return require('./250');
  },

  get findNodeHandle() {
    return require('./86').findNodeHandle;
  },

  get I18nManager() {
    return require('./307');
  },

  get ImagePickerIOS() {
    module14(
      'imagePickerIOS-moved',
      "ImagePickerIOS has been extracted from react-native core and will be removed in a future release. Please upgrade to use either '@react-native-community/react-native-image-picker' or 'expo-image-picker'. If you cannot upgrade to a different library, please install the deprecated '@react-native-community/image-picker-ios' package. See https://github.com/react-native-community/react-native-image-picker-ios"
    );
    return require('./357');
  },

  get InteractionManager() {
    return require('./231');
  },

  get Keyboard() {
    return require('./265');
  },

  get LayoutAnimation() {
    return require('./267');
  },

  get Linking() {
    return require('./359');
  },

  get NativeDialogManagerAndroid() {
    return require('./142').default;
  },

  get NativeEventEmitter() {
    return require('./125');
  },

  get PanResponder() {
    return require('./361');
  },

  get PermissionsAndroid() {
    return require('./363');
  },

  get PixelRatio() {
    return require('./62');
  },

  get PushNotificationIOS() {
    module14(
      'pushNotificationIOS-moved',
      "PushNotificationIOS has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-community/push-notification-ios' instead of 'react-native'. See https://github.com/react-native-community/react-native-push-notification-ios"
    );
    return require('./365');
  },

  get Settings() {
    return require('./367');
  },

  get Share() {
    return require('./368');
  },

  get StatusBarIOS() {
    module14('StatusBarIOS-merged', 'StatusBarIOS has been merged with StatusBar and will be removed in a future release. Use StatusBar for mutating the status bar');
    return require('./370');
  },

  get StyleSheet() {
    return require('./61');
  },

  get Systrace() {
    return require('./36');
  },

  get TimePickerAndroid() {
    module14(
      'TimePickerAndroid-merged',
      "TimePickerAndroid has been merged with DatePickerIOS and DatePickerAndroid and will be removed in a future release. It can now be installed and imported from '@react-native-community/datetimepicker' instead of 'react-native'. See https://github.com/react-native-community/react-native-datetimepicker"
    );
    return require('./371');
  },

  get ToastAndroid() {
    return require('./373');
  },

  get TurboModuleRegistry() {
    return require('./20');
  },

  get TVEventHandler() {
    return require('./208');
  },

  get UIManager() {
    return require('./47');
  },

  get unstable_batchedUpdates() {
    return require('./86').unstable_batchedUpdates;
  },

  get useWindowDimensions() {
    return require('./375').default;
  },

  get UTFSequence() {
    return require('./376');
  },

  get Vibration() {
    return require('./377');
  },

  get YellowBox() {
    return require('./379');
  },

  get DeviceEventEmitter() {
    return require('./40');
  },

  get NativeAppEventEmitter() {
    return require('./151');
  },

  get NativeModules() {
    return require('./21');
  },

  get Platform() {
    return require('./52');
  },

  get processColor() {
    return require('./78');
  },

  get requireNativeComponent() {
    return require('./182');
  },

  get unstable_RootTagContext() {
    return require('./306');
  },

  get ColorPropType() {
    return require('./67');
  },

  get EdgeInsetsPropType() {
    return require('./200');
  },

  get PointPropType() {
    return require('./380');
  },

  get ViewPropTypes() {
    return require('./276');
  },
};
