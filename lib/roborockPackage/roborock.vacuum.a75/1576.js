require('./1577');

globals = require('./1521');

for (
  var module1525 = require('./1525'),
    module1568 = require('./1568'),
    module1574 = require('./1574')('toStringTag'),
    S = 'CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList'.split(
      ','
    ),
    l = 0;
  l < S.length;
  l++
) {
  var n = S[l],
    o = globals[n],
    T = o && o.prototype;
  if (T && !T[module1574]) module1525(T, module1574, n);
  module1568[n] = module1568.Array;
}
