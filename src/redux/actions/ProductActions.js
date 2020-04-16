import {GET_PRODUCTS, SET_LOADING_PRODUCT} from './type';
import {API} from '../../config/server';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
AsyncStorage.getItem('token', (err, result) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${result}`;
});

export const getProducts = query => async dispatch => {
  try {
    setLoading();
    query =
      query || 'product/all?search[key]=products.name&search[value]=&limit=10';
    const result = await axios.get(API.API_URL.concat(query));
    console.log(result, 'Here from Product actions');
    if (result.data.success) {
      dispatch({
        type: GET_PRODUCTS,
        payload: {data: result.data.data.data, pageInfo: result.data.data.page},
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const setLoading = () => {
  console.log('SSSSSSSSSSSSSSSSSSSss');
  return {
    type: SET_LOADING_PRODUCT,
    payload: true,
  };
};
