const getters = {
  sidebar: state => state.app.sidebar,

  token: state => state.login.token,
  avatar: state => state.login.avatar,
  roles: state => state.login.roles,

  adminList: state => state.admin.adminList,
  permission: state => state.admin.permission,
  adminType: state => state.admin.adminType,

  userList: state => state.user.userList,
  userBalanceList: state => state.user.userBalanceList,
  userLogList: state => state.user.userLogList,

  blockTxList: state => state.block.blockTxList,

  projectList: state => state.project.projectList,
  projectOrderList: state => state.project.projectOrderList,

  tokenList: state => state.token.tokenList,
  tokenPairList: state => state.token.tokenPairList,

  txList: state => state.transaction.txList,
  overList: state => state.transaction.overList
}
export default getters
