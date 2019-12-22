import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation_types'

export default {
  addCart (context, payload) {
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    if (oldProduct) {
      context.commit(ADD_COUNTER, oldProduct)
    } else {
      payload.count = 1
      payload.checked = true
      context.commit(ADD_TO_CART, payload)
    }
  }
}