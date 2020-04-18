import {
  SET_LOGIN,
  SET_LOADING_AUTH,
  GET_PROFILE_DETAILS,
  GET_ALL_USER_TRANSACTIONS,
} from '../actions/type';
const initialState = {
  isLogin: false,
  isLoading: false,
  profileData: {},
  history: [],
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
    case GET_ALL_USER_TRANSACTIONS: {
      return {
        ...state,
        isLoading: false,
        history: payload,
      };
    }

    case GET_PROFILE_DETAILS: {
      return {
        ...state,
        profileData: payload,
      };
    }

    default:
      return state;
  }
};
