import request from '@/utils/request'
export function getBanner(data) {
  return request({
    url: '/banner',
    method: 'get'
  })
}
export function postBanner(data) {
  return request({
    url: '/banner',
    method: 'post',
    data
  })
}
export function deleteBanner(data) {
  return request({
    url: '/banner/' + data,
    method: 'delete'
  })
}
