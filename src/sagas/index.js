/* eslint-disable no-constant-condition */

import { take, put, call, fork, select, takeEvery, all } from 'redux-saga/effects'
import * as actions from '../actions'
import { getCart } from '../reducers'
import { api } from '../services'
import {getQuantity} from "../reducers/cart";

export function* removeAllFromCart({productId}){
  const quantity = yield select((state)=> getQuantity(state.cart, productId))

  for(let i = 0; i < quantity; i++){
    yield put(actions.removeFromCart(productId))
  }
}

export function* watchRemoveAllFromCart(){
  yield takeEvery(actions.REMOVE_ALL_FROM_CART,removeAllFromCart)
}

export function* getAllProducts() {
  const products = yield call(api.getProducts)
  yield put(actions.receiveProducts(products))
}

export function* checkout() {
  try {
    const cart = yield select(getCart)
    yield call(api.buyProducts, cart)
    yield put(actions.checkoutSuccess(cart))
  } catch (error) {
    yield put(actions.checkoutFailure(error))
  }
}

export function* watchGetProducts() {
  /*
    takeEvery will fork a new `getAllProducts` task on each GET_ALL_PRODUCTS actions
    i.e. concurrent GET_ALL_PRODUCTS actions are allowed
  */
  yield takeEvery(actions.GET_ALL_PRODUCTS, getAllProducts)
}

export function* watchCheckout() {
  while (true) {
    yield take(actions.CHECKOUT_REQUEST)
    /*
      ***THIS IS A BLOCKING CALL***
      It means that watchCheckout will ignore any CHECKOUT_REQUEST event until
      the current checkout completes, either by success or by Error.
      i.e. concurrent CHECKOUT_REQUEST are not allowed
      TODO: This needs to be enforced by the UI (disable checkout button)
    */
    yield call(checkout)
  }
}

export default function* root() {
  yield all([fork(getAllProducts), fork(watchGetProducts), fork(watchCheckout), fork(watchRemoveAllFromCart)])
}
