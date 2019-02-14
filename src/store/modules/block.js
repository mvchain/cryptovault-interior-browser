import { blockTx, blockStatus, addrInfo, postBlockTx, blockExportCount } from '@/api/block';
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
    putBlockStatus({commit, state}, payload) {
      return new Promise((resolve, reject) => {
        blockStatus(payload).then((res) => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getAddrInfo({commit, state}, payload) {
      return new Promise((resolve, reject) => {
        addrInfo(payload).then((res) => {
          resolve( res.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    postTx({commit, state}, payload) {
      return new Promise((resolve, reject) => {
        postBlockTx(payload).then((res) => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getExportCount({commit, state}, payload) {
      return new Promise((resolve, reject) => {
        blockExportCount().then((res) => {
          resolve(res.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}

export default block
