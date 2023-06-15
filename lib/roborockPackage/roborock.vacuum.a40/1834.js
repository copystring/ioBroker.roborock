exports.getSupplies = M;

var module422 = require('./422'),
  module381 = require('./381'),
  module390 = require('./390'),
  module424 = require('./424'),
  module500 = require('./500').strings,
  u = module424.SuppliesMap.Default,
  n = M();

function M() {
  for (
    var s = [
        {
          data: [
            {
              name: module500.localization_strings_Setting_Supplies_Common_0,
              suppliesKey: 'filter_work_time',
              isNeedTime: true,
              isNeedState: false,
              isUnitsTime: true,
              resetItemContent: module500.localization_strings_Setting_Supplies_DetailsPage_19,
              resetItemButtonText: module500.localization_strings_Setting_Supplies_DetailsPage_22,
              total: 150,
              image: module422.DMM.supplies.filter_mesh_detail_image,
              listImage: module422.DMM.supplies.filter_mesh_list_image,
              text: module500.localization_strings_Setting_Supplies_Common_1,
              gid: module422.DMM.supplies.filter_mesh_gid_key,
              url: 'http://home.mi.com/shop/detail?gid=' + module422.DMM.supplies.filter_mesh_gid_key,
              urlTW: 'http://buy.mi.com/tw/item/3170700016',
              urlName: 'url_supplies_filter',
              visible: true,
              path:
                module422.DMM.isTanosS || module422.DMM.isTanosSPlus || module422.DMM.isTanosSMax || module422.DMM.isTopazS || module422.DMM.isTopazSV || module422.DMM.isTopazSPlus
                  ? '/h5/#/pages/product/product?id=71&isFromRRApp=true'
                  : '/h5/#/pages/product/product?id=3&isFromRRApp=true',
            },
            {
              name: module500.localization_strings_Setting_Supplies_Common_4,
              suppliesKey: 'main_brush_work_time',
              isNeedTime: true,
              isNeedState: false,
              isUnitsTime: true,
              resetItemContent: module500.localization_strings_Setting_Supplies_DetailsPage_21,
              resetItemButtonText: module500.localization_strings_Setting_Supplies_DetailsPage_22,
              total: 300,
              gid: module422.DMM.supplies.main_brush_gid_key,
              image: module422.DMM.supplies.main_brush_detail_image,
              listImage: module422.DMM.supplies.main_brush_list_image,
              text: module500.localization_strings_Setting_Supplies_Common_5,
              url: 'http://home.mi.com/shop/detail?gid=' + module422.DMM.supplies.main_brush_gid_key,
              urlTW: 'http://buy.mi.com/tw/item/3170700014',
              urlName: 'url_supplies_mainbrush',
              visible: true,
              path:
                module422.DMM.isTanosS || module422.DMM.isTanosSPlus || module422.DMM.isTopazS || module422.DMM.isTopazSV || module422.DMM.isTopazSPlus
                  ? '/h5/#/pages/product/product?id=84&isFromRRApp=true'
                  : '/h5/#/pages/product/product?id=24&isFromRRApp=true',
            },
            {
              name: module500.localization_strings_Setting_Supplies_Common_2,
              suppliesKey: 'side_brush_work_time',
              isNeedTime: true,
              isNeedState: false,
              isUnitsTime: true,
              resetItemContent: module500.localization_strings_Setting_Supplies_DetailsPage_20,
              resetItemButtonText: module500.localization_strings_Setting_Supplies_DetailsPage_22,
              total: 200,
              image: module422.DMM.supplies.slide_brush_detail_image,
              listImage: module422.DMM.supplies.slide_brush_list_image,
              text: module500.localization_strings_Setting_Supplies_Common_3,
              gid: module422.DMM.supplies.slide_brush_gid_key,
              url: 'http://home.mi.com/shop/detail?gid=' + module422.DMM.supplies.slide_brush_gid_key,
              urlTW: 'http://buy.mi.com/tw/item/3170700015',
              urlName: 'url_supplies_sidebrush',
              visible: true,
              path:
                module422.DMM.isTopazS || module422.DMM.isTopazSV || module422.DMM.isTopazSPlus
                  ? '/h5/#/pages/product/product?id=32&isFromRRApp=true'
                  : '/h5/#/pages/product/product?id=2&isFromRRApp=true',
            },
            {
              name: module500.supplies_sensors_name,
              suppliesKey: 'sensor_dirty_time',
              isNeedTime: false,
              isNeedState: true,
              isUnitsTime: true,
              resetItemContent: module500.supplies_sensors_reset_content,
              resetItemButtonText: module500.supplies_sensors_reset_button,
              total: 30,
              image: module422.DMM.supplies.sensor_detail_image,
              listImage: module422.DMM.supplies.sensor_box_list_image,
              text: module500.supplies_sensors_text,
              visible: true,
            },
            {
              name: module500.supplies_waterbox_chip_name,
              suppliesKey: 'filter_element_work_time',
              isNeedTime: false,
              isNeedState: true,
              isUnitsTime: true,
              resetItemContent: module500.supplies_filte_reset_content,
              resetItemButtonText: module500.localization_strings_Setting_Supplies_DetailsPage_22,
              total: 100,
              image: module422.DMM.supplies.water_box_detail_image,
              listImage: module422.DMM.supplies.water_box_list_image,
              text: module500.supplies_waterbox_chip_description,
              gid: module422.DMM.supplies.water_box_gid_key,
              url: 'http://home.mi.com/shop/detail?gid=' + module422.DMM.supplies.water_box_gid_key,
              visible: module390.default.isWaterBoxSupported(),
              path: '/h5/#/pages/product/product?id=84&isFromRRApp=true',
            },
            {
              name: module500.supplies_moproller_name,
              suppliesKey: 'moproller_work_time',
              isNeedTime: true,
              isNeedState: false,
              isUnitsTime: true,
              resetItemContent: module500.supplies_moroller_reset_content,
              resetItemButtonText: module500.localization_strings_Setting_Supplies_DetailsPage_22,
              total: 300,
              image: module422.DMM.supplies.moproller_detail_image,
              listImage: module422.DMM.supplies.moproller_list_image,
              text: module500.supplies_moproller_description,
              visible: module422.DMM.isGarnet,
            },
            {
              name: module500.supplies_mop_swab_name,
              suppliesKey: 'mopSwabSupplies',
              subTitle: module500.supplies_mop_swab_sub_desc,
              isNeedTime: false,
              isNeedState: false,
              image: module422.DMM.supplies.mop_swab_detail_image,
              listImage: module422.DMM.supplies.mop_swab_list_image,
              text: module500.supplies_mop_swab_ecu_description,
              gid: module422.DMM.supplies.mop_swab_gid_key,
              visible: !(module422.DMM.isRubyPlus || module422.DMM.isRubysE || module422.DMM.isGarnet || module422.DMM.isTanosSE),
              path:
                module422.DMM.isTanosS || module422.DMM.isTanosSPlus || module422.DMM.isTanosSMax
                  ? '/h5/#/pages/product/product?id=76&isFromRRApp=true'
                  : module422.DMM.isTopazS || module422.DMM.isTopazSV || module422.DMM.isTopazSPlus
                  ? '/h5/#/pages/product/product?id=96&isFromRRApp=true'
                  : '/h5/#/pages/product/product?id=11&isFromRRApp=true',
            },
          ],
        },
        {
          data: [
            {
              name: module500.supplies_strainer_name,
              suppliesKey: 'strainer_work_times',
              isNeedTime: false,
              isNeedState: true,
              isUnitsTime: false,
              resetItemContent: module500.supplies_strainer_reset_content,
              resetItemButtonText: module500.supplies_sensors_reset_button,
              total: 150,
              image: module381.RSM.isO3Dock() ? u.strainer_detail_o3_image : u.strainer_detail_image,
              listImage: u.strainer_list_image,
              text: module500.supplies_strainer_description,
              visible: module422.DMM.isGarnet || module381.RSM.isO2Dock() || module381.RSM.isO3Dock() || module381.RSM.hasConnectedWashDock,
            },
            {
              name: module500.home_page_supplies_cleaning_brush1,
              suppliesKey: 'cleaning_brush_work_times',
              isNeedTime: false,
              isNeedState: true,
              isUnitsTime: false,
              resetItemContent: module500.home_page_supplies_cleaning_brush2,
              resetItemButtonText: module500.supplies_sensors_reset_button,
              total: 300,
              image: module381.RSM.isO3Dock() ? u.cleaning_brush_o3_detail_image : u.cleaning_brush_detail_image,
              listImage: u.cleaning_brush_list_image,
              text: module500.home_page_supplies_cleaning_brush3,
              visible: module381.RSM.isO2Dock() || module381.RSM.isO3Dock() || module381.RSM.hasConnectedWashDock,
              path: '/h5/#/pages/product/product?id=97&isFromRRApp=true',
            },
            {
              name: module500.dust_collection_life1,
              suppliesKey: 'dust_collection_work_times',
              isNeedTime: false,
              isNeedState: true,
              isUnitsTime: false,
              resetItemContent: module500.dust_collection_life3,
              resetItemButtonText: module500.supplies_sensors_reset_button,
              total: 90,
              image: u.dust_collection_detail_image,
              listImage: u.dust_collection_list_image,
              text: module500.dust_collection_life4,
              visible: module381.RSM.isO1Dock() && !module390.default.isFCC() && !module381.RSM.isOCDock(),
            },
            {
              name: module500.dust_collection_life5,
              suppliesKey: 'dust_bag_work_times',
              isNeedTime: false,
              isNeedState: false,
              subTitle: module500.supplies_mop_swab_sub_desc,
              image: module381.RSM.isO3Dock() || module381.RSM.isOCDock() ? u.dust_bag_o3_detail_image : u.dust_bag_detail_image,
              listImage: module381.RSM.isO3Dock() || module381.RSM.isOCDock() ? u.dust_bag_o3_list_image : u.dust_bag_list_image,
              text: module500.dust_collection_life8,
              visible: (module381.RSM.isO1Dock() && module390.default.isFCC()) || module381.RSM.isO3Dock() || module381.RSM.isOCDock(),
              path:
                module381.RSM.isO1Dock() && module390.default.isFCC()
                  ? '/h5/#/pages/product/product?id=83&isFromRRApp=true'
                  : '/h5/#/pages/product/product?id=114&isFromRRApp=true',
            },
            {
              name: module500.supplies_floor_cleaning_fluid,
              suppliesKey: 'floor_cleaning_fluid',
              isNeedTime: false,
              isNeedState: false,
              isUnitsTime: false,
              total: 300,
              image: u.floor_cleaning_fluid_detail_image,
              listImage: u.floor_cleaning_fluid_list_image,
              text: module500.supplies_floor_cleaning_fluid1,
              visible: module381.RSM.isO2Dock() || module381.RSM.isO3Dock() || module381.RSM.hasConnectedWashDock,
              path: '/h5/#/pages/product/product?id=94&isFromRRApp=true',
            },
          ],
        },
      ],
      l = 0;
    l < s.length;
    l++
  ) {
    for (var n = s[l].data, M = 0; M < n.length; M++) n[M].visible || (n.splice(M, 1), (M -= 1));

    if (!n.length) {
      s.splice(l, 1);
      l -= 1;
    }
  }

  return s;
}

exports.Supplies = n;
