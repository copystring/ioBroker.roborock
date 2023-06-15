var t = {
    light: '200',
    regular: '400',
    medium: '500',
    semibold: '600',
  },
  module13 = {
    iconSize: {
      extraSmall: 8,
      small: 12,
      medium: 16,
      large: 20,
      extraLarge: 24,
    },
    borderRadius: {
      extraSmall: 4,
      small: 8,
      medium: 12,
      large: 16,
      extraLarge: 24,
    },
    fontWeight: t,
    spacing: {
      none: 0,
      superTight: 2,
      extraTight: 4,
      tight: 8,
      baseTight: 12,
      base: 16,
      baseLoose: 20,
      loose: 24,
      extraLoose: 32,
      superLoose: 40,
    },
    textStyle: require('./13').StyleSheet.create({
      privacyDesc: {
        fontSize: 10,
        fontWeight: t.regular,
        lineHeight: 14,
      },
      pictureDesc: {
        fontSize: 12,
        fontWeight: t.regular,
        lineHeight: 17,
      },
      contentSmall: {
        fontSize: 12,
        fontWeight: t.regular,
        lineHeight: 17,
      },
      contentMedium: {
        fontSize: 14,
        fontWeight: t.regular,
        lineHeight: 20,
      },
      contentLarge: {
        fontSize: 16,
        fontWeight: t.regular,
        lineHeight: 23,
      },
      auxiliarySmall: {
        fontSize: 12,
        fontWeight: t.regular,
        lineHeight: 17,
      },
      auxiliaryLarge: {
        fontSize: 14,
        fontWeight: t.regular,
        lineHeight: 20,
      },
      titleGroupLight: {
        fontSize: 16,
        fontWeight: t.regular,
        lineHeight: 23,
      },
      titleGroupBold: {
        fontSize: 16,
        fontWeight: t.semibold,
        lineHeight: 23,
      },
      titleGroupSmallLight: {
        fontSize: 14,
        fontWeight: t.regular,
        lineHeight: 26,
      },
      titleGroupSmallBold: {
        fontSize: 14,
        fontWeight: t.semibold,
        lineHeight: 20,
      },
      titleGroupLargeBold: {
        fontSize: 18,
        fontWeight: t.semibold,
        lineHeight: 26,
      },
      titleLevel3Light: {
        fontSize: 20,
        fontWeight: t.regular,
        lineHeight: 28,
      },
      titleLevel3Bold: {
        fontSize: 20,
        fontWeight: t.semibold,
        lineHeight: 28,
      },
      titleLevel2: {
        fontSize: 24,
        fontWeight: t.semibold,
        lineHeight: 34,
      },
      titleLevel1: {
        fontSize: 30,
        fontWeight: t.semibold,
        lineHeight: 42,
      },
      dataDisplayType1: {
        fontSize: 38,
        fontWeight: t.regular,
        lineHeight: 54,
      },
      dataDisplayType2: {
        fontSize: 48,
        fontWeight: t.regular,
        lineHeight: 68,
      },
      dataDisplayType1: {
        fontSize: 60,
        fontWeight: t.light,
        lineHeight: 84,
      },
      dataDisplayType1: {
        fontSize: 72,
        fontWeight: t.light,
        lineHeight: 101,
      },
      buttonSmall: {
        fontSize: 14,
        fontWeight: t.regular,
        lineHeight: 20,
      },
      buttonSmallBold: {
        fontSize: 14,
        fontWeight: t.semibold,
        lineHeight: 20,
      },
      buttonLargeLight: {
        fontSize: 16,
        fontWeight: t.regular,
        lineHeight: 23,
      },
      buttonLargeBold: {
        fontSize: 16,
        fontWeight: t.semibold,
        lineHeight: 23,
      },
      paragrahPrivacy: {
        fontSize: 10,
        fontWeight: t.regular,
        lineHeight: 18,
      },
      paragrahPrivacy: {
        fontSize: 12,
        fontWeight: t.regular,
        lineHeight: 22,
      },
      paragraphTextType1: {
        fontSize: 14,
        fontWeight: t.regular,
        lineHeight: 24,
      },
      paragraphTextType2: {
        fontSize: 16,
        fontWeight: t.regular,
        lineHeight: 28,
      },
    }),
    paragraphSpacing: {
      small: 8,
      large: 12,
    },
    colorsLight: {
      system: {
        basic: {
          primary: '#007AFF',
          error: '#FF3B30',
          warning: '#FF9500',
          hint: '#34C759',
        },
        background: {
          primary: '#FFFFFF',
          component: '#F2F2F7',
          card: '#FFFFFF',
          blockComponent: '#F2F2F7',
          blockCard: '#FFFFFF',
          modal: '#FFFFFF',
          selector: '#FFFFFF',
        },
      },
      text: {
        level1: '#000000E5',
        level2: '#3C3C43CC',
        level3: '#3C3C4399',
        level4: '#3C3C434D',
        level5: '#3C3C432E',
      },
      component: {
        level1: '#78788033',
        level2: '#78788029',
        level3: '#7676801F',
        level4: '#74748014',
      },
      seperator: {
        line: '#3C3C4333',
        stripe: ['#FFFFFFB2', '#1414140D'],
      },
      modalMask: {
        thin: '#00000033',
        light: '#00000066',
        regular: '#00000099',
        thick: '#000000CC',
      },
    },
    colorsDark: {
      system: {
        basic: {
          primary: '#007AFF',
          error: '#FF453A',
          warning: '#FF9500',
          hint: '#34C759',
        },
        background: {
          primary: '#000000',
          component: '#000000',
          card: '#1C1C1E',
          blockComponent: '#1C1C1E',
          blockCard: '#2C2C2E',
          modal: '#1E1E1E',
          selector: '#636366',
        },
      },
      text: {
        level1: '#FFFFFF',
        level2: '#EBEBF5E5',
        level3: '#EBEBF599',
        level4: '#EBEBF54D',
        level5: '#EBEBF52E',
      },
      component: {
        level1: '#7878805C',
        level2: '#78788052',
        level3: '#7676803D',
        level4: '#7474802E',
      },
      seperator: {
        line: '#545458CC',
        stripe: ['#000000B2', '#14141426'],
      },
      modalMask: {
        thin: '#00000066',
        light: '#00000099',
        regular: '#000000B2',
        thick: '#000000E5',
      },
    },
  };
exports.default = module13;
