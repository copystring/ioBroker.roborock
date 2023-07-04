require('./1578');

globals = require('./1522');

for (
  var module1526 = require('./1526'),
    module1569 = require('./1569'),
    module1575 = require('./1575')('toStringTag'),
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
  if (T && !T[module1575]) module1526(T, module1575, n);
  module1569[n] = module1569.Array;
}
