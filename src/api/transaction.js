import request from '@/utils/request'
export function txList(data) {
  return request({
    url: '/transaction' + data,
    method: 'get'
  })
}
export function txOver(data) {
  return request({
    url: '/transaction/over' + data,
    method: 'get'
  })
}
