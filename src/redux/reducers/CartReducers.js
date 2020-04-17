import {ADD_TO_CART, SET_LOGOUT, UPDATE_ITEM_ON_CART} from '../actions/type';
const initialState = {
  data: [],
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case ADD_TO_CART: {
      console.log(state, 'Here form Cart Reducer');
      const newDataCart = [...state.data, payload];
      return {...state, data: newDataCart};
    }
    case SET_LOGOUT: {
      return {...state, data: []};
    }
    case UPDATE_ITEM_ON_CART: {
      return {
        ...state,
        data: payload,
      };
    }

    default:
      return state;
  }
};
