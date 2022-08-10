/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Tab, TabView} from '@rneui/themed';
import {View, StyleSheet} from 'react-native';
import {NavigationHeader} from '../../components';
import {OxygenRequest, BedRequest} from '../../components';
const Requests = () => {
  const [index, setIndex] = React.useState(0);
  return (
    <View style={styles.maincontainer}>
      <NavigationHeader Title="Requests" />
      <View style={styles.container}>
        <Tab
          value={index}
          onChange={e => setIndex(e)}
          indicatorStyle={{
            backgroundColor: '#004277',
            height: 3,
          }}
          variant="primary">
          <Tab.Item
            title="BedRequests"
            containerStyle={{backgroundColor: 'white'}}
            titleStyle={{fontSize: 13, color: '#004277', width: 110}}
          />
          <Tab.Item
            title="OxygenRequests"
            containerStyle={{backgroundColor: 'white'}}
            titleStyle={{fontSize: 13, color: '#004277', width: 200}}
          />
        </Tab>
      </View>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{width: '100%'}}>
          <BedRequest />
        </TabView.Item>
        <TabView.Item style={{width: '100%'}}>
          {/* <Button title="click" onPress={handlePress} /> */}
          <OxygenRequest />
        </TabView.Item>
      </TabView>
    </View>
  );
};

export default Requests;
const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    position: 'relative',
    backgroundColor: 'white',

    width: '100%',

    alignItems: 'center',
  },
  react: {
    color: '#004277',
    fontSize: 16,
    fontFamily: 'WorkSans-Regular',
  },
  complete: {
    color: '#414141',
    fontSize: 14,
    fontFamily: 'WorkSans-Regular',
    marginTop: 10,
  },
  viewtab: {
    backgroundColor: 'white',
    padding: 30,
  },
  intro: {
    color: '#004277',
    fontSize: 16,
    fontFamily: 'WorkSans-Regular',

    textAlign: 'center',
  },
  viewcontainer: {
    marginTop: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderWidth: 1,

    paddingBottom: 250,
  },
});
