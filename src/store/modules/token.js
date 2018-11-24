import { tokenList, createToken } from '@/api/token';
const token = {
  state: {
    tokenList: {
      list: [
        {
          fee: 0.22,
          pairInfo: 0,
          recharge: 0,
          tokenId: 1,
          tokenName: "ETH",
          transaferFee: 0.12,
          visible: 0,
          withdraw: 0,
          withdrawDay: 0,
          withdrawMax: 0,
          withdrawMin: 0
        },
        {
          fee: 0.22,
          pairInfo: 0,
          recharge: 0,
          tokenId: 2,
          tokenName: "BTC",
          transaferFee: 0.12,
          visible: 0,
          withdraw: 0,
          withdrawDay: 0,
          withdrawMax: 0,
          withdrawMin: 0
        }
      ]
    }
  },
  mutations: {
    SET_TOKEN_LIST: (state, payload) => {
      state.tokenList = payload
    }
  },
  actions: {
    getTokenList({commit, state}, payload) {
      return new Promise((resolve, reject) => {
        tokenList(payload).then((res) => {
          commit('SET_TOKEN_LIST', res.data);
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    postTokenList({commit, state}, payload) {
      return new Promise((resolve, reject) => {
        createToken(payload).then((res) => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}
export default token;
