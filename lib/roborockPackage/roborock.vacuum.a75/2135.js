require('./1636');

var regeneratorRuntime = require('regenerator-runtime'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  module22 = require('./22'),
  module50 = require('./50'),
  React = require('react'),
  module13 = require('./13'),
  module385 = require('./385'),
  module416 = require('./416'),
  module1199 = require('./1199'),
  module2039 = require('./2039'),
  module1624 = require('./1624'),
  module381 = require('./381'),
  module391 = require('./391');

function I() {
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

function S(t, o) {
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

function M(t) {
  for (var o = 1; o < arguments.length; o++) {
    var n = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      S(Object(n), true).forEach(function (o) {
        module50.default(t, o, n[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
    else
      S(Object(n)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(n, o));
      });
  }

  return t;
}

var module510 = require('./510').strings,
  x = function (t, o) {
    t.forEach(function (t, n, s) {
      if (t == o) s.splice(n, 1);
    });
  },
  L = function (t) {
    var o = t.name,
      n = t.desc,
      s = t.icon,
      c = t.onPress,
      l = t.onPressLeftIcon,
      u = t.style,
      f = t.rightIcon,
      w = t.iconWidth,
      _ = undefined === w ? 40 : w,
      b = t.backgroundColor,
      R = t.titleColor,
      C = t.descColor,
      P = t.funcId,
      I = t.isSecond;

    return React.default.createElement(
      module13.TouchableOpacity,
      {
        activeOpacity: 0.8,
        onPress: c,
      },
      React.default.createElement(
        module13.View,
        module22.default(
          {
            style: M(
              M({}, O.modeRow),
              {},
              {
                backgroundColor: b,
              },
              u
            ),
          },
          module391.default.getAccessibilityLabel(P)
        ),
        React.default.createElement(module385.PureImageButton, {
          style: M({}, O.modeRowIcon),
          funcId: 'left_icon_' + (I ? 'top' : 'bottom'),
          image: s,
          imageWidth: _,
          imageHeight: _,
          onPress: l,
        }),
        React.default.createElement(
          module13.View,
          {
            style: O.modeRowRight,
          },
          React.default.createElement(
            module13.Text,
            {
              style: M(
                M({}, O.modeRowTitle),
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
              module13.Text,
              {
                style: M(
                  M({}, O.modeRowDesc),
                  {},
                  {
                    color: C,
                  }
                ),
              },
              n
            )
        ),
        f &&
          React.default.createElement(module13.Image, {
            source: f,
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
    module9.default(E, t);

    var o = E,
      module50 = I(),
      b = function () {
        var t,
          n = module12.default(o);

        if (module50) {
          var s = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function E(t) {
      var o;
      module6.default(this, E);
      (o = b.call(this, t)).state = {
        firstRows: [],
        secondRows: [],
        scrollEnabled: true,
        dragEnabled: false,
      };
      return o;
    }

    module7.default(E, [
      {
        key: 'componentWillUnmount',
        value: function () {
          var t, o, n, s, c;
          if (!(null == this || null == (t = this.props) || null == (o = t.navigation) || null == (n = o.state) || null == (s = n.params) || null == (c = s.settingPanel)))
            c.addBackListener();
          module2039.ModeDataInstance.getCustomMopList();
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
            c = React.default.createElement(module385.PureImageButton, {
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
        value: function (t, o) {
          var module6, module7, module9, module11, module12, h;
          return regeneratorRuntime.default.async(
            function (w) {
              for (;;)
                switch ((w.prev = w.next)) {
                  case 0:
                    module6 = this.state;
                    module7 = module6.firstRows;
                    module9 = module6.secondRows;
                    console.log('saveList', module7, module9);
                    module11 = module7.concat(module9).map(function (t) {
                      return t.id;
                    });
                    module12 = {
                      ids: module11,
                      show_index: module7.length,
                    };
                    w.prev = 4;
                    w.next = 7;
                    return regeneratorRuntime.default.awrap(module416.default.sortCustomMopModes(module12));

                  case 7:
                    h = w.sent;
                    console.log('sort', module12, h);
                    if (t) t();
                    w.next = 16;
                    break;

                  case 12:
                    w.prev = 12;
                    w.t0 = w.catch(4);
                    console.log('sort error', module12, w.t0);
                    if (o) o();

                  case 16:
                  case 'end':
                    return w.stop();
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
          var t, o, s, c;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    t = this.context.theme.ModeSettingPanel;
                    l.prev = 1;
                    l.next = 4;
                    return regeneratorRuntime.default.awrap(module2039.ModeDataInstance.getCustomMopList());

                  case 4:
                    o = [];
                    s = [];
                    c = module1624.getSystemCustomMopModes();
                    module2039.ModeDataInstance.customMopModeListData.forEach(function (n, l) {
                      var u = c.find(function (t) {
                        return n.id === t.id;
                      });

                      if (u) {
                        n.name = u.name;
                        n.desc = u.desc;
                        n.icon = u.listIcon;
                      }

                      if (!n.sys_type) n.icon = t.mopModeListIconCustom;
                      n.key = (n.show ? 'first_row' : 'second_row') + l;
                      if (4 != n.id) n.show ? o.push(n) : s.push(n);
                    });
                    this.setState({
                      firstRows: o,
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
            f = n.itemCardDescColor,
            w = this.state.dragEnabled,
            v = w ? (o ? s : c) : t.icon;
          return React.default.createElement(
            L,
            module22.default({}, t, {
              isSecond: o,
              backgroundColor: l,
              titleColor: u,
              descColor: f,
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
            module2039.ModeDataInstance.customMopModeListData.filter(function (t) {
              return !t.sys_type;
            }).length >= 5
          )
            return void globals.showToast(module510.mop_mop_list_page_exceed_max_tip);
          var n = t || {},
            s = n.id,
            c = n.name,
            l = undefined === c ? module510.custom_mop_mode_page_default_title : c,
            u = n.sys_type,
            f = undefined !== u && u,
            h = n.show,
            w = undefined === h || h;
          this.props.navigation.navigate('MopModeCustomPage', {
            id: s,
            title: l,
            sys_type: f,
            show: w,
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
              if (1 == n.length) return void globals.showToast(module510.mop_mode_list_min_show_count_toast);
              if (t.id == module381.RSM.mopModeId) return void globals.showToast(module510.mop_mode_list_remove_used_mode_toast);
              x(n, t);
              t.show = false;
              var c = s.concat([t]);
              console.log('after sort 1', n, c);
              this.setState({
                firstRows: n,
                secondRows: c,
              });
            } else {
              x(s, t);
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
            module13.View,
            {
              style: O.section,
            },
            React.default.createElement(
              module13.Text,
              {
                style: O.sectionTitle,
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
          return React.default.createElement(L, {
            name: module510.mop_mode_list_page_add_new_mode,
            icon: this.context.theme.ModeSettingPanel.mopModeListIconCustom,
            style: O.footer,
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
            module13.ScrollView,
            {
              scrollEnabled: n,
              style: {
                backgroundColor: u.pageBackgroundColor,
              },
            },
            this.renderSection(module510.mop_mode_list_section_recent_title),
            React.default.createElement(module385.DraggableList, {
              style: O.list,
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
            this.renderSection(module510.custom_mode_panel_more_mode_title),
            React.default.createElement(
              module13.View,
              {
                style: O.list,
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
    return E;
  })(React.default.Component);

exports.default = D;
D.contextType = module1199.AppConfigContext;
var O = module13.StyleSheet.create({
  list: {
    width: module13.Dimensions.get('window').width - 40,
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
    width: module13.Dimensions.get('window').width - 40,
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
    maxWidth: module13.Dimensions.get('window').width - 170,
  },
  modeRowDesc: {
    fontSize: 12,
    marginTop: 10,
    color: '#9B9B9B',
    maxWidth: module13.Dimensions.get('window').width - 170,
  },
  footer: {
    marginVertical: 20,
    width: module13.Dimensions.get('window').width - 40,
    borderRadius: 16,
    overflow: 'hidden',
    alignSelf: 'center',
  },
});
