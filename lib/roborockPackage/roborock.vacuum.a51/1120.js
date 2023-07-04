exports.getFurnitureEdge = function (t, _) {
  var T = U[t];
  if (!T) return U[D.FT_UNKNOWN];

  if (T.hasSubtype) {
    var n = T[_];
    T = n || T[0];
  }

  return T;
};

exports.getFurnitureName = function (t, _) {
  var T = w[t];
  if (!T) return module510.localization_strings_Setting_General_index_0;

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
  h,
  E,
  p,
  f,
  S,
  module50 = require('./50'),
  module13 = require('./13'),
  A = module13.ART.Transform,
  module510 = require('./510').strings;

exports.RECT_SCALE_MIN_X = 0.33;
exports.RECT_SCALE_MIN_Y = 0.5;
exports.DEFAULT_RECT_MARGIN = 30;
exports.DEFAULT_FBZ_WIDTH = 10;
exports.DEFAULT_FBZ_HEIGHT = 10;
exports.DOCK_FORBIDDEN_R = 10;
exports.ROBOT_FORBIDDEN_R = 5;
exports.MAX_COUNT_WALL_OR_FBZ = 10;
exports.MAX_COUNT_ZONE_RECT = 5;
exports.EMPTY_MAP_SIZE = 100;
exports.MAX_BLOCK_NO = 32;
var N = module13.Dimensions.get('window'),
  I = N.height,
  s = N.width,
  C = s / 4.7;
exports.DEFAULT_FBZ_REALWIDTH = C;
var L = s / 4.7;
exports.DEFAULT_FBZ_REALHEIGHT = L;
var R = (s - C) / 2,
  B = (0.67 * I - 10) / 2,
  c = (s - C) / 2,
  W = (0.67 * I) / 2;
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
    chargerRadius: 10.4,
    chargerNormal: 4.8,
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
    x: R,
    y: B,
    width: 10,
    height: 10,
    transform: new A({
      x: R,
      y: B,
    }),
  },
  maxLength: 200,
  minLength: 6,
};
exports.RectConfig = H;
var y = {
  visible: false,
  isFocus: false,
  serial: 1,
  initSize: {
    start_x: c,
    start_y: W,
    end_x: c + C,
    end_y: W,
  },
  angle: 0,
};
exports.wallConfig = y;
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
var D = {
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
  FT_OPENCATTOILET: 52,
  FT_CATTOILET: 53,
  FT_PETCAGE: 54,
  FT_PETWATERLOO: 55,
  FT_PETBOWL: 56,
  FT_FLOORMIRROR: 57,
};
exports.FurnitureType = D;
var P = {
  BST_UNKNOWN: 0,
  BST_SINGLE: 1,
  BST_DOUBLE: 2,
};
exports.BedSubType = P;
var x = {
  SST_UNKNOWN: 0,
  SST_SINGLE: 1,
  SST_DOUBLE: 2,
  SST_THREE: 3,
  SST_SECTIONAL: 4,
  SST_SECTIONAL_LEFT: 5,
};
exports.SofaSubType = x;
var M = {
  TST_UNKNOWN: 0,
  TST_CIRCLE: 1,
  TST_RECT: 2,
};
exports.TableSubType = M;
o = {};
module50.default(
  o,
  D.FT_BED,
  ((_ = {
    iconImage: require('./1121'),
    hasSubtype: 1,
  }),
  module50.default(_, P.BST_SINGLE, {
    image: require('./1122'),
    title: module510.map_edit_furniture_single_bed,
    imageWidth: 33,
    imageHeight: 62,
    type: (D.FT_BED << 8) | P.BST_SINGLE,
  }),
  module50.default(_, P.BST_DOUBLE, {
    image: require('./1123'),
    title: module510.map_edit_furniture_double_bed,
    imageWidth: 43,
    imageHeight: 52,
    type: (D.FT_BED << 8) | P.BST_DOUBLE,
  }),
  _)
);
module50.default(
  o,
  D.FT_SOFA,
  ((T = {
    iconImage: require('./1124'),
    hasSubtype: 1,
  }),
  module50.default(T, x.SST_SINGLE, {
    image: require('./1125'),
    title: module510.map_edit_furniture_sofa_single,
    imageWidth: 40,
    imageHeight: 42,
    type: (D.FT_SOFA << 8) | x.SST_SINGLE,
  }),
  module50.default(T, x.SST_DOUBLE, {
    image: require('./1126'),
    title: module510.map_edit_furniture_sofa_double,
    imageWidth: 69,
    imageHeight: 32,
    type: (D.FT_SOFA << 8) | x.SST_DOUBLE,
  }),
  module50.default(T, x.SST_THREE, {
    image: require('./1127'),
    title: module510.map_edit_furniture_sofa_three,
    imageWidth: 70,
    imageHeight: 24,
    type: (D.FT_SOFA << 8) | x.SST_THREE,
  }),
  module50.default(T, x.SST_SECTIONAL, {
    image: require('./1128'),
    title: module510.map_edit_furniture_sofa_sectional,
    imageWidth: 70,
    imageHeight: 39,
    type: (D.FT_SOFA << 8) | x.SST_SECTIONAL,
  }),
  module50.default(T, x.SST_SECTIONAL_LEFT, {
    image: require('./1129'),
    title: module510.map_edit_furniture_sofa_sectional,
    imageWidth: 70,
    imageHeight: 39,
    type: (D.FT_SOFA << 8) | x.SST_SECTIONAL_LEFT,
  }),
  T)
);
module50.default(o, D.FT_DINNERTABLE, {
  iconImage: require('./1130'),
  hasSubtype: 0,
  image: require('./1131'),
  title: module510.map_edit_furniture_dinner_table,
  imageWidth: 55,
  imageHeight: 44,
  type: D.FT_DINNERTABLE << 8,
});
module50.default(o, D.FT_TVCABINET, {
  iconImage: require('./1132'),
  hasSubtype: 0,
  image: require('./1133'),
  title: module510.map_edit_furniture_tv_cabinet,
  imageWidth: 50,
  imageHeight: 20,
  type: D.FT_TVCABINET << 8,
});
module50.default(
  o,
  D.FT_TEATABLE,
  ((n = {
    iconImage: require('./1130'),
    hasSubtype: 1,
  }),
  module50.default(n, M.TST_CIRCLE, {
    image: require('./1134'),
    title: module510.map_edit_furniture_tea_table,
    imageWidth: 42,
    imageHeight: 42,
    type: (D.FT_TEATABLE << 8) | M.TST_CIRCLE,
  }),
  module50.default(n, M.TST_RECT, {
    image: require('./1135'),
    title: module510.map_edit_furniture_rect_table,
    imageWidth: 42,
    imageHeight: 42,
    type: (D.FT_TEATABLE << 8) | M.TST_RECT,
  }),
  n)
);
module50.default(o, D.FT_SHOECABINET, {
  hasSubtype: 0,
  image: require('./1136'),
  title: module510.map_edit_furniture_shoe_cabinet,
  imageWidth: 62,
  imageHeight: 27,
  type: D.FT_SHOECABINET << 8,
});
module50.default(o, D.FT_WARDROBE, {
  hasSubtype: 0,
  image: require('./1137'),
  title: module510.map_edit_furniture_wardrobe,
  imageWidth: 68,
  imageHeight: 32,
  type: D.FT_WARDROBE << 8,
});
module50.default(o, D.FT_NIGHTSTAND, {
  hasSubtype: 0,
  image: require('./1138'),
  title: module510.map_edit_furniture_night_stand,
  imageWidth: 30,
  imageHeight: 36,
  type: D.FT_NIGHTSTAND << 8,
});
module50.default(o, D.FT_TOILET, {
  iconImage: require('./1139'),
  hasSubtype: 0,
  image: require('./1139'),
  title: module510.map_edit_furniture_toilet,
  imageWidth: 15,
  imageHeight: 15,
  type: D.FT_TOILET << 8,
});
module50.default(o, D.FT_OPENCATTOILET, {
  iconImage: require('./1140'),
  hasSubtype: 0,
  image: require('./1141'),
  title: module510.map_edit_furniture_open_cattoilet,
  imageWidth: 64,
  imageHeight: 64,
  type: D.FT_OPENCATTOILET << 8,
});
module50.default(o, D.FT_CATTOILET, {
  iconImage: require('./1142'),
  hasSubtype: 0,
  image: require('./1143'),
  title: module510.map_edit_furniture_cat_toilet,
  imageWidth: 64,
  imageHeight: 64,
  type: D.FT_CATTOILET << 8,
});
module50.default(o, D.FT_PETCAGE, {
  iconImage: require('./1144'),
  hasSubtype: 0,
  image: require('./1145'),
  title: module510.map_edit_furniture_pet_cage,
  imageWidth: 64,
  imageHeight: 64,
  type: D.FT_PETCAGE << 8,
});
module50.default(o, D.FT_PETWATERLOO, {
  iconImage: require('./1146'),
  hasSubtype: 0,
  image: require('./1147'),
  title: module510.map_edit_furniture_pet_waterloo,
  imageWidth: 64,
  imageHeight: 64,
  type: D.FT_PETWATERLOO << 8,
});
module50.default(o, D.FT_PETBOWL, {
  iconImage: require('./1148'),
  hasSubtype: 0,
  image: require('./1149'),
  title: module510.map_edit_furniture_pet_bowl,
  imageWidth: 64,
  imageHeight: 64,
  type: D.FT_PETBOWL << 8,
});
module50.default(o, D.FT_FLOORMIRROR, {
  hasSubtype: 0,
  image: require('./1150'),
  title: module510.map_edit_furniture_floor_mirror,
  imageWidth: 60,
  imageHeight: 60,
  type: D.FT_FLOORMIRROR << 8,
});
var w = o;
exports.FurnitureResource = w;
E = {};
module50.default(E, D.FT_UNKNOWN, {
  minWidth: 24,
  maxWidth: 48,
  minHeight: 16,
  maxHeight: 16,
});
module50.default(
  E,
  D.FT_BED,
  ((l = {
    hasSubtype: 1,
  }),
  module50.default(l, P.BST_UNKNOWN, {
    minWidth: 24,
    maxWidth: 44,
    minHeight: 38,
    maxHeight: 42,
  }),
  module50.default(l, P.BST_DOUBLE, {
    minWidth: 24,
    maxWidth: 48,
    minHeight: 38,
    maxHeight: 48,
  }),
  module50.default(l, P.BST_SINGLE, {
    minWidth: 16,
    maxWidth: 24,
    minHeight: 38,
    maxHeight: 48,
  }),
  l)
);
module50.default(
  E,
  D.FT_SOFA,
  ((u = {
    hasSubtype: 1,
  }),
  module50.default(u, x.SST_UNKNOWN, {
    minWidth: 20,
    maxWidth: 40,
    minHeight: 16,
    maxHeight: 20,
  }),
  module50.default(u, x.SST_SINGLE, {
    minWidth: 16,
    maxWidth: 20,
    minHeight: 16,
    maxHeight: 20,
  }),
  module50.default(u, x.SST_DOUBLE, {
    minWidth: 20,
    maxWidth: 40,
    minHeight: 16,
    maxHeight: 20,
  }),
  module50.default(u, x.SST_THREE, {
    minWidth: 40,
    maxWidth: 70,
    minHeight: 16,
    maxHeight: 20,
  }),
  module50.default(u, x.SST_SECTIONAL, {
    minWidth: 40,
    maxWidth: 80,
    minHeight: 16,
    maxHeight: 30,
  }),
  module50.default(u, x.SST_SECTIONAL_LEFT, {
    minWidth: 40,
    maxWidth: 80,
    minHeight: 16,
    maxHeight: 30,
  }),
  u)
);
module50.default(E, D.FT_DINNERTABLE, {
  minWidth: 24,
  maxWidth: 48,
  minHeight: 16,
  maxHeight: 30,
});
module50.default(E, D.FT_TVCABINET, {
  minWidth: 20,
  maxWidth: 50,
  minHeight: 8,
  maxHeight: 16,
});
module50.default(
  E,
  D.FT_TEATABLE,
  ((h = {
    hasSubtype: 1,
  }),
  module50.default(h, M.TST_UNKNOWN, {
    minWidth: 12,
    maxWidth: 24,
    minHeight: 12,
    maxHeight: 18,
  }),
  module50.default(h, M.TST_CIRCLE, {
    minWidth: 12,
    maxWidth: 24,
    minHeight: 12,
    maxHeight: 18,
  }),
  module50.default(h, M.TST_RECT, {
    minWidth: 8,
    maxWidth: 30,
    minHeight: 8,
    maxHeight: 30,
  }),
  h)
);
module50.default(E, D.FT_SHOECABINET, {
  minWidth: 10,
  maxWidth: 20,
  minHeight: 6,
  maxHeight: 8,
});
module50.default(E, D.FT_WARDROBE, {
  minWidth: 20,
  maxWidth: 50,
  minHeight: 8,
  maxHeight: 14,
});
module50.default(E, D.FT_NIGHTSTAND, {
  minWidth: 8,
  maxWidth: 12,
  minHeight: 8,
  maxHeight: 12,
});
module50.default(E, D.FT_TOILET, {
  minWidth: 10,
  maxWidth: 10,
  minHeight: 15,
  maxHeight: 15,
});
module50.default(E, D.FT_OPENCATTOILET, {
  minWidth: 7,
  maxWidth: 10,
  minHeight: 10,
  maxHeight: 14,
});
module50.default(E, D.FT_CATTOILET, {
  minWidth: 7,
  maxWidth: 10,
  minHeight: 10,
  maxHeight: 14,
});
module50.default(E, D.FT_PETCAGE, {
  minWidth: 8,
  maxWidth: 20,
  minHeight: 8,
  maxHeight: 16,
});
module50.default(E, D.FT_PETWATERLOO, {
  minWidth: 8,
  maxWidth: 20,
  minHeight: 8,
  maxHeight: 16,
});
module50.default(E, D.FT_PETBOWL, {
  minWidth: 6,
  maxWidth: 12,
  minHeight: 3,
  maxHeight: 6,
});
module50.default(E, D.FT_FLOORMIRROR, {
  minWidth: 8,
  maxWidth: 16,
  minHeight: 6,
  maxHeight: 10,
});
var U = E;
Object.freeze(U);
var module1172 = {
  1: {
    name: module510.map_edit_zone_tag_bedroom,
    image: require('./1151'),
    fan_power: 101,
    warter_mode: 201,
    bubble_image: require('./1152'),
  },
  2: {
    name: module510.map_edit_zone_tag_masterbedroom,
    image: require('./1153'),
    fan_power: 101,
    warter_mode: 201,
    bubble_image: require('./1154'),
  },
  3: {
    name: module510.map_edit_zone_tag_geustbedroom,
    image: require('./1155'),
    fan_power: 101,
    warter_mode: 201,
    bubble_image: require('./1156'),
  },
  6: {
    name: module510.map_edit_zone_tag_livingroom,
    image: require('./1157'),
    fan_power: 102,
    warter_mode: 202,
    bubble_image: require('./1158'),
  },
  7: {
    name: module510.map_edit_zone_tag_balcony,
    image: require('./1159'),
    fan_power: 102,
    warter_mode: 202,
    bubble_image: require('./1160'),
  },
  8: {
    name: module510.map_edit_zone_tag_vestibule,
    image: require('./1161'),
    fan_power: 103,
    warter_mode: 202,
    bubble_image: require('./1162'),
  },
  9: {
    name: module510.map_edit_zone_tag_study,
    image: require('./1163'),
    fan_power: 102,
    warter_mode: 202,
    bubble_image: require('./1164'),
  },
  12: {
    name: module510.map_edit_floor_other,
    image: require('./1165'),
    fan_power: 102,
    warter_mode: 202,
    bubble_image: require('./1166'),
  },
  13: {
    name: module510.map_edit_zone_tag_diningroom,
    image: require('./1167'),
    fan_power: 103,
    warter_mode: 203,
    bubble_image: require('./1168'),
  },
  14: {
    name: module510.map_edit_zone_tag_kitchen,
    image: require('./1169'),
    fan_power: 103,
    warter_mode: 203,
    bubble_image: require('./1170'),
  },
  15: {
    name: module510.map_edit_zone_tag_toilet,
    image: require('./1171'),
    fan_power: 102,
    warter_mode: 203,
    bubble_image: require('./1172'),
  },
};
exports.RoomTagInfo = module1172;
Object.freeze(module1172);
exports.DisplayRoomTag = [1, 6, 14, 13, 15, 7, 2, 3, 8, 9, 12];
var module1179 = {
  Charged: require('./1173'),
  Charging: require('./1173'),
  Locating: require('./1174'),
  Sleeping: require('./1175'),
  Waiting: require('./1174'),
  Warning: require('./1176'),
  Washingdust: require('./1177'),
  Collectdust: require('./1178'),
  WashingdustPearl: require('./1179'),
};
exports.MapAnimates = module1179;
var v = {
  Other: -1,
  Normal: 0,
};
exports.DockType = v;
p = {};
module50.default(p, v.Normal, {
  name: module510.charger_type_name_normal,
  type: v.Normal,
  chargerIcon: require('./1180'),
  chargerBubbleIcon: require('./1181'),
});
module50.default(p, v.Other, {
  name: module510.charger_type_name_special,
  type: v.Other,
  chargerIcon: require('./1182'),
  chargerBubbleIcon: require('./1183'),
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
f = {};
module50.default(f, k.Carpet, {
  title: module510.carpet_bubble_name,
  image: require('./461'),
  detail: null,
});
module50.default(f, k.DoorSill, {
  title: module510.map_edit_door_sill_title2,
  image: require('./1184'),
  detail: module510.map_edit_door_sill_detail,
});
module50.default(f, k.StuckZone, {
  title: module510.map_edit_stuck_zone_title2,
  image: require('./1185'),
  detail: module510.map_edit_stuck_zone_detail,
});
module50.default(f, k.CliffZone, {
  title: module510.map_edit_cliff_zone_title2,
  image: require('./1186'),
  detail: module510.map_edit_cliff_zone_detail,
});
var K = f;
exports.AIInfoPageBackRes = K;
var Y = {
  BT_NONE: 0,
  BT_CLIFF: 1,
  BT_DOORSILL: 2,
  BT_STUCK: 4,
  BT_CARPET: 8,
};
exports.SmartBubbleType = Y;
S = {};
module50.default(S, Y.BT_NONE, {
  guideTxt: '',
  pageType: null,
  pageTitle: null,
  bubbleImg: null,
});
module50.default(S, Y.BT_CLIFF, {
  guideTxt: module510.map_cliff_zone_guide_text,
  pageType: k.CliffZone,
  pageTitle: module510.map_edit_cliff_zone_title,
  bubbleImg: require('./1187'),
});
module50.default(S, Y.BT_DOORSILL, {
  guideTxt: module510.map_door_sill_guide_text,
  pageType: k.DoorSill,
  pageTitle: module510.map_edit_door_sill_title,
  bubbleImg: require('./1188'),
});
module50.default(S, Y.BT_STUCK, {
  guideTxt: module510.map_stuck_point_guide_text,
  pageType: k.StuckZone,
  pageTitle: module510.map_edit_stuck_zone_title,
  bubbleImg: require('./1187'),
});
module50.default(S, Y.BT_CARPET, {
  guideTxt: '',
  pageType: k.Carpet,
  pageTitle: module510.carpet_bubble_name,
  bubbleImg: require('./1189'),
});
var V = S;
exports.SmartBubbleConfig = V;

var module1190 = require('./1190');

exports.MapAITag = module1190;
var j = new Map([
  [3, ['path', 500]],
  [6, ['zones', ['zones'], 50]],
  [11, ['blocks', ['blocks'], 50]],
  [15, ['obstacles', ['obstacles'], 80]],
  [16, ['ignoredObstacles', ['obstacles'], 80]],
  [24, ['floorMap', ['data'], 32]],
  [25, ['furnitures', ['data', 'hide'], 100]],
  [27, ['enemies', ['data'], 5]],
  [29, ['stuckpts', ['data'], 50]],
  [30, ['clffbz', ['fbzs'], 50]],
  [31, ['smartds', ['fbzs'], 50]],
  [21, ['smartZones', ['smartZones'], 50]],
]);
exports.MapDyTypeMap = j;
