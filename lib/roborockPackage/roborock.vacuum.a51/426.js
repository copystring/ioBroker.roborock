require('./393');

(_ = function (_, p) {
  var l = p ? _ + '_' + p + '_list_image' : _ + '_list_image',
    t = p ? _ + '_' + p + '_detail_image' : _ + '_detail_image';
  s[l] = '/app/common/suplies/' + l + '.png';
  s[t] = '/app/common/suplies/' + t + '.png';
})('floor_cleaning_fluid');

_('strainer', 'o2');

_('strainer', 'o3');

_('strainer', 'o4');

_('strainer', 'pearl');

_('cleaning_brush', 'o2');

_('cleaning_brush', 'o3');

_('cleaning_brush', 'o4');

_('dust_bucket', '');

_('dust_bag', 'o1');

_('dust_bag', 'o2');

_('dust_bag', 'o3');

_('dust_bag', 'o4');

_('dust_bag', 'ocd');

_('dust_bag', 'pearl');

var s = {},
  _,
  p = function () {
    var s = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : 142645,
      _ = arguments.length > 1 ? arguments[1] : undefined,
      p = {
        filter_mesh_gid_key: s,
        main_brush_gid_key: s,
        slide_brush_gid_key: s,
        water_box_gid_key: s,
        mop_swab_gid_key: s,
      },
      l = function (s) {
        return (p[s] = '/app/' + _ + '/suplies/' + s + '.png');
      };

    l('filter_mesh_list_image');
    l('filter_mesh_detail_image');
    l('main_brush_list_image');
    l('main_brush_detail_image');
    l('slide_brush_list_image');
    l('slide_brush_detail_image');
    l('sensor_box_list_image');
    l('sensor_detail_image');
    l('mop_swab_list_image');
    l('mop_swab_detail_image');
    return p;
  },
  l = s;

exports.DockSupplyMap = l;

exports.getDockSupplyByDockType = function (s, _) {
  var p = _ ? s + '_' + _ + '_detail_image' : s + '_detail_image';
  return {
    list: l[_ ? s + '_' + _ + '_list_image' : s + '_list_image'],
    detail: l[p],
  };
};

var t = {
  TanosE: {
    filter_mesh_gid_key: '142645',
    main_brush_gid_key: '142645',
    slide_brush_gid_key: '142645',
    water_box_gid_key: '142645',
    mop_swab_gid_key: '142645',
    filter_mesh_detail_image: '/tanose/app/suplies/supplies_detail_strainer_new.png',
    filter_mesh_list_image: '/tanose/app/suplies/supplies_detail_strainer_new.png',
    main_brush_detail_image: '/tanose/app/suplies/supplies_detail_mainbrush_new.png',
    main_brush_list_image: '/tanose/app/suplies/supplies_detail_mainbrush_new.png',
    slide_brush_detail_image: '/tanose/app/suplies/supplies_detail_sidebrush_new.png',
    slide_brush_list_image: '/tanose/app/suplies/supplies_detail_sidebrush_new.png',
    sensor_detail_image: '/tanose/app/suplies/supplies_sensor_detail_new.png',
    sensor_box_list_image: '/tanose/app/suplies/supplies_sensor_list_new2.png',
    mop_swab_detail_image: '/tanose/app/suplies/supplies_mop_swab_detail_new.png',
    mop_swab_list_image: '/tanose/app/suplies/supplies_mop_swab_detail_new.png',
  },
  TanosV_CN: {
    filter_mesh_gid_key: '142645',
    main_brush_gid_key: '142645',
    slide_brush_gid_key: '142645',
    mop_swab_gid_key: '142645',
    filter_mesh_detail_image: '/tanosv/app/suplies/supplies_detail_strainer_new.png',
    filter_mesh_list_image: '/tanosv/app/suplies/supplies_detail_strainer_new.png',
    main_brush_detail_image: '/tanosv/app/suplies/supplies_detail_mainbrush_new.png',
    main_brush_list_image: '/tanosv/app/suplies/supplies_detail_mainbrush_new.png',
    slide_brush_detail_image: '/tanosv/app/suplies/supplies_detail_sidebrush_new.png',
    slide_brush_list_image: '/tanosv/app/suplies/supplies_detail_sidebrush_new.png',
    sensor_detail_image: '/tanosv/app/suplies/supplies_sensor_detail_new.png',
    sensor_box_list_image: '/tanosv/app/suplies/supplies_sensor_list_new2.png',
    mop_swab_detail_image: '/tanosv/app/suplies/supplies_mop_swab_detail_new.png',
    mop_swab_list_image: '/tanosv/app/suplies/supplies_mop_swab_detail_new.png',
  },
  TanosV_CE: {
    filter_mesh_gid_key: '142645',
    main_brush_gid_key: '142645',
    slide_brush_gid_key: '142645',
    mop_swab_gid_key: '142645',
    filter_mesh_detail_image: '/tanosv/app/suplies/supplies_detail_strainer_new.png',
    filter_mesh_list_image: '/tanosv/app/suplies/supplies_detail_strainer_new.png',
    main_brush_detail_image: '/tanosv/app/suplies/supplies_detail_mainbrush_new_ce.png',
    main_brush_list_image: '/tanosv/app/suplies/supplies_detail_mainbrush_new_ce.png',
    slide_brush_detail_image: '/tanosv/app/suplies/supplies_detail_sidebrush_new_ce.png',
    slide_brush_list_image: '/tanosv/app/suplies/supplies_detail_sidebrush_new_ce.png',
    sensor_detail_image: '/tanosv/app/suplies//supplies_sensor_detail_new_ce.png',
    sensor_box_list_image: '/tanosv/app/suplies/supplies_sensor_list_new2_ce.png',
    mop_swab_detail_image: '/tanosv/app/suplies/supplies_mop_swab_detail_new.png',
    mop_swab_list_image: '/tanosv/app/suplies/supplies_mop_swab_detail_new.png',
  },
  RubySC: {
    filter_mesh_gid_key: '142645',
    main_brush_gid_key: '142645',
    slide_brush_gid_key: '142645',
    mop_swab_gid_key: '142645',
    filter_mesh_detail_image: '/rubysc1/app/suplies/supplies_detail_strainer_new.png',
    filter_mesh_list_image: '/rubysc1/app/suplies/supplies_detail_strainer_new.png',
    main_brush_detail_image: '/rubysc1/app/suplies/supplies_detail_mainbrush_new.png',
    main_brush_list_image: '/rubysc1/app/suplies/supplies_detail_mainbrush_new.png',
    slide_brush_detail_image: '/rubysc1/app/suplies/supplies_detail_sidebrush_new.png',
    slide_brush_list_image: '/rubysc1/app/suplies/supplies_detail_sidebrush_new.png',
    sensor_detail_image: '/rubysc1/app/suplies/supplies_sensor_detail_new.png',
    sensor_box_list_image: '/rubysc1/app/suplies/supplies_sensor_list_new2.png',
    mop_swab_detail_image: '/rubysc1/app/suplies/supplies_mop_swab_detail_new.png',
    mop_swab_list_image: '/rubysc1/app/suplies/supplies_mop_swab_detail_new.png',
  },
  RubysE: {
    filter_mesh_gid_key: '142645',
    main_brush_gid_key: '142645',
    slide_brush_gid_key: '142645',
    mop_swab_gid_key: '142645',
    filter_mesh_detail_image: '/rubyse/app/suplies/supplies_detail_strainer_new.png',
    filter_mesh_list_image: '/rubyse/app/suplies/supplies_detail_strainer_new.png',
    main_brush_detail_image: '/rubyse/app/suplies/supplies_detail_mainbrush_new.png',
    main_brush_list_image: '/rubyse/app/suplies/supplies_detail_mainbrush_new.png',
    slide_brush_detail_image: '/rubyse/app/suplies/supplies_detail_sidebrush_new.png',
    slide_brush_list_image: '/rubyse/app/suplies/supplies_detail_sidebrush_new.png',
    sensor_detail_image: '/rubyse/app/suplies/supplies_sensor_detail_new.png',
    sensor_box_list_image: '/rubyse/app/suplies/supplies_sensor_list_new2.png',
    mop_swab_detail_image: '/rubyse/app/suplies/supplies_mop_swab_detail_new.png',
    mop_swab_list_image: '/rubyse/app/suplies/supplies_mop_swab_detail_new.png',
  },
  RubysLite: {
    filter_mesh_gid_key: '142645',
    main_brush_gid_key: '142645',
    slide_brush_gid_key: '142645',
    mop_swab_gid_key: '142645',
    filter_mesh_detail_image: '/rubyslite/app/suplies/supplies_detail_strainer_new.png',
    filter_mesh_list_image: '/rubyslite/app/suplies/supplies_detail_strainer_new.png',
    main_brush_detail_image: '/rubyslite/app/suplies/supplies_detail_mainbrush_new.png',
    main_brush_list_image: '/rubyslite/app/suplies/supplies_detail_mainbrush_new.png',
    slide_brush_detail_image: '/rubyslite/app/suplies/supplies_detail_sidebrush_new.png',
    slide_brush_list_image: '/rubyslite/app/suplies/supplies_detail_sidebrush_new.png',
    sensor_detail_image: '/rubyslite/app/suplies/supplies_sensor_list_new.png',
    sensor_box_list_image: '/rubyslite/app/suplies/supplies_sensor_list_new.png',
    mop_swab_detail_image: '/rubyslite/app/suplies/supplies_mop_swab_detail_new.png',
    mop_swab_list_image: '/rubyslite/app/suplies/supplies_mop_swab_detail_new.png',
  },
  Tanos_CN: {
    filter_mesh_gid_key: '142645',
    main_brush_gid_key: '142645',
    slide_brush_gid_key: '142645',
    water_box_gid_key: '142645',
    mop_swab_gid_key: '142645',
    filter_mesh_detail_image: '/tanos/app/suplies/supplies_detail_strainer_new.png',
    filter_mesh_list_image: '/tanos/app/suplies/supplies_detail_strainer_new.png',
    main_brush_detail_image: '/tanos/app/suplies/supplies_detail_mainbrush_new.png',
    main_brush_list_image: '/tanos/app/suplies/supplies_detail_mainbrush_new.png',
    slide_brush_detail_image: '/tanos/app/suplies/supplies_detail_sidebrush_new.png',
    slide_brush_list_image: '/tanos/app/suplies/supplies_detail_sidebrush_new.png',
    water_box_detail_image: '/tanos/app/suplies/supplies_detail_water_box_chip.png',
    water_box_list_image: '/tanos/app/suplies/supplies_detail_water_box_chip.png',
    sensor_detail_image: '/tanos/app/suplies/supplies_sensor_detail_new.png',
    sensor_box_list_image: '/tanos/app/suplies/supplies_sensor_list_new2.png',
    mop_swab_detail_image: '/tanos/app/suplies/supplies_mop_swab_detail_new.png',
    mop_swab_list_image: '/tanos/app/suplies/supplies_mop_swab_detail_new.png',
  },
  Tanos_CE: {
    filter_mesh_gid_key: '142645',
    main_brush_gid_key: '142645',
    slide_brush_gid_key: '142645',
    water_box_gid_key: '142645',
    mop_swab_gid_key: '142645',
    filter_mesh_detail_image: '/tanos/app/suplies/supplies_detail_strainer_new_ce.png',
    filter_mesh_list_image: '/tanos/app/suplies/supplies_detail_strainer_new_ce.png',
    main_brush_detail_image: '/tanos/app/suplies/supplies_detail_mainbrush_new_ce.png',
    main_brush_list_image: '/tanos/app/suplies/supplies_detail_mainbrush_new_ce.png',
    slide_brush_detail_image: '/tanos/app/suplies/supplies_detail_sidebrush_new_ce.png',
    slide_brush_list_image: '/tanos/app/suplies/supplies_detail_sidebrush_new_ce.png',
    water_box_detail_image: '/tanos/app/suplies/supplies_detail_water_box_chip_ce.png',
    water_box_list_image: '/tanos/app/suplies/supplies_detail_water_box_chip_ce.png',
    sensor_detail_image: '/tanos/app/suplies/supplies_sensor_detail_new_ce.png',
    sensor_box_list_image: '/tanos/app/suplies/supplies_sensor_list_new2_ce.png',
    mop_swab_detail_image: '/tanos/app/suplies/supplies_mop_swab_detail_new.png',
    mop_swab_list_image: '/tanos/app/suplies/supplies_mop_swab_detail_new.png',
  },
  RubyPlus: {
    filter_mesh_gid_key: '142645',
    main_brush_gid_key: '142645',
    slide_brush_gid_key: '142645',
    mop_swab_gid_key: '142645',
    filter_mesh_detail_image: '/rubyplus/app/suplies/supplies_detail_strainer_new.png',
    filter_mesh_list_image: '/rubyplus/app/suplies/supplies_detail_strainer_new.png',
    main_brush_detail_image: '/rubyplus/app/suplies/supplies_detail_mainbrush_new.png',
    main_brush_list_image: '/rubyplus/app/suplies/supplies_detail_mainbrush_new.png',
    slide_brush_detail_image: '/rubyplus/app/suplies/supplies_detail_sidebrush_new.png',
    slide_brush_list_image: '/rubyplus/app/suplies/supplies_detail_sidebrush_new.png',
    sensor_detail_image: '/rubyplus/app/suplies/supplies_sensor_detail_new.png',
    sensor_box_list_image: '/rubyplus/app/suplies/supplies_sensor_list_new2.png',
  },
  Rubys: {
    filter_mesh_gid_key: '142645',
    main_brush_gid_key: '142645',
    slide_brush_gid_key: '142645',
    mop_swab_gid_key: '142645',
    filter_mesh_detail_image: '/rubys/app/suplies/supplies_detail_strainer_new.png',
    filter_mesh_list_image: '/rubys/app/suplies/supplies_detail_strainer_new.png',
    main_brush_detail_image: '/rubys/app/suplies/supplies_detail_mainbrush_new.png',
    main_brush_list_image: '/rubys/app/suplies/supplies_detail_mainbrush_new.png',
    slide_brush_detail_image: '/rubys/app/suplies/supplies_detail_sidebrush_new.png',
    slide_brush_list_image: '/rubys/app/suplies/supplies_detail_sidebrush_new.png',
    sensor_detail_image: '/rubys/app/suplies/supplies_sensor_detail_new.png',
    sensor_box_list_image: '/rubys/app/suplies/supplies_sensor_list_new2.png',
    mop_swab_detail_image: '/rubys/app/suplies/supplies_mop_swab_detail_new.png',
    mop_swab_list_image: '/rubys/app/suplies/supplies_mop_swab_detail_new.png',
  },
  TanosS: {
    filter_mesh_gid_key: '144806',
    main_brush_gid_key: '144806',
    slide_brush_gid_key: '142645',
    mop_swab_gid_key: '144806',
    filter_mesh_detail_image: '/tanoss/app/suplies/supplies_detail_strainer_new.png',
    filter_mesh_list_image: '/tanoss/app/suplies/supplies_detail_strainer_new.png',
    main_brush_detail_image: '/tanoss/app/suplies/supplies_detail_mainbrush_new.png',
    main_brush_list_image: '/tanoss/app/suplies/supplies_detail_mainbrush_new.png',
    slide_brush_detail_image: '/tanoss/app/suplies/supplies_detail_sidebrush_new.png',
    slide_brush_list_image: '/tanoss/app/suplies/supplies_detail_sidebrush_new.png',
    sensor_detail_image: '/tanoss/app/suplies/supplies_sensor_detail_new.png',
    sensor_box_list_image: '/tanoss/app/suplies/supplies_sensor_list_new2.png',
    mop_swab_detail_image: '/tanoss/app/suplies/supplies_mop_swab_detail_new.png',
    mop_swab_list_image: '/tanoss/app/suplies/supplies_mop_swab_detail_new.png',
  },
  TanosSPlus: {
    filter_mesh_gid_key: '144806',
    main_brush_gid_key: '144806',
    slide_brush_gid_key: '142645',
    mop_swab_gid_key: '144806',
    filter_mesh_detail_image: '/tanossplus/app/suplies/supplies_detail_strainer_new.png',
    filter_mesh_list_image: '/tanossplus/app/suplies/filter_mesh_list_image.png',
    main_brush_detail_image: '/tanossplus/app/suplies/main_brush_detail_image.png',
    main_brush_list_image: '/tanossplus/app/suplies/main_brush_list_image.png',
    slide_brush_detail_image: '/tanossplus/app/suplies/supplies_detail_sidebrush_new.png',
    slide_brush_list_image: '/tanossplus/app/suplies/slide_brush_list_image.png',
    sensor_detail_image: '/tanossplus/app/suplies/supplies_sensor_detail_new.png',
    sensor_box_list_image: '/tanossplus/app/suplies/sensor_box_list_image.png',
    mop_swab_detail_image: '/tanossplus/app/suplies/supplies_mop_swab_detail_new.png',
    mop_swab_list_image: '/tanossplus/app/suplies/supplies_mop_swab_detail_new.png',
  },
  Garnet: {
    filter_mesh_gid_key: '142645',
    main_brush_gid_key: '142645',
    slide_brush_gid_key: '142645',
    water_box_gid_key: '142645',
    mop_swab_gid_key: '142645',
    filter_mesh_detail_image: '/garnet/app/suplies/supplies_detail_strainer_new.png',
    filter_mesh_list_image: '/garnet/app/suplies/supplies_detail_strainer_new.png',
    main_brush_detail_image: '/garnet/app/suplies/supplies_detail_mainbrush_new.png',
    main_brush_list_image: '/garnet/app/suplies/supplies_detail_mainbrush_new.png',
    slide_brush_detail_image: '/garnet/app/suplies/supplies_detail_sidebrush_new.png',
    slide_brush_list_image: '/garnet/app/suplies/supplies_detail_sidebrush_new.png',
    sensor_detail_image: '/garnet/app/suplies/supplies_sensor_detail_new.png',
    sensor_box_list_image: '/garnet/app/suplies/supplies_sensor_list_new2.png',
    strainer_detail_image: '/garnet/app/suplies/strainer_new.png',
    strainer_list_image: '/garnet/app/suplies/strainer_new.png',
    moproller_detail_image: '/garnet/app/suplies/moproller_detai_new.png',
    moproller_list_image: '/garnet/app/suplies/moproller_detai_new.png',
    mop_swab_detail_image: '/garnet/app/suplies/supplies_mop_swab_detail_new.png',
    mop_swab_list_image: '/garnet/app/suplies/supplies_mop_swab_detail_new.png',
  },
  TopazS: {
    filter_mesh_gid_key: '142645',
    main_brush_gid_key: '142645',
    slide_brush_gid_key: '142645',
    water_box_gid_key: '142645',
    mop_swab_gid_key: '142645',
    filter_mesh_detail_image: '/topazs/app/suplies/filter_mesh_detail_image.png',
    filter_mesh_list_image: '/topazs/app/suplies/filter_mesh_list_image.png',
    main_brush_detail_image: '/topazs/app/suplies/main_brush_detail_image.png',
    main_brush_list_image: '/topazs/app/suplies/main_brush_list_image.png',
    slide_brush_detail_image: '/topazs/app/suplies/slide_brush_detail_image.png',
    slide_brush_list_image: '/topazs/app/suplies/slide_brush_list_image.png',
    sensor_detail_image: '/topazs/app/suplies/sensor_box_detail_image.png',
    sensor_box_list_image: '/topazs/app/suplies/sensor_box_list_image.png',
    mop_swab_detail_image: '/topazs/app/suplies/mop_swab_detail_image.png',
    mop_swab_list_image: '/topazs/app/suplies/mop_swab_list_image.png',
  },
  TopazSV: {
    filter_mesh_gid_key: '142645',
    main_brush_gid_key: '142645',
    slide_brush_gid_key: '142645',
    water_box_gid_key: '142645',
    mop_swab_gid_key: '142645',
    filter_mesh_detail_image: '/topazsv/app/suplies/filter_mesh_detail_image.png',
    filter_mesh_list_image: '/topazsv/app/suplies/filter_mesh_list_image.png',
    main_brush_detail_image: '/topazsv/app/suplies/main_brush_detail_image.png',
    main_brush_list_image: '/topazsv/app/suplies/main_brush_list_image.png',
    slide_brush_detail_image: '/topazsv/app/suplies/slide_brush_detail_image.png',
    slide_brush_list_image: '/topazsv/app/suplies/slide_brush_list_image.png',
    sensor_detail_image: '/topazsv/app/suplies/sensor_box_detail_image.png',
    sensor_box_list_image: '/topazsv/app/suplies/sensor_box_list_image.png',
    mop_swab_detail_image: '/topazsv/app/suplies/mop_swab_detail_image.png',
    mop_swab_list_image: '/topazsv/app/suplies/mop_swab_list_image.png',
  },
  TanosSE: {
    filter_mesh_gid_key: '144806',
    main_brush_gid_key: '144806',
    slide_brush_gid_key: '142645',
    mop_swab_gid_key: '144806',
    filter_mesh_detail_image: '/tanosse/app/suplies/filter_mesh_detail_image.png',
    filter_mesh_list_image: '/tanosse/app/suplies/filter_mesh_list_image.png',
    main_brush_detail_image: '/tanosse/app/suplies/main_brush_detail_image.png',
    main_brush_list_image: '/tanosse/app/suplies/main_brush_list_image.png',
    slide_brush_detail_image: '/tanosse/app/suplies/slide_brush_detail_image.png',
    slide_brush_list_image: '/tanosse/app/suplies/slide_brush_list_image.png',
    sensor_detail_image: '/tanosse/app/suplies/sensor_box_detail_image.png',
    sensor_box_list_image: '/tanosse/app/suplies/sensor_box_list_image.png',
  },
  TanosSC: {
    filter_mesh_gid_key: '144806',
    main_brush_gid_key: '144806',
    slide_brush_gid_key: '142645',
    mop_swab_gid_key: '144806',
    filter_mesh_detail_image: '/tanossc/app/suplies/filter_mesh_detail_image.png',
    filter_mesh_list_image: '/tanossc/app/suplies/filter_mesh_list_image.png',
    main_brush_detail_image: '/tanossc/app/suplies/main_brush_detail_image.png',
    main_brush_list_image: '/tanossc/app/suplies/main_brush_list_image.png',
    slide_brush_detail_image: '/tanossc/app/suplies/slide_brush_detail_image.png',
    slide_brush_list_image: '/tanossc/app/suplies/slide_brush_list_image.png',
    sensor_detail_image: '/tanossc/app/suplies/sensor_box_detail_image.png',
    sensor_box_list_image: '/tanossc/app/suplies/sensor_box_list_image.png',
    mop_swab_detail_image: '/rubyslite/app/suplies/supplies_mop_swab_detail_new.png',
    mop_swab_list_image: '/rubyslite/app/suplies/supplies_mop_swab_detail_new.png',
  },
  TanosSLite: {
    filter_mesh_gid_key: '144806',
    main_brush_gid_key: '144806',
    slide_brush_gid_key: '142645',
    mop_swab_gid_key: '144806',
    filter_mesh_detail_image: '/tanosslite/app/suplies/filter_mesh_detail_image.png',
    filter_mesh_list_image: '/tanosslite/app/suplies/filter_mesh_list_image.png',
    main_brush_detail_image: '/tanosslite/app/suplies/main_brush_detail_image.png',
    main_brush_list_image: '/tanosslite/app/suplies/main_brush_list_image.png',
    slide_brush_detail_image: '/tanosslite/app/suplies/slide_brush_detail_image.png',
    slide_brush_list_image: '/tanosslite/app/suplies/slide_brush_list_image.png',
    sensor_detail_image: '/tanosslite/app/suplies/sensor_box_detail_image.png',
    sensor_box_list_image: '/tanosslite/app/suplies/sensor_box_list_image.png',
    mop_swab_detail_image: '/rubyslite/app/suplies/supplies_mop_swab_detail_new.png',
    mop_swab_list_image: '/rubyslite/app/suplies/supplies_mop_swab_detail_new.png',
  },
  TanosSMax: {
    filter_mesh_gid_key: '144806',
    main_brush_gid_key: '144806',
    slide_brush_gid_key: '142645',
    mop_swab_gid_key: '144806',
    filter_mesh_detail_image: '/tanossmax/app/suplies/filter_mesh_detail_image.png',
    filter_mesh_list_image: '/tanossmax/app/suplies/filter_mesh_list_image.png',
    main_brush_detail_image: '/tanossmax/app/suplies/main_brush_detail_image.png',
    main_brush_list_image: '/tanossmax/app/suplies/main_brush_list_image.png',
    slide_brush_detail_image: '/tanossmax/app/suplies/slide_brush_detail_image.png',
    slide_brush_list_image: '/tanossmax/app/suplies/slide_brush_list_image.png',
    sensor_detail_image: '/tanossmax/app/suplies/sensor_box_detail_image.png',
    sensor_box_list_image: '/tanossmax/app/suplies/sensor_box_list_image.png',
    mop_swab_detail_image: '/tanossmax/app/suplies/mop_swab_detail_image.png',
    mop_swab_list_image: '/tanossmax/app/suplies/mop_swab_list_image.png',
  },
  Ultron: p(142645, 'ultron'),
  UltronsPlus: p(142645, 'ultronsplus'),
  Pearl: p(142645, 'pearl'),
  Default: {
    filter_mesh_gid_key: '142645',
    main_brush_gid_key: '142645',
    slide_brush_gid_key: '142645',
    water_box_gid_key: '142645',
    mop_swab_gid_key: '142645',
    filter_mesh_detail_image: '/tanose/app/suplies/supplies_detail_strainer_new.png',
    filter_mesh_list_image: '/tanose/app/suplies/supplies_detail_strainer_new.png',
    main_brush_detail_image: '/tanose/app/suplies/supplies_detail_mainbrush_new.png',
    main_brush_list_image: '/tanose/app/suplies/supplies_detail_mainbrush_new.png',
    slide_brush_detail_image: '/tanose/app/suplies/supplies_detail_sidebrush_new.png',
    slide_brush_list_image: '/tanose/app/suplies/supplies_detail_sidebrush_new.png',
    sensor_detail_image: '/tanose/app/suplies/supplies_sensor_detail_new.png',
    sensor_box_list_image: '/tanose/app/suplies/supplies_sensor_list_new2.png',
    mop_swab_detail_image: '/tanose/app/suplies/supplies_mop_swab_detail_new.png',
    mop_swab_list_image: '/tanose/app/suplies/supplies_mop_swab_detail_new.png',
    floor_cleaning_fluid_list_image: '/topazsv/app/suplies/floor_cleaning_fluid_list_image.png',
    floor_cleaning_fluid_detail_image: '/topazsv/app/suplies/floor_cleaning_fluid_detail_image.png',
    strainer_list_image: '/topazsv/app/suplies/strainer_list_image.png',
    strainer_detail_image: '/topazsv/app/suplies/strainer_detail_image.png',
    strainer_detail_o3_image: '/topazsv/app/suplies/strainer_detail_o3_image.png',
    cleaning_brush_list_image: '/topazs/app/suplies/cleaning_brush_list_image.png',
    cleaning_brush_detail_image: '/topazs/app/suplies/cleaning_brush_detail_image.png',
    cleaning_brush_o3_detail_image: '/topazsv/app/suplies/cleaning_brush_o3_detail_image.png',
    dust_bag_list_image: '/topazsv/app/suplies/dust_bag_list_image.png',
    dust_bag_detail_image: '/topazsv/app/suplies/dust_bag_detail_image.png',
    dust_collection_list_image: '/topazsv/app/suplies/dust_collection_list_image.png',
    dust_collection_detail_image: '/topazsv/app/suplies/dust_collection_detail_image.png',
    dust_bag_o3_list_image: '/topazsv/app/suplies/dust_bag_o3_list_image.png',
    dust_bag_o3_detail_image: '/topazsv/app/suplies/dust_bag_o3_detail_image.png',
  },
};
exports.SuppliesMap = t;
