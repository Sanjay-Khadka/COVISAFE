/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import colors from '../colors/colors';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading} from '../redux/actions/manageuser';
import {getBedRequestList, acceptBedRequest} from '../redux/actions/manageBed';
import CustomButton from './Button';

const {width} = Dimensions.get('window');

const OxygenRequest = () => {
  const loaderValue = useSelector(state => state.manageUserReducer.Loading);
  const isLoading = loaderValue?.loading;
  const dispatch = useDispatch();

  const bedrequestlist = useSelector(state => state.bedsReducer.BedRequestList);
  // console.log(bedrequestlist);
  useEffect(() => {
    dispatch(getBedRequestList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const approveBedRequest = bedId => {
    // console.log(bedId);
    dispatch(acceptBedRequest(bedId));
  };

  return (
    <View style={styles.maincontainer}>
      <ScrollView style={styles.bedreqlist}>
        {bedrequestlist.map((bedreqli, index) => (
          <View key={index} style={styles.bedReqDetails}>
            {/* <Text> Oxygen Request Details</Text> */}
            <View>
              <Text style={styles.bedreqText}>
                Request :{bedreqli.request_type.title}
              </Text>
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
            <View>
              <Text style={styles.bedreqText}>
                Requested By :{bedreqli.requestedBy.fullname}
              </Text>
            </View>
            <Text style={styles.bedreqText}>
              Requested At: {bedreqli.requestedAt}
            </Text>
            <Text style={styles.bedreqText}>
              Request Status:{'  '}
              {bedreqli.requestStatus === 'pending' ? (
                <Text style={[styles.bedreqText, {color: 'yellow'}]}>
                  {bedreqli.requestStatus}
                </Text>
              ) : (
                <Text style={[styles.bedreqText, {color: 'green'}]}>
                  {bedreqli.requestStatus}
                </Text>
              )}
            </Text>
            <View style={styles.buttonContainer}>
              <CustomButton
                labelText="Approve request"
                style={styles.submitbutton}
                handleOnPress={() => approveBedRequest(bedreqli._id)}
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
    height: 100,
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
});
