import {INSERT_USER_ADDRESS, GET_ALL_USER_TRANSACTIONS} from './type';
import {API} from '../../config/server';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
AsyncStorage.getItem('token', (err, result) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${result}`;
});

export const addNewAddress = (data, callback) => async dispatch => {
  try {
    const res = await axios.post(
      API.API_URL.concat('auth/insert-address'),
      data,
    );
    console.log(res, 'SFFFFFFFFFFFFFFF');
    if (res.data.success) {
      callback({success: true});
    } else {
      callback({success: false});
    }
    dispatch({
      type: INSERT_USER_ADDRESS,
    });
  } catch (error) {
    console.log(error);
  }
};
