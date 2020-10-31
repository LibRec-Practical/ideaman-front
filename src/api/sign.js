import {
  axios
} from '../utils/request'

export function login (parameter) {
  return axios({
    url: '/login',
    method: 'post',
    data: parameter
  })
}

export function register (parameter) {
  return axios({
    url: '/register',
    method: 'post',
    data: parameter
  })
}

export function sendVerificationCode (parameter) {
  return axios({
    url: '/sendVerificationCode',
    method: 'post',
    data: parameter
  })
}

export function forgetPassword (parameter) {
  return axios({
    url: '/forgetPassword',
    method: 'post',
    data: parameter
  })
}
