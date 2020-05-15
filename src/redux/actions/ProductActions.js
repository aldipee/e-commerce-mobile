import {
  GET_PRODUCTS,
  SET_LOADING_PRODUCT,
  DATA_ON_SEARCH,
  LOAD_MORE_PRODUCTS,
} from './type';
import {API} from '../../config/server';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
AsyncStorage.getItem('token', (err, result) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${result}`;
});

export const getProducts = (query, callback) => async dispatch => {
  try {
    setLoading();
    query =
      query || 'product/all?search[key]=products.name&search[value]=&limit=10';
    const result = await axios.get(API.API_URL.concat(query));
    console.log(result, 'Here from Product actions');
    if (result.data.success) {
      callback(true);
      dispatch({
        type: DATA_ON_SEARCH,
        payload: {data: result.data.data.data, pageInfo: result.data.data.page},
      });
    }
  } catch (error) {
    callback(false);
    console.log(error);
  }
};
export const getProductsHome = (
  page = 1,
  limit = 6,
  searckey = '',
  loadmore = false,
) => async dispatch => {
  try {
    setLoading();
    const sql = `product/all?search[key]=products.name&search[value]=${searckey}&limit=${limit}&page=${page}&sort[key]=products.id&sort[value]=1`;
    const result = await axios.get(API.API_URL.concat(sql));
    if (result.data.success) {
      console.log(result, 'PROUD');
      if (!loadmore) {
        dispatch({
          type: GET_PRODUCTS,
          payload: {
            data: result.data.data.data,
            pageInfo: result.data.data.pageInfo,
          },
        });
      } else {
        dispatch({
          type: LOAD_MORE_PRODUCTS,
          payload: {
            data: result.data.data.data,
            pageInfo: result.data.data.pageInfo,
          },
        });
      }
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
