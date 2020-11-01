import {
  axios
} from '../utils/request'

export function firstPaint (parameter) {
  return axios({
    url: '/firstPaint?userId=' + parameter.userId,
    method: 'get',
    data: parameter
  })
}
