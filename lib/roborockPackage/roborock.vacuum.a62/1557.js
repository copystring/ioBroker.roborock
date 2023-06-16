exports.SliderAdjuster = k;

var module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module6 = require('./6'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module23 = require('@babel/runtime/helpers/slicedToArray'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module1121 = require('./1121'),
  module415 = require('./415'),
  module381 = require('./381');

function M() {
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

var module505 = require('./505').strings;

function T(t) {
  var o = t.width,
    n = t.options,
    s = t.enabled,
    l = t.selectedIndex,
    u = t.switcherDidChange,
    c = React.useState(l),
    h = module23.default(c, 2),
    p = h[0],
    _ = h[1];
  React.useEffect(function () {
    _(l);
  });

  var S = function (t) {
    _(t);

    if (u) u(t);
  };

  return React.default.createElement(
    module12.View,
    {
      style: [
        D.gearSwitcher,
        {
          width: o,
          opacity: s ? 1 : 0.5,
        },
      ],
    },
    n.map(function (t, l) {
      var u = p == l;
      return React.default.createElement(module385.PureButton, {
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
  var o = React.useContext(module1121.AppConfigContext).theme,
    n = t.title,
    s = t.options,
    l = t.selectedIndex,
    u = t.enabled,
    c = t.switcherDidChange,
    h = t.value,
    p = t.desc;
  return React.default.createElement(
    module12.View,
    {
      style: [
        D.gearSwitcherCard,
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
            D.gearSwitcherTitle,
            {
              color: o.settingListItem.titleColor,
            },
          ],
        },
        n
      ),
      h &&
        React.default.createElement(
          module12.Text,
          {
            style: D.gearSwitcherValue,
          },
          h
        )
    ),
    React.default.createElement(T, {
      width: module12.Dimensions.get('window').width - 40,
      selectedIndex: l,
      switcherDidChange: c,
      options: s,
      enabled: u,
    }),
    p &&
      React.default.createElement(
        module12.Text,
        {
          style: [
            D.descText,
            {
              color: o.settingListItem.detailColor,
            },
          ],
        },
        p
      )
  );
}

function k(t) {
  var o = React.useContext(module1121.AppConfigContext).theme,
    n = t.title,
    s = t.desc,
    l = t.shouldShowValue,
    u = t.shouldShowSideValue,
    c = t.showValue,
    h = t.circleValue,
    p = t.value,
    _ = t.minValue,
    f = t.maxValue,
    C = t.step,
    b = t.sliderWidth,
    M = t.enabled,
    x = t.onSlidingComplete,
    T = t.onSlidingMove,
    V = t.style,
    k = t.touchBallKey;
  return React.default.createElement(
    module12.View,
    {
      style: [
        D.sliderAdjuster,
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
          style: D.sliderAdjusterTop,
        },
        React.default.createElement(
          module12.Text,
          {
            style: [
              D.sliderAdjusterTopTitle,
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
            style: D.sliderAdjusterTopValue,
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
              D.descText,
              {
                color: o.settingListItem.detailColor,
              },
            ],
          },
          s
        )
    ),
    React.default.createElement(module385.FatSlider, {
      minimumValue: _,
      maximumValue: f,
      step: C,
      shouldShowValue: l,
      shouldShowSideValue: u,
      enabled: M,
      sliderWidth: b || module12.Dimensions.get('window').width - 40,
      value: p,
      circleValue: h,
      onSlidingComplete: function (t) {
        return x && x(t);
      },
      onSlidingMove: function (t) {
        return T && T(t);
      },
      touchBallKey: k,
    }),
    React.default.createElement(module12.View, {
      style: D.sliderAdjusterSeperator,
    })
  );
}

var I = (function (t) {
  module7.default(T, t);

  var o = T,
    module23 = M(),
    S = function () {
      var t,
        n = module11.default(o);

      if (module23) {
        var s = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, s);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function T(t) {
    var o, n, s, u, h;
    module4.default(this, T);
    (h = S.call(this, t)).state = {
      washInterval: 600,
      rollerSpeed: 600,
      washTime: 30,
      spinDryTime: 60,
      shouldShowInputDialog: false,
      washCount: 1,
      moveSpeed: 30,
      modeName: module505.localization_strings_Setting_General_index_0,
      hasFetchedData: false,
    };
    var p =
        (null == (o = module6.default(h))
          ? undefined
          : null == (n = o.props)
          ? undefined
          : null == (s = n.navigation)
          ? undefined
          : null == (u = s.state)
          ? undefined
          : u.params) || {},
      _ = p.id,
      f = p.sys_type;
    h.id = undefined == _ ? -1 : _;
    h.sys_type = f;
    return h;
  }

  module5.default(T, [
    {
      key: 'componentDidMount',
      value: function () {
        var t = this;
        if (!this.sys_type) this.configNavbar();

        var o, n, l, u, c, h, p, _, f, w, v;

        if (-1 !== this.id) {
          o = this.id;
          regeneratorRuntime.default.async(
            function (y) {
              for (;;)
                switch ((y.prev = y.next)) {
                  case 0:
                    y.prev = 0;
                    y.next = 3;
                    return regeneratorRuntime.default.awrap(module415.default.getCustomMopModeDetail(o));

                  case 3:
                    n = y.sent;
                    l = n.result;
                    u = l.dry_time;
                    c = l.name;
                    h = l.roller_speed;
                    p = l.wash_count;
                    _ = l.wash_interval_time;
                    f = l.wash_time;
                    w = l.move_speed;
                    v = undefined === w ? 30 : w;
                    t.setState({
                      spinDryTime: u,
                      modeName: c,
                      rollerSpeed: h,
                      washCount: p,
                      washTime: f,
                      washInterval: _,
                      moveSpeed: v,
                      hasFetchedData: true,
                    });
                    console.log('fetchDetail', o, n);
                    y.next = 12;
                    break;

                  case 9:
                    y.prev = 9;
                    y.t0 = y.catch(0);
                    console.log('fetchDetail error', o, y.t0);

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
          module1558 = React.default.createElement(module385.PureImageButton, {
            funcId: 'mop_mode_delete_button',
            image: require('./1558'),
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
          n = React.default.createElement(module385.PureImageButton, {
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
          rightItems: [module1558, n],
        });
      },
    },
    {
      key: 'delete',
      value: function () {
        var t, o;
        return regeneratorRuntime.default.async(
          function (n) {
            for (;;)
              switch ((n.prev = n.next)) {
                case 0:
                  if ((!module381.RSM.isPureMoppingMode() && !module381.RSM.isCleanMopMoppingMode()) || this.id != module381.RSM.mopModeId) {
                    n.next = 3;
                    break;
                  }

                  globals.showToast(module505.save_mop_mode_now_used_tip);
                  return n.abrupt('return');

                case 3:
                  n.prev = 3;
                  t = this.props.navigation.state.params.didSaveOrDelete;
                  n.next = 7;
                  return regeneratorRuntime.default.awrap(module415.default.delCustomMopMode(this.id));

                case 7:
                  o = n.sent;
                  console.log('delCustomMopMode', this.id, o);
                  if (t) t();
                  this.props.navigation.pop();
                  n.next = 16;
                  break;

                case 13:
                  n.prev = 13;
                  n.t0 = n.catch(3);
                  console.log('delCustomMopMode', id, n.t0);

                case 16:
                case 'end':
                  return n.stop();
              }
          },
          null,
          this,
          [[3, 13]],
          Promise
        );
      },
    },
    {
      key: 'save',
      value: function () {
        var t, o, n, l, u, c, h, p, _, f, w, v, y, S;

        return regeneratorRuntime.default.async(
          function (M) {
            for (;;)
              switch ((M.prev = M.next)) {
                case 0:
                  if ((!module381.RSM.isPureMoppingMode() && !module381.RSM.isCleanMopMoppingMode()) || this.id != module381.RSM.mopModeId) {
                    M.next = 3;
                    break;
                  }

                  globals.showToast(module505.save_mop_mode_now_used_tip);
                  return M.abrupt('return');

                case 3:
                  if (
                    ((t = this.state),
                    (o = t.spinDryTime),
                    (n = t.washInterval),
                    (l = t.rollerSpeed),
                    (u = t.washCount),
                    (c = t.washTime),
                    (h = t.modeName),
                    (p = t.moveSpeed),
                    console.log('save', this.state),
                    (_ = this.props.navigation.state.params),
                    (f = _.show),
                    (w = undefined === f || f),
                    (v = _.didSaveOrDelete),
                    (y = {
                      id: this.id,
                      sys_type: false,
                      name: h,
                      wash_interval_time: n,
                      dry_time: o,
                      name: this.state.modeName,
                      roller_speed: l,
                      wash_time: c,
                      wash_count: u,
                      show: w,
                      fine_mop: false,
                      move_speed: p,
                    }),
                    (M.prev = 7),
                    -1 !== this.id)
                  ) {
                    M.next = 14;
                    break;
                  }

                  M.next = 11;
                  return regeneratorRuntime.default.awrap(module415.default.addCustomMopMode(y));

                case 11:
                  M.t0 = M.sent;
                  M.next = 17;
                  break;

                case 14:
                  M.next = 16;
                  return regeneratorRuntime.default.awrap(module415.default.updateCustomMopMode(y));

                case 16:
                  M.t0 = M.sent;

                case 17:
                  S = M.t0;
                  console.log('save CustomMopMode', S);
                  if (v) v();
                  this.props.navigation.pop();
                  M.next = 26;
                  break;

                case 23:
                  M.prev = 23;
                  M.t1 = M.catch(7);
                  console.log('save CustomMopMode error', M.t1, JSON.stringify(y));

                case 26:
                case 'end':
                  return M.stop();
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
              name: module505.mop_mode_custom_wet_mode_wetest_name,
              desc: module505.mop_mode_custom_wet_mode_wetest_desc,
            },
            {
              name: module505.mop_mode_custom_wet_mode_wet_name,
              desc: module505.mop_mode_custom_wet_mode_wet_desc,
            },
            {
              name: module505.dust_collection_title_3,
              desc: module505.mop_mode_custom_wet_mode_normal_desc,
            },
            {
              name: module505.mop_mode_custom_wet_mode_dry_name,
              desc: module505.mop_mode_custom_wet_mode_dry_desc,
            },
            {
              name: module505.mop_mode_custom_wet_mode_dryest_name,
              desc: module505.mop_mode_custom_wet_mode_dryest_desc,
            },
          ],
          o = this.state.spinDryTime;
        return t[o >= 15 && o <= 20 ? 0 : o >= 21 && o <= 30 ? 1 : o >= 31 && o <= 45 ? 2 : o >= 45 && o <= 80 ? 3 : 4];
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
                    D.section,
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
                    style: D.sectionTitle,
                  },
                  o.title
                )
              )
            : o.isGearSwitcher
            ? React.default.createElement(
                V,
                module22.default(
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
                module22.default(
                  {
                    key: 'adjuster_' + s,
                  },
                  o,
                  {
                    touchBallKey: 'touchBall_' + s,
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
                D.contentContainer,
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
              React.default.createElement(module385.SettingListItemView, {
                title: module505.mop_mode_setting_page_mode_name,
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
          React.default.createElement(module385.InputDialog, {
            visible: this.state.shouldShowInputDialog,
            maxLength: 10,
            title: module505.mop_mode_setting_page_mode_name,
            inputPlaceholder: module505.mop_mode_setting_page_input_mode_name,
            inputDefaultValue: this.state.modeName,
            warningText: module505.floor_map_name_too_long,
            onPressConfirmButton: function (o) {
              t.confirmInputModeName(o);
            },
            onPressCancelButton: this.cancelInput.bind(this),
          })
        );
      },
    },
    {
      key: 'datas',
      get: function () {
        var t = this;
        return [
          {
            title: module505.mop_mode_custom_page_mop_setting_title,
            section: true,
          },
          {
            title: module505.mop_mode_custom_page_wet_title,
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
            title: module505.mop_mode_setting_page_roller_clean,
            section: true,
          },
          {
            title: module505.back_wash_time_setting,
            minValue: 5,
            maxValue: 15,
            step: 1,
            showValue: this.state.washInterval / 60 + 'min',
            value: this.state.washInterval / 60,
            desc: module505.mop_mode_setting_wash_interval_desc,
            onSlidingComplete: function (t) {},
            onSlidingMove: function (o) {
              t.setState({
                washInterval: 60 * o,
              });
            },
          },
          {
            title: module505.mop_cleaning_time,
            minValue: 30,
            maxValue: 60,
            step: 10,
            value: this.state.washTime,
            showValue: this.state.washTime + 's',
            desc: module505.mop_mode_setting_page_wash_time_desc,
            onSlidingMove: function (o) {
              t.setState({
                washTime: o,
              });
            },
          },
        ];
      },
    },
  ]);
  return T;
})(React.default.Component);

exports.default = I;
I.contextType = module1121.AppConfigContext;
var D = module12.StyleSheet.create({
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
    right: 20,
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
