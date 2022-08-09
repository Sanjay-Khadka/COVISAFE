import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
// import {Toast} from 'toastify-react-native';
import {loginUser} from '../../redux/actions/auth';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import colors from '../../colors/colors';
import {FormInput, PasswordInput, CustomButton} from '../../components';

import {Formik} from 'formik';
import * as Yup from 'yup';
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid Email').trim().required('Email required'),
  password: Yup.string().trim().required('Password required'),
});
const {height, width} = Dimensions.get('window');
const LoginScreen = () => {
  const [errorFlag, setErrorFlag] = useState(false);
  // const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userDetails = {
    email: '',
    password: '',
  };
  const LoginToRegister = () => {
    navigation.navigate('signUp');
  };

  return (
    <Formik
      initialValues={userDetails}
      validationSchema={validationSchema}
      onSubmit={(values, formikActions) => {
        var logindata = JSON.stringify({
          email: values.email,
          password: values.password,
        });

        // setLoading(false);
        dispatch(loginUser(logindata), console.log(logindata));
        // setLoading(true);
      }}>
      {({handleChange, handleSubmit, handleBlur, touched, values, errors}) => {
        const {email, password} = values;
        return (
          <KeyboardAvoidingView style={styles.container} behavior="padding">
            {/* <Container position="top" animationStyle="fancy" /> */}
            <View style={styles.innercontainer}>
              <Image
                style={styles.logo}
                source={require('../../assets/icon.png')}
              />
              <Text style={styles.header}>Welcome back!</Text>
              <Text style={styles.secondheader}>Login to your account</Text>
              {/* form input view start */}
              <View style={styles.inputcontainer}>
                <FormInput
                  labelText="Email"
                  error={touched.email && errors.email}
                  placeholderText="Enter your email"
                  value={email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                />

                <PasswordInput
                  labelText="Password"
                  error={touched.password && errors.password}
                  placeholderText="Enter your password"
                  value={password}
                  onChangeText={handleChange('password')}
                  secureTextEntry={true}
                  onBlur={handleBlur('password')}
                />
              </View>
              {!isLoading ? (
                <ActivityIndicator size="large" color="red" />
              ) : (
                <CustomButton labelText="Login" handleOnPress={handleSubmit} />
              )}

              <View style={styles.infocontainer}>
                <Text style={styles.questiontext}>Don't have an account?</Text>
                <TouchableOpacity onPress={LoginToRegister}>
                  <Text style={styles.questionbutton}>Join today</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        );
      }}
    </Formik>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#FFFFFF',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  innercontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    // top: '2%',
    height: height - 60,
    width: width,
  },

  logo: {
    alignItems: 'center',
    position: 'relative',
    marginHorizontal: 29,
    height: 97,
    width: 97,
  },
  header: {
    textAlign: 'center',
    fontFamily: 'WorkSans-Regular',
    position: 'relative',
    width: 238,
    height: 45,
    top: 10,
    fontSize: 32,
    fontWeight: '400',
    color: colors.primary,
    // eslint-disable-next-line no-dupe-keys
    fontWeight: '400',
  },
  secondheader: {
    textAlign: 'center',
    fontFamily: 'WorkSans-Regular',
    width: 180,
    height: 22,
    fontWeight: '400',
    fontSize: 16,
    marginTop: 10,
    color: '#7C7C7A',
  },

  inputcontainer: {
    width: width - 55,
    alignItems: 'center',
    marginTop: 30,
  },
  errorMessage: {
    color: 'red',
    fontFamily: 'WorkSans-Regular',
    fontSize: 12,
  },
  checkboxcontainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 25,
    width: width,
    // backgroundColor:'#000000',
  },
  checkboxtitle: {
    color: '#004277',
    fontFamily: 'WorkSans-Regular',
    fontSize: 13,
    marginLeft: 8,
  },
  questiontext: {
    textAlign: 'center',
    marginTop: 30,
    color: '#616161',
    fontFamily: 'WorkSans-Regular',
    fontSize: 13,
    padding: 5,
  },
  questionbutton: {
    textAlign: 'center',
    marginLeft: 5,
    marginTop: 35,
    color: colors.primary,
    fontSize: 13,
    fontFamily: 'WorkSans-Regular',
  },

  textcolor: {
    color: '#004277',
    fontFamily: 'WorkSans-Regular',
    fontWeight: '400',
    fontSize: 13,
  },
  infocontainer: {
    flexDirection: 'row',
  },
});
