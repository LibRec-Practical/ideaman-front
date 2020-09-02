import {
  axios
} from '../utils/request'

export function firstPaint (parameter) {
  return axios({
    url: '/',
    method: 'get',
    data: parameter
  })
}
