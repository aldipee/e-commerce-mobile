import {
  SET_LOADING_AUTH,
  SET_LOGIN,
  SET_LOGOUT,
  CREATE_NEW_USER,
  UPLOAD_USER_PICTURE,
} from '../actions/type';
import {API} from '../../config/server';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export const setLogin = (data, callback) => async dispatch => {
  try {
    setLoading();
    const res = await axios.post(API.API_URL.concat('auth/login'), data);
    console.log(res);
    if (res.data.data) {
      await AsyncStorage.setItem('token', res.data.data);
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

export const setLoading = () => {
  return {
    type: SET_LOADING_AUTH,
  };
};
