import React, {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';
import axios from 'axios';
import {View, Text, StyleSheet, Image} from 'react-native';

import {CasesContainer, ToggleButton} from '../../components';
import {useSelector} from 'react-redux';
import colors from '../../colors/colors';

const {height, width} = Dimensions.get('window');

const Dashboard = () => {
  const [covidData, setCovidData] = useState('');
  const [total, setTotal] = useState(true);
  const [today, setToday] = useState(false);
  const {userdata} = useSelector(state => state.authReducer.Login);
  const fullname = userdata?.fullname;

  useEffect(() => {
    getCovidData();
  }, []);

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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.maincontainer}>
      <View style={styles.halfcontainer}>
        <View style={styles.topHeader}>
          <Text style={styles.covidText}>COVISAFE</Text>

          <Text style={styles.name}>{fullname}</Text>
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
          {!today ? (
            <>
              <CasesContainer
                labelText="Total Cases"
                value={covidData.cases}
                backgroundColor={'#1e6091'}
                textColor={'white'}
              />
              <CasesContainer
                labelText="Total Recovered"
                value={covidData.recovered}
                backgroundColor={'#99d98c'}
                textColor={'white'}
              />
              <CasesContainer
                labelText="Total Active"
                value={covidData.active}
                backgroundColor={'#9a8c98'}
                textColor={'white'}
              />
              <CasesContainer
                labelText="Total Deaths"
                value={covidData.deaths}
                backgroundColor={'#fef9ef'}
                textColor={'#9a031e'}
              />
            </>
          ) : (
            <>
              <CasesContainer
                labelText="Today Cases"
                value={covidData.todayCases}
                backgroundColor={'#00b4d8'}
                textColor={'white'}
              />
              <CasesContainer
                labelText="Today Recovered"
                value={covidData.todayRecovered}
                backgroundColor={'#80ed99'}
                textColor={'white'}
              />
              <CasesContainer
                labelText="Today Active"
                value={covidData.active}
                backgroundColor={'#ffbc42'}
                textColor={'white'}
              />
              <CasesContainer
                labelText="Today Deaths"
                value={covidData.todayDeaths}
                backgroundColor={'#dc2f02'}
                textColor={'white'}
              />
            </>
          )}
        </View>
      </View>
      <View style={styles.bubblesContainer}>
        <Text style={styles.info}>Covid-19 Prevention</Text>
        <Image
          style={styles.tinyLogo}
          source={require('../../assets/halfimage.jpg')}
        />
      </View>
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
    alignItems: 'center',
    flex: 1,
  },
  toggles: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    top: 80,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  cardcontainer: {
    marginTop: 85,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
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
  bubblesContainer: {
    elevation: 2,
    margin: 25,
    width: width,
    display: 'flex',
    // flexWrap: 'wrap',
    // flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tinyLogo: {
    height: height / 2.7,
    width: width,
  },
  info: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 18,
    marginTop: -16,
    textAlign: 'center',
  },
});
