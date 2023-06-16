require('./1356');

var regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module21 = require('./21'),
  module49 = require('./49'),
  React = (function (t, o) {
    if (!o && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var n = M(o);
    if (n && n.has(t)) return n.get(t);
    var s = {},
      c = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var l in t)
      if ('default' !== l && Object.prototype.hasOwnProperty.call(t, l)) {
        var u = c ? Object.getOwnPropertyDescriptor(t, l) : null;
        if (u && (u.get || u.set)) Object.defineProperty(s, l, u);
        else s[l] = t[l];
      }

    s.default = t;
    if (n) n.set(t, s);
    return s;
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module407 = require('./407'),
  module506 = require('./506'),
  module1352 = require('./1352'),
  module1228 = require('./1228'),
  module377 = require('./377'),
  module387 = require('./387');

function M(t) {
  if ('function' != typeof WeakMap) return null;
  var o = new WeakMap(),
    n = new WeakMap();
  return (M = function (t) {
    return t ? n : o;
  })(t);
}

function E() {
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

function O(t, o) {
  var n = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    if (o)
      s = s.filter(function (o) {
        return Object.getOwnPropertyDescriptor(t, o).enumerable;
      });
    n.push.apply(n, s);
  }

  return n;
}

function k(t) {
  for (var o = 1; o < arguments.length; o++) {
    var n = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      O(Object(n), true).forEach(function (o) {
        module49.default(t, o, n[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
    else
      O(Object(n)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(n, o));
      });
  }

  return t;
}

var module491 = require('./491').strings,
  S = function (t, o) {
    t.forEach(function (t, n, s) {
      if (t == o) s.splice(n, 1);
    });
  },
  x = function (t) {
    var o = t.name,
      n = t.desc,
      s = t.icon,
      c = t.onPress,
      l = t.onPressLeftIcon,
      u = t.style,
      h = t.rightIcon,
      y = t.iconWidth,
      b = undefined === y ? 40 : y,
      _ = t.backgroundColor,
      R = t.titleColor,
      P = t.descColor,
      M = t.funcId;
    return React.default.createElement(
      module12.TouchableOpacity,
      {
        activeOpacity: 0.8,
        onPress: c,
      },
      React.default.createElement(
        module12.View,
        module21.default(
          {
            style: k(
              k({}, L.modeRow),
              {},
              {
                backgroundColor: _,
              },
              u
            ),
          },
          module387.default.getAccessibilityLabel(M)
        ),
        React.default.createElement(module381.PureImageButton, {
          style: k({}, L.modeRowIcon),
          image: s,
          imageWidth: b,
          imageHeight: b,
          onPress: l,
        }),
        React.default.createElement(
          module12.View,
          {
            style: L.modeRowRight,
          },
          React.default.createElement(
            module12.Text,
            {
              style: k(
                k({}, L.modeRowTitle),
                {},
                {
                  color: R,
                }
              ),
            },
            o
          ),
          n &&
            React.default.createElement(
              module12.Text,
              {
                style: k(
                  k({}, L.modeRowDesc),
                  {},
                  {
                    color: P,
                  }
                ),
              },
              n
            )
        ),
        h &&
          React.default.createElement(module12.Image, {
            source: h,
            style: {
              position: 'absolute',
              right: 20,
              width: 24,
              height: 24,
            },
          })
      )
    );
  },
  D = (function (t) {
    module7.default(M, t);

    var module49 = M,
      module506 = E(),
      C = function () {
        var t,
          o = module11.default(module49);

        if (module506) {
          var n = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, n);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function M(t) {
      var o;
      module4.default(this, M);
      (o = C.call(this, t)).state = {
        firstRows: [],
        secondRows: [],
        scrollEnabled: true,
        dragEnabled: false,
      };
      return o;
    }

    module5.default(M, [
      {
        key: 'componentWillUnmount',
        value: function () {
          module1352.ModeDataInstance.getCustomMopList();
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          this.configNavbar(true);
          this.fetchList();
        },
      },
      {
        key: 'configNavbar',
        value: function (t) {
          var o = this.context.theme.mopModeList,
            n = o.sortIcon,
            s = o.saveIcon,
            c = React.default.createElement(module381.PureImageButton, {
              style: {},
              funcId: t ? 'nav_sort_button' : 'nav_save_button',
              image: t ? n : s,
              onPress: this.handleNavButtonPress.bind(this, t),
              imageWidth: 35,
              imageHeight: 35,
              enabled: true,
              imageStyle: {
                resizeMode: 'contain',
                width: 30,
                height: 30,
                marginRight: 20,
              },
            });
          this.props.navigation.setParams({
            rightItems: [c],
          });
        },
      },
      {
        key: 'handleNavButtonPress',
        value: function (t) {
          var o = this;

          if (t) {
            this.setState({
              dragEnabled: true,
            });
            this.configNavbar(false);
          } else
            this.saveList(
              function () {
                o.configNavbar(true);
                o.setState({
                  dragEnabled: false,
                });
              },
              function () {}
            );
        },
      },
      {
        key: 'saveList',
        value: function (t, n) {
          var module5, module7, module9, module11, module21, h;
          return regeneratorRuntime.default.async(
            function (p) {
              for (;;)
                switch ((p.prev = p.next)) {
                  case 0:
                    module5 = this.state;
                    module7 = module5.firstRows;
                    module9 = module5.secondRows;
                    console.log('saveList', module7, module9);
                    module11 = module7.concat(module9).map(function (t) {
                      return t.id;
                    });
                    module21 = {
                      ids: module11,
                      show_index: module7.length,
                    };
                    p.prev = 4;
                    p.next = 7;
                    return regeneratorRuntime.default.awrap(module407.default.sortCustomMopModes(module21));

                  case 7:
                    h = p.sent;
                    console.log('sort', module21, h);
                    if (t) t();
                    p.next = 16;
                    break;

                  case 12:
                    p.prev = 12;
                    p.t0 = p.catch(4);
                    console.log('sort error', module21, p.t0);
                    if (n) n();

                  case 16:
                  case 'end':
                    return p.stop();
                }
            },
            null,
            this,
            [[4, 12]],
            Promise
          );
        },
      },
      {
        key: 'fetchList',
        value: function () {
          var t, n, s, c;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    t = this.context.theme.ModeSettingPanel;
                    l.prev = 1;
                    l.next = 4;
                    return regeneratorRuntime.default.awrap(module1352.ModeDataInstance.getCustomMopList());

                  case 4:
                    n = [];
                    s = [];
                    c = module1228.getSystemCustomMopModes();
                    module1352.ModeDataInstance.customMopModeListData.forEach(function (o, l) {
                      var u = c.find(function (t) {
                        return o.id === t.id;
                      });

                      if (u) {
                        o.name = u.name;
                        o.desc = u.desc;
                        o.icon = u.listIcon;
                      }

                      if (!o.sys_type) o.icon = t.mopModeListIconCustom;
                      o.key = (o.show ? 'first_row' : 'second_row') + l;
                      if (4 != o.id) o.show ? n.push(o) : s.push(o);
                    });
                    this.setState({
                      firstRows: n,
                      secondRows: s,
                    });
                    l.next = 14;
                    break;

                  case 11:
                    l.prev = 11;
                    l.t0 = l.catch(1);
                    console.log('fetch custom mop error', l.t0);

                  case 14:
                  case 'end':
                    return l.stop();
                }
            },
            null,
            this,
            [[1, 11]],
            Promise
          );
        },
      },
      {
        key: 'renderRow',
        value: function (t, o) {
          var n = this.context.theme.mopModeList,
            s = n.addIcon,
            c = n.removeIcon,
            l = n.itemCardBackgroundColor,
            u = n.itemCardTitleColor,
            h = n.itemCardDescColor,
            w = this.state.dragEnabled,
            v = w ? (o ? s : c) : t.icon;
          return React.default.createElement(
            x,
            module21.default({}, t, {
              backgroundColor: l,
              titleColor: u,
              descColor: h,
              iconWidth: w ? 24 : 40,
              icon: v,
              onPress: w ? null : this.onPressRow.bind(this, t),
              rightIcon: w ? null : this.context.theme.settingListItem.rightArrowImg,
              onPressLeftIcon: this.onPressRowLeft.bind(this, t),
            })
          );
        },
      },
      {
        key: 'gotoCustomPage',
        value: function (t) {
          var o = this;
          if (
            !t &&
            module1352.ModeDataInstance.customMopModeListData.filter(function (t) {
              return !t.sys_type;
            }).length >= 5
          )
            return void globals.showToast(module491.mop_mop_list_page_exceed_max_tip);
          var n = t || {},
            s = n.id,
            c = n.name,
            l = undefined === c ? module491.custom_mop_mode_page_default_title : c,
            u = n.sys_type,
            f = undefined !== u && u,
            h = n.show,
            p = undefined === h || h;
          this.props.navigation.navigate('MopModeCustomPage', {
            id: s,
            title: l,
            sys_type: f,
            show: p,
            didSaveOrDelete: function () {
              o.fetchList();
            },
          });
        },
      },
      {
        key: 'onPressRow',
        value: function (t) {
          console.log('onPressRow', t);
          this.gotoCustomPage(t);
        },
      },
      {
        key: 'onPressRowLeft',
        value: function (t) {
          var o = this.state,
            n = o.firstRows,
            s = o.secondRows;
          if (o.dragEnabled) {
            if (t.show) {
              if (1 == n.length) return void globals.showToast(module491.mop_mode_list_min_show_count_toast);
              if (t.id == module377.RSM.mopModeId) return void globals.showToast(module491.mop_mode_list_remove_used_mode_toast);
              S(n, t);
              t.show = false;
              var c = s.concat([t]);
              console.log('after sort 1', n, c);
              this.setState({
                firstRows: n,
                secondRows: c,
              });
            } else {
              S(s, t);
              t.show = true;
              n.push(t);
              console.log('after sort 2', n, s);
              this.setState({
                firstRows: n,
                secondRows: s,
              });
            }
          } else this.onPressRow(t);
        },
      },
      {
        key: 'renderSection',
        value: function (t) {
          return React.default.createElement(
            module12.View,
            {
              style: L.section,
            },
            React.default.createElement(
              module12.Text,
              {
                style: L.sectionTitle,
              },
              t
            )
          );
        },
      },
      {
        key: 'renderFooter',
        value: function () {
          var t = this,
            o = this.context.theme.mopModeList,
            n = o.itemCardBackgroundColor,
            s = o.itemCardTitleColor,
            c = o.itemCardDescColor;
          return React.default.createElement(x, {
            name: module491.mop_mode_list_page_add_new_mode,
            icon: this.context.theme.ModeSettingPanel.mopModeListIconCustom,
            style: L.footer,
            backgroundColor: n,
            titleColor: s,
            descColor: c,
            rightIcon: this.context.theme.timerListSetting.confirmButton,
            funcId: 'custom_mop_mode_entrance',
            onPress: function () {
              t.gotoCustomPage();
            },
          });
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            o = this.state,
            n = o.scrollEnabled,
            s = o.dragEnabled,
            c = o.firstRows,
            l = o.secondRows,
            u = this.context.theme;
          console.log('first rows', c, l);
          return React.default.createElement(
            module12.ScrollView,
            {
              scrollEnabled: n,
              style: {
                backgroundColor: u.pageBackgroundColor,
              },
            },
            this.renderSection(module491.mop_mode_list_section_recent_title),
            React.default.createElement(module381.DraggableList, {
              style: L.list,
              rows: c,
              renderRow: this.renderRow.bind(this),
              height: 80,
              dragEnabled: s,
              setScrollEnabled: function (o) {
                return t.setState({
                  scrollEnabled: o,
                });
              },
            }),
            this.renderSection(module491.custom_mode_panel_more_mode_title),
            React.default.createElement(
              module12.View,
              {
                style: L.list,
              },
              this.state.secondRows.map(function (o) {
                return t.renderRow(o, true);
              })
            ),
            !s && this.renderFooter()
          );
        },
      },
    ]);
    return M;
  })(React.default.Component);

exports.default = D;
D.contextType = module506.AppConfigContext;
var L = module12.StyleSheet.create({
  list: {
    width: module12.Dimensions.get('window').width - 40,
    alignSelf: 'center',
    borderRadius: 14,
    overflow: 'hidden',
  },
  section: {
    justifyContent: 'center',
    marginLeft: 20,
    height: 50,
  },
  sectionTitle: {
    color: '#9B9B9B',
    fontSize: 16,
  },
  modeRow: {
    width: module12.Dimensions.get('window').width - 40,
    flexDirection: 'row',
    paddingLeft: 20,
    alignItems: 'center',
    height: 80,
    backgroundColor: 'white',
  },
  modeRowIcon: {
    marginRight: 20,
  },
  modeRowRight: {
    justifyContent: 'center',
  },
  modeRowTitle: {
    fontSize: 16,
    color: '#4A4A4A',
    maxWidth: module12.Dimensions.get('window').width - 170,
  },
  modeRowDesc: {
    fontSize: 12,
    marginTop: 10,
    color: '#9B9B9B',
    maxWidth: module12.Dimensions.get('window').width - 170,
  },
  footer: {
    marginVertical: 20,
    width: module12.Dimensions.get('window').width - 40,
    borderRadius: 16,
    overflow: 'hidden',
    alignSelf: 'center',
  },
});
