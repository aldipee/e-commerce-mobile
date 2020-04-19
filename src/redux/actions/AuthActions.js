import {
  SET_LOADING_AUTH,
  SET_LOGIN,
  SET_LOGOUT,
  CREATE_NEW_USER,
  UPLOAD_USER_PICTURE,
  GET_ALL_USER_TRANSACTIONS,
  GET_PROFILE_DETAILS,
} from '../actions/type';
import {API} from '../../config/server';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
AsyncStorage.getItem('token', (err, result) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${result}`;
  console.log('INI TOKEB', result);
});

export const setLogin = (data, callback) => async dispatch => {
  try {
    setLoading();
    const res = await axios.post(API.API_URL.concat('auth/login'), data);
    const token = await AsyncStorage.setItem('token', res.data.data);
    console.log(res);
    if (res.data.data) {
      dispatch({
        type: SET_LOGIN,
        payload: res.data.data,
      });
      callback({status: true});
    } else if (res.data.success === 'VERIF') {
      callback({status: 'ERRVERIFY', messsage: 'Error on AUTH'});
    } else {
      callback({status: false});
    }
  } catch (error) {
    console.log(error, 'This error appears from AuthActions');
    callback({status: false, messsage: 'ERROR SERVER'});
  }
};
export const getTransaction = () => async dispatch => {
  try {
    const res = await axios.get(
      API.API_URL.concat(
        'transactions/user?search[key]=receipt_number&search[value]=&limit=100',
      ),
    );
    dispatch({
      type: GET_ALL_USER_TRANSACTIONS,
      payload: res.data.data.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const checkUsername = (username, callback) => async dispatch => {
  try {
    const res = await axios.post(API.API_URL.concat('auth/username-check'), {
      username,
    });
    !res.data.success ? callback(true) : callback(false);
  } catch (error) {}
};

export const checkEmail = (email, callback) => async dispatch => {
  try {
    const res = await axios.post(API.API_URL.concat('auth/email-check'), {
      email,
    });
    res.data.success ? callback(true) : callback(false);
  } catch (error) {}
};

export const setNewUser = (data, callback) => async dispatch => {
  try {
    const res = await axios.post(API.API_URL.concat('auth/register'), data);
    console.log(res, 'BEDUl');
  } catch (err) {
    callback(err);
  }
};

export const setLogout = callback => async dispatch => {
  try {
    await AsyncStorage.removeItem('token');
    dispatch({
      type: SET_LOGOUT,
    });
    callback(true);
  } catch (error) {
    callback(false);
    console.log(error);
  }
};

export const getProfileDetail = () => async dispatch => {
  try {
    const token = await AsyncStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const res = await axios.get(API.API_URL.concat('auth/detail'));
    console.log(res);
    dispatch({
      type: GET_PROFILE_DETAILS,
      payload: res.data.msg,
    });
  } catch (error) {
    console.log(error, 'FROM AUTH ACTIONS');
  }
};

export const setLoading = () => {
  return {
    type: SET_LOADING_AUTH,
  };
};
