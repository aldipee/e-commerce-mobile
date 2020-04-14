import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// Screens Import
import Login from '../src/screen/Login';
import SignUp from '../src/screen/SignUp';
import {connect} from 'react-redux';
import SuccessRegis from './screen/SuccesRegis';

const Stack = createStackNavigator();

class Index extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SignUp"
            options={{title: 'SignUp', headerShown: false}}
            component={SignUp}
          />
          <Stack.Screen
            name="LoginScreen"
            options={{title: 'Login', headerShown: false}}
            component={Login}
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
