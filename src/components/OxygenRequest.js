/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import axios from 'axios';
import {ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Octicons';
import {useDispatch} from 'react-redux';
import {url} from '../constants';
import colors from '../colors/colors';
import {acceptOxygenReq, deleteOxygenReq} from '../redux/actions/manageoxygen';
import CustomButton from './Button';

const {height, width} = Dimensions.get('window');

const OxygenRequest = () => {
  const [oxyreqlist, setReqList] = useState([]);

  const dispatch = useDispatch();

  const getOxyList = async () => {
    try {
      const {data} = await axios.get(`${url}/getalloxygenrequests`);
      // eslint-disable-next-line no-lone-blocks
      {
        data?.length !== 0
          ? ToastAndroid.showWithGravity(
              'Oxygen request list fetched',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
            )
          : ToastAndroid.showWithGravity(
              'Oxygen request list is empty',
              ToastAndroid.LONG,
              ToastAndroid.TOP,
            );
      }
      setReqList(data);
    } catch (error) {
      // console.log(error);
      ToastAndroid.showWithGravity(error, ToastAndroid.LONG, ToastAndroid.TOP);
    }
  };

  useEffect(() => {
    // dispatch(getOxygenRequestList());
    getOxyList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const approveOxygenRequest = oxygenId => {
    dispatch(acceptOxygenReq(oxygenId));
    // filterPriority();
    getOxyList();
  };
  const deletOxygenReqfunc = oxygenreqId => {
    dispatch(deleteOxygenReq(oxygenreqId));
    getOxyList();
  };

  return (
    <View style={styles.maincontainer}>
      {oxyreqlist?.length === 0 ? (
        <View style={styles.emptyView}>
          <Text style={styles.emptyViewMessage}>
            Oxygen request list is empty !
          </Text>
        </View>
      ) : (
        <>
          <ScrollView style={styles.oxygenreqlist}>
            {oxyreqlist?.map((oxygenreqli, index) => (
              <View key={index} style={styles.oxygenReqDetails}>
                {/* <Text> Oxygen Request Details</Text> */}
                <View>
                  <Text style={styles.oxygenreqText}>
                    Request :{oxygenreqli.request_type.title}
                  </Text>
                  <Text style={styles.oxygenreqText}>
                    Volume: {oxygenreqli.request_type.volume}ℓ
                  </Text>
                  <Text style={styles.oxygenreqText}>
                    Cylinder Number: {oxygenreqli.request_type.cylinderNumber}
                  </Text>
                </View>
                <View>
                  <Text style={styles.oxygenreqText}>
                    Requested By :{oxygenreqli.requestedBy.fullname}
                  </Text>
                </View>
                <Text style={styles.oxygenreqText}>
                  Requested At: {oxygenreqli.requestedAt}
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
                <View style={styles.buttonContainer}>
                  {oxygenreqli.requestStatus === 'approved' ? (
                    <CustomButton
                      labelText="Delete request"
                      style={styles.cancelbutton}
                      handleOnPress={() => deletOxygenReqfunc(oxygenreqli._id)}
                    />
                  ) : (
                    <>
                      <CustomButton
                        labelText="Approve request"
                        style={styles.submitbutton}
                        handleOnPress={() =>
                          approveOxygenRequest(oxygenreqli._id)
                        }
                      />
                      <CustomButton
                        labelText="Delete request"
                        style={styles.cancelbutton}
                        handleOnPress={() =>
                          deletOxygenReqfunc(oxygenreqli._id)
                        }
                      />
                    </>
                  )}
                </View>
              </View>
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default OxygenRequest;

const styles = StyleSheet.create({
  oxygenReqDetails: {
    backgroundColor: 'white',
    // width: width - 80,
    margin: 10,
    elevation: 3,
    padding: 15,
    borderRadius: 15,
  },
  maincontainer: {
    alignItems: 'center',
    // backgroundColor: 'black',
    display: 'flex',
    flex: 1,
    // width: width / 2,
    // height: height / 2,
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
