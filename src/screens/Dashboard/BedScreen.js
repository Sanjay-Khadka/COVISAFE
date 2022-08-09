/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';

import {Modal} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import SelectList from 'react-native-dropdown-select-list';

import {NavigationHeader, FloatingButton, CustomButton} from '../../components';
import {getAllBed, createBedRequest} from '../../redux/actions/manageBed';
import colors from '../../colors/colors';
const {height, width} = Dimensions.get('window');

const OxygenScreen = () => {
  const [isVisible, setVisibility] = useState(false);
  const [selected, setValue] = useState('Normal');
  const [bedId, setOxygenId] = useState('');

  const user = useSelector(state => state.authReducer.Login);

  const userid = user?.userdata?._id;
  // console.log(userid);

  const requestPriority = [
    {key: 'normal', value: 'normal'},
    {key: 'standard', value: 'standard'},
    {key: 'urgent', value: 'urgent'},
  ];

  const beds = useSelector(state => state.bedsReducer.Beds);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log('this ran');
    dispatch(getAllBed());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cancelSubmit = () => {
    setVisibility(false);
  };

  const handleSubmit = () => {
    // console.log(selected);
    var requestedPriority = JSON.stringify({
      requestedUrgency: selected,
    });
    setVisibility(false);
    dispatch(createBedRequest(bedId, userid, requestedPriority));
    dispatch(getAllBed());
  };

  const openForm = bedlistid => {
    setVisibility(true);
    setOxygenId(bedlistid);
  };
  return (
    <View style={styles.maincontainer}>
      <NavigationHeader Title="Beds" />

      <ScrollView style={styles.oxygenContainer}>
        {beds.map((bedlist, index) => (
          <View key={index} style={styles.oxygenDetails}>
            <View>
              {/* <Text style={{fontSize: 15, color: 'black'}}>{bedlist._id}</Text> */}
              <Text style={styles.bedText}>
                Bed number: {bedlist.bedNumber}
              </Text>
              <Text style={styles.bedText}>Hospital:</Text>
              <Text style={styles.bedText}>{bedlist.hospital}</Text>

              <Text style={styles.bedText}>Address:</Text>
              <Text style={styles.bedText}>{bedlist.address}</Text>

              <Text style={styles.bedText}>Request Priority:</Text>
            </View>
            <View style={styles.buttoncontainer}>
              <FloatingButton
                buttonLabel="submit"
                style={styles.floatingbutton}
                isDisabled={false}
                handleOnPress={() => openForm(bedlist._id)}
              />
              <SelectList
                setSelected={setValue}
                data={requestPriority}
                inputStyles={{color: 'black', width: 90}}
                // boxStyles={{borderRadius: 0}}
                dropdownTextStyles={{color: 'black'}}
                dropdownStyles={{width: 105, innerHeight: 10, outerHeight: 9}}
                dropdownItemStyles={{
                  // margin: 10,
                  // padding: 30,

                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            </View>
          </View>
        ))}
      </ScrollView>
      <Modal
        visible={isVisible}
        dismissable={false}
        contentContainerStyle={styles.modalcontainer}>
        <View style={styles.modalInnerView}>
          <Text style={styles.formheader}>
            Do you want to submit this oxygen Request
          </Text>

          <View style={styles.modalbutton}>
            <CustomButton
              labelText="Yes"
              style={styles.submitbutton}
              handleOnPress={() => handleSubmit()}
            />
            <CustomButton
              labelText="No"
              style={styles.cancelbutton}
              handleOnPress={cancelSubmit}
            />
          </View>
        </View>
        {/* </View> */}
      </Modal>
    </View>
  );
};

export default OxygenScreen;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    // alignItems: 'center',
  },

  floatingbutton: {
    backgroundColor: '#80ed99',
    position: 'relative',
    padding: 10,
    marginBottom: 10,
    marginLeft: 50,
    // alignItems: 'flex-end',
    // height: 50,
    width: 100,
    // backgroundColor: colors.primary,
    borderRadius: 10,
  },
  modalcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalInnerView: {
    justifyContent: 'center',
    padding: 40,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 20,
    width: width - 90,
  },
  formheader: {
    top: -20,
    color: colors.primary,
    fontSize: 20,
  },
  cancelbutton: {
    margin: 20,
    backgroundColor: 'red',
    width: 100,
  },
  forminput: {
    margin: 2,
  },
  submitbutton: {
    margin: 20,
    backgroundColor: '#80ed99',
    width: 100,
  },
  userdetailsbox: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: height / 8,
    width: width - 14,
    display: 'flex',
    padding: 10,
    margin: 10,
    elevation: 3,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  userdetailstext: {
    fontSize: 17,
    fontWeight: '500',
    color: 'black',
  },
  deletebutton: {
    margin: 5,
    flex: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  oxygenContainer: {
    // backgroundColor: 'black',
    width: width,
    height: 80,
  },
  oxygenDetails: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    elevation: 2,
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  bedText: {
    paddingVertical: 4,
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
  },
  buttoncontainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'column',
  },
  modalbutton: {
    display: 'flex',
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    // margin: 20,
    // padding: 10,
  },
});
