import {GET_SHIPPING_COST} from '../actions/type';
import {API} from '../../config/server';
import axios from 'axios';

export const getShippingCost = (
  idOrigin,
  idDestination,
  weight,
  callback,
) => async dispatch => {
  try {
    const data = {
      origin: '501',
      destination: '62',
      weight: 1000,
      courier: 'jne',
    };
    const head = {
      headers: {
        key: API.API_RAJA_ONGKIR,
        'content-type': 'application/x-www-form-urlencoded',
        'Content-Length': 50,
      },
    };
    const res = await axios.post(
      API.API_RAJA_ONGKIR.concat('starter/cost'),
      data,
      {
        headers: {
          key: '01c67c78ff9e384fdbac1775307db363',
        },
      },
    );
    console.log(res, 'INI DARI RAJA ONGKIR');
    const dataCourier = res.data.rajaongkir.results[0];
    callback({
      status: true,
      data: {
        ...dataCourier,
        logo:
          'https://1.bp.blogspot.com/-P7x568_S2rY/XPKV0i9D_cI/AAAAAAAAAZo/cptW31hZno4DkO6JYIBl77YlbglZ9a4mACEwYBhgL/s1600/JNE.jpg',
      },
    });
    dispatch({
      type: GET_SHIPPING_COST,
    });
  } catch (error) {
    console.log(error.mess);
  }
};
