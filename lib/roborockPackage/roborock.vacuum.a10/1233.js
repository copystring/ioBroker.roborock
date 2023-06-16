var _,
  T,
  module49 = require('./49'),
  module12 = require('./12'),
  F = module12.ART.Transform,
  module491 = require('./491').strings;

exports.RECT_SCALE_MIN_X = 0.33;
exports.RECT_SCALE_MIN_Y = 0.5;
exports.DEFAULT_RECT_MARGIN = 30;
exports.DEFAULT_FBZ_WIDTH = 10;
exports.DEFAULT_FBZ_HEIGHT = 10;
exports.DOCK_FORBIDDEN_R = 10;
exports.ROBOT_FORBIDDEN_R = 5;
exports.MAX_COUNT_WALL_OR_FBZ = 10;
exports.EMPTY_MAP_WIDTH = 100;
exports.EMPTY_MAP_HEIGHT = 100;
var n = module12.Dimensions.get('window'),
  h = n.height,
  l = n.width,
  N = l / 4.7;
exports.DEFAULT_FBZ_REALWIDTH = N;
var I = l / 4.7;
exports.DEFAULT_FBZ_REALHEIGHT = I;
var u = (l - N) / 2,
  B = (0.67 * h - 10) / 2,
  p = (l - N) / 2,
  C = (0.67 * h) / 2;
exports.MAX_FURNITURE_EDIT_MIAPP = 10;
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
  carpetPaddingSide: 48,
  rectCarpetIgnore: {
    size: {
      height: 35,
      width: 60,
    },
  },
  rectSerial: {
    size: {
      height: 15,
      width: 11,
    },
  },
  rectDelete: {
    size: {
      height: 30,
      width: 30,
    },
  },
  rectScale: {
    size: {
      height: 30,
      width: 30,
    },
  },
  rectRotate: {
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
    chargerHeight: 6.5,
    chargerWidth: 6.5,
    robotRadius: 8.8,
    robotDiameter: 8.8,
  },
  sleep: {
    near: 1.2,
    far: 1.5,
    extend: 0.3,
  },
  click: 500,
};
var O = {
  visible: false,
  isFocus: false,
  newAdded: false,
  angle: 0,
  initSize: {
    x: u,
    y: B,
    width: 10,
    height: 10,
    transform: new F({
      x: u,
      y: B,
    }),
  },
  maxLength: 200,
  minLength: 6,
};
exports.RectConfig = O;
var L = {
  visible: false,
  isFocus: false,
  serial: 1,
  initSize: {
    start_x: p,
    start_y: C,
    end_x: p + N,
    end_y: C,
  },
  angle: 0,
};
exports.wallConfig = L;
var R = {
  FT_NONE: 0,
  FT_BED: 45,
  FT_SOFA: 46,
  FT_TVCABINET: 43,
  FT_DINNERTABLE: 47,
  FT_TOILET: 44,
  FT_TEATABLE: 48,
};
exports.FurnitureType = R;
_ = {};
module49.default(_, R.FT_BED, {
  image: require('./1234'),
  title: module491.map_edit_furniture_double_bed,
  imageWidth: 43,
  imageHeight: 52,
  type: R.FT_BED,
});
module49.default(_, R.FT_SOFA, {
  image: require('./1235'),
  title: module491.map_edit_furniture_sofa,
  imageWidth: 70,
  imageHeight: 24,
  type: R.FT_SOFA,
});
module49.default(_, R.FT_DINNERTABLE, {
  image: require('./1236'),
  title: module491.map_edit_furniture_dinner_table,
  imageWidth: 55,
  imageHeight: 44,
  type: R.FT_DINNERTABLE,
});
module49.default(_, R.FT_TVCABINET, {
  image: require('./1237'),
  title: module491.map_edit_furniture_tv_cabinet,
  imageWidth: 102,
  imageHeight: 27,
  type: R.FT_TVCABINET,
});
module49.default(_, R.FT_TEATABLE, {
  image: require('./1238'),
  title: module491.map_edit_furniture_tea_table,
  imageWidth: 42,
  imageHeight: 42,
  type: R.FT_TEATABLE,
});
module49.default(_, R.FT_TOILET, {
  image: require('./432'),
  title: module491.map_edit_furniture_toilet,
  imageWidth: 15,
  imageHeight: 15,
  type: R.FT_TOILET,
});
var D = _;
exports.FurnitureResource = D;
T = {};
module49.default(T, R.FT_BED, {
  minWidth: 20,
  maxWidth: 36,
  minHeight: 40,
  maxHeight: 40,
});
module49.default(T, R.FT_SOFA, {
  minWidth: 20,
  maxWidth: 40,
  minHeight: 16,
  maxHeight: 16,
});
module49.default(T, R.FT_TVCABINET, {
  minWidth: 8,
  maxWidth: 8,
  minHeight: 20,
  maxHeight: 40,
});
module49.default(T, R.FT_DINNERTABLE, {
  minWidth: 24,
  maxWidth: 32,
  minHeight: 16,
  maxHeight: 16,
});
module49.default(T, R.FT_TEATABLE, {
  minWidth: 16,
  maxWidth: 16,
  minHeight: 20,
  maxHeight: 20,
});
module49.default(T, R.FT_TOILET, {
  minWidth: 10,
  maxWidth: 10,
  minHeight: 15,
  maxHeight: 15,
});
var P = T;
exports.FurnitureSize = P;
Object.freeze(P);
