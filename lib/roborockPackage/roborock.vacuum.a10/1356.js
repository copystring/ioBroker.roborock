exports.SliderAdjuster = k;

var regeneratorRuntime = require('regenerator-runtime'),
  module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module6 = require('./6'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module22 = require('./22'),
  React = (function (t, o) {
    if (!o && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var n = b(o);
    if (n && n.has(t)) return n.get(t);
    var s = {},
      l = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var u in t)
      if ('default' !== u && Object.prototype.hasOwnProperty.call(t, u)) {
        var c = l ? Object.getOwnPropertyDescriptor(t, u) : null;
        if (c && (c.get || c.set)) Object.defineProperty(s, u, c);
        else s[u] = t[u];
      }

    s.default = t;
    if (n) n.set(t, s);
    return s;
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module506 = require('./506'),
  module407 = require('./407'),
  module377 = require('./377');

function b(t) {
  if ('function' != typeof WeakMap) return null;
  var o = new WeakMap(),
    n = new WeakMap();
  return (b = function (t) {
    return t ? n : o;
  })(t);
}

function x() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ('function' == typeof Proxy) return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

var module491 = require('./491').strings;

function T(t) {
  var o = t.width,
    n = t.options,
    s = t.enabled,
    l = t.selectedIndex,
    u = t.switcherDidChange,
    c = React.useState(l),
    p = module22.default(c, 2),
    h = p[0],
    y = p[1];
  React.useEffect(function () {
    y(l);
  });

  var S = function (t) {
    y(t);
    if (u) u(t);
  };

  return React.default.createElement(
    module12.View,
    {
      style: [
        I.gearSwitcher,
        {
          width: o,
          opacity: s ? 1 : 0.5,
        },
      ],
    },
    n.map(function (t, l) {
      var u = h == l;
      return React.default.createElement(module381.PureButton, {
        key: 'switcher_' + l,
        title: t,
        textColor: u ? 'white' : '#4A4A4A',
        style: {
          width: o / n.length + (u ? 20 : -20),
          backgroundColor: u ? '#2c86fb' : 'transparent',
          borderRadius: 20,
        },
        onPress: function () {
          return s && S(l);
        },
      });
    })
  );
}

function V(t) {
  var o = React.useContext(module506.AppConfigContext).theme,
    n = t.title,
    s = t.options,
    l = t.selectedIndex,
    u = t.enabled,
    c = t.switcherDidChange,
    p = t.value,
    h = t.desc;
  return React.default.createElement(
    module12.View,
    {
      style: [
        I.gearSwitcherCard,
        {
          backgroundColor: o.componentBackgroundColor,
        },
      ],
    },
    React.default.createElement(
      module12.View,
      {
        style: {
          flexDirection: 'row',
        },
      },
      React.default.createElement(
        module12.Text,
        {
          style: [
            I.gearSwitcherTitle,
            {
              color: o.settingListItem.titleColor,
            },
          ],
        },
        n
      ),
      p &&
        React.default.createElement(
          module12.Text,
          {
            style: I.gearSwitcherValue,
          },
          p
        )
    ),
    React.default.createElement(T, {
      width: module12.Dimensions.get('window').width - 40,
      selectedIndex: l,
      switcherDidChange: c,
      options: s,
      enabled: u,
    }),
    h &&
      React.default.createElement(
        module12.Text,
        {
          style: [
            I.descText,
            {
              color: o.settingListItem.detailColor,
            },
          ],
        },
        h
      )
  );
}

function k(t) {
  var o = React.useContext(module506.AppConfigContext).theme,
    n = t.title,
    s = t.desc,
    l = t.shouldShowValue,
    u = t.shouldShowSideValue,
    c = t.showValue,
    p = t.circleValue,
    h = t.value,
    f = t.minValue,
    S = t.maxValue,
    C = t.step,
    b = t.sliderWidth,
    x = t.enabled,
    M = t.onSlidingComplete,
    T = t.onSlidingMove,
    V = t.style;
  return React.default.createElement(
    module12.View,
    {
      style: [
        I.sliderAdjuster,
        {
          backgroundColor: o.componentBackgroundColor,
        },
        V,
      ],
    },
    n &&
      React.default.createElement(
        module12.View,
        {
          style: I.sliderAdjusterTop,
        },
        React.default.createElement(
          module12.Text,
          {
            style: [
              I.sliderAdjusterTopTitle,
              {
                color: o.settingListItem.titleColor,
              },
            ],
          },
          n
        ),
        React.default.createElement(
          module12.Text,
          {
            style: I.sliderAdjusterTopValue,
          },
          c
        )
      ),
    React.default.createElement(
      module12.View,
      null,
      s &&
        React.default.createElement(
          module12.Text,
          {
            style: [
              I.descText,
              {
                color: o.settingListItem.detailColor,
              },
            ],
          },
          s
        )
    ),
    React.default.createElement(module381.FatSlider, {
      minimumValue: f,
      maximumValue: S,
      step: C,
      shouldShowValue: l,
      shouldShowSideValue: u,
      enabled: x,
      sliderWidth: b || module12.Dimensions.get('window').width - 40,
      value: h,
      circleValue: p,
      onSlidingComplete: function (t) {
        return M && M(t);
      },
      onSlidingMove: function (t) {
        return T && T(t);
      },
    }),
    React.default.createElement(module12.View, {
      style: I.sliderAdjusterSeperator,
    })
  );
}

var D = (function (t) {
  module7.default(T, t);

  var module22 = T,
    module506 = x(),
    b = function () {
      var t,
        o = module11.default(module22);

      if (module506) {
        var n = module11.default(this).constructor;
        t = Reflect.construct(o, arguments, n);
      } else t = o.apply(this, arguments);

      return module9.default(this, t);
    };

  function T(t) {
    var o, n, l, c, p;
    module4.default(this, T);
    (p = b.call(this, t)).state = {
      washInterval: 600,
      rollerSpeed: 600,
      washTime: 30,
      spinDryTime: 60,
      shouldShowInputDialog: false,
      washCount: 1,
      moveSpeed: 30,
      modeName: module491.localization_strings_Setting_General_index_0,
      hasFetchedData: false,
    };
    var h =
        (null == (o = module6.default(p))
          ? undefined
          : null == (n = o.props)
          ? undefined
          : null == (l = n.navigation)
          ? undefined
          : null == (c = l.state)
          ? undefined
          : c.params) || {},
      f = h.id,
      _ = h.sys_type;
    p.id = undefined == f ? -1 : f;
    p.sys_type = _;
    return p;
  }

  module5.default(T, [
    {
      key: 'componentDidMount',
      value: function () {
        var t = this;
        if (!this.sys_type) this.configNavbar();

        var n, s, l, u, c, p, h, f, _, w, v;

        if (-1 !== this.id) {
          n = this.id;
          regeneratorRuntime.default.async(
            function (y) {
              for (;;)
                switch ((y.prev = y.next)) {
                  case 0:
                    y.prev = 0;
                    y.next = 3;
                    return regeneratorRuntime.default.awrap(module407.default.getCustomMopModeDetail(n));

                  case 3:
                    s = y.sent;
                    l = s.result;
                    u = l.dry_time;
                    c = l.name;
                    p = l.roller_speed;
                    h = l.wash_count;
                    f = l.wash_interval_time;
                    _ = l.wash_time;
                    w = l.move_speed;
                    v = undefined === w ? 30 : w;
                    t.setState({
                      spinDryTime: u,
                      modeName: c,
                      rollerSpeed: p,
                      washCount: h,
                      washTime: _,
                      washInterval: f,
                      moveSpeed: v,
                      hasFetchedData: true,
                    });
                    console.log('fetchDetail', n, s);
                    y.next = 12;
                    break;

                  case 9:
                    y.prev = 9;
                    y.t0 = y.catch(0);
                    console.log('fetchDetail error', n, y.t0);

                  case 12:
                  case 'end':
                    return y.stop();
                }
            },
            null,
            null,
            [[0, 9]],
            Promise
          );
        }
      },
    },
    {
      key: 'configNavbar',
      value: function () {
        var t = this,
          module1357 = React.default.createElement(module381.PureImageButton, {
            funcId: 'mop_mode_delete_button',
            image: require('./1357'),
            onPress: this.delete.bind(this),
            imageWidth: 40,
            imageHeight: 40,
            enabled: true,
            imageStyle: {
              resizeMode: 'contain',
              width: 30,
              height: 30,
              marginRight: 20,
            },
            ref: function (o) {
              return (t.addTimeButton = o);
            },
          }),
          n = React.default.createElement(module381.PureImageButton, {
            funcId: 'mop_mode_save_button',
            image: this.context.theme.navConfirmIcon,
            onPress: this.save.bind(this),
            imageWidth: 40,
            imageHeight: 40,
            enabled: true,
            imageStyle: {
              resizeMode: 'contain',
              width: 30,
              height: 30,
              marginRight: 20,
            },
            ref: function (o) {
              return (t.addTimeButton = o);
            },
          });
        this.props.navigation.setParams({
          rightItems: [module1357, n],
        });
      },
    },
    {
      key: 'delete',
      value: function () {
        var t, n;
        return regeneratorRuntime.default.async(
          function (s) {
            for (;;)
              switch ((s.prev = s.next)) {
                case 0:
                  s.prev = 0;
                  t = this.props.navigation.state.params.didSaveOrDelete;
                  s.next = 4;
                  return regeneratorRuntime.default.awrap(module407.default.delCustomMopMode(this.id));

                case 4:
                  n = s.sent;
                  console.log('delCustomMopMode', this.id, n);
                  if (t) t();
                  this.props.navigation.pop();
                  s.next = 13;
                  break;

                case 10:
                  s.prev = 10;
                  s.t0 = s.catch(0);
                  console.log('delCustomMopMode', id, s.t0);

                case 13:
                case 'end':
                  return s.stop();
              }
          },
          null,
          this,
          [[0, 10]],
          Promise
        );
      },
    },
    {
      key: 'save',
      value: function () {
        var t, n, s, l, u, c, p, h, f, _, w, v, y, b;

        return regeneratorRuntime.default.async(
          function (x) {
            for (;;)
              switch ((x.prev = x.next)) {
                case 0:
                  if ((!module377.RSM.isPureMoppingMode() && !module377.RSM.isCleanMopMoppingMode()) || this.id != module377.RSM.mopModeId) {
                    x.next = 3;
                    break;
                  }

                  globals.showToast(module491.save_mop_mode_now_used_tip);
                  return x.abrupt('return');

                case 3:
                  if (
                    ((t = this.state),
                    (n = t.spinDryTime),
                    (s = t.washInterval),
                    (l = t.rollerSpeed),
                    (u = t.washCount),
                    (c = t.washTime),
                    (p = t.modeName),
                    (h = t.moveSpeed),
                    console.log('save', this.state),
                    (f = this.props.navigation.state.params),
                    (_ = f.show),
                    (w = undefined === _ || _),
                    (v = f.didSaveOrDelete),
                    (y = {
                      id: this.id,
                      sys_type: false,
                      name: p,
                      wash_interval_time: s,
                      dry_time: n,
                      name: this.state.modeName,
                      roller_speed: l,
                      wash_time: c,
                      wash_count: u,
                      show: w,
                      fine_mop: false,
                      move_speed: h,
                    }),
                    (x.prev = 7),
                    -1 !== this.id)
                  ) {
                    x.next = 14;
                    break;
                  }

                  x.next = 11;
                  return regeneratorRuntime.default.awrap(module407.default.addCustomMopMode(y));

                case 11:
                  x.t0 = x.sent;
                  x.next = 17;
                  break;

                case 14:
                  x.next = 16;
                  return regeneratorRuntime.default.awrap(module407.default.updateCustomMopMode(y));

                case 16:
                  x.t0 = x.sent;

                case 17:
                  b = x.t0;
                  console.log('save CustomMopMode', b);
                  if (v) v();
                  this.props.navigation.pop();
                  x.next = 26;
                  break;

                case 23:
                  x.prev = 23;
                  x.t1 = x.catch(7);
                  console.log('save CustomMopMode error', x.t1, JSON.stringify(y));

                case 26:
                case 'end':
                  return x.stop();
              }
          },
          null,
          this,
          [[7, 23]],
          Promise
        );
      },
    },
    {
      key: 'getMopWetMode',
      value: function () {
        var t = [
            {
              name: module491.mop_mode_custom_wet_mode_wetest_name,
              desc: module491.mop_mode_custom_wet_mode_wetest_desc,
            },
            {
              name: module491.mop_mode_custom_wet_mode_wet_name,
              desc: module491.mop_mode_custom_wet_mode_wet_desc,
            },
            {
              name: module491.dust_collection_title_3,
              desc: module491.mop_mode_custom_wet_mode_normal_desc,
            },
            {
              name: module491.mop_mode_custom_wet_mode_dry_name,
              desc: module491.mop_mode_custom_wet_mode_dry_desc,
            },
            {
              name: module491.mop_mode_custom_wet_mode_dryest_name,
              desc: module491.mop_mode_custom_wet_mode_dryest_desc,
            },
          ],
          o = this.state.spinDryTime;
        return t[o >= 15 && o <= 20 ? 0 : o >= 21 && o <= 30 ? 1 : o >= 31 && o <= 45 ? 2 : o >= 45 && o <= 80 ? 3 : 4];
      },
    },
    {
      key: 'datas',
      get: function () {
        var t = this;
        return [
          {
            title: module491.mop_mode_custom_page_mop_setting_title,
            section: true,
          },
          {
            title: module491.mop_mode_custom_page_wet_title,
            minValue: 15,
            maxValue: 150,
            step: 5,
            shouldShowValue: true,
            value: this.state.spinDryTime,
            showValue: this.getMopWetMode().name,
            desc: this.getMopWetMode().desc,
            onSlidingMove: function (o) {
              t.setState({
                spinDryTime: o,
              });
            },
          },
          {
            title: module491.mop_mode_setting_page_roller_clean,
            section: true,
          },
          {
            title: module491.back_wash_time_setting,
            minValue: 5,
            maxValue: 15,
            step: 1,
            showValue: this.state.washInterval / 60 + 'min',
            value: this.state.washInterval / 60,
            desc: module491.mop_mode_setting_wash_interval_desc,
            onSlidingComplete: function (t) {},
            onSlidingMove: function (o) {
              t.setState({
                washInterval: 60 * o,
              });
            },
          },
          {
            title: module491.mop_cleaning_time,
            minValue: 30,
            maxValue: 60,
            step: 10,
            value: this.state.washTime,
            showValue: this.state.washTime + 's',
            desc: module491.mop_mode_setting_page_wash_time_desc,
            onSlidingMove: function (o) {
              t.setState({
                washTime: o,
              });
            },
          },
        ];
      },
    },
    {
      key: 'confirmInputModeName',
      value: function (t) {
        console.log('confirmInputModeName', t);
        this.setState({
          shouldShowInputDialog: false,
          modeName: t,
        });
      },
    },
    {
      key: 'cancelInput',
      value: function () {
        this.setState({
          shouldShowInputDialog: false,
        });
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this,
          o = this.context.theme;
        if (!(-1 == this.id || this.state.hasFetchedData)) return null;
        var s = this.datas.map(function (o, s) {
          return o.section
            ? React.default.createElement(
                module12.View,
                {
                  style: [
                    I.section,
                    {
                      backgroundColor: 'transparent',
                      marginTop: 10,
                    },
                  ],
                  key: 'section_' + s,
                },
                React.default.createElement(
                  module12.Text,
                  {
                    style: I.sectionTitle,
                  },
                  o.title
                )
              )
            : o.isGearSwitcher
            ? React.default.createElement(
                V,
                module21.default(
                  {
                    key: 'gear_switcher_' + s,
                  },
                  o,
                  {
                    enabled: !t.sys_type,
                  }
                )
              )
            : React.default.createElement(
                k,
                module21.default(
                  {
                    key: 'adjuster_' + s,
                  },
                  o,
                  {
                    enabled: !t.sys_type,
                  }
                )
              );
        });
        return React.default.createElement(
          module12.View,
          null,
          React.default.createElement(
            module12.ScrollView,
            {
              contentContainerStyle: [
                I.contentContainer,
                {
                  backgroundColor: o.pageBackgroundColor,
                },
              ],
              style: {
                height: '100%',
                backgroundColor: o.pageBackgroundColor,
              },
            },
            !this.sys_type &&
              React.default.createElement(module381.SettingListItemView, {
                title: module491.mop_mode_setting_page_mode_name,
                detail: this.state.modeName,
                shouldShowBottomLine: false,
                enabled: !this.sys_type,
                style: {
                  marginTop: 15,
                },
                underlayColor: 'transparent',
                funcId: 'input_mop_mode_name',
                onPress: function () {
                  return t.setState({
                    shouldShowInputDialog: true,
                  });
                },
              }),
            s
          ),
          React.default.createElement(module381.InputDialog, {
            visible: this.state.shouldShowInputDialog,
            maxLength: 10,
            title: module491.mop_mode_setting_page_mode_name,
            inputPlaceholder: module491.mop_mode_setting_page_input_mode_name,
            inputDefaultValue: this.state.modeName,
            warningText: module491.floor_map_name_too_long,
            onPressConfirmButton: function (o) {
              t.confirmInputModeName(o);
            },
            onPressCancelButton: this.cancelInput.bind(this),
          })
        );
      },
    },
  ]);
  return T;
})(React.default.Component);

exports.default = D;
D.contextType = module506.AppConfigContext;
var I = module12.StyleSheet.create({
  contentContainer: {},
  sliderAdjuster: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  sliderAdjusterTop: {
    flexDirection: 'row',
    marginBottom: 11,
  },
  sliderAdjusterTopTitle: {
    fontSize: 16,
    color: '#4A4A4A',
  },
  sliderAdjusterTopValue: {
    marginLeft: 8,
    fontSize: 16,
    color: '#007AFF',
  },
  descText: {
    fontSize: 14,
    lineHeight: 18,
    color: '#9b9b9b',
    marginBottom: 16,
  },
  sliderAdjusterSeperator: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    width: module12.Dimensions.get('window').width - 40,
    height: 0.5,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  section: {
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    color: '#9b9b9b',
  },
  gearSwitcher: {
    flexDirection: 'row',
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f2f2f7',
    overflow: 'hidden',
  },
  gearSwitcherCard: {
    paddingHorizontal: 20,
    backgroundColor: 'white',
    paddingVertical: 20,
  },
  gearSwitcherTitle: {
    fontSize: 16,
    color: '#4A4A4A',
    marginBottom: 20,
  },
  gearSwitcherValue: {
    fontSize: 16,
    color: '#007AFF',
  },
});
