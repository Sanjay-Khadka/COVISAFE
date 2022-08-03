import React, {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import {View, Text, StyleSheet, Image} from 'react-native';
import {CasesContainer, CustomButton, ToggleButton} from '../../components';
import {useDispatch} from 'react-redux';
import {logoutUser} from '../../redux/actions/auth';
import colors from '../../colors/colors';

const {height, width} = Dimensions.get('window');

const Dashboard = () => {
  const [covidData, setCovidData] = useState('');
  const [total, setTotal] = useState(true);
  const [today, setToday] = useState(false);

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
        <CustomButton labelText="Logout" handleOnPress={logout} />
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
    // justifyContent: 'center',
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
