var module1274 = {
  map: {
    obstacles: '#646464ff',
    obstaclesSleep: '#646464ff',
    space: '#DFDFDFff',
    spaceSleep: '#DFDFDFff',
    path: '#FFFFFFff',
    pathGoto: '#FFFFFFff',
    pathGotoPlan: '#FFFFFFb3',
    line: '#ffffff2E',
    mopPath: '#FFFFFF66',
  },
  block: {
    0: '#B8B4F1ff',
    1: '#FF5757ff',
    2: '#B8B4F1ff',
    3: '#EBF8E6ff',
    4: '#FAA79Fff',
    5: '#FFEED2ff',
    6: '#F1AEF3ff',
  },
  blockHighLight: {
    0: '#B8B4F1ff',
    1: '#FF5757ff',
    2: '#B8B4F1ff',
    3: '#EBF8E6ff',
    4: '#FAA79Fff',
    5: '#FFEED2ff',
    6: '#F1AEF3ff',
  },
  share: {
    title: '#000000',
    subtitle: '#000000',
  },
  anim: {
    Charged: require('./1271'),
    Charging: require('./1271'),
    Locating: require('./1272'),
    Sleeping: require('./1273'),
    Waiting: require('./1272'),
    Warning: require('./1274'),
  },
};
exports.Palette = module1274;

var module1275 = require('./1275'),
  o = module1275.colorMap,
  t = module1275.colorHighLightMap,
  l = module1275.colorIndexMap,
  p = module1275.colorHighLightIndexMap;

exports.colorHighLightIndexMap = p;
exports.colorIndexMap = l;
exports.colorHighLightMap = t;
exports.colorMap = o;
