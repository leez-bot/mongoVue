import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    shopCarList: []
  },
  // 获取state数据方法
  getters: {
    totalPrice: state => {
      let _totalPrice = 0
      state.shopCarList.map(item => {
        _totalPrice += item.count * item.price
      })
      return _totalPrice
    }
  },
  // 同步操作数据方法
  mutations: {
    increase (state, commodity) {
      const index = state.shopCarList.findIndex(item => item.id === commodity.id)
      if (index !== -1) {
        state.shopCarList[index].count++
      } else {
        const _list = state.shopCarList.concat()
        commodity.count = 1
        _list.push(commodity)
        state.shopCarList = _list
      }
    },
    decrease (state, commodity) {
      const index = state.shopCarList.findIndex(item => item.id === commodity.id)
      if (state.shopCarList[index].count !== 1) {
        state.shopCarList[index].count--
      } else {
        const _list = state.shopCarList.concat()
        _list.splice(index, 1)
        state.shopCarList = _list
      }
    },
    clearShopCarList (state) {
      state.shopCarList = []
    }
  },
  // 异步操作数据方法
  actions: {
    submitOrderSync ({ commit, state }, subList) {
      setTimeout(() => {
        commit('clearShopCarList')
      }, 2000)
    }
  }
})
