/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/dist/Octicons';
import {useDispatch, useSelector} from 'react-redux';
import {url} from '../constants';
import colors from '../colors/colors';

const {height, width} = Dimensions.get('window');

const UserOxygenRequest = () => {
  const [userOxygenList, setuserOxygenList] = useState('');

  const user = useSelector(state => state.authReducer.Login);
  const userid = user?.userdata?._id;

  const getuserOxygenList = async () => {
    try {
      const {data} = await axios.get(`${url}/getUoxygenrequests/${userid}`);
      setuserOxygenList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getuserOxygenList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.maincontainer}>
      {userOxygenList?.length === 0 ? (
        <View style={styles.emptyView}>
          <Text style={styles.emptyViewMessage}>
            Oxygen request list is empty !
          </Text>
        </View>
      ) : (
        <>
          <ScrollView style={styles.oxygenreqlist}>
            {userOxygenList?.map((oxygenreqli, index) => (
              <View key={index} style={styles.oxygenReqDetails}>
                <View>
                  <Text style={styles.oxygenreqText}>
                    Volume: {oxygenreqli.request_type.volume}ℓ
                  </Text>
                  <Text style={styles.oxygenreqText}>
                    Cylinder Number: {oxygenreqli.request_type.cylinderNumber}
                  </Text>
                </View>

                <Text style={styles.oxygenreqText}>
                  Requested At: {oxygenreqli.requestedAt}
                </Text>
                <Text style={styles.oxygenreqText}>
                  Request Urgency: {oxygenreqli.requestedUrgency}
                </Text>
                <Text style={styles.oxygenreqText}>
                  Request Status:{'  '}
                  {oxygenreqli.requestStatus === 'pending' ? (
                    <Text style={[styles.bedreqText, {color: '#fb8500'}]}>
                      {oxygenreqli.requestStatus}{' '}
                      <Icon color={'#fb8500'} name="unverified" size={15} />
                    </Text>
                  ) : (
                    <Text style={[styles.bedreqText, {color: 'green'}]}>
                      {oxygenreqli.requestStatus}{' '}
                      <Icon color={'green'} name="verified" size={15} />
                    </Text>
                  )}
                </Text>
              </View>
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default UserOxygenRequest;

const styles = StyleSheet.create({
  oxygenReqDetails: {
    backgroundColor: 'white',

    margin: 10,
    elevation: 3,
    padding: 15,
    borderRadius: 15,
  },
  maincontainer: {
    alignItems: 'center',

    display: 'flex',
    flex: 1,
  },
  oxygenreqlist: {
    width: width,
    height: 100,
  },
  oxygenreqText: {
    fontSize: 17,
    fontWeight: '500',
    color: 'black',
  },
  cancelbutton: {
    backgroundColor: 'red',
    width: 140,
  },

  submitbutton: {
    backgroundColor: '#80ed99',
    width: 140,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  emptyView: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flex: 2,
    height: height,
  },
  emptyViewMessage: {
    fontSize: 20,
    color: colors.smalltext,
  },
});
