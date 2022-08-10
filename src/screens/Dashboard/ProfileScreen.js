/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {NavigationHeader, EditProfile} from '../../components';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import colors from '../../colors/colors';
import {Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {url} from '../../constants';

import {logoutUser} from '../../redux/actions/auth';
import {CustomButton, BubbleText} from '../../components';

const {width} = Dimensions.get('window');
const ProfileScreen = ({navigation}) => {
  const [userOxygenList, setuserOxygenList] = useState([]);
  const [changeFname, setFname] = useState('');
  const [pendingOxyReq, setPendingOxy] = useState([]);
  const [approvedOxygen, setApprovedOxy] = useState([]);
  const [pendingBedReq, setPendingBed] = useState([]);
  const [approvedBedReq, setApprovedBed] = useState([]);

  const userbedrequestlist = useSelector(
    state => state.bedsReducer.UserBedRequest,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    navigation.addListener('focus', () => {
      getuserOxygenList();
      filteredPendingOxygen();
      filteredApprovedOxygen();
      filteredPendingBed();
      filteredApprovedBed();
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const logout = () => {
    dispatch(logoutUser());
  };
  const getuserOxygenList = async () => {
    try {
      const {data} = await axios.get(`${url}/getUoxygenrequests/${userid}`);
      setuserOxygenList(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const filteredPendingOxygen = () => {
    var pendingoxygen = userOxygenList.filter(status => {
      return status.requestStatus === 'pending';
    });
    var pendingoxylen = pendingoxygen.length;
    setPendingOxy(pendingoxylen);
  };

  const filteredApprovedOxygen = () => {
    var approvedoxygen = userOxygenList.filter(status => {
      return status.requestStatus === 'approved';
    });
    var oxyreqlen = approvedoxygen.length;
    setApprovedOxy(oxyreqlen);
  };
  const filteredPendingBed = () => {
    var pendingbed = userbedrequestlist.filter(status => {
      return status.requestStatus === 'pending';
    });
    var pendingbedlen = pendingbed.length;
    setPendingBed(pendingbedlen);
  };
  const filteredApprovedBed = () => {
    var approvedbed = userbedrequestlist.filter(status => {
      return status.requestStatus === 'approved';
    });
    var bedreqlen = approvedbed.length;
    setApprovedBed(bedreqlen);
  };
  const {userdata} = useSelector(state => state.authReducer.Login);
  const email = userdata?.email;
  const userid = userdata?._id;
  return (
    <View style={styles.maincontainer}>
      <NavigationHeader Title="Profile" />
      <View style={styles.profilecontainer}>
        <View
          style={{
            backgroundColor: '#EDEADE',
            height: '40%',
            width: '40%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 90,
          }}>
          <Icon color={colors.primary} name="user" size={100} />
        </View>
        <View style={styles.namecontainer}>
          {/* <Text style={styles.texts}>Full name</Text> */}
          <EditProfile
            labelText="Full Name"
            value={changeFname}
            placeholderText="Full name"
            onChangeText={fname => setFname(fname)}
            editable={false}
          />
        </View>

        <Text style={styles.texts}>{email}</Text>
        {/* <Icon color={colors.primary} name="pencil" size={20} /> */}
      </View>
      <View style={styles.bubblesContainer}>
        <View>
          <BubbleText
            bubbleValue={pendingOxyReq}
            label="pending oxygen request"
            backgroundColor={'#fb8500'}
          />
          <BubbleText
            bubbleValue={approvedOxygen}
            label="Approved oxygen Request"
            style={styles.Requests}
            backgroundColor={'#99d98c'}
          />
        </View>

        <View>
          <BubbleText
            bubbleValue={pendingBedReq}
            label="Pending Bed Requests"
            backgroundColor={'#fb8500'}
          />
          <BubbleText
            bubbleValue={approvedBedReq}
            label=" Approved Bed Requests"
            backgroundColor={'#99d98c'}
          />
        </View>
      </View>
      <CustomButton labelText="Logout" handleOnPress={logout} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  maincontainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  profilecontainer: {
    // marginTop: '5%',
    position: 'relative',
    display: 'flex',
    // backgroundColor: 'black',
    width: width,
    alignItems: 'center',
    // flex: 2,
    justifyContent: 'center',
  },
  texts: {
    color: colors.primary,
    fontSize: 16,
    // fontWeight: 'bold',
  },
  namecontainer: {
    padding: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  bubblesContainer: {
    marginTop: -50,
    elevation: 2,
    // margin: 40,
    width: width,
    display: 'flex',
    // flexWrap: 'wrap',
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'center',
  },
});
