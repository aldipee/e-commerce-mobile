import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';
// Screens Import
import SignUp from '../src/screen/SignUp';
import MainHome from './screen/MainHome';
import SuccessRegis from './screen/SuccesRegis';
import SearchScreen from './screen/SearchScreen';

const Stack = createStackNavigator();

class Index extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            options={{title: 'Login', headerShown: false}}
            component={MainHome}
          />
          <Stack.Screen
            name="SearchScreen"
            options={{headerShown: false}}
            component={SearchScreen}
          />

          <Stack.Screen
            name="SignUp"
            options={{title: 'SignUp', headerShown: false}}
            component={SignUp}
          />
          <Stack.Screen
            name="SuccessRegis"
            options={{
              title: 'Booking Details',
              headerShown: false,
            }}
            component={SuccessRegis}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.authData,
  };
};
export default connect(
  mapStateToProps,
  null,
)(Index);
