import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Modal} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import {
  NavigationHeader,
  FloatingButton,
  MiniFormInput,
  CustomButton,
} from '../../components';
import {getAllBed} from '../../redux/actions/manageBed';
import colors from '../../colors/colors';
const {height, width} = Dimensions.get('window');

const CreateBed = () => {
  const [isVisible, setVisibility] = useState(false);
  const beds = useSelector(state => state.bedsReducer.Beds);
  console.log(beds);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBed());
  }, []);

  const cancelSubmit = () => {
    setVisibility(false);
    console.warn(isVisible);
  };

  const handleSubmit = () => {
    setVisibility(true);
    console.warn(isVisible);
  };

  const openForm = () => {
    setVisibility(true);
    console.warn(isVisible);
  };
  return (
    <View style={styles.maincontainer}>
      <NavigationHeader Title="Beds" />
      <ScrollView style={styles.bedsContainer}>
        {beds.map(beds => (
          <View style={styles.bedDetails}>
            <View>
              <Text style={styles.bedText}>Bed Number: {beds.bedNumber}</Text>
              <Text style={styles.bedText}>Hospital: {beds.hospital}</Text>
              <Text style={styles.bedText}>Hospital Address</Text>
              <Text style={styles.bedText}>{beds.address}</Text>
            </View>
            <View>
              <TouchableOpacity style={styles.deletebutton}>
                <Icon color={'#c1121f'} name="trash" size={30} />
                <Text style={{color: 'black', fontWeight: 'bold'}}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <View styles={{backgroundColor: 'white'}}>
        <FloatingButton
          buttonLabel="Bed +"
          style={styles.floatingbutton}
          handleOnPress={openForm}
        />
      </View>
      <Modal
        visible={isVisible}
        dismissable={false}
        contentContainerStyle={styles.modalcontainer}>
        <View style={styles.modalInnerView}>
          <Text style={styles.formheader}> Bed Form</Text>
          <MiniFormInput
            style={styles.forminput}
            placeholderText="hospital name"
            labelText="Hospital name"
          />

          <MiniFormInput
            style={styles.forminput}
            placeholderText="bed Number"
            labelText="Bed Number"
          />
          <MiniFormInput
            style={styles.forminput}
            placeholderText="address"
            labelText="Address"
          />
          <View>
            <CustomButton
              labelText="Submit"
              style={styles.submitbutton}
              handleOnPress={handleSubmit}
            />
            <CustomButton
              labelText="Cancel"
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

export default CreateBed;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    // alignItems: 'center',
  },

  floatingbutton: {
    bottom: 10,
    marginLeft: 250,
  },
  modalcontainer: {
    justifyContent: 'center',
  },
  modalInnerView: {
    padding: 40,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 20,
  },
  formheader: {
    top: -20,
    color: colors.primary,
    fontSize: 20,
  },
  cancelbutton: {
    backgroundColor: 'red',
    width: 200,
  },
  forminput: {
    margin: 2,
  },
  submitbutton: {
    // backgroundColor: 'red',
    width: 200,
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

  bedsContainer: {
    // backgroundColor: 'black',
    width: width,
    height: 80,
  },
  bedDetails: {
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
    fontSize: 17,
    fontWeight: '500',
    color: 'black',
  },
});
