import {
  ADD_TO_CART,
  DELETE_FROM_CART,
  UPDATE_ITEM_ON_CART,
} from '../actions/type';
import {ToastAndroid} from 'react-native';

export const addToCart = (data, quantity, callback) => {
  const item = {...data, quantity};
  ToastAndroid.show('Data masuk ke keranjang', ToastAndroid.SHORT);
  return {
    type: ADD_TO_CART,
    payload: item,
  };
};

export const updateCart = (alldata, quantity, index) => {
  alldata[index].quantity = quantity;
  console.log(alldata, 'here from all update');
  return {
    type: UPDATE_ITEM_ON_CART,
    payload: alldata,
  };
};

export const removeItem = (allData, index) => {
  const newData = allData.filter((valu, i, arr) => i !== index);
  return {
    type: DELETE_FROM_CART,
    payload: newData,
  };
};
