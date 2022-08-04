/* eslint-disable react-native/no-inline-styles */
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
import {Formik} from 'formik';
import * as Yup from 'yup';

import {
  NavigationHeader,
  FloatingButton,
  MiniFormInput,
  CustomButton,
} from '../../components';
import {
  getOxygen,
  createOxygen,
  deleteOxygen,
} from '../../redux/actions/manageoxygen';
import colors from '../../colors/colors';
const {height, width} = Dimensions.get('window');

const validationSchema = Yup.object({
  volume: Yup.number().required('volume is required'),

  cylinderNumber: Yup.number().required('cylinder number is required'),
});

const CreateOxygen = () => {
  const [isVisible, setVisibility] = useState(false);

  const oxygenDetails = {
    volume: '',
    cylinderNumber: '',
  };

  const oxygen = useSelector(state => state.oxygenReducer.Oxygens);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('this ran');
    dispatch(getOxygen());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cancelSubmit = () => {
    setVisibility(false);
  };

  const oxygenRemove = oxygen_id => {
    // console.log(oxygenlist_id);
    dispatch(deleteOxygen(oxygen_id));
    dispatch(getOxygen());
  };
  const openForm = () => {
    setVisibility(true);
  };
  return (
    <View style={styles.maincontainer}>
      <NavigationHeader Title="Oxygens" />
      <ScrollView style={styles.oxygenContainer}>
        {oxygen.map((oxygenlist, index) => (
          <View key={index} style={styles.oxygenDetails}>
            <View>
              <Text style={styles.oxygenText}>
                Volume:{oxygenlist.volume} litres
              </Text>
              <Text style={styles.oxygenText}>
                Cylinder number:{oxygenlist.cylinderNumber}
              </Text>
              <Text style={styles.oxygenText}>
                Available:
                {oxygenlist.isAvailable ? (
                  <Text style={[styles.oxygenText, {color: 'green'}]}>Yes</Text>
                ) : (
                  <Text style={[styles.oxygenText, {color: 'red'}]}>No</Text>
                )}
              </Text>
            </View>
            <View>
              <TouchableOpacity
                style={styles.deletebutton}
                onPress={() => oxygenRemove(oxygenlist._id)}>
                <Icon color={'#c1121f'} name="trash" size={30} />
                <Text style={{color: 'black', fontWeight: 'bold'}}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <View styles={{backgroundColor: 'white'}}>
        <FloatingButton
          buttonLabel="O2 +"
          style={styles.floatingbutton}
          handleOnPress={openForm}
        />
      </View>
      <Formik
        initialValues={oxygenDetails}
        validationSchema={validationSchema}
        onSubmit={(values, formikActions) => {
          var oxygenData = JSON.stringify({
            volume: values.volume,
            cylinderNumber: values.cylinderNumber,
          });
          // console.log(oxygenData);
          setVisibility(false);
          dispatch(createOxygen(oxygenData));
          dispatch(getOxygen());
        }}>
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          touched,
          values,
          errors,
        }) => {
          const {volume, cylinderNumber} = values;
          return (
            <Modal
              visible={isVisible}
              dismissable={false}
              contentContainerStyle={styles.modalcontainer}>
              <View style={styles.modalInnerView}>
                <Text style={styles.formheader}> Oxygen Form</Text>
                <MiniFormInput
                  error={touched.volume && errors.volume}
                  value={volume}
                  onChangeText={handleChange('volume')}
                  onBlur={handleBlur('volume')}
                  style={styles.forminput}
                  placeholderText="Volume in (litre)"
                  labelText="Volume Litres"
                />

                <MiniFormInput
                  error={touched.cylinderNumber && errors.cylinderNumber}
                  value={cylinderNumber}
                  onChangeText={handleChange('cylinderNumber')}
                  onBlur={handleBlur('cylinderNumber')}
                  style={styles.forminput}
                  placeholderText="cylinder number"
                  labelText="Cylinder Number"
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

export default CreateOxygen;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    // alignItems: 'center',
  },

  floatingbutton: {
    backgroundColor: '#80ed99',
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
    backgroundColor: '#80ed99',
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
  oxygenText: {
    fontSize: 17,
    fontWeight: '500',
    color: 'black',
  },
});
