import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import colors from '../colors/colors';
const {width, height} = Dimensions.get('window');

const NavigationHeader = ({
  Title = '',

  ...more
}) => {
  return (
    <View style={styles.header} {...more}>
      <View style={styles.headertitle}>
        <Text style={styles.headertitle}>{Title}</Text>
      </View>
    </View>
  );
};
export default NavigationHeader;

const styles = StyleSheet.create({
  header: {
    width: width,
    position: 'relative',
    height: height / 12,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  headertitle: {
    fontSize: 24,
    fontWeight: '500',
    color: '#FFFF',
    fontFamily: 'WorkSans-Regular',
  },
});
