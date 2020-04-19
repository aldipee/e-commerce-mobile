import {ADD_NEW_TRANSACTION} from '../actions/type';
import {API} from '../../config/server';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
AsyncStorage.getItem('token', (err, result) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${result}`;
});

export const addTransaction = (
  totalPrice,
  postalFee,
  Product,
  callback,
) => async dispatch => {
  try {
    const data = {
      totalPrice,
      postalFee,
      Product,
    };
    console.log(data, 'Heres data transcation that will be send');
    const res = await axios.post(API.API_URL.concat('transactions/new'), data);
    callback(true);
    dispatch({
      type: ADD_NEW_TRANSACTION,
    });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
