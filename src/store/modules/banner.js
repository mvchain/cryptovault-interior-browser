import {getBanner, postBanner, deleteBanner} from '@/api/banner'
const banner = {
  state: {
    bannerList: []
  },

  mutations: {
    SET_BANNER_LIST: (state, payload) => {
      state.bannerList = payload
    },

  },

  actions: {
    getBannerList({commit, state}, payload) {
      return new Promise((resolve, reject) => {
        getBanner(payload).then((res) => {
          commit('SET_BANNER_LIST', res.data);
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    postBannerList({commit, state}, payload) {
      return new Promise((resolve, reject) => {
        postBanner(payload).then((res) => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    deleteBannerList({commit, state}, payload) {
      return new Promise((resolve, reject) => {
        deleteBanner(payload).then((res) => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}

export default banner
