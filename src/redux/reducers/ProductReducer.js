import {
  GET_PRODUCTS,
  SET_LOADING_PRODUCT,
  DATA_ON_SEARCH,
} from '../actions/type';

const initialState = {
  isLoading: true,
  data: [],
  searchData: [],
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
    case DATA_ON_SEARCH: {
      return {
        ...state,
        searchData: payload.data,
        pageInfo: payload.pageInfo,
      };
    }

    case SET_LOADING_PRODUCT: {
      return {...state, isLoading: payload};
    }

    default:
      return state;
  }
};
