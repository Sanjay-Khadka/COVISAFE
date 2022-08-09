/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import colors from '../colors/colors';
import Icon from 'react-native-vector-icons/dist/Octicons';
import {useDispatch, useSelector} from 'react-redux';
import {getUserBedRequestList} from '../redux/actions/manageBed';

const {height, width} = Dimensions.get('window');

const UserBedRequest = () => {
  const dispatch = useDispatch();

  const userbedrequestlist = useSelector(
    state => state.bedsReducer.UserBedRequest,
  );

  const user = useSelector(state => state.authReducer.Login);
  const userid = user?.userdata?._id;
  // console.log(bedrequestlist);
  useEffect(() => {
    dispatch(getUserBedRequestList(userid));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.maincontainer}>
      {userbedrequestlist?.length === 0 ? (
        <View style={styles.emptyView}>
          <Text style={styles.emptyViewMessage}>
            Bed request list is empty !
          </Text>
        </View>
      ) : (
        <>
          <ScrollView style={styles.bedreqlist}>
            {userbedrequestlist?.map((bedreqli, index) => (
              <View key={index} style={styles.bedReqDetails}>
                <View>
                  <Text style={styles.bedreqText}>
                    Hospital: {bedreqli.request_type.hospital}
                  </Text>
                  <Text style={styles.bedreqText}>
                    Bed Number: {bedreqli.request_type.bedNumber}
                  </Text>
                  <Text style={styles.bedreqText}>Hospital Address:</Text>
                  <Text style={styles.bedreqText}>
                    {bedreqli.request_type.address}
                  </Text>
                </View>

                <Text style={styles.bedreqText}>
                  Requested At: {bedreqli.requestedAt}
                </Text>
                <Text style={styles.bedreqText}>
                  Request Urgency: {bedreqli.requestedUrgency}
                </Text>
                <Text style={styles.bedreqText}>
                  Request Status:{'  '}
                  {bedreqli.requestStatus === 'pending' ? (
                    <Text style={[styles.bedreqText, {color: '#fb8500'}]}>
                      {bedreqli.requestStatus}{' '}
                      <Icon color={'#fb8500'} name="unverified" size={15} />
                    </Text>
                  ) : (
                    <Text style={[styles.bedreqText, {color: 'green'}]}>
                      {bedreqli.requestStatus}{' '}
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

export default UserBedRequest;

const styles = StyleSheet.create({
  bedReqDetails: {
    backgroundColor: 'white',
    // width: width - 80,
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
  bedreqlist: {
    width: width,
    // height: 100,
  },
  bedreqText: {
    fontSize: 17,
    fontWeight: '500',
    color: 'black',
  },
  cancelbutton: {
    backgroundColor: 'red',
    width: 140,
  },

  submitbutton: {
    backgroundColor: colors.primary,
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
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flex: 2,
    height: height,
    // backgroundColor: 'white',
  },
  emptyViewMessage: {
    // fontWeight: '',
    fontSize: 20,
    color: colors.smalltext,
  },
});
