import {GET_PRODUCTS, SET_LOADING_PRODUCT} from '../actions/type';

const initialState = {
  isLoading: true,
  data: [],
  pageInfo: {},
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case GET_PRODUCTS: {
      return {
        ...state,
        data: payload.data,
        pageInfo: payload.pageInfo,
        isLoading: false,
      };
    }

    case SET_LOADING_PRODUCT: {
      return {...state, isLoading: true};
    }

    default:
      return state;
  }
};
