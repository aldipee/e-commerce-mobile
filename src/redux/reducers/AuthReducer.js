import {SET_LOGIN, SET_LOADING_AUTH} from '../actions/type';
const initialState = {
  isLogin: false,
  isLoading: false,
  token: '',
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_LOGIN:
      return {...state, isLoading: false, isLogin: true, token: payload};

    case SET_LOADING_AUTH: {
      return {
        ...state,
        isLoading: true,
      };
    }

    default:
      return state;
  }
};
