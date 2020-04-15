import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FeatherIcon from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';

// Screen Import
import LoginScreen from '../screen/Login';
import HomeScreen from '../screen/HomeScreen';
const BottomTab = createBottomTabNavigator();

function MainHome(props) {
  return (
    <BottomTab.Navigator
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <FeatherIcon name="home" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          tabBarLabel: 'Login',
          tabBarIcon: ({color, size}) => (
            <FeatherIcon name="home" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="MyTransaction"
        component={LoginScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <FeatherIcon name="home" size={size} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default MainHome;
