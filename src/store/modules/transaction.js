import { txList, txOver, deleteTx } from '@/api/transaction';
const transaction = {
  state: {
    txList: {},
    overList: {}
  },
  mutations: {
    SET_TX_LIST: (state, payload) => {
      state.txList = payload
    },
    SET_OVER_LIST: (state, payload) => {
      state.overList = payload
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
    },
    getOverList({commit, state}, payload) {
      return new Promise((resolve, reject) => {
        txOver(payload).then((res) => {
          commit('SET_OVER_LIST', res.data);
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    deletePending({commit, state}, payload) {
      return new Promise((resolve, reject) => {
        deleteTx(payload).then((res) => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}
export default transaction;
