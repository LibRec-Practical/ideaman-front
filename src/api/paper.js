import {
  axios
} from '../utils/request'

export function getPaperInfo ({ id }) {
  return axios({
    url: '/paperinfo?id=' + id,
    method: 'get'
  })
}

export function getRelatedPaper ({ paperId }) {
  return axios({
    url: '/relatedPaper?paper_id=' + paperId,
    method: 'get'
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
