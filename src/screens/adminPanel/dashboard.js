import React, {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import {View, Text, StyleSheet, Image} from 'react-native';
import {
  CasesContainer,
  CustomButton,
  ToggleButton,
  BubbleText,
} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser} from '../../redux/actions/auth';
import colors from '../../colors/colors';
import {url} from '../../constants';
const {height, width} = Dimensions.get('window');

const Dashboard = () => {
  const [covidData, setCovidData] = useState('');
  const [total, setTotal] = useState(true);
  const [today, setToday] = useState(false);
  const [oxygenreqlist, setReqList] = useState('');
  const [approvedbedreqlength, setapprovedbed] = useState(0);
  const [approvedoxygenlength, setapprovedoxygen] = useState(0);

  const bedrequestlist = useSelector(state => state.bedsReducer.BedRequestList);
  var bedreqlen = bedrequestlist.length;
  const getOxyList = async () => {
    try {
      const {data} = await axios.get(`${url}/getalloxygenrequests`);
      setReqList(data);
      var approvedOxygen = data.filter(status => {
        return status?.requestStatus === 'approved';
      });
      var oxyreqapp = approvedOxygen.length;
      setapprovedoxygen(oxyreqapp);
      console.log(oxyreqapp);
    } catch (error) {
      console.log(error);
    }
  };
  var oxygenreqlen = oxygenreqlist.length;
  const beds = useSelector(state => state.bedsReducer.Beds);
  var bedlength = beds.length;
  const oxygens = useSelector(state => state.oxygenReducer.Oxygens);
  var oxygenLength = oxygens.length;
  var bedlength = beds.length;
  useEffect(() => {
    getCovidData();
    getOxyList();
    filterApprovedBed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterApprovedBed = () => {
    var approvedBed = bedrequestlist.filter(status => {
      return status.requestStatus === 'approved';
    });
    var bedreqapplength = approvedBed.length;
    setapprovedbed(bedreqapplength);
  };

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
          <Text style={styles.covidText}>COVISAFE</Text>
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
      </View>
      <View style={styles.bubblesContainer}>
        <View>
          <BubbleText
            bubbleValue={oxygenLength}
            label="Total Oxygens"
            style={styles.Totals}
            backgroundColor={colors.primary}
          />
          <BubbleText
            bubbleValue={bedlength}
            label="Total Beds"
            backgroundColor={colors.primary}
          />
        </View>
        <View>
          <BubbleText
            bubbleValue={oxygenreqlen}
            label="Oxygen Requests"
            backgroundColor={'#fb8500'}
          />
          <BubbleText
            bubbleValue={bedreqlen}
            label="Bed Requests"
            style={styles.Requests}
            backgroundColor={'#fb8500'}
          />
        </View>

        <View>
          <BubbleText
            bubbleValue={approvedbedreqlength}
            label=" Approved Bed Requests"
            backgroundColor={'#99d98c'}
          />
          <BubbleText
            bubbleValue={approvedoxygenlength}
            label=" Approved O2 Requests"
            backgroundColor={'#99d98c'}
          />
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
    margin: 40,
    width: width,
    display: 'flex',
    // flexWrap: 'wrap',
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'center',
  },
});
