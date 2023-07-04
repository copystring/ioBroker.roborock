var module50 = require('./50'),
  regeneratorRuntime = require('regenerator-runtime'),
  module6 = require('./6'),
  module416 = require('./416'),
  module1968 = require('./1968'),
  module1969 = require('./1969');

function p(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(t);
    if (n)
      u = u.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, u);
  }

  return o;
}

function h(t) {
  for (var o = 1; o < arguments.length; o++) {
    var u = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      p(Object(u), true).forEach(function (o) {
        module50.default(t, o, u[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(u));
    else
      p(Object(u)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(u, n));
      });
  }

  return t;
}

var module393 = require('./393'),
  module1644 = require('./1644'),
  module1643 = require('./1643'),
  k = null,
  O = (function () {
    function t() {
      module6.default(this, t);
      this.commandListCache = null;
      if (!k) k = this;
      return k;
    }

    module7.default(
      t,
      [
        {
          key: 'getCommandList',
          value: function () {
            var t = this;
            console.log('Get Command List');
            var n = module393.deviceId;
            return new Promise(function (u, s) {
              module393
                .getSmartSceneList(n)
                .then(function (n) {
                  var s, c, l, f, p, h;
                  return regeneratorRuntime.default.async(
                    function (y) {
                      for (;;)
                        switch ((y.prev = y.next)) {
                          case 0:
                            if (
                              ((s = 'object' == typeof n ? n : JSON.parse(n)),
                              (c =
                                null == s
                                  ? undefined
                                  : s.result.map(function (t) {
                                      return new P(t);
                                    })),
                              (l = c.map(function (t) {
                                return t.command;
                              })),
                              (f = c.flatMap(function (t) {
                                return t.validTids;
                              })),
                              module393.isSupportSceneOrders())
                            ) {
                              y.next = 9;
                              break;
                            }

                            t.commandListCache = {
                              commands: l,
                              tidList: f,
                            };
                            u({
                              commands: l,
                              tidList: f,
                            });
                            y.next = 15;
                            break;

                          case 9:
                            y.next = 11;
                            return regeneratorRuntime.default.awrap(module393.getSceneOrders());

                          case 11:
                            p = y.sent;
                            h = (null != l ? l : [])
                              .map(function (t) {
                                var n = p.indexOf(t.id);
                                if (n < 0) n = -1 * t.id;
                                t.priority = n;
                                return t;
                              })
                              .sort(function (t, n) {
                                return t.priority - n.priority;
                              });
                            t.commandListCache = {
                              commands: h,
                              tidList: f,
                            };
                            u({
                              commands: h,
                              tidList: f,
                            });

                          case 15:
                          case 'end':
                            return y.stop();
                        }
                    },
                    null,
                    null,
                    null,
                    Promise
                  );
                })
                .catch(function (t) {
                  s(t);
                });
            });
          },
        },
        {
          key: 'addCommand',
          value: function (t, n) {
            return new Promise(function (o, u) {
              var s = {
                action: n,
                triggers: [],
                matchType: 'NONE',
              };
              n.items.forEach(function (t) {
                if (null == t.id || undefined == t.id) {
                  module1968.SmartSceneLog('\u65e0\u6548\u4efb\u52a1! -- ' + JSON.stringify(t));
                  return void u();
                }
              });
              module393
                .addSmartScene(t, s)
                .then(function (t) {
                  var n = 'object' == typeof t ? t : JSON.parse(t);
                  o(n.result);
                })
                .catch(function (t) {
                  u(t);
                });
            });
          },
        },
        {
          key: 'renameCommand',
          value: function (t, n) {
            return module393.editSmartSceneName('' + t, n);
          },
        },
        {
          key: 'updateCommand',
          value: function (t, n, o) {
            return new Promise(function (u, s) {
              var c = {
                action: n,
                triggers: null != o ? o : [],
                matchType: 'NONE',
              };
              n.items.forEach(function (t) {
                if (null == t.id || undefined == t.id) {
                  module1968.SmartSceneLog('\u65e0\u6548\u4efb\u52a1! -- ' + JSON.stringify(t));
                  return void s();
                }
              });
              module393
                .editSmartScene('' + t, c)
                .then(function (t) {
                  var n = 'object' == typeof t ? t : JSON.parse(t);
                  u(n.result);
                })
                .catch(function (t) {
                  s(t);
                });
            });
          },
        },
        {
          key: 'deleteCommand',
          value: function (t) {
            return module393.deleteSmartScene('' + t);
          },
        },
        {
          key: 'editTriggers',
          value: function (t, n) {
            var o = {
              triggers: n,
              matchType: 'NONE',
            };
            return module393.editSmartSceneTimer('' + t, o);
          },
        },
        {
          key: 'sync',
          value: function (t, n) {
            return new Promise(function (o, u) {
              var s = n.map(function (t) {
                  return '' + t;
                }),
                f = t.map(function (t) {
                  return '' + t;
                }),
                p = f.filter(function (t) {
                  return (null != s ? s : []).indexOf(t) > -1;
                });
              module1968.SmartSceneLog(
                '\u5373\u5c06\u5411\u4e91\u7aef+\u8bbe\u5907\u7aef\u540c\u6b65TID. \u4e91\u7aef\u6709\u6548TID: ' +
                  s +
                  ', \u8bbe\u5907\u7aef\u6709\u6548TID: ' +
                  f +
                  ', \u516c\u5171\u6709\u6548TID: ' +
                  p
              );
              module1968.SmartSceneLog('\u5373\u5c06\u5411\u8bbe\u5907\u7aef\u540c\u6b65TID, ' + p);
              module416.default
                .reunionScenes(
                  p.map(function (t) {
                    return {
                      tid: t,
                    };
                  })
                )
                .then(function () {
                  module1968.SmartSceneLog('\u6210\u529f\u5411\u8bbe\u5907\u7aef\u540c\u6b65TID, ' + p);
                  module1968.SmartSceneLog('\u5373\u5c06\u5411\u4e91\u7aef\u540c\u6b65TID, ' + p);
                  module1968.SmartSceneLog('TODO: \u539f\u751f\u6ca1\u7ed9\u540c\u6b65\u63a5\u53e3\u7684\u56de\u8c03');
                  return module393.syncSmartSceneInfo(p);
                })
                .then(function () {
                  o(p);
                })
                .catch(function (t) {
                  u(t);
                });
            });
          },
        },
        {
          key: 'syncTaskToRobot',
          value: function (t) {
            var n = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : null,
              o =
                null != n
                  ? {
                      tid: n,
                    }
                  : {};
            return new Promise(function (n, u) {
              var s, l;

              switch (t.mode) {
                case module1969.SmartSceneMode.GlobalClean:
                  n(t);
                  break;

                case module1969.SmartSceneMode.Segment:
                  module416.default
                    .setScenesSegment([
                      h(
                        h({}, o),
                        {},
                        {
                          segs: (null != (s = t.segments) ? s : []).map(function (t) {
                            return {
                              sid: t,
                            };
                          }),
                        }
                      ),
                    ])
                    .then(function (o) {
                      o.result[0].tid;
                      t.tid = o.result[0].tid;
                      n(t);
                    })
                    .catch(function (t) {
                      u(t);
                    });
                  break;

                case module1969.SmartSceneMode.Zone:
                  var p = (null != (l = t.zones) ? l : []).map(function (t) {
                    return {
                      range: t.range,
                      zid: t.zid,
                    };
                  });
                  module416.default
                    .setScenesZone([
                      h(
                        h({}, o),
                        {},
                        {
                          zones: p,
                        }
                      ),
                    ])
                    .then(function (o) {
                      var u = o.result[0],
                        s = {
                          tid: u.tid,
                          zones: u.zones
                            .filter(function (t) {
                              var n;
                              return (null != (n = t.zid) ? n : -1) >= 0;
                            })
                            .map(function (n) {
                              n.repeat = t.repeat;
                              return n;
                            }),
                        };
                      t.tid = s.tid;
                      t.zones = s.zones;
                      n(t);
                    })
                    .catch(function (t) {
                      u(t);
                    });
              }
            });
          },
        },
      ],
      [
        {
          key: 'shared',
          value: function () {
            return new t();
          },
        },
      ]
    );
    return t;
  })().shared();

exports.SmartSceneAPI = O;

var b = 'do_scenes_app_start',
  P = (function () {
    function t(n) {
      var o, s;
      module6.default(this, t);
      var c = n.id,
        l = n.name,
        f = n.param,
        p = n.extra;
      this.id = c;
      this.name = l;
      this.param = new w(JSON.parse(f));
      this.invalidIDs = p && null != (o = null == (s = JSON.parse(p)) ? undefined : s.invalidActions) ? o : [];
    }

    module7.default(t, [
      {
        key: 'tasks',
        get: function () {
          return this.param.action.items.map(function (t) {
            return t.taskData;
          });
        },
      },
      {
        key: 'command',
        get: function () {
          var t,
            n = this,
            o =
              null ==
              (t = this.tasks.find(function (t) {
                return undefined != t.mapFlag && null != t.mapFlag;
              }))
                ? undefined
                : t.mapFlag,
            u = false,
            s = this.tasks;
          s.forEach(function (t) {
            var o,
              s = null == (o = n.invalidIDs) ? undefined : null == o.hasElement ? undefined : o.hasElement(t.id);
            t.isInvalid = s;
            if (s) u = true;
          });
          var c = new module1968.CommandCardData(this.name, module1968.CommandCardType.Custom, s, o, this.timers, this.id);
          c.isInvalid = u;
          return c;
        },
      },
      {
        key: 'timers',
        get: function () {
          return this.param.triggers;
        },
      },
      {
        key: 'validTids',
        get: function () {
          return this.param.action.items
            .map(function (t) {
              return t.tid;
            })
            .filter(function (t) {
              return undefined != t && null != t;
            });
        },
      },
    ]);
    return t;
  })(),
  w = function t(n) {
    module6.default(this, t);
    var o = n.action,
      s = n.triggers;
    this.action = new T(o);
    this.triggers = s.map(function (t) {
      return new D(t);
    });
  },
  T = function t(n) {
    var o;
    module6.default(this, t);
    this.type = n.type;
    this.items = (null != (o = n.items) ? o : []).map(function (t) {
      return new j(t);
    });
  },
  D = (function () {
    function t(n) {
      module6.default(this, t);
      this.name = null == n ? undefined : n.name;
      this.type = null == n ? undefined : n.type;
      this.param = (null == n ? undefined : n.param) ? JSON.parse(n.param) : null;
    }

    module7.default(t, [
      {
        key: 'cron',
        get: function () {
          var t;
          return null == (t = this.param) ? undefined : t.cron;
        },
      },
      {
        key: 'timeZoneId',
        get: function () {
          var t;
          return null == (t = this.param) ? undefined : t.timeZoneId;
        },
      },
      {
        key: 'repeated',
        get: function () {
          var t;
          return null == (t = this.param) ? undefined : t.repeated;
        },
      },
      {
        key: 'enabled',
        get: function () {
          var t;
          return null == (t = this.param) ? undefined : t.enabled;
        },
      },
      {
        key: 'timeObj',
        get: function () {
          return this.cron ? module1643.ConvertToReadableFormat(this.cron) : {};
        },
      },
      {
        key: 'repeatMode',
        get: function () {
          return module1644.getRepeatMode(this.timeObj.repeat, false);
        },
      },
      {
        key: 'timeDescription',
        get: function () {
          return null != this.timeObj.minute && null != this.timeObj.hour
            ? module1644.addZeroPrefix(this.timeObj.hour) + ' : ' + module1644.addZeroPrefix(this.timeObj.minute)
            : module1968.LocalizationStrings.timer_setting_no_setting;
        },
      },
      {
        key: 'repeatModeDescription',
        get: function () {
          return module1644.getTextOfRepeatMode(this.repeatMode, new Date());
        },
      },
    ]);
    return t;
  })();

exports.SmartSceneTriggerModel = D;

var I = (function () {
    function t(n) {
      module6.default(this, t);
      var o = n.id,
        s = n.method,
        c = n.params;
      this.id = o;
      this.method = s;
      this.params = c;
    }

    module7.default(t, [
      {
        key: 'paramsProperty',
        value: function (t) {
          return this.method == b ? this.params[0][t] : null == (n = this.params) ? undefined : n.data[0][t];
          var n;
        },
      },
      {
        key: 'cleanMode',
        get: function () {
          return this.paramsProperty('fan_power');
        },
      },
      {
        key: 'waterMode',
        get: function () {
          return this.paramsProperty('water_box_mode');
        },
      },
      {
        key: 'mopMode',
        get: function () {
          return this.paramsProperty('mop_mode');
        },
      },
      {
        key: 'mopTemplateId',
        get: function () {
          return this.paramsProperty('mop_template_id');
        },
      },
      {
        key: 'repeat',
        get: function () {
          return this.paramsProperty('repeat');
        },
      },
      {
        key: 'tid',
        get: function () {
          return this.paramsProperty('tid');
        },
      },
      {
        key: 'segs',
        get: function () {
          return this.paramsProperty('segs');
        },
      },
      {
        key: 'zones',
        get: function () {
          return this.paramsProperty('zones');
        },
      },
      {
        key: 'mapFlag',
        get: function () {
          return this.paramsProperty('map_flag');
        },
      },
      {
        key: 'cleanOrderMode',
        get: function () {
          return this.paramsProperty('clean_order_mode');
        },
      },
    ]);
    return t;
  })(),
  j = (function () {
    function t(n) {
      module6.default(this, t);
      var o = n.id,
        s = n.name,
        c = n.type,
        l = n.entityId,
        f = n.finishDpIds,
        p = n.param;
      this.id = o;
      this.name = s;
      this.type = c;
      this.entityId = l;
      this.finishDpIds = f;
      this.param = new I(JSON.parse(p));
    }

    module7.default(t, [
      {
        key: 'taskData',
        get: function () {
          var t;
          return new module1968.TaskDescriptorData(
            this.param.cleanMode,
            this.param.waterMode,
            this.param.mopMode,
            module1968.taskMethodToMode(this.param.method),
            this.param.repeat,
            null == (t = this.param.segs)
              ? undefined
              : t.map(function (t) {
                  return t.sid;
                }),
            this.param.zones,
            this.id,
            this.param.mapFlag,
            this.param.tid,
            null,
            this.name
          );
        },
      },
      {
        key: 'mapFlag',
        get: function () {
          return this.param.mapFlag;
        },
      },
      {
        key: 'tid',
        get: function () {
          return this.param.tid;
        },
      },
    ]);
    return t;
  })();
