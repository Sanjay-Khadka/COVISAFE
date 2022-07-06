import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

const {height, width} = Dimensions.get('window');
const UsersFlatlist = () => {
  const renderItem = ({item}) => {
    return (
      //   <TouchableOpacity
      //     style={styles.button}
      // onPress={() => navigateCourseDetails(item)}>
      <View style={styles.container}>
        <View style={styles.coursetitle}>
          <Text style={styles.textcourse}>{item.name}</Text>

          <Text style={styles.assignment}>{item.chapter_count} chapters</Text>
        </View>
      </View>
      //   </TouchableOpacity>
    );
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={}
      keyExtractor={item => item.id}
      renderItem={renderItem}
    />
  );
};

export default UsersFlatlist;

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    marginVertical: 8,
    elevation: 3,
    // justifyContent: 'center',
    width: width - 10,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  container: {
    // elevation: 5,
    flexDirection: 'row',
    height: height / 9,
    // margin: 6,
    borderRadius: 15,
    justifyContent: 'space-around',

    width: width - 10,
    alignItems: 'center',
    // backgroundColor: '#FFFFFF',
  },
  coursetitle: {
    height: height / 11,
    width: width - 90,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  textcourse: {
    fontSize: 14,
    color: '#000000',
    fontWeight: 'bold',
    fontFamily: 'WorkSans-Regular',
    paddingHorizontal: 15,
  },
  textdate: {
    fontSize: 16,
    color: '#004277',
    fontWeight: '500',
    fontFamily: 'WorkSans-Regular',
  },
  coursedetail: {
    width: 230,
    alignItems: 'stretch',
    marginHorizontal: 10,
    justifyContent: 'space-around',
  },
  assignment: {
    fontSize: 12,
    color: '#616161',
    fontWeight: '400',
    fontFamily: 'WorkSans-Regular',
    marginHorizontal: 15,
    marginVertical: 2,
  },
  goto: {
    fontSize: 12,
    color: '#616161',
    fontWeight: '400',
    fontFamily: 'WorkSans-Regular',
    textAlign: 'right',
  },
});
