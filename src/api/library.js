import {
  axios
} from '../utils/request'

export function getLibrary (parameter) {
  return axios({
    url: '/library',
    method: 'get',
    data: parameter
  })
}

export function addLibrary (parameter) {
  return axios({
    url: '/library',
    method: 'post',
    data: parameter
  })
}

export function deleteLibrary (parameter) {
  return axios({
    url: '/libraryPaper',
    method: 'delete',
    data: parameter
  })
}

export function updateLibrary (parameter) {
  return axios({
    url: '/library',
    method: 'put',
    data: parameter
  })
}

export function isCollected (parameter) {
  return axios({
    url: '/library/iscollect',
    method: 'post',
    data: parameter
  })
}
