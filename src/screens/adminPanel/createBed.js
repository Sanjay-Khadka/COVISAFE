/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import SelectList from 'react-native-dropdown-select-list';
import {Modal} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {
  NavigationHeader,
  FloatingButton,
  MiniFormInput,
  CustomButton,
} from '../../components';
import {getAllBed, createBed, deleteBed} from '../../redux/actions/manageBed';
import colors from '../../colors/colors';
const {height, width} = Dimensions.get('window');

const validationSchema = Yup.object({
  // hospitalName: Yup.string().trim().required('Hospital name required'),
  bedNumber: Yup.number()
    .required('bed number is required')
    .positive()
    .integer(),
  // hospitalAddress: Yup.string()
  //   .trim()
  //   .required('please enter hospital address'),
});

const CreateBed = () => {
  const [isVisible, setVisibility] = useState(false);
  const [selectedhospital, setHospitalValue] = useState('');
  const [selectedaddress, setAddress] = useState('');
  const bedDetails = {
    hospitalName: selectedhospital,
    bedNumber: null,
    hospitalAddress: '',
  };

  const hospital = [
    {key: 'KMC', value: 'KMC'},
    {key: 'Helping Hands', value: 'Helping Hands'},
    {key: 'Teaching Hospital', value: 'Teaching Hospital'},
    {key: 'Bir Hospital', value: 'Bir Hospital'},
    {key: 'Hetauda Hospital', value: 'Hetauda Hospital'},
    {key: 'Dhulikhel Hospital', value: 'Dhulikhel Hospital'},
    {key: 'Nidan Hospital', value: 'Nidan Hospital'},
    {key: 'Bhaktapur Hospital', value: 'Bhaktapur Hospital'},
  ];

  const address = [
    {key: 'Kathmandu', value: 'Kathmandu'},
    {key: 'Bhaktapur', value: 'Bhaktapur'},
    {key: 'Lalitpur', value: 'Lalitpur'},
    {key: 'Makwanpur', value: 'Makwanpur'},
    {key: 'Kavre', value: 'Kavre'},
    {key: 'Patan', value: 'Patan'},
  ];
  const token = useSelector(state => state.authReducer.Login);
  const userToken = token?.token;
  // console.log(userToken);
  const bed = useSelector(state => state.bedsReducer.Beds);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBed());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cancelSubmit = () => {
    setVisibility(false);
  };

  const submitForm = bedData => {
    console.log(bedData);
  };

  const bedRemove = beds_id => {
    // console.log(beds_id);
    dispatch(deleteBed(beds_id));
    dispatch(getAllBed());
  };
  const openForm = () => {
    setVisibility(true);
  };
  return (
    <View style={styles.maincontainer}>
      <NavigationHeader Title="Beds" />

      <ScrollView style={styles.bedsContainer}>
        {bed.map((beds, index) => (
          <View key={index} style={styles.bedDetails}>
            <View>
              <Text style={styles.bedText}>Bed Number: {beds.bedNumber}</Text>
              <Text style={styles.bedText}>Hospital: {beds.hospital}</Text>
              <Text style={styles.bedText}>Hospital Address</Text>
              <Text style={styles.bedText}>{beds.address}</Text>
            </View>
            <View>
              <TouchableOpacity
                style={styles.deletebutton}
                onPress={() => bedRemove(beds._id)}>
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
      <Formik
        initialValues={bedDetails}
        validationSchema={validationSchema}
        onSubmit={values => {
          var bedData = JSON.stringify({
            address: selectedaddress,
            bedNumber: values.bedNumber,
            hospital: selectedhospital,
          });
          // console.log(bedData);

          setVisibility(false);
          // submitForm(bedData);

          dispatch(createBed(bedData, userToken));
          dispatch(getAllBed());
        }}>
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          touched,
          values,
          errors,
        }) => {
          const {bedNumber} = values;
          return (
            <Modal
              visible={isVisible}
              dismissable={false}
              contentContainerStyle={styles.modalcontainer}>
              <View style={styles.modalInnerView}>
                <Text style={styles.formheader}> Bed Availability</Text>
                <View style={styles.textalign}>
                  <Text style={styles.labelstyle}>Hospital Name</Text>
                </View>
                <SelectList
                  setSelected={setHospitalValue}
                  data={hospital}
                  inputStyles={{color: 'black', width: width - 110}}
                  dropdownTextStyles={{color: 'black'}}
                  dropdownStyles={{
                    width: width - 50,
                    innerHeight: 10,
                    outerHeight: 9,
                  }}
                  dropdownItemStyles={{
                    width: width - 50,

                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
                <View style={styles.textalign}>
                  <Text style={styles.labelstyle}>Hospital Address</Text>
                </View>
                <SelectList
                  setSelected={setAddress}
                  data={address}
                  inputStyles={{color: 'black', width: width - 110}}
                  dropdownTextStyles={{color: 'black'}}
                  dropdownStyles={{
                    width: width - 50,
                    innerHeight: 10,
                    outerHeight: 9,
                  }}
                  dropdownItemStyles={{
                    width: width - 50,

                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
                <MiniFormInput
                  error={touched.bedNumber && errors.bedNumber}
                  value={bedNumber}
                  onChangeText={handleChange('bedNumber')}
                  onBlur={handleBlur('bedNumber')}
                  style={styles.forminput}
                  placeholderText="bed number"
                  labelText="Bed Number"
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
          );
        }}
      </Formik>
    </View>
  );
};

export default CreateBed;

const styles = StyleSheet.create({
  loadingView: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  maincontainer: {
    flex: 1,
    // alignItems: 'center',
  },

  floatingbutton: {
    bottom: 10,
    marginLeft: 250,
    backgroundColor: colors.primary,
    position: 'relative',
    padding: 10,
    height: 50,
    width: 100,
    borderRadius: 50,
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
  labelstyle: {
    fontFamily: 'WorkSans-Regular',
    color: colors.primary,
    fontSize: 14,
    marginBottom: 3,
    // marginRight: 170,
  },
  textalign: {
    display: 'flex',
    width: width - 55,
  },
});
