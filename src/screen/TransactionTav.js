import React from 'react';
import {View, ScrollView, Text} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// all Trx
import AllTransactions from './Transactions/AllTransactions';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      <Tab.Navigator>
        <Tab.Screen name="AllTrx" component={AllTransactions} />
        <Tab.Screen name="TrxCode1" component={AllTransactions} />
        <Tab.Screen name="TrxCode2" component={AllTransactions} />
        <Tab.Screen name="TrxCode3" component={AllTransactions} />
        <Tab.Screen name="TrxCode4" component={AllTransactions} />
      </Tab.Navigator>
    </ScrollView>
  );
}

export default MyTabs;
