import overallConfig from '../config'

function sendEventData (data) {
  const xhr = new XMLHttpRequest()
  xhr.open('post', `${overallConfig.dcp_url.dev}collect/event`, true)

  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  // post 需要传递参数
  xhr.send(`data=${JSON.stringify(data)}`)
}

export {
  sendEventData
}
