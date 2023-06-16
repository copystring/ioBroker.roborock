require('./1281');

globals = require('./1225');

for (
  var module1229 = require('./1229'),
    module1272 = require('./1272'),
    module1278 = require('./1278')('toStringTag'),
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
  if (T && !T[module1278]) module1229(T, module1278, n);
  module1272[n] = module1272.Array;
}
