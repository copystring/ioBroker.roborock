exports.GetCateroy = function (o) {
  return t.find(function (t) {
    return t.type === o;
  });
};

var o = {
  Home: 'home',
  LoopStatus: 'loop_status',
  LoopMap: 'loop_map',
  Monitor: 'monitor',
  Timer: 'timer',
  CleanRecord: 'clean_record',
  Debug: 'debug',
  KeyEvent: 'key_event',
  UserAction: 'user_action',
  RPC: 'rpc',
  SRPC: 'srpc',
  Monitor: 'monitor',
};
exports.Types = o;
exports.InfoColors = {
  Success: '#7ed321',
  Fail: '#d0021b',
  Normal: '#1d1d1e',
};
var t = [
  {
    name: '\u9996\u9875',
    type: o.Home,
    color: '#417505',
  },
  {
    name: '\u8f6e\u8be2\u72b6\u6001',
    type: o.LoopStatus,
    color: '#89bbf5',
  },
  {
    name: '\u8f6e\u8be2\u5730\u56fe',
    type: o.LoopMap,
    color: '#d0021b',
  },
  {
    name: '\u5b9a\u65f6',
    type: o.Timer,
    color: '#9013fe',
  },
  {
    name: '\u6e05\u626b\u8bb0\u5f55',
    type: o.CleanRecord,
    color: '#f8e71c',
  },
  {
    name: '\u4e34\u65f6\u8c03\u8bd5',
    type: o.Debug,
    color: '#5d862d',
  },
  {
    name: '\u5173\u952e\u4e8b\u4ef6',
    type: o.KeyEvent,
    color: '#e31a32',
  },
  {
    name: 'rpc',
    type: o.RPC,
    color: '#e31a32',
  },
  {
    name: 'srpc',
    type: o.SRPC,
    color: '#e31a32',
  },
  {
    name: '\u7528\u6237\u884c\u4e3a',
    type: o.UserAction,
    color: '#e31a32',
  },
  {
    name: '\u89c6\u9891\u76d1\u63a7',
    type: o.Monitor,
    color: '#e31a32',
  },
];
exports.Category = t;
