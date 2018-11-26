import request from '@/utils/request'
export function blockCount(data) {
  return request({
    url: '/block/account/count' + data,
    method: 'get'
  })
}
export function blockBalance(data) {
  return request({
    url: '/block/balance/' + data,
    method: 'get'
  })
}
export function blockFee(data) {
  return request({
    url: '/block/fee',
    method: 'get'
  })
}
export function putBlockFee(data) {
  return request({
    url: '/block/fee',
    method: 'put',
    data
  })
}
export function blockHold(data) {
  return request({
    url: '/block/hold',
    method: 'get'
  })
}
export function putBlockHold(data) {
  return request({
    url: '/block/hold',
    method: 'put',
    data
  })
}
export function blockStatus(data) {
  return request({
    url: '/block/status' + data,
    method: 'put',

  })
}
export function blockTx(data) {
  return request({
    url: '/block/transactions' + data,
    method: 'get',
  })
}
