import React from 'react';
import {View, ScrollView, Text} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// all Trx
import AllTransactions from './Transactions/AllTransactions';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      <Tab.Navigator
        tabBarOptions={{
          scrollEnabled: true,
          labelStyle: {fontSize: 12},
          tabStyle: {width: 130},
        }}>
        <Tab.Screen
          name="AllTrx"
          options={{tabBarLabel: 'Belum Dibayar'}}
          component={AllTransactions}
          initialParams={{itemId: 0}}
        />
        <Tab.Screen
          name="TrxCode1"
          options={{tabBarLabel: 'Dibayar'}}
          component={AllTransactions}
          initialParams={{itemId: 1}}
        />
        <Tab.Screen
          name="TrxCode2"
          options={{tabBarLabel: 'Dikirim'}}
          component={AllTransactions}
          initialParams={{itemId: 2}}
        />
        <Tab.Screen
          name="TrxCode3"
          options={{tabBarLabel: 'Selesai'}}
          component={AllTransactions}
          initialParams={{itemId: 3}}
        />
      </Tab.Navigator>
    </ScrollView>
  );
}

export default MyTabs;
