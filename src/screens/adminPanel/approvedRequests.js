import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Touchable,
} from 'react-native';
import React, {useState} from 'react';
import SelectList from 'react-native-dropdown-select-list';
import {getUserBedRequestList} from '../../redux/actions/manageBed';
import {getUserOxygenRequestList} from '../../redux/actions/manageoxygen';
import {useDispatch, useSelector} from 'react-redux';

const ApprovedRequests = () => {
  const [selected, setSelected] = useState('Normal');
  const user = useSelector(state => state.authReducer.Login);
  const userid = user?.userdata?._id;
  const dispatch = useDispatch();

  const getUser = () => {
    console.log(userid);
    dispatch(getUserOxygenRequestList(userid));
  };

  const data = [
    {key: 'Normal', value: 'Normal'},
    {key: 'Standard', value: 'Standard'},
    {key: 'Urgent', value: 'Urgent'},
  ];

  return (
    <View style={styles.container}>
      {/* <SelectList
        setSelected={setSelected}
        data={data}
        onSelect={() => {
          setSelected(data.value), console.log(selected);
        }}
        inputStyles={{color: 'black', width: 80}}
        // boxStyles={{borderRadius: 0}}
        dropdownTextStyles={{color: 'black'}}
        dropdownStyles={{width: 125}}
        dropdownItemStyles={{
          margin: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      /> */}
      <TouchableOpacity onPress={getUser}>
        <Text style={{color: 'black'}}>Get User</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ApprovedRequests;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
