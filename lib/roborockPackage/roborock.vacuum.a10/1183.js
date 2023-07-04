require('./1184');

globals = require('./1128');

for (
  var module1132 = require('./1132'),
    module1175 = require('./1175'),
    module1181 = require('./1181')('toStringTag'),
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
  if (T && !T[module1181]) module1132(T, module1181, n);
  module1175[n] = module1175.Array;
}
