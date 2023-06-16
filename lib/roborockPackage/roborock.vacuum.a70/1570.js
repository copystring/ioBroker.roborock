require('./1571');

globals = require('./1515');

for (
  var module1519 = require('./1519'),
    module1562 = require('./1562'),
    module1568 = require('./1568')('toStringTag'),
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
  if (T && !T[module1568]) module1519(T, module1568, n);
  module1562[n] = module1562.Array;
}
