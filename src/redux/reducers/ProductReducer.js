import {GET_PRODUCTS} from '../actions/type';

const initialState = {
  isLoading: false,
  data: [],
  pageInfo: {},
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case GET_PRODUCTS: {
      return {...state, data: payload.data, pageInfo: payload.pageInfo};
    }

    default:
      return state;
  }
};
