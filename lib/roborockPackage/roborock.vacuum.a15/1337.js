exports.Palette = {
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
};

var module1338 = require('./1338'),
  o = module1338.colorIndexMap,
  f = module1338.colorIndexMapDark,
  l = module1338.colorHighLightIndexMap,
  p = module1338.colorHighLightIndexMapDark,
  t = module1338.colorEggIndexMap,
  c = module1338.colorEggIndexMapDark;

exports.colorEggIndexMapDark = c;
exports.colorEggIndexMap = t;
exports.colorHighLightIndexMapDark = p;
exports.colorHighLightIndexMap = l;
exports.colorIndexMapDark = f;
exports.colorIndexMap = o;
