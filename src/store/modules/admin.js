import {createAdmin, deleteAdmin, modifyAdmin, getadminList, adminPwd, ossObjHandler} from '@/api/admin'

const admin = {
  state: {
    adminList: {}
  },

  mutations: {
    SET_ADMIN_LIST: (state, payload) => {
      state.adminList = payload
    }
  },

  actions: {
    getAdminListAction({commit, state}, payload) {
      return new Promise((resolve, reject) => {
        getadminList(payload).then((res) => {
          commit('SET_ADMIN_LIST', res.data);
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    postCreateAdmin({commit, state}, payload) {
      return new Promise((resolve, reject) => {
        createAdmin(payload).then(() => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    putModifyAdmin({commit, state}, payload) {
      return new Promise((resolve, reject) => {
        modifyAdmin(payload).then(() => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    deleteDeleteAdmin({commit, state}, payload) {
      return new Promise((resolve, reject) => {
        deleteAdmin(payload).then(() => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    putModifyPwd({commit, state}, payload) {
      return new Promise((resolve, reject) => {
        adminPwd(payload).then(() => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getAdminInfo({commit, state}, payload) {
      return new Promise((resolve, reject) => {
        getadminList(payload).then((res) => {
          resolve(res.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getOssObj: ({ commit, state }) => {
      return new Promise((resolve, reject) => {
        ossObjHandler().then(res => {
          resolve(res.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}

export default admin
