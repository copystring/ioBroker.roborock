exports.determine = function () {
  var s = u();

  if (!(s = null)) {
    s = v.olson.timezones[A()];
    if (undefined !== n.AMBIGUITIES[s]) s = k(s);
  }

  return {
    name: function () {
      return s;
    },
  };
};

var s = 's',
  n = {
    DAY: 864e5,
    HOUR: 36e5,
    MINUTE: 6e4,
    SECOND: 1e3,
    BASELINE_YEAR: 2014,
    MAX_SCORE: 864e6,
    AMBIGUITIES: {
      'America/Denver': ['America/Mazatlan'],
      'Europe/London': ['Africa/Casablanca'],
      'America/Chicago': ['America/Mexico_City'],
      'America/Asuncion': ['America/Campo_Grande', 'America/Santiago'],
      'America/Montevideo': ['America/Sao_Paulo', 'America/Santiago'],
      'Asia/Beirut': ['Asia/Amman', 'Asia/Jerusalem', 'Europe/Helsinki', 'Asia/Damascus', 'Africa/Cairo', 'Asia/Gaza', 'Europe/Minsk'],
      'Pacific/Auckland': ['Pacific/Fiji'],
      'America/Los_Angeles': ['America/Santa_Isabel'],
      'America/New_York': ['America/Havana'],
      'America/Halifax': ['America/Goose_Bay'],
      'America/Godthab': ['America/Miquelon'],
      'Asia/Dubai': ['Asia/Yerevan'],
      'Asia/Jakarta': ['Asia/Krasnoyarsk'],
      'Asia/Shanghai': ['Asia/Irkutsk', 'Australia/Perth'],
      'Australia/Sydney': ['Australia/Lord_Howe'],
      'Asia/Tokyo': ['Asia/Yakutsk'],
      'Asia/Dhaka': ['Asia/Omsk'],
      'Asia/Baku': ['Asia/Yerevan'],
      'Australia/Brisbane': ['Asia/Vladivostok'],
      'Pacific/Noumea': ['Asia/Vladivostok'],
      'Pacific/Majuro': ['Asia/Kamchatka', 'Pacific/Fiji'],
      'Pacific/Tongatapu': ['Pacific/Apia'],
      'Asia/Baghdad': ['Europe/Minsk', 'Europe/Moscow'],
      'Asia/Karachi': ['Asia/Yekaterinburg'],
      'Africa/Johannesburg': ['Asia/Gaza', 'Africa/Cairo'],
    },
  };

function o(s) {
  var n = -s.getTimezoneOffset();
  return null !== n ? n : 0;
}

function A() {
  var A = o(new Date(n.BASELINE_YEAR, 0, 2)),
    u = o(new Date(n.BASELINE_YEAR, 5, 2)),
    t = A - u;
  return t < 0 ? A + ',1' : t > 0 ? u + ',1,' + s : A + ',0';
}

function u() {
  var s, n;
  if ('undefined' != typeof Intl && undefined !== Intl.DateTimeFormat && undefined !== (s = Intl.DateTimeFormat()) && undefined !== s.resolvedOptions)
    return (n = s.resolvedOptions().timeZone) && (n.indexOf('/') > -1 || 'UTC' === n) ? n : undefined;
}

function t(s) {
  for (
    var n = new Date(s, 0, 1, 0, 0, 1, 0).getTime(), o = new Date(s, 12, 31, 23, 59, 59).getTime(), A = n, u = new Date(A).getTimezoneOffset(), t = null, l = null;
    A < o - 864e5;

  ) {
    var f = new Date(A),
      k = f.getTimezoneOffset();

    if (k !== u) {
      if (k < u) t = f;
      if (k > u) l = f;
      u = k;
    }

    A += 864e5;
  }

  return (
    !(!t || !l) && {
      s: c(t).getTime(),
      e: c(l).getTime(),
    }
  );
}

function c(s, o, A) {
  if (undefined === o) {
    o = n.DAY;
    A = n.HOUR;
  }

  for (var u = new Date(s.getTime() - o).getTime(), t = s.getTime() + o, l = new Date(u).getTimezoneOffset(), f = u, k = null; f < t - A; ) {
    var v = new Date(f);

    if (v.getTimezoneOffset() !== l) {
      k = v;
      break;
    }

    f += A;
  }

  return o === n.DAY ? c(k, n.HOUR, n.MINUTE) : o === n.HOUR ? c(k, n.MINUTE, n.SECOND) : k;
}

function l(s, n, o, A) {
  if ('N/A' !== o) return o;

  if ('Asia/Beirut' === n) {
    if ('Africa/Cairo' === A.name && 13983768e5 === s[6].s && 14116788e5 === s[6].e) return 0;
    if ('Asia/Jerusalem' === A.name && 13959648e5 === s[6].s && 14118588e5 === s[6].e) return 0;
  } else if ('America/Santiago' === n) {
    if ('America/Asuncion' === A.name && 14124816e5 === s[6].s && 1397358e6 === s[6].e) return 0;
    if ('America/Campo_Grande' === A.name && 14136912e5 === s[6].s && 13925196e5 === s[6].e) return 0;
  } else if ('America/Montevideo' === n) {
    if ('America/Sao_Paulo' === A.name && 14136876e5 === s[6].s && 1392516e6 === s[6].e) return 0;
  } else if ('Pacific/Auckland' === n && 'Pacific/Fiji' === A.name && 14142456e5 === s[6].s && 13961016e5 === s[6].e) return 0;

  return o;
}

function f(s, o) {
  for (
    var A = function (A) {
        for (var u = 0, t = 0; t < s.length; t++)
          if (A.rules[t] && s[t]) {
            if (!(s[t].s >= A.rules[t].s && s[t].e <= A.rules[t].e)) {
              u = 'N/A';
              break;
            }

            if (((u = 0), (u += Math.abs(s[t].s - A.rules[t].s)), (u += Math.abs(A.rules[t].e - s[t].e)) > n.MAX_SCORE)) {
              u = 'N/A';
              break;
            }
          }

        u = l(s, o, u, A);
        return u;
      },
      u = {},
      t = v.olson.dst_rules.zones,
      c = t.length,
      f = n.AMBIGUITIES[o],
      k = 0;
    k < c;
    k++
  ) {
    var h = t[k],
      P = A(t[k]);
    if ('N/A' !== P) u[h.name] = P;
  }

  for (var _ in u) if (u.hasOwnProperty(_)) for (var E = 0; E < f.length; E++) if (f[E] === _) return _;

  return o;
}

function k(s) {
  var n = (function () {
    for (var s = [], n = 0; n < v.olson.dst_rules.years.length; n++) {
      var o = t(v.olson.dst_rules.years[n]);
      s.push(o);
    }

    return s;
  })();

  return (function (s) {
    for (var n = 0; n < s.length; n++) if (false !== s[n]) return true;

    return false;
  })(n)
    ? f(n, s)
    : s;
}

var v = {
  olson: {},
};
v.olson = v.olson || {};
v.olson.timezones = {
  '-720,0': 'Etc/GMT+12',
  '-660,0': 'Pacific/Pago_Pago',
  '-660,1,s': 'Pacific/Apia',
  '-600,1': 'America/Adak',
  '-600,0': 'Pacific/Honolulu',
  '-570,0': 'Pacific/Marquesas',
  '-540,0': 'Pacific/Gambier',
  '-540,1': 'America/Anchorage',
  '-480,1': 'America/Los_Angeles',
  '-480,0': 'Pacific/Pitcairn',
  '-420,0': 'America/Phoenix',
  '-420,1': 'America/Denver',
  '-360,0': 'America/Guatemala',
  '-360,1': 'America/Chicago',
  '-360,1,s': 'Pacific/Easter',
  '-300,0': 'America/Bogota',
  '-300,1': 'America/New_York',
  '-270,0': 'America/Caracas',
  '-240,1': 'America/Halifax',
  '-240,0': 'America/Santo_Domingo',
  '-240,1,s': 'America/Asuncion',
  '-210,1': 'America/St_Johns',
  '-180,1': 'America/Godthab',
  '-180,0': 'America/Argentina/Buenos_Aires',
  '-180,1,s': 'America/Montevideo',
  '-120,0': 'America/Noronha',
  '-120,1': 'America/Noronha',
  '-60,1': 'Atlantic/Azores',
  '-60,0': 'Atlantic/Cape_Verde',
  '0,0': 'UTC',
  '0,1': 'Europe/London',
  '60,1': 'Europe/Berlin',
  '60,0': 'Africa/Lagos',
  '60,1,s': 'Africa/Windhoek',
  '120,1': 'Asia/Beirut',
  '120,0': 'Africa/Johannesburg',
  '180,0': 'Asia/Baghdad',
  '180,1': 'Europe/Moscow',
  '210,1': 'Asia/Tehran',
  '240,0': 'Asia/Dubai',
  '240,1': 'Asia/Baku',
  '270,0': 'Asia/Kabul',
  '300,1': 'Asia/Yekaterinburg',
  '300,0': 'Asia/Karachi',
  '330,0': 'Asia/Kolkata',
  '345,0': 'Asia/Kathmandu',
  '360,0': 'Asia/Dhaka',
  '360,1': 'Asia/Omsk',
  '390,0': 'Asia/Rangoon',
  '420,1': 'Asia/Krasnoyarsk',
  '420,0': 'Asia/Jakarta',
  '480,0': 'Asia/Shanghai',
  '480,1': 'Asia/Irkutsk',
  '525,0': 'Australia/Eucla',
  '525,1,s': 'Australia/Eucla',
  '540,1': 'Asia/Yakutsk',
  '540,0': 'Asia/Tokyo',
  '570,0': 'Australia/Darwin',
  '570,1,s': 'Australia/Adelaide',
  '600,0': 'Australia/Brisbane',
  '600,1': 'Asia/Vladivostok',
  '600,1,s': 'Australia/Sydney',
  '630,1,s': 'Australia/Lord_Howe',
  '660,1': 'Asia/Kamchatka',
  '660,0': 'Pacific/Noumea',
  '690,0': 'Pacific/Norfolk',
  '720,1,s': 'Pacific/Auckland',
  '720,0': 'Pacific/Majuro',
  '765,1,s': 'Pacific/Chatham',
  '780,0': 'Pacific/Tongatapu',
  '780,1,s': 'Pacific/Apia',
  '840,0': 'Pacific/Kiritimati',
};
v.olson.dst_rules = {
  years: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
  zones: [
    {
      name: 'Africa/Cairo',
      rules: [
        {
          e: 12199572e5,
          s: 12090744e5,
        },
        {
          e: 1250802e6,
          s: 1240524e6,
        },
        {
          e: 12858804e5,
          s: 12840696e5,
        },
        false,
        false,
        false,
        {
          e: 14116788e5,
          s: 1406844e6,
        },
      ],
    },
    {
      name: 'Africa/Casablanca',
      rules: [
        {
          e: 12202236e5,
          s: 12122784e5,
        },
        {
          e: 12508092e5,
          s: 12438144e5,
        },
        {
          e: 1281222e6,
          s: 12727584e5,
        },
        {
          e: 13120668e5,
          s: 13017888e5,
        },
        {
          e: 13489704e5,
          s: 1345428e6,
        },
        {
          e: 13828392e5,
          s: 13761e8,
        },
        {
          e: 14142888e5,
          s: 14069448e5,
        },
      ],
    },
    {
      name: 'America/Asuncion',
      rules: [
        {
          e: 12050316e5,
          s: 12243888e5,
        },
        {
          e: 12364812e5,
          s: 12558384e5,
        },
        {
          e: 12709548e5,
          s: 12860784e5,
        },
        {
          e: 13024044e5,
          s: 1317528e6,
        },
        {
          e: 1333854e6,
          s: 13495824e5,
        },
        {
          e: 1364094e6,
          s: 1381032e6,
        },
        {
          e: 13955436e5,
          s: 14124816e5,
        },
      ],
    },
    {
      name: 'America/Campo_Grande',
      rules: [
        {
          e: 12032172e5,
          s: 12243888e5,
        },
        {
          e: 12346668e5,
          s: 12558384e5,
        },
        {
          e: 12667212e5,
          s: 1287288e6,
        },
        {
          e: 12981708e5,
          s: 13187376e5,
        },
        {
          e: 13302252e5,
          s: 1350792e6,
        },
        {
          e: 136107e7,
          s: 13822416e5,
        },
        {
          e: 13925196e5,
          s: 14136912e5,
        },
      ],
    },
    {
      name: 'America/Goose_Bay',
      rules: [
        {
          e: 122559486e4,
          s: 120503526e4,
        },
        {
          e: 125704446e4,
          s: 123648486e4,
        },
        {
          e: 128909886e4,
          s: 126853926e4,
        },
        {
          e: 13205556e5,
          s: 129998886e4,
        },
        {
          e: 13520052e5,
          s: 13314456e5,
        },
        {
          e: 13834548e5,
          s: 13628952e5,
        },
        {
          e: 14149044e5,
          s: 13943448e5,
        },
      ],
    },
    {
      name: 'America/Havana',
      rules: [
        {
          e: 12249972e5,
          s: 12056436e5,
        },
        {
          e: 12564468e5,
          s: 12364884e5,
        },
        {
          e: 12885012e5,
          s: 12685428e5,
        },
        {
          e: 13211604e5,
          s: 13005972e5,
        },
        {
          e: 13520052e5,
          s: 13332564e5,
        },
        {
          e: 13834548e5,
          s: 13628916e5,
        },
        {
          e: 14149044e5,
          s: 13943412e5,
        },
      ],
    },
    {
      name: 'America/Mazatlan',
      rules: [
        {
          e: 1225008e6,
          s: 12074724e5,
        },
        {
          e: 12564576e5,
          s: 1238922e6,
        },
        {
          e: 1288512e6,
          s: 12703716e5,
        },
        {
          e: 13199616e5,
          s: 13018212e5,
        },
        {
          e: 13514112e5,
          s: 13332708e5,
        },
        {
          e: 13828608e5,
          s: 13653252e5,
        },
        {
          e: 14143104e5,
          s: 13967748e5,
        },
      ],
    },
    {
      name: 'America/Mexico_City',
      rules: [
        {
          e: 12250044e5,
          s: 12074688e5,
        },
        {
          e: 1256454e6,
          s: 12389184e5,
        },
        {
          e: 12885084e5,
          s: 1270368e6,
        },
        {
          e: 1319958e6,
          s: 13018176e5,
        },
        {
          e: 13514076e5,
          s: 13332672e5,
        },
        {
          e: 13828572e5,
          s: 13653216e5,
        },
        {
          e: 14143068e5,
          s: 13967712e5,
        },
      ],
    },
    {
      name: 'America/Miquelon',
      rules: [
        {
          e: 12255984e5,
          s: 12050388e5,
        },
        {
          e: 1257048e6,
          s: 12364884e5,
        },
        {
          e: 12891024e5,
          s: 12685428e5,
        },
        {
          e: 1320552e6,
          s: 12999924e5,
        },
        {
          e: 13520016e5,
          s: 1331442e6,
        },
        {
          e: 13834512e5,
          s: 13628916e5,
        },
        {
          e: 14149008e5,
          s: 13943412e5,
        },
      ],
    },
    {
      name: 'America/Santa_Isabel',
      rules: [
        {
          e: 12250116e5,
          s: 1207476e6,
        },
        {
          e: 12564612e5,
          s: 12389256e5,
        },
        {
          e: 12885156e5,
          s: 12703752e5,
        },
        {
          e: 13199652e5,
          s: 13018248e5,
        },
        {
          e: 13514148e5,
          s: 13332744e5,
        },
        {
          e: 13828644e5,
          s: 13653288e5,
        },
        {
          e: 1414314e6,
          s: 13967784e5,
        },
      ],
    },
    {
      name: 'America/Santiago',
      rules: [
        {
          e: 1206846e6,
          s: 1223784e6,
        },
        {
          e: 1237086e6,
          s: 12552336e5,
        },
        {
          e: 127035e7,
          s: 12866832e5,
        },
        {
          e: 13048236e5,
          s: 13138992e5,
        },
        {
          e: 13356684e5,
          s: 13465584e5,
        },
        {
          e: 1367118e6,
          s: 13786128e5,
        },
        {
          e: 13985676e5,
          s: 14100624e5,
        },
      ],
    },
    {
      name: 'America/Sao_Paulo',
      rules: [
        {
          e: 12032136e5,
          s: 12243852e5,
        },
        {
          e: 12346632e5,
          s: 12558348e5,
        },
        {
          e: 12667176e5,
          s: 12872844e5,
        },
        {
          e: 12981672e5,
          s: 1318734e6,
        },
        {
          e: 13302216e5,
          s: 13507884e5,
        },
        {
          e: 13610664e5,
          s: 1382238e6,
        },
        {
          e: 1392516e6,
          s: 14136876e5,
        },
      ],
    },
    {
      name: 'Asia/Amman',
      rules: [
        {
          e: 1225404e6,
          s: 12066552e5,
        },
        {
          e: 12568536e5,
          s: 12381048e5,
        },
        {
          e: 12883032e5,
          s: 12695544e5,
        },
        {
          e: 13197528e5,
          s: 13016088e5,
        },
        false,
        false,
        {
          e: 14147064e5,
          s: 13959576e5,
        },
      ],
    },
    {
      name: 'Asia/Damascus',
      rules: [
        {
          e: 12254868e5,
          s: 120726e7,
        },
        {
          e: 125685e7,
          s: 12381048e5,
        },
        {
          e: 12882996e5,
          s: 12701592e5,
        },
        {
          e: 13197492e5,
          s: 13016088e5,
        },
        {
          e: 13511988e5,
          s: 13330584e5,
        },
        {
          e: 13826484e5,
          s: 1364508e6,
        },
        {
          e: 14147028e5,
          s: 13959576e5,
        },
      ],
    },
    {
      name: 'Asia/Dubai',
      rules: [false, false, false, false, false, false, false],
    },
    {
      name: 'Asia/Gaza',
      rules: [
        {
          e: 12199572e5,
          s: 12066552e5,
        },
        {
          e: 12520152e5,
          s: 12381048e5,
        },
        {
          e: 1281474e6,
          s: 126964086e4,
        },
        {
          e: 1312146e6,
          s: 130160886e4,
        },
        {
          e: 13481784e5,
          s: 13330584e5,
        },
        {
          e: 13802292e5,
          s: 1364508e6,
        },
        {
          e: 1414098e6,
          s: 13959576e5,
        },
      ],
    },
    {
      name: 'Asia/Irkutsk',
      rules: [
        {
          e: 12249576e5,
          s: 12068136e5,
        },
        {
          e: 12564072e5,
          s: 12382632e5,
        },
        {
          e: 12884616e5,
          s: 12697128e5,
        },
        false,
        false,
        false,
        false,
      ],
    },
    {
      name: 'Asia/Jerusalem',
      rules: [
        {
          e: 12231612e5,
          s: 12066624e5,
        },
        {
          e: 1254006e6,
          s: 1238112e6,
        },
        {
          e: 1284246e6,
          s: 12695616e5,
        },
        {
          e: 131751e7,
          s: 1301616e6,
        },
        {
          e: 13483548e5,
          s: 13330656e5,
        },
        {
          e: 13828284e5,
          s: 13645152e5,
        },
        {
          e: 1414278e6,
          s: 13959648e5,
        },
      ],
    },
    {
      name: 'Asia/Kamchatka',
      rules: [
        {
          e: 12249432e5,
          s: 12067992e5,
        },
        {
          e: 12563928e5,
          s: 12382488e5,
        },
        {
          e: 12884508e5,
          s: 12696984e5,
        },
        false,
        false,
        false,
        false,
      ],
    },
    {
      name: 'Asia/Krasnoyarsk',
      rules: [
        {
          e: 12249612e5,
          s: 12068172e5,
        },
        {
          e: 12564108e5,
          s: 12382668e5,
        },
        {
          e: 12884652e5,
          s: 12697164e5,
        },
        false,
        false,
        false,
        false,
      ],
    },
    {
      name: 'Asia/Omsk',
      rules: [
        {
          e: 12249648e5,
          s: 12068208e5,
        },
        {
          e: 12564144e5,
          s: 12382704e5,
        },
        {
          e: 12884688e5,
          s: 126972e7,
        },
        false,
        false,
        false,
        false,
      ],
    },
    {
      name: 'Asia/Vladivostok',
      rules: [
        {
          e: 12249504e5,
          s: 12068064e5,
        },
        {
          e: 12564e8,
          s: 1238256e6,
        },
        {
          e: 12884544e5,
          s: 12697056e5,
        },
        false,
        false,
        false,
        false,
      ],
    },
    {
      name: 'Asia/Yakutsk',
      rules: [
        {
          e: 1224954e6,
          s: 120681e7,
        },
        {
          e: 12564036e5,
          s: 12382596e5,
        },
        {
          e: 1288458e6,
          s: 12697092e5,
        },
        false,
        false,
        false,
        false,
      ],
    },
    {
      name: 'Asia/Yekaterinburg',
      rules: [
        {
          e: 12249684e5,
          s: 12068244e5,
        },
        {
          e: 1256418e6,
          s: 1238274e6,
        },
        {
          e: 12884724e5,
          s: 12697236e5,
        },
        false,
        false,
        false,
        false,
      ],
    },
    {
      name: 'Asia/Yerevan',
      rules: [
        {
          e: 1224972e6,
          s: 1206828e6,
        },
        {
          e: 12564216e5,
          s: 12382776e5,
        },
        {
          e: 1288476e6,
          s: 12697272e5,
        },
        {
          e: 13199256e5,
          s: 13011768e5,
        },
        false,
        false,
        false,
      ],
    },
    {
      name: 'Australia/Lord_Howe',
      rules: [
        {
          e: 12074076e5,
          s: 12231342e5,
        },
        {
          e: 12388572e5,
          s: 12545838e5,
        },
        {
          e: 12703068e5,
          s: 12860334e5,
        },
        {
          e: 13017564e5,
          s: 1317483e6,
        },
        {
          e: 1333206e6,
          s: 13495374e5,
        },
        {
          e: 13652604e5,
          s: 1380987e6,
        },
        {
          e: 139671e7,
          s: 14124366e5,
        },
      ],
    },
    {
      name: 'Australia/Perth',
      rules: [
        {
          e: 12068136e5,
          s: 12249576e5,
        },
        false,
        false,
        false,
        false,
        false,
        false,
      ],
    },
    {
      name: 'Europe/Helsinki',
      rules: [
        {
          e: 12249828e5,
          s: 12068388e5,
        },
        {
          e: 12564324e5,
          s: 12382884e5,
        },
        {
          e: 12884868e5,
          s: 1269738e6,
        },
        {
          e: 13199364e5,
          s: 13011876e5,
        },
        {
          e: 1351386e6,
          s: 13326372e5,
        },
        {
          e: 13828356e5,
          s: 13646916e5,
        },
        {
          e: 14142852e5,
          s: 13961412e5,
        },
      ],
    },
    {
      name: 'Europe/Minsk',
      rules: [
        {
          e: 12249792e5,
          s: 12068352e5,
        },
        {
          e: 12564288e5,
          s: 12382848e5,
        },
        {
          e: 12884832e5,
          s: 12697344e5,
        },
        false,
        false,
        false,
        false,
      ],
    },
    {
      name: 'Europe/Moscow',
      rules: [
        {
          e: 12249756e5,
          s: 12068316e5,
        },
        {
          e: 12564252e5,
          s: 12382812e5,
        },
        {
          e: 12884796e5,
          s: 12697308e5,
        },
        false,
        false,
        false,
        false,
      ],
    },
    {
      name: 'Pacific/Apia',
      rules: [
        false,
        false,
        false,
        {
          e: 13017528e5,
          s: 13168728e5,
        },
        {
          e: 13332024e5,
          s: 13489272e5,
        },
        {
          e: 13652568e5,
          s: 13803768e5,
        },
        {
          e: 13967064e5,
          s: 14118264e5,
        },
      ],
    },
    {
      name: 'Pacific/Fiji',
      rules: [
        false,
        false,
        {
          e: 12696984e5,
          s: 12878424e5,
        },
        {
          e: 13271544e5,
          s: 1319292e6,
        },
        {
          e: 1358604e6,
          s: 13507416e5,
        },
        {
          e: 139005e7,
          s: 1382796e6,
        },
        {
          e: 14215032e5,
          s: 14148504e5,
        },
      ],
    },
    {
      name: 'Europe/London',
      rules: [
        {
          e: 12249828e5,
          s: 12068388e5,
        },
        {
          e: 12564324e5,
          s: 12382884e5,
        },
        {
          e: 12884868e5,
          s: 1269738e6,
        },
        {
          e: 13199364e5,
          s: 13011876e5,
        },
        {
          e: 1351386e6,
          s: 13326372e5,
        },
        {
          e: 13828356e5,
          s: 13646916e5,
        },
        {
          e: 14142852e5,
          s: 13961412e5,
        },
      ],
    },
  ],
};
