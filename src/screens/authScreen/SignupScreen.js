import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {CustomButton, FormInput, PasswordInput} from '../../components';
import colors from '../../colors/colors';
import {useDispatch, useSelector} from 'react-redux';
import {registerUser} from '../../redux/actions/auth';
const {width, height} = Dimensions.get('window');
import * as Yup from 'yup';
import {Formik} from 'formik';
const validationSchema = Yup.object({
  fullname: Yup.string().trim().required('firstname required'),
  registerEmail: Yup.string()
    .email('Invalid Email')
    .trim()
    .required('Email required'),
  registerPassword: Yup.string().trim().required('Password required'),
  confirmPassword: Yup.string().equals(
    [Yup.ref('registerPassword'), null],
    'Passwords do not match',
  ),
});
const SignupScreen = () => {
  const registerDetails = {
    fullname: '',
    registerEmail: '',
    registerPassword: '',
    confirmPassword: '',
  };
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const RegisterToLogin = () => {
    navigation.popToTop('Login');
  };

  return (
    <Formik
      initialValues={registerDetails}
      validationSchema={validationSchema}
      onSubmit={(values, formikActions) => {
        var registerData = JSON.stringify({
          user: {
            fullname: values.firstname,
            email: values.registerEmail,
            password: values.registerPassword,
          },
        });
        dispatch(registerUser(registerData));
      }}>
      {({handleChange, handleSubmit, handleBlur, touched, values, errors}) => {
        const {fullname, registerEmail, registerPassword} = values;
        return (
          <KeyboardAvoidingView style={styles.container} behavior="height">
            <View style={styles.headercontainer}>
              <Image
                style={styles.logo}
                source={require('../../assets/icon.png')}
              />

              <Text style={styles.header}>Register</Text>
            </View>
            <FormInput
              labelText="Full Name"
              error={touched.firstname && errors.firstname}
              onBlur={handleBlur('fullname')}
              placeholderText="Enter your full name"
              value={fullname}
              onChangeText={handleChange('fullname')}
            />

            <FormInput
              labelText="Email"
              error={touched.registerEmail && errors.registerEmail}
              onBlur={handleBlur('registerEmail')}
              placeholderText="Enter your email"
              value={registerEmail}
              onChangeText={handleChange('registerEmail')}
            />

            <PasswordInput
              labelText="Password"
              error={touched.registerPassword && errors.registerPassword}
              onBlur={handleBlur('registerPassword')}
              placeholderText="Enter your password"
              value={registerPassword}
              onChangeText={handleChange('registerPassword')}
              secureTextEntry={visible}
            />
            <CustomButton
              labelText="Register"
              style={styles.registerButton}
              onPress={handleSubmit}
            />
            <View style={styles.infocontainer}>
              <Text style={styles.questiontext}>Already have an account?</Text>
              <TouchableOpacity onPress={RegisterToLogin}>
                <Text style={styles.questionbutton}>Login</Text>
              </TouchableOpacity>
            </View>
            {/* </ScrollView> */}
          </KeyboardAvoidingView>
        );
      }}
    </Formik>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#FFFF',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
  },

  headercontainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: height / 4,
  },

  logo: {
    height: 97,
    width: 97,
  },
  header: {
    textAlign: 'center',
    fontFamily: 'WorkSans-Regular',
    fontSize: 32,
    fontWeight: '400',
    color: colors.primary,
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    fontFamily: 'WorkSans-Regular',
    fontWeight: '400',
  },
  registerButton: {
    marginTop: -5,
  },

  questiontext: {
    marginTop: 30,
    color: '#616161',
    fontFamily: 'WorkSans-Regular',
    fontSize: 13,
    padding: 5,
  },
  questionbutton: {
    marginLeft: 5,
    marginTop: 32,
    color: colors.primary,
    fontSize: 13,
    fontFamily: 'WorkSans-Regular',
    textAlign: 'left',
  },

  textcolor: {
    color: '#004277',
    fontFamily: 'WorkSans-Regular',
    fontWeight: '400',
    fontSize: 13,
  },
  infocontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    position: 'relative',
    flexDirection: 'row',
  },
});
