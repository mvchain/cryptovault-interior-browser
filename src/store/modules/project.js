import { projectList, createProject, modifyProject, deleteProject } from '@/api/project';
const project = {
  state: {
    projectList: {
      list: [
        {
          baseTokenId: 1,
          baseTokenName: "ETH",
          projectImage: "aaaaaaaaaaaaa",
          id: 1,
          projectName: "椰子项目",
          projectMin: '1',
          projectLimit: '323',
          projectTotal: 1000,
          ratio: 1000,
          startedAt: 1342955317242,
          status: 0,
          stopAt: 1542955317242,
          tokenId: 2,
          tokenName: "YZC",
          visiable: 1
        }
      ],
      total: 50
    }
  },
  mutations: {
    SET_PROJECT_LIST: (state, payload) => {
      state.projectList = payload
    }
  },
  actions: {
    getProjectList({commit, state}, payload) {
      return new Promise((resolve, reject) => {
        projectList(payload).then((res) => {
          commit('SET_PROJECT_LIST', res.data);
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getProjectInfo({commit, state}, payload) {
      return new Promise((resolve, reject) => {
        projectList(payload).then((res) => {
          resolve(res.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    postProjectList({commit, state}, payload) {
      return new Promise((resolve, reject) => {
        createProject(payload).then((res) => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    putProjectList({commit, state}, payload) {
      return new Promise((resolve, reject) => {
        modifyProject(payload).then((res) => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    deleteProjectList({commit, state}, payload) {
      return new Promise((resolve, reject) => {
        deleteProject(payload).then((res) => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}
export default project;
