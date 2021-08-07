import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'http://localhost:5000/api/auth/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: 'http://localhost:5000/api/auth/user',
    method: 'get',
    data: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
