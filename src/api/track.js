import {
  axios
} from '../utils/request'

export function collectLoginRegister (parameter) {
  return axios({
    url: '/collect/data/login/register',
    method: 'get',
    data: parameter
  })
}
