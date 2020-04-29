import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Linking, Platform} from 'react-native';
import {connect} from 'react-redux';
// Screens Import
import SignUp from '../src/screen/SignUp';
import LoginScreen from '../src/screen/Login';
import MainHome from './screen/MainHome';
import SuccessRegis from './screen/SuccesRegis';
import SearchScreen from './screen/SearchScreen';
import ProductDetailScreen from './screen/ProductDetailScreen';
import TransactionList from './screen/TransactionTav';
import DetailsTransactions from './screen/Transactions/DetailsTransactions';
import PayamentList from './screen/PaymentList';
import UploadImage from './screen/User/UploadImage';
import CartDetails from './screen/Cart/CartDetails';
import AddAddress from './screen/User/AddAddress';
import Invoice from './screen/Payment/Invoice';
import PaymentSuccess from './screen/Payment/PaymentSucces';
import DataNotFound from './screen/Others/DataNotFound';
import TopUp from './screen/Payment/TopUp';

const Stack = createStackNavigator();

class Index extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            // TopUp change to home
            name="Home"
            options={{headerShown: false}}
            component={MainHome}
          />
          <Stack.Screen
            // Home change to TopUp, component= MainHome
            name="TopUp"
            options={{
              headerShown: false,
              headerStyle: {
                backgroundColor: '#3c1361',
              },

              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
            component={TopUp}
          />

          <Stack.Screen
            name="UploadImage"
            options={{headerShown: false}}
            component={UploadImage}
          />

          <Stack.Screen
            name="PaymentSuccess"
            options={{headerShown: false}}
            component={PaymentSuccess}
          />

          <Stack.Screen
            name="Invoice"
            options={{headerShown: true}}
            component={Invoice}
          />
          <Stack.Screen
            name="AddAddress"
            options={{headerShown: true, title: 'Tambah Alamat'}}
            component={AddAddress}
          />
          <Stack.Screen
            name="CartDetails"
            options={{headerShown: true, title: 'Pengiriman'}}
            component={CartDetails}
          />
          <Stack.Screen
            name="TrxDetails"
            options={{headerShown: true}}
            component={DetailsTransactions}
          />
          <Stack.Screen
            name="ProductDetails"
            options={{headerShown: true}}
            component={ProductDetailScreen}
          />

          <Stack.Screen
            name="SearchScreen"
            options={{headerShown: false}}
            component={SearchScreen}
          />
          <Stack.Screen
            name="TrxList"
            options={{headerShown: false}}
            component={TransactionList}
          />

          <Stack.Screen
            name="SignUp"
            options={{title: 'SignUp', headerShown: true}}
            component={SignUp}
          />
          <Stack.Screen
            name="LoginScreen"
            options={{title: 'SignUp', headerShown: false}}
            component={LoginScreen}
          />
          <Stack.Screen
            name="SuccessRegis"
            options={{
              title: 'Booking Details',
              headerShown: false,
            }}
            component={SuccessRegis}
          />
          <Stack.Screen
            name="PaymentList"
            options={{headerShown: true, title: 'Select Payament Method'}}
            component={PayamentList}
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
