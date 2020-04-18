import {GET_ALL_CITY} from '../actions/type';
const initialState = {
  data: [],
  isLoading: true,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case GET_ALL_CITY:
      return {...state, data: payload, isLoading: false};

    default:
      return state;
  }
};
