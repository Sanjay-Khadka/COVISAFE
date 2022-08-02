import React, {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import {View, Text, StyleSheet, Image} from 'react-native';
import {CustomButton, ToggleButton} from '../../components';
import {useDispatch} from 'react-redux';
import {logoutUser} from '../../redux/actions/auth';
import colors from '../../colors/colors';

const {height, width} = Dimensions.get('window');

const Dashboard = () => {
  const [covidData, setCovidData] = useState('');
  const [total, setTotal] = useState(true);
  const [today, setToday] = useState(false);

  setInterval(() => {
    getCovidData();
  }, 5000);

  const handleTotalButton = () => {
    setTotal(!total);
    setToday(false);
  };

  const handleTodayButton = () => {
    setToday(!today);
    setTotal(false);
  };

  const getCovidData = async () => {
    try {
      const {data} = await axios.get(
        'https://disease.sh/v3/covid-19/countries/nepal?fbclid=IwAR0BGBSLpQtBvhYTEzgtoxQaCZBFuutSDYo3nGsZISxRTNPLHbnDsbhISGY',
      );
      setCovidData(data);
      // console.log(covidData);
    } catch (error) {
      console.log(error);
    }
  };
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logoutUser());
  };
  return (
    <View style={styles.maincontainer}>
      <View style={styles.halfcontainer}>
        <View style={styles.topHeader}>
          <Text style={styles.covidText}>Covid-19</Text>
          <Icon color={'white'} name="user-circle" size={30} />
        </View>
        <View style={styles.toggles}>
          <ToggleButton
            labelText="Total"
            textColor={!today}
            onPress={() => handleTotalButton()}
          />
          <ToggleButton
            labelText="Today"
            textColor={!total}
            onPress={() => handleTodayButton()}
          />
        </View>
        <View style={styles.cardcontainer}>
          <View style={styles.totalcase}>
            <Image
              // style={styles.logo}
              style={styles.icons}
              source={require('../../assets/Corona.png')}
            />
            <Text style={styles.details}>Total cases: {covidData.cases} </Text>
          </View>
          <View style={styles.totalrecovered}>
            <Image
              // style={styles.logo}
              style={styles.icons}
              source={require('../../assets/Protection.png')}
            />
            <Text style={styles.details}>
              Total recovered: {covidData.recovered}
            </Text>
          </View>
          <View style={styles.totalactive}>
            <Image
              // style={styles.logo}
              style={styles.icons}
              source={require('../../assets/Droplet.png')}
            />
            <Text style={styles.details}>
              Active cases: {covidData.active}{' '}
            </Text>
          </View>
          <View style={styles.totaldeaths}>
            <Image
              // style={styles.logo}
              style={styles.icons}
              source={require('../../assets/Death.png')}
            />
            <Text style={styles.detailsdeath}>
              Total deaths: {covidData.deaths}
            </Text>
          </View>
        </View>
      </View>
      <CustomButton labelText="Logout" handleOnPress={logout} />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  halfcontainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: height / 2.1,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  maincontainer: {
    // justifyContent: 'center',
    flex: 1,
  },
  toggles: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    top: 80,
  },
  cardcontainer: {
    marginTop: 85,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  totalcase: {
    // alignItems: 'center',?\
    justifyContent: 'center',
    backgroundColor: '#1e6091',
    height: 90,
    width: 165,
    margin: 5,
    elevation: 10,
    borderRadius: 10,
    padding: 7,
  },
  totalrecovered: {
    // alignItems: 'center',?\
    justifyContent: 'center',
    backgroundColor: '#99d98c',
    height: 90,
    width: 165,
    margin: 5,
    elevation: 10,
    borderRadius: 10,
    padding: 7,
  },
  totalactive: {
    justifyContent: 'center',
    backgroundColor: '#9a8c98',
    height: 90,
    width: 165,
    margin: 5,
    elevation: 10,
    borderRadius: 10,
    padding: 7,
  },
  totaldeaths: {
    justifyContent: 'center',
    backgroundColor: '#fef9ef',
    height: 90,
    width: 165,
    margin: 5,
    elevation: 10,
    borderRadius: 10,
    padding: 7,
  },

  details: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  detailsdeath: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#9a031e',
  },
  icons: {
    margin: 2,
    height: 30,
    width: 30,
    // backgroundColor: 'black'
  },
  topHeader: {
    position: 'absolute',
    padding: 10,
    width: width,
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  covidText: {
    // position: 'absolute',
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    // textAlign: 'left',
    // marginTop: 25,
    marginLeft: 5,
  },
});
