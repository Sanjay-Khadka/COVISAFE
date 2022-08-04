/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';

import {
  getOxygenRequestList,
  acceptOxygenRequest,
} from '../redux/actions/manageoxygen';
import {getBedRequestList} from '../redux/actions/manageBed';
import CustomButton from './Button';

const {width} = Dimensions.get('window');

const OxygenRequest = () => {
  const dispatch = useDispatch();

  const oxygenrequestlist = useSelector(
    state => state.oxygenReducer.OxygenRequestList,
  );

  const filterPriority = () => {
    var approvedArray = oxygenrequestlist.filter((request, index) => {
      return request.requestedUrgency === 'normal';
    });
    console.log(approvedArray);
  };

  useEffect(() => {
    dispatch(getOxygenRequestList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const approveOxygenRequest = oxygenId => {
    // console.log(oxygen);
    // dispatch(acceptOxygenRequest(oxygenId));
    filterPriority();
  };

  return (
    <View style={styles.maincontainer}>
      <ScrollView style={styles.oxygenreqlist}>
        {oxygenrequestlist.map((oxygenreqli, index) => (
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
              {/* <Text style={styles.oxygenreqText}>
                User Email: {oxygenreqli.requestedBy.email}
              </Text> */}
            </View>
            <Text style={styles.oxygenreqText}>
              Requested At: {oxygenreqli.requestedAt}
            </Text>
            <Text style={styles.oxygenreqText}>
              Requested Status: {oxygenreqli.requestStatus}
            </Text>
            <View style={styles.buttonContainer}>
              <CustomButton
                labelText="Approve request"
                style={styles.submitbutton}
                handleOnPress={() => approveOxygenRequest(oxygenreqli._id)}
              />
              <CustomButton
                labelText="Delete request"
                style={styles.cancelbutton}
                // handleOnPress={cancelSubmit}
              />
            </View>
          </View>
        ))}
      </ScrollView>
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
});
