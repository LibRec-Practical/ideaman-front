import {
  axios
} from '../utils/request'

export function connection (parameter) {
  return axios({
    url: '/connection',
    method: 'get',
    data: parameter
  })
}
