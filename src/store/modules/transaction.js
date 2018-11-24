import { txList } from '@/api/transaction';
const transaction = {
  state: {
    txList: {}
  },
  mutations: {
    SET_TX_LIST: (state, payload) => {
      state.txList = payload
    }
  },
  actions: {
    getTxList({commit, state}, payload) {
      return new Promise((resolve, reject) => {
        txList(payload).then((res) => {
          commit('SET_TX_LIST', res.data);
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default transaction;
