exports.getFurnitureEdge = function (t, _) {
  var T = w[t];
  if (!T) return w[FT_UNKNOWN];

  if (T.hasSubtype) {
    var n = T[_];
    T = n || T[0];
  }

  return T;
};

exports.getFurnitureName = function (t, _) {
  var T = U[t];
  if (!T) return module505.localization_strings_Setting_General_index_0;

  if (T.hasSubtype) {
    var n = T[_];
    return n ? n.title : T[1].title;
  }

  return T.title;
};

var _,
  T,
  n,
  o,
  l,
  u,
  E,
  h,
  p,
  S,
  f,
  module50 = require('./50'),
  module12 = require('./12'),
  A = module12.ART.Transform,
  module505 = require('./505').strings;

exports.RECT_SCALE_MIN_X = 0.33;
exports.RECT_SCALE_MIN_Y = 0.5;
exports.DEFAULT_RECT_MARGIN = 30;
exports.DEFAULT_FBZ_WIDTH = 10;
exports.DEFAULT_FBZ_HEIGHT = 10;
exports.DOCK_FORBIDDEN_R = 10;
exports.ROBOT_FORBIDDEN_R = 5;
exports.MAX_COUNT_WALL_OR_FBZ = 10;
exports.MAX_COUNT_ZONE_RECT = 5;
exports.EMPTY_MAP_WIDTH = 100;
exports.EMPTY_MAP_HEIGHT = 100;
var I = module12.Dimensions.get('window'),
  s = I.height,
  O = I.width,
  c = O / 4.7;
exports.DEFAULT_FBZ_REALWIDTH = c;
var B = O / 4.7;
exports.DEFAULT_FBZ_REALHEIGHT = B;
var C = (O - c) / 2,
  R = (0.67 * s - 10) / 2,
  L = (O - c) / 2,
  y = (0.67 * s) / 2;
exports.MAX_FURNITURE_EDIT_MIAPP = 10;
exports.PanStatus = {
  MAP_VIEWING_NONE: 0,
  MAP_VIEWING_FIT: 1,
  MAP_VIEWING_MOVED: 2,
  MAP_VIEWING_SCALED: 3,
};
exports.shareViewLoadType = {
  ONLOAD_MAP: 'map',
  ONLOAD_CARPETMAP: 'carpetMap',
  ONLOAD_CHARGER: 'charger',
  ONLOAD_OBSTACLE: 'mapObjects',
};
exports.FbzType = {
  FBZ_TYPE_REGULAR: 'fbz_type_regular',
  FBZ_TYPE_MOPPING: 'fbz_type_mopping',
  FBZ_TYPE_CLEANING: 'fbz_type_cleaning',
  FBZ_TYPE_CARPET: 'fbz_type_carpet',
  RECT_TYPE_CARPET: 'rect_type_carpet',
  RECT_TYPE_FBMARK: 'rect_type_fbmark',
};
exports.MoppingType = {
  MOPPING_TYPE_NONE: 1,
  MOPPING_TYPE_PURE: 2,
  MOPPING_TYPE_BOTH_IN_CLEAN: 7,
  MOPPING_TYPE_BOTH_IN_MOP: 6,
  MOPPING_TYPE_BOTH_BOTH: 0,
};
exports.RobotAnimationStatus = {
  DEFAULT: 0,
  PAUSED: 1,
  ANIMATING: 2,
};
exports.BlockBubbleShowInfo = {
  NONE: 0,
  DISPLAYNAME: 1,
  CLEANMODE: 2,
  CLEANSEQUENCE: 4,
};
exports.buttonConfig = {
  areaTextColor: '#4A4A4A',
  rectColorSolid: '#FFFFFF',
  rectBgColor: '#FFFFFF66',
  rectBgColorNogo: '#FB080666',
  borderColorNogo: '#FB0806ff',
  rectBgColorMoppingNogo: '#F0E44266',
  borderColorMoppingNogo: '#F0E442ff',
  rectOperateBoarderColor: '#00000033',
  rectOperateBoarderDis: 16,
  rectFontColor: '#666666FF',
  rectBgColorCarpetNogo: '#65ACFA66',
  borderColorCarpetNogo: '#007AFF',
  rectSerial: {
    size: {
      height: 15,
      width: 11,
    },
  },
  rectBtn: {
    size: {
      height: 30,
      width: 30,
    },
  },
  rectDisplay: {
    size: {
      height: 6,
      width: 6,
    },
  },
  splitPointer: {
    size: {
      height: 19,
      width: 19,
    },
  },
};
exports.Config = {
  scale: {
    min: 1,
    max: 8,
    maxAndroid: 5,
  },
  center: {
    x: 512,
    y: 512,
  },
  size: {
    spot: 4,
    halo: 10,
    locating: 15,
    chargerRadius: 6.5,
    robotRadius: 8.8,
    robotDiameter: 8.8,
    objectsRadius: 6.8,
  },
  sleep: {
    near: 1.2,
    far: 1.5,
    extend: 0.3,
  },
  click: 500,
};
var H = {
  visible: false,
  isFocus: false,
  newAdded: false,
  angle: 0,
  initSize: {
    x: C,
    y: R,
    width: 10,
    height: 10,
    transform: new A({
      x: C,
      y: R,
    }),
  },
  maxLength: 200,
  minLength: 6,
};
exports.RectConfig = H;
var D = {
  visible: false,
  isFocus: false,
  serial: 1,
  initSize: {
    start_x: L,
    start_y: y,
    end_x: L + c,
    end_y: y,
  },
  angle: 0,
};
exports.wallConfig = D;
exports.DoorConfig = {
  df_width: 20,
  silde_df_height: 2,
  stone_df_height: 4,
  other_df_height: 3,
  max_count: 15,
};
exports.DoorSillType = {
  SmartSill: 1,
  RealSill: 2,
};
exports.MapElementShow = {
  NONE: 0,
  NAME_TAG: 1,
  CUSTOM_ORDER: 2,
  FLOOR_CARPET: 4,
  FURNITURE: 8,
  OBSTACLE: 16,
};
var W = {
  FT_UNKNOWN: 0,
  FT_TVCABINET: 43,
  FT_TOILET: 44,
  FT_BED: 45,
  FT_SOFA: 46,
  FT_DINNERTABLE: 47,
  FT_TEATABLE: 48,
  FT_SHOECABINET: 49,
  FT_NIGHTSTAND: 50,
  FT_WARDROBE: 51,
};
exports.FurnitureType = W;
var x = {
  BST_UNKNOWN: 0,
  BST_SINGLE: 1,
  BST_DOUBLE: 2,
};
exports.BedSubType = x;
var P = {
  SST_UNKNOWN: 0,
  SST_SINGLE: 1,
  SST_DOUBLE: 2,
  SST_THREE: 3,
  SST_SECTIONAL: 4,
  SST_SECTIONAL_LEFT: 5,
};
exports.SofaSubType = P;
var M = {
  TST_UNKNOWN: 0,
  TST_CIRCLE: 1,
  TST_RECT: 2,
};
exports.TableSubType = M;
o = {};
module50.default(
  o,
  W.FT_BED,
  ((_ = {
    iconImage: require('./1058'),
    hasSubtype: 1,
  }),
  module50.default(_, x.BST_SINGLE, {
    image: require('./1059'),
    title: module505.map_edit_furniture_single_bed,
    imageWidth: 33,
    imageHeight: 62,
    type: (W.FT_BED << 8) | x.BST_SINGLE,
  }),
  module50.default(_, x.BST_DOUBLE, {
    image: require('./1060'),
    title: module505.map_edit_furniture_double_bed,
    imageWidth: 43,
    imageHeight: 52,
    type: (W.FT_BED << 8) | x.BST_DOUBLE,
  }),
  _)
);
module50.default(
  o,
  W.FT_SOFA,
  ((T = {
    iconImage: require('./1061'),
    hasSubtype: 1,
  }),
  module50.default(T, P.SST_SINGLE, {
    image: require('./1062'),
    title: module505.map_edit_furniture_sofa_single,
    imageWidth: 40,
    imageHeight: 42,
    type: (W.FT_SOFA << 8) | P.SST_SINGLE,
  }),
  module50.default(T, P.SST_DOUBLE, {
    image: require('./1063'),
    title: module505.map_edit_furniture_sofa_double,
    imageWidth: 69,
    imageHeight: 32,
    type: (W.FT_SOFA << 8) | P.SST_DOUBLE,
  }),
  module50.default(T, P.SST_THREE, {
    image: require('./1064'),
    title: module505.map_edit_furniture_sofa_three,
    imageWidth: 70,
    imageHeight: 24,
    type: (W.FT_SOFA << 8) | P.SST_THREE,
  }),
  module50.default(T, P.SST_SECTIONAL, {
    image: require('./1065'),
    title: module505.map_edit_furniture_sofa_sectional,
    imageWidth: 70,
    imageHeight: 39,
    type: (W.FT_SOFA << 8) | P.SST_SECTIONAL,
  }),
  module50.default(T, P.SST_SECTIONAL_LEFT, {
    image: require('./1066'),
    title: module505.map_edit_furniture_sofa_sectional,
    imageWidth: 70,
    imageHeight: 39,
    type: (W.FT_SOFA << 8) | P.SST_SECTIONAL_LEFT,
  }),
  T)
);
module50.default(o, W.FT_DINNERTABLE, {
  iconImage: require('./1067'),
  hasSubtype: 0,
  image: require('./1068'),
  title: module505.map_edit_furniture_dinner_table,
  imageWidth: 55,
  imageHeight: 44,
  type: W.FT_DINNERTABLE << 8,
});
module50.default(o, W.FT_TVCABINET, {
  iconImage: require('./1069'),
  hasSubtype: 0,
  image: require('./1070'),
  title: module505.map_edit_furniture_tv_cabinet,
  imageWidth: 50,
  imageHeight: 20,
  type: W.FT_TVCABINET << 8,
});
module50.default(
  o,
  W.FT_TEATABLE,
  ((n = {
    iconImage: require('./1067'),
    hasSubtype: 1,
  }),
  module50.default(n, M.TST_CIRCLE, {
    image: require('./1071'),
    title: module505.map_edit_furniture_tea_table,
    imageWidth: 42,
    imageHeight: 42,
    type: (W.FT_TEATABLE << 8) | M.TST_CIRCLE,
  }),
  module50.default(n, M.TST_RECT, {
    image: require('./1072'),
    title: module505.map_edit_furniture_rect_table,
    imageWidth: 42,
    imageHeight: 42,
    type: (W.FT_TEATABLE << 8) | M.TST_RECT,
  }),
  n)
);
module50.default(o, W.FT_SHOECABINET, {
  hasSubtype: 0,
  image: require('./1073'),
  title: module505.map_edit_furniture_shoe_cabinet,
  imageWidth: 62,
  imageHeight: 27,
  type: W.FT_SHOECABINET << 8,
});
module50.default(o, W.FT_WARDROBE, {
  hasSubtype: 0,
  image: require('./1074'),
  title: module505.map_edit_furniture_wardrobe,
  imageWidth: 68,
  imageHeight: 32,
  type: W.FT_WARDROBE << 8,
});
module50.default(o, W.FT_NIGHTSTAND, {
  hasSubtype: 0,
  image: require('./1075'),
  title: module505.map_edit_furniture_night_stand,
  imageWidth: 30,
  imageHeight: 36,
  type: W.FT_NIGHTSTAND << 8,
});
module50.default(o, W.FT_TOILET, {
  iconImage: require('./1076'),
  hasSubtype: 0,
  image: require('./1076'),
  title: module505.map_edit_furniture_toilet,
  imageWidth: 15,
  imageHeight: 15,
  type: W.FT_TOILET << 8,
});
var U = o;
exports.FurnitureResource = U;
h = {};
module50.default(h, W.FT_UNKNOWN, {
  minWidth: 24,
  maxWidth: 48,
  minHeight: 16,
  maxHeight: 16,
});
module50.default(
  h,
  W.FT_BED,
  ((l = {
    hasSubtype: 1,
  }),
  module50.default(l, x.BST_UNKNOWN, {
    minWidth: 24,
    maxWidth: 44,
    minHeight: 38,
    maxHeight: 42,
  }),
  module50.default(l, x.BST_DOUBLE, {
    minWidth: 24,
    maxWidth: 48,
    minHeight: 38,
    maxHeight: 48,
  }),
  module50.default(l, x.BST_SINGLE, {
    minWidth: 16,
    maxWidth: 24,
    minHeight: 38,
    maxHeight: 48,
  }),
  l)
);
module50.default(
  h,
  W.FT_SOFA,
  ((u = {
    hasSubtype: 1,
  }),
  module50.default(u, P.SST_UNKNOWN, {
    minWidth: 20,
    maxWidth: 40,
    minHeight: 16,
    maxHeight: 20,
  }),
  module50.default(u, P.SST_SINGLE, {
    minWidth: 16,
    maxWidth: 20,
    minHeight: 16,
    maxHeight: 20,
  }),
  module50.default(u, P.SST_DOUBLE, {
    minWidth: 20,
    maxWidth: 40,
    minHeight: 16,
    maxHeight: 20,
  }),
  module50.default(u, P.SST_THREE, {
    minWidth: 40,
    maxWidth: 70,
    minHeight: 16,
    maxHeight: 20,
  }),
  module50.default(u, P.SST_SECTIONAL, {
    minWidth: 40,
    maxWidth: 80,
    minHeight: 16,
    maxHeight: 30,
  }),
  module50.default(u, P.SST_SECTIONAL_LEFT, {
    minWidth: 40,
    maxWidth: 80,
    minHeight: 16,
    maxHeight: 30,
  }),
  u)
);
module50.default(h, W.FT_DINNERTABLE, {
  minWidth: 24,
  maxWidth: 48,
  minHeight: 16,
  maxHeight: 30,
});
module50.default(h, W.FT_TVCABINET, {
  minWidth: 20,
  maxWidth: 50,
  minHeight: 8,
  maxHeight: 16,
});
module50.default(
  h,
  W.FT_TEATABLE,
  ((E = {
    hasSubtype: 1,
  }),
  module50.default(E, M.TST_UNKNOWN, {
    minWidth: 12,
    maxWidth: 24,
    minHeight: 12,
    maxHeight: 18,
  }),
  module50.default(E, M.TST_CIRCLE, {
    minWidth: 12,
    maxWidth: 24,
    minHeight: 12,
    maxHeight: 18,
  }),
  module50.default(E, M.TST_RECT, {
    minWidth: 8,
    maxWidth: 30,
    minHeight: 8,
    maxHeight: 30,
  }),
  E)
);
module50.default(h, W.FT_SHOECABINET, {
  minWidth: 10,
  maxWidth: 20,
  minHeight: 6,
  maxHeight: 8,
});
module50.default(h, W.FT_WARDROBE, {
  minWidth: 20,
  maxWidth: 50,
  minHeight: 8,
  maxHeight: 14,
});
module50.default(h, W.FT_NIGHTSTAND, {
  minWidth: 8,
  maxWidth: 12,
  minHeight: 8,
  maxHeight: 12,
});
module50.default(h, W.FT_TOILET, {
  minWidth: 10,
  maxWidth: 10,
  minHeight: 15,
  maxHeight: 15,
});
var w = h;
Object.freeze(w);
var module1098 = {
  1: {
    name: module505.map_edit_zone_tag_bedroom,
    image: require('./1077'),
    fan_power: 101,
    warter_mode: 201,
    bubble_image: require('./1078'),
  },
  2: {
    name: module505.map_edit_zone_tag_masterbedroom,
    image: require('./1079'),
    fan_power: 101,
    warter_mode: 201,
    bubble_image: require('./1080'),
  },
  3: {
    name: module505.map_edit_zone_tag_geustbedroom,
    image: require('./1081'),
    fan_power: 101,
    warter_mode: 201,
    bubble_image: require('./1082'),
  },
  6: {
    name: module505.map_edit_zone_tag_livingroom,
    image: require('./1083'),
    fan_power: 102,
    warter_mode: 202,
    bubble_image: require('./1084'),
  },
  7: {
    name: module505.map_edit_zone_tag_balcony,
    image: require('./1085'),
    fan_power: 102,
    warter_mode: 202,
    bubble_image: require('./1086'),
  },
  8: {
    name: module505.map_edit_zone_tag_vestibule,
    image: require('./1087'),
    fan_power: 103,
    warter_mode: 202,
    bubble_image: require('./1088'),
  },
  9: {
    name: module505.map_edit_zone_tag_study,
    image: require('./1089'),
    fan_power: 102,
    warter_mode: 202,
    bubble_image: require('./1090'),
  },
  12: {
    name: module505.map_edit_floor_other,
    image: require('./1091'),
    fan_power: 102,
    warter_mode: 202,
    bubble_image: require('./1092'),
  },
  13: {
    name: module505.map_edit_zone_tag_diningroom,
    image: require('./1093'),
    fan_power: 103,
    warter_mode: 203,
    bubble_image: require('./1094'),
  },
  14: {
    name: module505.map_edit_zone_tag_kitchen,
    image: require('./1095'),
    fan_power: 103,
    warter_mode: 203,
    bubble_image: require('./1096'),
  },
  15: {
    name: module505.map_edit_zone_tag_toilet,
    image: require('./1097'),
    fan_power: 102,
    warter_mode: 203,
    bubble_image: require('./1098'),
  },
};
exports.RoomTagInfo = module1098;
Object.freeze(module1098);
exports.DisplayRoomTag = [1, 6, 14, 13, 15, 7, 2, 3, 8, 9, 12];
var module1104 = {
  Charged: require('./1099'),
  Charging: require('./1099'),
  Locating: require('./1100'),
  Sleeping: require('./1101'),
  Waiting: require('./1100'),
  Warning: require('./1102'),
  Washingdust: require('./1103'),
  Collectdust: require('./1104'),
};
exports.MapAnimates = module1104;
var v = {
  Unknown: -1,
  Normal: 0,
  Onyx1: 1,
  Onyx2: 2,
  Onyx3: 3,
  Garnet: 4,
  OnyxC: 5,
};
exports.DockType = v;
p = {};
module50.default(p, v.Normal, {
  name: module505.charger_type_name_normal,
  chargerIcon: require('./1105'),
  chargerBubbleIcon: require('./1106'),
});
module50.default(p, v.Garnet, {
  name: module505.charger_type_name_garnet,
  chargerIcon: require('./1107'),
  chargerBubbleIcon: require('./1108'),
});
module50.default(p, v.Onyx1, {
  name: module505.charger_type_name_collect_dust,
  chargerIcon: require('./1109'),
  chargerBubbleIcon: require('./1110'),
});
module50.default(p, v.Onyx2, {
  name: module505.charger_type_name_o2,
  chargerIcon: require('./1111'),
  chargerBubbleIcon: require('./1112'),
});
module50.default(p, v.Onyx3, {
  name: module505.charger_type_name_o3,
  chargerIcon: require('./1113'),
  chargerBubbleIcon: require('./1114'),
});
var Z = p;
exports.DockTypeRes = Z;
var k = {
  Carpet: 'Carpet',
  DoorSill: 'DoorSill',
  StuckZone: 'StuckZone',
  CliffZone: 'CliffZone',
};
exports.AIInfoPageType = k;
S = {};
module50.default(S, k.Carpet, {
  title: module505.carpet_bubble_name,
  image: require('./461'),
  detail: null,
});
module50.default(S, k.DoorSill, {
  title: module505.map_edit_door_sill_title2,
  image: require('./1115'),
  detail: module505.map_edit_door_sill_detail,
});
module50.default(S, k.StuckZone, {
  title: module505.map_edit_stuck_zone_title2,
  image: require('./1116'),
  detail: module505.map_edit_stuck_zone_detail,
});
module50.default(S, k.CliffZone, {
  title: module505.map_edit_cliff_zone_title2,
  image: require('./1117'),
  detail: module505.map_edit_cliff_zone_detail,
});
var Y = S;
exports.AIInfoPageBackRes = Y;
var K = {
  BT_NONE: 0,
  BT_CLIFF: 1,
  BT_DOORSILL: 2,
  BT_STUCK: 4,
  BT_CARPET: 8,
};
exports.SmartBubbleType = K;
f = {};
module50.default(f, K.BT_NONE, {
  guideTxt: '',
  pageType: null,
  pageTitle: null,
  bubbleImg: null,
});
module50.default(f, K.BT_CLIFF, {
  guideTxt: module505.map_cliff_zone_guide_text,
  pageType: k.CliffZone,
  pageTitle: module505.map_edit_cliff_zone_title,
  bubbleImg: require('./1118'),
});
module50.default(f, K.BT_DOORSILL, {
  guideTxt: module505.map_door_sill_guide_text,
  pageType: k.DoorSill,
  pageTitle: module505.map_edit_door_sill_title,
  bubbleImg: require('./1118'),
});
module50.default(f, K.BT_STUCK, {
  guideTxt: module505.map_stuck_point_guide_text,
  pageType: k.StuckZone,
  pageTitle: module505.map_edit_stuck_zone_title,
  bubbleImg: require('./1118'),
});
module50.default(f, K.BT_CARPET, {
  guideTxt: '',
  pageType: k.Carpet,
  pageTitle: module505.carpet_bubble_name,
  bubbleImg: require('./1119'),
});
var V = f;
exports.SmartBubbleConfig = V;
var X = new Map([
  [3, ['path']],
  [6, ['zones', ['zones']]],
  [11, ['blocks', ['blocks']]],
  [15, ['obstacles', ['obstacles']]],
  [16, ['ignoredObstacles', ['obstacles']]],
  [24, ['floorMap', ['data']]],
  [25, ['furnitures', ['data', 'hide']]],
  [27, ['enemies', ['data']]],
  [29, ['stuckpts', ['data']]],
  [30, ['clffbz', ['fbzs']]],
  [31, ['smartds', ['fbzs']]],
]);
exports.MapDyTypeMap = X;
