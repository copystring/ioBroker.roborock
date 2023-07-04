var n, t;
exports.NetInfoStateType = n;

(function (n) {
  n.unknown = 'unknown';
  n.none = 'none';
  n.cellular = 'cellular';
  n.wifi = 'wifi';
  n.bluetooth = 'bluetooth';
  n.ethernet = 'ethernet';
  n.wimax = 'wimax';
  n.vpn = 'vpn';
  n.other = 'other';
})(n || (exports.NetInfoStateType = n = {}));

exports.NetInfoCellularGeneration = t;

(function (n) {
  n['2g'] = '2g';
  n['3g'] = '3g';
  n['4g'] = '4g';
})(t || (exports.NetInfoCellularGeneration = t = {}));
