import {
  axios
} from '../utils/request'

export function getPaperInfo (parameter) {
  return axios({
    url: '/paperinfo',
    method: 'get',
    data: parameter
  })
}

export function deletePaper (parameter) {
  return axios({
    url: '/paper/delete',
    method: 'del',
    data: parameter
  })
}

export function addPaper (parameter) {
  return axios({
    url: '/paper',
    method: 'post',
    data: parameter
  })
}

export function updatePaper (parameter) {
  return axios({
    url: '/paper',
    method: 'put',
    data: parameter
  })
}
