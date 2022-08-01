import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import colors from '../colors/colors';
import {useSelector} from 'react-redux';

const {height} = Dimensions.get('window');

const HomeScreenHeader = () => {
  const {userdata} = useSelector(state => state.authReducer.Login);
  const fullname = userdata?.fullname;

  return (
    <View style={styles.header}>
      <View style={styles.headertitle}>
        <Text style={styles.greetingtext}>Hi </Text>
        <Text style={styles.greetingtext}> {fullname}</Text>
      </View>

      {/* <Image style={styles.img} source={{uri: profile}} /> */}
    </View>
  );
};
export default HomeScreenHeader;

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    top: 0,
    height: height / 10,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    display: 'flex',
    justifyContent: 'space-between',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headertitle: {
    display: 'flex',
    flexDirection: 'row',
  },
  greetingtext: {
    fontSize: 22,
    color: '#FFFF',
    textAlign: 'center',
    fontFamily: 'WorkSans-Regular',
  },
  userinfo: {
    fontSize: 22,
    color: '#FFFF',
    fontFamily: 'WorkSans-Regular',
    // marginHorizontal: 100,
  },
  img: {
    height: 45,
    width: 45,
  },
});
