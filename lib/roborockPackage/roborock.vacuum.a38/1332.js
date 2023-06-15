exports.getFurnitureEdge = function (t, _) {
  var T = M[t];
  if (!T) return M[FT_UNKNOWN];

  if (T.hasSubtype) {
    var n = T[_];
    T = n || T[0];
  }

  return T;
};

exports.getFurnitureName = function (t, _) {
  var T = P[t];
  if (!T) return module500.localization_strings_Setting_General_index_0;

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
  E,
  h,
  u,
  l,
  S,
  module50 = require('./50'),
  module12 = require('./12'),
  A = module12.ART.Transform,
  module500 = require('./500').strings;

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
var f = module12.Dimensions.get('window'),
  I = f.height,
  b = f.width,
  O = b / 4.7;
exports.DEFAULT_FBZ_REALWIDTH = O;
var B = b / 4.7;
exports.DEFAULT_FBZ_REALHEIGHT = B;
var c = (b - O) / 2,
  C = (0.67 * I - 10) / 2,
  H = (b - O) / 2,
  L = (0.67 * I) / 2;
exports.MAX_FURNITURE_EDIT_MIAPP = 10;
exports.PanStatus = {
  MAP_VIEWING_MOVED: 'map_viewing_moved',
  MAP_VIEWING_SCALED: 'map_viewing_scaled',
  MAP_VIEWING_FIT: 'map_viewing_fit',
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
var R = {
  visible: false,
  isFocus: false,
  newAdded: false,
  angle: 0,
  initSize: {
    x: c,
    y: C,
    width: 10,
    height: 10,
    transform: new A({
      x: c,
      y: C,
    }),
  },
  maxLength: 200,
  minLength: 6,
};
exports.RectConfig = R;
var s = {
  visible: false,
  isFocus: false,
  serial: 1,
  initSize: {
    start_x: H,
    start_y: L,
    end_x: H + O,
    end_y: L,
  },
  angle: 0,
};
exports.wallConfig = s;
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
var y = {
  BST_UNKNOWN: 0,
  BST_SINGLE: 1,
  BST_DOUBLE: 2,
};
exports.BedSubType = y;
var D = {
  SST_UNKNOWN: 0,
  SST_SINGLE: 1,
  SST_DOUBLE: 2,
  SST_THREE: 3,
  SST_SECTIONAL: 4,
  SST_SECTIONAL_LEFT: 5,
};
exports.SofaSubType = D;
var x = {
  TST_UNKNOWN: 0,
  TST_CIRCLE: 1,
  TST_RECT: 2,
};
exports.TableSubType = x;
o = {};
module50.default(
  o,
  W.FT_BED,
  ((_ = {
    iconImage: require('./1333'),
    hasSubtype: 1,
  }),
  module50.default(_, y.BST_SINGLE, {
    image: require('./1334'),
    title: module500.map_edit_furniture_single_bed,
    imageWidth: 33,
    imageHeight: 62,
    type: (W.FT_BED << 8) | y.BST_SINGLE,
  }),
  module50.default(_, y.BST_DOUBLE, {
    image: require('./1335'),
    title: module500.map_edit_furniture_double_bed,
    imageWidth: 43,
    imageHeight: 52,
    type: (W.FT_BED << 8) | y.BST_DOUBLE,
  }),
  _)
);
module50.default(
  o,
  W.FT_SOFA,
  ((T = {
    iconImage: require('./1336'),
    hasSubtype: 1,
  }),
  module50.default(T, D.SST_SINGLE, {
    image: require('./1337'),
    title: module500.map_edit_furniture_sofa_single,
    imageWidth: 40,
    imageHeight: 42,
    type: (W.FT_SOFA << 8) | D.SST_SINGLE,
  }),
  module50.default(T, D.SST_DOUBLE, {
    image: require('./1338'),
    title: module500.map_edit_furniture_sofa_double,
    imageWidth: 69,
    imageHeight: 32,
    type: (W.FT_SOFA << 8) | D.SST_DOUBLE,
  }),
  module50.default(T, D.SST_THREE, {
    image: require('./1339'),
    title: module500.map_edit_furniture_sofa_three,
    imageWidth: 70,
    imageHeight: 24,
    type: (W.FT_SOFA << 8) | D.SST_THREE,
  }),
  module50.default(T, D.SST_SECTIONAL, {
    image: require('./1340'),
    title: module500.map_edit_furniture_sofa_sectional,
    imageWidth: 70,
    imageHeight: 39,
    type: (W.FT_SOFA << 8) | D.SST_SECTIONAL,
  }),
  module50.default(T, D.SST_SECTIONAL_LEFT, {
    image: require('./1341'),
    title: module500.map_edit_furniture_sofa_sectional,
    imageWidth: 70,
    imageHeight: 39,
    type: (W.FT_SOFA << 8) | D.SST_SECTIONAL_LEFT,
  }),
  T)
);
module50.default(o, W.FT_DINNERTABLE, {
  iconImage: require('./1342'),
  hasSubtype: 0,
  image: require('./1343'),
  title: module500.map_edit_furniture_dinner_table,
  imageWidth: 55,
  imageHeight: 44,
  type: W.FT_DINNERTABLE << 8,
});
module50.default(o, W.FT_TVCABINET, {
  iconImage: require('./1344'),
  hasSubtype: 0,
  image: require('./1345'),
  title: module500.map_edit_furniture_tv_cabinet,
  imageWidth: 50,
  imageHeight: 20,
  type: W.FT_TVCABINET << 8,
});
module50.default(
  o,
  W.FT_TEATABLE,
  ((n = {
    iconImage: require('./1342'),
    hasSubtype: 1,
  }),
  module50.default(n, x.TST_CIRCLE, {
    image: require('./1346'),
    title: module500.map_edit_furniture_tea_table,
    imageWidth: 42,
    imageHeight: 42,
    type: (W.FT_TEATABLE << 8) | x.TST_CIRCLE,
  }),
  module50.default(n, x.TST_RECT, {
    image: require('./1347'),
    title: module500.map_edit_furniture_rect_table,
    imageWidth: 42,
    imageHeight: 42,
    type: (W.FT_TEATABLE << 8) | x.TST_RECT,
  }),
  n)
);
module50.default(o, W.FT_SHOECABINET, {
  hasSubtype: 0,
  image: require('./1348'),
  title: module500.map_edit_furniture_shoe_cabinet,
  imageWidth: 62,
  imageHeight: 27,
  type: W.FT_SHOECABINET << 8,
});
module50.default(o, W.FT_WARDROBE, {
  hasSubtype: 0,
  image: require('./1349'),
  title: module500.map_edit_furniture_wardrobe,
  imageWidth: 68,
  imageHeight: 32,
  type: W.FT_WARDROBE << 8,
});
module50.default(o, W.FT_NIGHTSTAND, {
  hasSubtype: 0,
  image: require('./1350'),
  title: module500.map_edit_furniture_night_stand,
  imageWidth: 30,
  imageHeight: 36,
  type: W.FT_NIGHTSTAND << 8,
});
module50.default(o, W.FT_TOILET, {
  iconImage: require('./1351'),
  hasSubtype: 0,
  image: require('./1351'),
  title: module500.map_edit_furniture_toilet,
  imageWidth: 15,
  imageHeight: 15,
  type: W.FT_TOILET << 8,
});
var P = o;
exports.FurnitureResource = P;
l = {};
module50.default(l, W.FT_UNKNOWN, {
  minWidth: 24,
  maxWidth: 48,
  minHeight: 16,
  maxHeight: 16,
});
module50.default(
  l,
  W.FT_BED,
  ((E = {
    hasSubtype: 1,
  }),
  module50.default(E, y.BST_UNKNOWN, {
    minWidth: 24,
    maxWidth: 44,
    minHeight: 38,
    maxHeight: 42,
  }),
  module50.default(E, y.BST_DOUBLE, {
    minWidth: 24,
    maxWidth: 48,
    minHeight: 38,
    maxHeight: 48,
  }),
  module50.default(E, y.BST_SINGLE, {
    minWidth: 16,
    maxWidth: 24,
    minHeight: 38,
    maxHeight: 48,
  }),
  E)
);
module50.default(
  l,
  W.FT_SOFA,
  ((h = {
    hasSubtype: 1,
  }),
  module50.default(h, D.SST_UNKNOWN, {
    minWidth: 20,
    maxWidth: 40,
    minHeight: 16,
    maxHeight: 20,
  }),
  module50.default(h, D.SST_SINGLE, {
    minWidth: 16,
    maxWidth: 20,
    minHeight: 16,
    maxHeight: 20,
  }),
  module50.default(h, D.SST_DOUBLE, {
    minWidth: 20,
    maxWidth: 40,
    minHeight: 16,
    maxHeight: 20,
  }),
  module50.default(h, D.SST_THREE, {
    minWidth: 40,
    maxWidth: 70,
    minHeight: 16,
    maxHeight: 20,
  }),
  module50.default(h, D.SST_SECTIONAL, {
    minWidth: 40,
    maxWidth: 80,
    minHeight: 16,
    maxHeight: 30,
  }),
  module50.default(h, D.SST_SECTIONAL_LEFT, {
    minWidth: 40,
    maxWidth: 80,
    minHeight: 16,
    maxHeight: 30,
  }),
  h)
);
module50.default(l, W.FT_DINNERTABLE, {
  minWidth: 24,
  maxWidth: 48,
  minHeight: 16,
  maxHeight: 30,
});
module50.default(l, W.FT_TVCABINET, {
  minWidth: 20,
  maxWidth: 50,
  minHeight: 8,
  maxHeight: 16,
});
module50.default(
  l,
  W.FT_TEATABLE,
  ((u = {
    hasSubtype: 1,
  }),
  module50.default(u, x.TST_UNKNOWN, {
    minWidth: 12,
    maxWidth: 24,
    minHeight: 12,
    maxHeight: 18,
  }),
  module50.default(u, x.TST_CIRCLE, {
    minWidth: 12,
    maxWidth: 24,
    minHeight: 12,
    maxHeight: 18,
  }),
  module50.default(u, x.TST_RECT, {
    minWidth: 8,
    maxWidth: 30,
    minHeight: 8,
    maxHeight: 30,
  }),
  u)
);
module50.default(l, W.FT_SHOECABINET, {
  minWidth: 10,
  maxWidth: 20,
  minHeight: 6,
  maxHeight: 8,
});
module50.default(l, W.FT_WARDROBE, {
  minWidth: 20,
  maxWidth: 50,
  minHeight: 8,
  maxHeight: 14,
});
module50.default(l, W.FT_NIGHTSTAND, {
  minWidth: 8,
  maxWidth: 12,
  minHeight: 8,
  maxHeight: 12,
});
module50.default(l, W.FT_TOILET, {
  minWidth: 10,
  maxWidth: 10,
  minHeight: 15,
  maxHeight: 15,
});
var M = l;
Object.freeze(M);
var module1373 = {
  1: {
    name: module500.map_edit_zone_tag_bedroom,
    image: require('./1352'),
    fan_power: 101,
    warter_mode: 201,
    bubble_image: require('./1353'),
  },
  2: {
    name: module500.map_edit_zone_tag_masterbedroom,
    image: require('./1354'),
    fan_power: 101,
    warter_mode: 201,
    bubble_image: require('./1355'),
  },
  3: {
    name: module500.map_edit_zone_tag_geustbedroom,
    image: require('./1356'),
    fan_power: 101,
    warter_mode: 201,
    bubble_image: require('./1357'),
  },
  6: {
    name: module500.map_edit_zone_tag_livingroom,
    image: require('./1358'),
    fan_power: 102,
    warter_mode: 202,
    bubble_image: require('./1359'),
  },
  7: {
    name: module500.map_edit_zone_tag_balcony,
    image: require('./1360'),
    fan_power: 102,
    warter_mode: 202,
    bubble_image: require('./1361'),
  },
  8: {
    name: module500.map_edit_zone_tag_vestibule,
    image: require('./1362'),
    fan_power: 103,
    warter_mode: 202,
    bubble_image: require('./1363'),
  },
  9: {
    name: module500.map_edit_zone_tag_study,
    image: require('./1364'),
    fan_power: 102,
    warter_mode: 202,
    bubble_image: require('./1365'),
  },
  12: {
    name: module500.map_edit_floor_other,
    image: require('./1366'),
    fan_power: 102,
    warter_mode: 202,
    bubble_image: require('./1367'),
  },
  13: {
    name: module500.map_edit_zone_tag_diningroom,
    image: require('./1368'),
    fan_power: 103,
    warter_mode: 203,
    bubble_image: require('./1369'),
  },
  14: {
    name: module500.map_edit_zone_tag_kitchen,
    image: require('./1370'),
    fan_power: 103,
    warter_mode: 203,
    bubble_image: require('./1371'),
  },
  15: {
    name: module500.map_edit_zone_tag_toilet,
    image: require('./1372'),
    fan_power: 102,
    warter_mode: 203,
    bubble_image: require('./1373'),
  },
};
exports.RoomTagInfo = module1373;
Object.freeze(module1373);
exports.DisplayRoomTag = [1, 6, 14, 13, 15, 7, 2, 3, 8, 9, 12];
var module1379 = {
  Charged: require('./1374'),
  Charging: require('./1374'),
  Locating: require('./1375'),
  Sleeping: require('./1376'),
  Waiting: require('./1375'),
  Warning: require('./1377'),
  Washingdust: require('./1378'),
  Collectdust: require('./1379'),
};
exports.MapAnimates = module1379;
var G = {
  Unknown: -1,
  Normal: 0,
  Onyx1: 1,
  Onyx2: 2,
  Onyx3: 3,
  Garnet: 4,
  OnyxC: 5,
};
exports.DockType = G;
S = {};
module50.default(S, G.Normal, {
  name: module500.charger_type_name_normal,
  chargerIcon: require('./1380'),
  chargerBubbleIcon: require('./1381'),
});
module50.default(S, G.Garnet, {
  name: module500.charger_type_name_garnet,
  chargerIcon: require('./1382'),
  chargerBubbleIcon: require('./1383'),
});
module50.default(S, G.Onyx1, {
  name: module500.charger_type_name_collect_dust,
  chargerIcon: require('./1384'),
  chargerBubbleIcon: require('./1385'),
});
module50.default(S, G.Onyx2, {
  name: module500.charger_type_name_o2,
  chargerIcon: require('./1386'),
  chargerBubbleIcon: require('./1387'),
});
module50.default(S, G.Onyx3, {
  name: module500.charger_type_name_o3,
  chargerIcon: require('./1388'),
  chargerBubbleIcon: require('./1389'),
});
var v = S;
exports.DockTypeRes = v;
