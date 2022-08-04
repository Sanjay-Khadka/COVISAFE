import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getOxygenRequestList} from '../redux/actions/manageoxygen';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const {height, width} = Dimensions.get('window');

const OxygenRequest = () => {
  const dispatch = useDispatch();

  const oxygenrequestlist = useSelector(
    state => state.oxygenReducer.OxygenRequestList,
  );
  // console.log(oxygenrequestlist);
  useEffect(() => {
    dispatch(getOxygenRequestList());
  }, []);

  return (
    <View style={styles.maincontainer}>
      <ScrollView style={styles.oxygenreqlist}>
        {oxygenrequestlist.map((oxygenreqli, index) => (
          <View key={index} style={styles.oxygenReqDetails}>
            <Text> Oxygen Request Details</Text>
            <View>
              <Text style={styles.oxygenreqText}>
                Request :{oxygenreqli.request_type.title}
              </Text>
              <Text style={styles.oxygenreqText}>
                Volume: {oxygenreqli.request_type.volume}
              </Text>
              <Text style={styles.oxygenreqText}>
                Cylinder Number: {oxygenreqli.request_type.cylinderNumber}
              </Text>
            </View>
            <View>
              <Text style={styles.oxygenreqText}>
                Requested By :{oxygenreqli.requestedBy.fullname}
              </Text>
              <Text style={styles.oxygenreqText}>
                User Email: {oxygenreqli.requestedBy.email}
              </Text>
            </View>
            <Text style={styles.oxygenreqText}>
              Requested At: {oxygenreqli.requestedAt}
            </Text>
            <View>
              <TouchableOpacity
                style={styles.deletebutton}
                // onPress={() => o(beds._id)}
              >
                <Icon color={'#c1121f'} name="trash" size={30} />
                <Text style={{color: 'black', fontWeight: 'bold'}}>Delete</Text>
              </TouchableOpacity>
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
    // width: width - 80,
    margin: 10,
    elevation: 10,
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
});
