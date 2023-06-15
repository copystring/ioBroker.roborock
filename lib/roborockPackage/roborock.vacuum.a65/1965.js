exports.getSupplies = function () {
  var s = module381.RSM.isO3Dock() || module381.RSM.isO3PlusDock() || module381.RSM.isO4Dock() || module381.RSM.isPearlDock(),
    u = 'o0';
  if (module381.RSM.isO1Dock()) u = 'o1';
  if (module381.RSM.isO2Dock()) u = 'o2';
  if (module381.RSM.isO3Dock()) u = 'o3';
  if (module381.RSM.isO3PlusDock()) u = 'o3';
  if (module381.RSM.isO4Dock()) u = 'o4';
  if (module381.RSM.isPearlDock()) u = 'pearl';
  if (module381.RSM.isOCDock() && module424.DMM.isUltron) u = 'ocd';
  console.log('supplyDockType', module381.RSM.isOCDock(), module381.RSM.originDockType, module424.DMM.isUltron, u);

  for (
    var n = [
        {
          data: [
            {
              name: module510.localization_strings_Setting_Supplies_Common_0,
              suppliesKey: 'filter_work_time',
              isNeedTime: true,
              isNeedState: false,
              isUnitsTime: true,
              resetItemContent: module510.localization_strings_Setting_Supplies_DetailsPage_19,
              resetItemButtonText: module510.localization_strings_Setting_Supplies_DetailsPage_22,
              total: 150,
              image: module424.DMM.supplies.filter_mesh_detail_image,
              listImage: module424.DMM.supplies.filter_mesh_list_image,
              text: module510.localization_strings_Setting_Supplies_Common_1,
              gid: module424.DMM.supplies.filter_mesh_gid_key,
              url: 'http://home.mi.com/shop/detail?gid=' + module424.DMM.supplies.filter_mesh_gid_key,
              urlTW: 'http://buy.mi.com/tw/item/3170700016',
              urlName: 'url_supplies_filter',
              visible: true,
              path:
                module424.DMM.isTanosS ||
                module424.DMM.isTanosSPlus ||
                module424.DMM.isTanosSMax ||
                module424.DMM.isTopazS ||
                module424.DMM.isTopazSV ||
                module424.DMM.isPearlPlus ||
                module424.DMM.isTopazSPlus ||
                module424.DMM.isUltron ||
                module424.DMM.isTopazSC ||
                module424.DMM.isPearl
                  ? '/h5/#/pages/product/product?id=71&isFromRRApp=true'
                  : '/h5/#/pages/product/product?id=3&isFromRRApp=true',
            },
            {
              name: module510.localization_strings_Setting_Supplies_Common_4,
              suppliesKey: 'main_brush_work_time',
              isNeedTime: true,
              isNeedState: false,
              isUnitsTime: true,
              resetItemContent: module510.localization_strings_Setting_Supplies_DetailsPage_21,
              resetItemButtonText: module510.localization_strings_Setting_Supplies_DetailsPage_22,
              total: 300,
              gid: module424.DMM.supplies.main_brush_gid_key,
              image: module424.DMM.supplies.main_brush_detail_image,
              listImage: module424.DMM.supplies.main_brush_list_image,
              text: module510.localization_strings_Setting_Supplies_Common_5,
              url: 'http://home.mi.com/shop/detail?gid=' + module424.DMM.supplies.main_brush_gid_key,
              urlTW: 'http://buy.mi.com/tw/item/3170700014',
              urlName: 'url_supplies_mainbrush',
              visible: true,
              path:
                module424.DMM.isTanosS ||
                module424.DMM.isTanosSPlus ||
                module424.DMM.isTopazS ||
                module424.DMM.isTopazSV ||
                module424.DMM.isPearlPlus ||
                module424.DMM.isTopazSPlus ||
                module424.DMM.isUltron ||
                module424.DMM.isTopazSC ||
                module424.DMM.isPearl ||
                module424.DMM.isTanosSMax
                  ? '/h5/#/pages/product/product?id=84&isFromRRApp=true'
                  : '/h5/#/pages/product/product?id=24&isFromRRApp=true',
            },
            {
              name: module510.localization_strings_Setting_Supplies_Common_2,
              suppliesKey: 'side_brush_work_time',
              isNeedTime: true,
              isNeedState: false,
              isUnitsTime: true,
              resetItemContent: module510.localization_strings_Setting_Supplies_DetailsPage_20,
              resetItemButtonText: module510.localization_strings_Setting_Supplies_DetailsPage_22,
              total: 200,
              image: module424.DMM.supplies.slide_brush_detail_image,
              listImage: module424.DMM.supplies.slide_brush_list_image,
              text: module510.localization_strings_Setting_Supplies_Common_3,
              gid: module424.DMM.supplies.slide_brush_gid_key,
              url: 'http://home.mi.com/shop/detail?gid=' + module424.DMM.supplies.slide_brush_gid_key,
              urlTW: 'http://buy.mi.com/tw/item/3170700015',
              urlName: 'url_supplies_sidebrush',
              visible: true,
              path:
                module424.DMM.isTopazS ||
                module424.DMM.isTopazSV ||
                module424.DMM.isPearlPlus ||
                module424.DMM.isTopazSPlus ||
                module424.DMM.isUltron ||
                module424.DMM.isTopazSC ||
                module424.DMM.isPearl
                  ? '/h5/#/pages/product/product?id=32&isFromRRApp=true'
                  : '/h5/#/pages/product/product?id=2&isFromRRApp=true',
            },
            {
              name: module510.supplies_sensors_name,
              suppliesKey: 'sensor_dirty_time',
              isNeedTime: false,
              isNeedState: true,
              isUnitsTime: true,
              resetItemContent: module510.supplies_sensors_reset_content,
              resetItemButtonText: module510.supplies_sensors_reset_button,
              total: 30,
              image: module424.DMM.isTopazSC ? '/app/topazsc/suplies/sensor_box_detail_image.png' : module424.DMM.supplies.sensor_detail_image,
              listImage: module424.DMM.supplies.sensor_box_list_image,
              text: module510.supplies_sensors_text,
              visible: true,
            },
            {
              name: module510.supplies_waterbox_chip_name,
              suppliesKey: 'filter_element_work_time',
              isNeedTime: false,
              isNeedState: true,
              isUnitsTime: true,
              resetItemContent: module510.supplies_filte_reset_content,
              resetItemButtonText: module510.localization_strings_Setting_Supplies_DetailsPage_22,
              total: 100,
              image: module424.DMM.supplies.water_box_detail_image,
              listImage: module424.DMM.supplies.water_box_list_image,
              text: module510.supplies_waterbox_chip_description,
              gid: module424.DMM.supplies.water_box_gid_key,
              url: 'http://home.mi.com/shop/detail?gid=' + module424.DMM.supplies.water_box_gid_key,
              visible: module390.default.isWaterBoxSupported(),
              path: '/h5/#/pages/product/product?id=84&isFromRRApp=true',
            },
            {
              name: module510.supplies_moproller_name,
              suppliesKey: 'moproller_work_time',
              isNeedTime: true,
              isNeedState: false,
              isUnitsTime: true,
              resetItemContent: module510.supplies_moroller_reset_content,
              resetItemButtonText: module510.localization_strings_Setting_Supplies_DetailsPage_22,
              total: 300,
              image: module424.DMM.supplies.moproller_detail_image,
              listImage: module424.DMM.supplies.moproller_list_image,
              text: module510.supplies_moproller_description,
              visible: module424.DMM.isGarnet,
            },
            {
              name: module510.supplies_mop_swab_name,
              suppliesKey: 'mopSwabSupplies',
              subTitle: module510.supplies_mop_swab_sub_desc,
              isNeedTime: false,
              isNeedState: false,
              image: module424.DMM.supplies.mop_swab_detail_image,
              listImage: module424.DMM.supplies.mop_swab_list_image,
              text: module510.supplies_mop_swab_ecu_description,
              gid: module424.DMM.supplies.mop_swab_gid_key,
              visible: !(module424.DMM.isRubyPlus || module424.DMM.isRubysE || module424.DMM.isGarnet || module424.DMM.isTanosSE || module424.DMM.isUltronE),
              path:
                module424.DMM.isTanosS || module424.DMM.isTanosSPlus || module424.DMM.isUltron || module424.DMM.isTanosSMax
                  ? '/h5/#/pages/product/product?id=76&isFromRRApp=true'
                  : module424.DMM.isTopazS ||
                    module424.DMM.isTopazSV ||
                    module424.DMM.isPearlPlus ||
                    module424.DMM.isTopazSPlus ||
                    module424.DMM.isUltron ||
                    module424.DMM.isTopazSC ||
                    module424.DMM.isPearl
                  ? '/h5/#/pages/product/product?id=96&isFromRRApp=true'
                  : '/h5/#/pages/product/product?id=11&isFromRRApp=true',
            },
          ],
        },
        {
          data: [
            {
              name: module424.DMM.isPearl ? module510.supplies_pearl_strainer_name : module510.supplies_strainer_name,
              suppliesKey: 'strainer_work_times',
              isNeedTime: false,
              isNeedState: true,
              isUnitsTime: false,
              resetItemContent: module424.DMM.isPearl ? module510.pearl_supplies_strainer_reset_content : module510.supplies_strainer_reset_content,
              resetItemButtonText: module510.supplies_sensors_reset_button,
              total: 150,
              image: module426.getDockSupplyByDockType('strainer', u).detail,
              listImage: module426.getDockSupplyByDockType('strainer', u).list,
              text: module424.DMM.isPearl ? module510.supplies_pearl_strainer_description : module510.supplies_strainer_description,
              visible: module381.RSM.isO2Dock() || s || module381.RSM.hasConnectedWashDock,
            },
            {
              name: module510.home_page_supplies_cleaning_brush1,
              suppliesKey: 'cleaning_brush_work_times',
              isNeedTime: false,
              isNeedState: true,
              isUnitsTime: false,
              resetItemContent: module510.home_page_supplies_cleaning_brush2,
              resetItemButtonText: module510.supplies_sensors_reset_button,
              total: 300,
              image: module426.getDockSupplyByDockType('cleaning_brush', u).detail,
              listImage: module426.getDockSupplyByDockType('cleaning_brush', u).list,
              text: module510.home_page_supplies_cleaning_brush3,
              visible: module381.RSM.isO2Dock() || (s && !module381.RSM.isPearlDock()) || module381.RSM.hasConnectedWashDock,
              path: '/h5/#/pages/product/product?id=97&isFromRRApp=true',
            },
            {
              name: module510.dust_collection_life1,
              suppliesKey: 'dust_collection_work_times',
              isNeedTime: false,
              isNeedState: true,
              isUnitsTime: false,
              resetItemContent: module510.dust_collection_life3,
              resetItemButtonText: module510.supplies_sensors_reset_button,
              total: 90,
              image: module426.getDockSupplyByDockType('dust_bucket').detail,
              listImage: module426.getDockSupplyByDockType('dust_bucket').list,
              text: module510.dust_collection_life4,
              visible: module381.RSM.isO1Dock() && !module390.default.isFCC() && !module381.RSM.isOCDock(),
            },
            {
              name: module510.dust_collection_life5,
              suppliesKey: 'dust_bag_work_times',
              isNeedTime: false,
              isNeedState: false,
              subTitle: module510.supplies_mop_swab_sub_desc,
              image: module426.getDockSupplyByDockType('dust_bag', u).detail,
              listImage: module426.getDockSupplyByDockType('dust_bag', u).list,
              text: module510.dust_collection_life8,
              visible: (module381.RSM.isO1Dock() && module390.default.isFCC()) || s || module381.RSM.isOCDock(),
              path:
                module381.RSM.isO1Dock() && module390.default.isFCC()
                  ? '/h5/#/pages/product/product?id=83&isFromRRApp=true'
                  : '/h5/#/pages/product/product?id=114&isFromRRApp=true',
            },
            {
              name: module510.supplies_floor_cleaning_fluid,
              suppliesKey: 'floor_cleaning_fluid',
              isNeedTime: false,
              isNeedState: false,
              isUnitsTime: false,
              total: 300,
              image: module426.getDockSupplyByDockType('floor_cleaning_fluid').detail,
              listImage: module426.getDockSupplyByDockType('floor_cleaning_fluid').list,
              text: module510.supplies_floor_cleaning_fluid1,
              visible: (module381.RSM.isO2Dock() || module381.RSM.isO3Dock() || s || module381.RSM.hasConnectedWashDock) && 'cn' == module390.default.deviceLocation,
              path: '/h5/#/pages/product/product?id=94&isFromRRApp=true',
            },
          ],
        },
      ],
      M = 0;
    M < n.length;
    M++
  ) {
    for (var c = n[M].data, D = 0; D < c.length; D++) c[D].visible || (c.splice(D, 1), (D -= 1));

    if (!c.length) {
      n.splice(M, 1);
      M -= 1;
    }
  }

  return n;
};

var module424 = require('./424'),
  module381 = require('./381'),
  module390 = require('./390'),
  module426 = require('./426'),
  module510 = require('./510').strings;

module426.SuppliesMap.Default;
