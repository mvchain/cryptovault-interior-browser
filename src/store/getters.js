const getters = {
  sidebar: state => state.app.sidebar,

  token: state => state.login.token,
  avatar: state => state.login.avatar,
  roles: state => state.login.roles,

  adminList: state => state.admin.adminList,

  userList: state => state.user.userList,
  userBalanceList: state => state.user.userBalanceList,
  userLogList: state => state.user.userLogList,

  blockTxList: state => state.block.blockTxList,

  projectList: state => state.project.projectList,

  tokenList: state => state.token.tokenList,

  txList: state => state.transaction.txList
}
export default getters
