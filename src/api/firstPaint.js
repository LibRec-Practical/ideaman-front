import {
  axios
} from '../utils/request'

export function firstPaint (parameter) {
  return axios({
    url: '/firstPaint',
    method: 'get',
    data: parameter
  })
}
