var module1272 = {
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
    Charged: require('./1269'),
    Charging: require('./1269'),
    Locating: require('./1270'),
    Sleeping: require('./1271'),
    Waiting: require('./1270'),
    Warning: require('./1272'),
  },
};
exports.Palette = module1272;

var module1273 = require('./1273'),
  o = module1273.colorMap,
  t = module1273.colorHighLightMap,
  l = module1273.colorIndexMap,
  p = module1273.colorHighLightIndexMap;

exports.colorHighLightIndexMap = p;
exports.colorIndexMap = l;
exports.colorHighLightMap = t;
exports.colorMap = o;
