import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FeatherIcon from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';

// Screen Import
import LoginScreen from '../screen/Login';
import colors from '../config/colors';
import HomeScreen from '../screen/HomeScreen';
import ProfileScreen from '../screen/ProfileScreen';
import TransactionsList from '../screen/TransactionTav';
import Cart from '../screen/Cart';
import {connect} from 'react-redux';
const BottomTab = createBottomTabNavigator();

function MainHome(props) {
  return (
    <BottomTab.Navigator
      tabBarOptions={{
        activeTintColor: colors.MAIN_BLUE,
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Telusuri',
          tabBarIcon: ({color, size}) => (
            <FeatherIcon name="search" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Transaction"
        component={props.auth.isLogin ? TransactionsList : LoginScreen}
        options={{
          tabBarLabel: 'Transaksi',
          tabBarIcon: ({color, size}) => (
            <IonIcon name="md-paper" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="MyCart"
        component={Cart}
        options={{
          tabBarLabel: 'Keranjang',
          tabBarIcon: ({color, size}) => (
            <IonIcon name="md-cart" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={props.auth.isLogin ? ProfileScreen : LoginScreen}
        options={{
          tabBarLabel: 'Akun',
          tabBarIcon: ({color, size}) => (
            <FeatherIcon name="user" size={size} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const mapStateToProps = state => {
  return {
    auth: state.authData,
  };
};
export default connect(
  mapStateToProps,
  null,
)(MainHome);
