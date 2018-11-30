import request from '@/utils/request'
export function userList(data) {
  return request({
    url: '/user' + data,
    method: 'get'
  })
}
export function userBalance(data) {
  return request({
    url: `/user/${data}/balance`,
    method: 'get'
  })
}
export function userLog(data) {
  return request({
    url: `/user/${data.id}/log${data.str}`,
    method: 'get'
  })
}
export function userStatus(data) {
  return request({
    url: `/user/${data.id}/status?status=${data.status}`,
    method: 'put'
  })
}
