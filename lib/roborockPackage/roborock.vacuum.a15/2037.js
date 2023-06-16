var module12 = require('./12'),
  o = module12.StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: '#fff',
    },
    rowContainer: {
      flex: 1,
      flexDirection: 'row',
      height: 55,
      paddingRight: 20,
      backgroundColor: '#fff',
      paddingLeft: 15,
      borderBottomColor: '#bbb',
      borderBottomWidth: module12.StyleSheet.hairlineWidth,
    },
    textStyle: {
      fontSize: 15,
      color: '#101010',
      lineHeight: 55,
    },
  });

exports.default = o;
