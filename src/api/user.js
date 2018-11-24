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
    url: `/user/${data}/log`,
    method: 'get'
  })
}
