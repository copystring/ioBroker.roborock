exports.CommandListSectionData = function (t, n) {
  this.name = t;
  this.cards = n;
};

exports.taskNameWithMode = C;
exports.taskMethodWithMode = f;

exports.taskMethodToMode = function (t) {
  switch (t) {
    case 'do_scenes_app_start':
      return module1963.SmartSceneMode.GlobalClean;

    case 'do_scenes_segments':
      return module1963.SmartSceneMode.Segment;

    case 'do_scenes_zones':
      return module1963.SmartSceneMode.Zone;
  }
};

exports.SmartSceneLog = function (t) {
  console.log('\u5feb\u6377\u5361\u7247Log -------- ' + globals.currentPageName + ' ------ ' + t);
};

var module6 = require('./6'),
  module1963 = require('./1963'),
  module510 = require('./510'),
  module393 = require('./393'),
  u = {
    NewCommand: 0,
    GlobalClean: 1,
    DiningAreaClean: 2,
    CleanAndMop: 101,
  };

exports.SmartSceneTemplateID = u;
exports.MaxCommandCount = 10;
exports.MaxTaskCountPerCommand = 10;
var _ = module510.strings;
exports.LocalizationStrings = _;
var h = module393;
exports.RRMISDK_SMARTSCENE = h;
exports.TaskListItemType = {
  Location: 0,
  Task: 1,
  TaskAdd: 2,
};
exports.TaskListState = {
  Normal: 0,
  Editing: 1,
  Adding: 2,
  AddingTemplate: 3,
};
var p = {
  Custom: 0,
  Recommend: 1,
  Add: 2,
};
exports.CommandCardType = p;
var S = {
  Edit: _.multi_floor_edit,
  EditTimer: _.localization_strings_Setting_Timer_SettingPage_16,
  Rename: _.smart_scene_rename,
  Delete: _.map_edit_delete,
};
exports.SmartCommandAction = S;

var M = (function () {
  function t(o, l, s) {
    var c = arguments.length > 3 && undefined !== arguments[3] ? arguments[3] : null,
      u = arguments.length > 4 && undefined !== arguments[4] ? arguments[4] : null,
      _ = arguments.length > 5 && undefined !== arguments[5] ? arguments[5] : null,
      h = arguments.length > 6 && undefined !== arguments[6] ? arguments[6] : null;

    module6.default(this, t);
    this.name = o;
    this.type = l;
    this.tasks = s;
    this.mapFlag = c;
    this.timer = u;
    this.id = _;
    this.isInvalid = false;
    this.templateId = h;
  }

  module7.default(t, [
    {
      key: 'actionModel',
      get: function () {
        var t;
        return {
          type: 'S',
          items:
            null == (t = this.tasks)
              ? undefined
              : null == t.map
              ? undefined
              : t.map(function (t) {
                  return {
                    id: t.id,
                    name: t.serverName,
                    type: 'CMD',
                    entityId: module393.deviceId,
                    param: JSON.stringify(null == t ? undefined : t.param),
                    finishDpIds: [130],
                  };
                }),
        };
      },
    },
    {
      key: 'triggerModel',
      get: function () {
        var t;
        return (null != (t = this.timer) ? t : []).map(function (t) {
          var n;
          return {
            name: null != (n = t.name) ? n : 'TIMER',
            type: 'TIMER',
            param: JSON.stringify(t.param),
          };
        });
      },
    },
  ]);
  return t;
})();

exports.CommandCardData = M;

var v = (function () {
  function t(o, s, c, u, _) {
    var h = arguments.length > 5 && undefined !== arguments[5] ? arguments[5] : [],
      p = arguments.length > 6 && undefined !== arguments[6] ? arguments[6] : [],
      S = arguments.length > 7 && undefined !== arguments[7] ? arguments[7] : null,
      M = arguments.length > 8 ? arguments[8] : undefined,
      v = arguments.length > 9 && undefined !== arguments[9] ? arguments[9] : null,
      C = arguments.length > 10 && undefined !== arguments[10] ? arguments[10] : null,
      f = arguments.length > 11 && undefined !== arguments[11] ? arguments[11] : null;
    module6.default(this, t);
    this.customMode = {
      cleanMode: o || 0,
      waterMode: s || 0,
      mopMode: c || 0,
    };
    this.mode = u || module1963.SmartSceneMode.GlobalClean;
    this.repeat = _ || 0;
    this.segments = h;
    this.zones = p;
    this.id = S;
    this.mapFlag = M;
    this.tid = v;
    this.isInvalid = false;
    this.alias = C;
    this.serverName = null != f ? f : '';
  }

  module7.default(t, [
    {
      key: 'cleanMode',
      get: function () {
        return this.customMode.cleanMode;
      },
    },
    {
      key: 'waterMode',
      get: function () {
        return this.customMode.waterMode;
      },
    },
    {
      key: 'mopMode',
      get: function () {
        return this.customMode.mopMode;
      },
    },
    {
      key: 'name',
      get: function () {
        return this.serverName.length > 0 ? this.serverName : this.alias ? this.alias : C(this.mode);
      },
    },
    {
      key: 'param',
      get: function () {
        var t = f(this.mode),
          n = null;

        switch (this.mode) {
          case module1963.SmartSceneMode.GlobalClean:
            n = [
              {
                fan_power: this.cleanMode,
                water_box_mode: this.waterMode,
                mop_mode: this.mopMode,
                mop_template_id: this.mopMode,
                repeat: this.repeat,
                source: 101,
              },
            ];
            break;

          case module1963.SmartSceneMode.Segment:
            n = {
              data: [
                {
                  tid: this.tid,
                  segs: this.segments.map(function (t) {
                    return {
                      sid: t,
                    };
                  }),
                  map_flag: this.mapFlag,
                  fan_power: this.cleanMode,
                  water_box_mode: this.waterMode,
                  mop_mode: this.mopMode,
                  mop_template_id: this.mopMode,
                  repeat: this.repeat,
                  clean_order_mode: 0,
                },
              ],
              source: 101,
            };
            break;

          case module1963.SmartSceneMode.Zone:
            n = {
              data: [
                {
                  tid: this.tid,
                  zones: this.zones,
                  map_flag: this.mapFlag,
                  fan_power: this.cleanMode,
                  water_box_mode: this.waterMode,
                  mop_mode: this.mopMode,
                  mop_template_id: this.mopMode,
                  repeat: this.repeat,
                  clean_order_mode: 0,
                },
              ],
              source: 101,
            };
        }

        return {
          id: this.id,
          method: t,
          params: n,
        };
      },
    },
  ]);
  return t;
})();

function C(t) {
  switch (t) {
    case module1963.SmartSceneMode.GlobalClean:
      return _.home_bottom_menu_global;

    case module1963.SmartSceneMode.Segment:
      return _.home_bottom_menu_select_zone;

    case module1963.SmartSceneMode.Zone:
      return _.home_bottom_menu_draw_zone;
  }
}

function f(t) {
  switch (t) {
    case module1963.SmartSceneMode.GlobalClean:
      return 'do_scenes_app_start';

    case module1963.SmartSceneMode.Segment:
      return 'do_scenes_segments';

    case module1963.SmartSceneMode.Zone:
      return 'do_scenes_zones';
  }
}

exports.TaskDescriptorData = v;
var T = [
  new v(102, 202, 300, module1963.SmartSceneMode.GlobalClean, 1),
  new v(103, 203, 301, module1963.SmartSceneMode.Segment, 2),
  new v(104, 203, 301, module1963.SmartSceneMode.Zone, 3),
];
exports.TestTasks = T;
var w = [new v(102, 202, 300, module1963.SmartSceneMode.GlobalClean, null, null, null, 1)],
  k = [new v(102, 202, 300, module1963.SmartSceneMode.Segment, 1, null, null, 1, null, null, _.map_edit_zone_tag_kitchen + ' ' + _.map_edit_zone_tag_diningroom)],
  b = [new v(102, 200, 300, module1963.SmartSceneMode.GlobalClean, null, null, null, 1), new v(105, 202, 300, module1963.SmartSceneMode.GlobalClean, null, null, null, 2)],
  y = new M(_.smart_scene_recommend_global_clean_title, p.Recommend, w, null, null, null, u.GlobalClean);
exports.RecommendGlobal = y;
var R = new M(_.smart_scene_recommend_clean_after_meal, p.Recommend, k, null, null, null, u.DiningAreaClean);
exports.RecommendDiningArea = R;
var D = new M(_.clean_method_clean_and_mop, p.Recommend, b, null, null, null, u.CleanAndMop);
exports.RecommendCleanThenMop = D;
