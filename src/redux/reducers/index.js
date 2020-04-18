import {SET_LOGOUT} from '../actions/type';
import {combineReducers} from 'redux';

import AuthReducer from './AuthReducer';
import ProductReducer from './ProductReducer';
import CartReducer from './CartReducers';
import ShippingReducers from './ShippingReducers';

const appReducer = combineReducers({
  authData: AuthReducer,
  productData: ProductReducer,
  cartData: CartReducer,
  shippingData: ShippingReducers,
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === SET_LOGOUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
