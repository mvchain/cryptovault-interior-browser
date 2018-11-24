import { blockTx } from '@/api/block';
const block = {
  state: {
    blockTxList: {}
  },

  mutations: {
    SET_BLOCKTX_LIST: (state, payload) => {
      state.blockTxList = payload
    }
  },

  actions: {
    getBlockTxList({commit, state}, payload) {
      return new Promise((resolve, reject) => {
        blockTx(payload).then((res) => {
          commit('SET_BLOCKTX_LIST', res.data);
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}

export default block
