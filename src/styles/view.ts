import {StyleSheet} from 'react-native';

const viewStyle = StyleSheet.create({
  view: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },

  header: {
    paddingTop: 10,
  },

  footer: {},

  viewSymm: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export {viewStyle};
