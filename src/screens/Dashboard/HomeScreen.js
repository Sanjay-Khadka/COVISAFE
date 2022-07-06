import React from 'react';
import {View, Text, Button, Image, StyleSheet} from 'react-native';
import HomeScreenHeader from '../../components/HomeScreenHeader';
import axios from 'axios';

import {logoutUser} from '../../redux/actions/auth';
import {useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
const HomeScreen = () => {
  const [covidData, setCovidData] = useState('');
  const dispatch = useDispatch();
  const gotoHome = () => {
    dispatch(logoutUser());
  };
  useEffect(() => {
    getCovidData();
  }, []);

  const getCovidData = async () => {
    try {
      const {data} = await axios.get(
        'https://disease.sh/v3/covid-19/countries/nepal?fbclid=IwAR0BGBSLpQtBvhYTEzgtoxQaCZBFuutSDYo3nGsZISxRTNPLHbnDsbhISGY',
      );
      setCovidData(data);
      console.warn(covidData);
    } catch (error) {
      console.warn(error);
    }
  };
  return (
    <View style={styles.maincontainer}>
      <View style={styles.header}>
        <HomeScreenHeader />
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
          <Text style={styles.details}>Active cases: {covidData.active} </Text>
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
      <Button title="logout" onPress={gotoHome} />
      <Text>this is the homescreen</Text>
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  maincontainer: {
    display: 'flex',
    flex: 1,
    // alignItems: 'center',
  },
  cardcontainer: {
    // backgroundColor: '#dcc9b6',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'center',
  },

  totalcase: {
    // alignItems: 'center',?\
    justifyContent: 'center',
    backgroundColor: '#1e6091',
    height: 90,
    width: 140,
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
    width: 140,
    margin: 5,
    elevation: 10,
    borderRadius: 10,
    padding: 7,
  },
  totalactive: {
    justifyContent: 'center',
    backgroundColor: '#9a8c98',
    height: 90,
    width: 140,
    margin: 5,
    elevation: 10,
    borderRadius: 10,
    padding: 7,
  },
  totaldeaths: {
    justifyContent: 'center',
    backgroundColor: '#fef9ef',
    height: 90,
    width: 140,
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
});
