import overallConfig from '../config'

function sendEventData (data) {
  const xhr = new XMLHttpRequest()
  xhr.open('post', `${overallConfig.dcp_url.dev}collect/event`, true)

  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  const postData = handleData(data)
  // post 需要传递参数
  xhr.send(`data=${JSON.stringify(postData)}`)
}

function handleData (data) {
  const postData = {}
  postData.timestamp = new Date().getTime()
  postData.distinct_id = uuid()
  postData.event_type = data.event_type
  postData.event = data.event
  postData.project = data?.project ? data.project : 'ideaman'
  postData.properties = data
  postData.system = getSystemData()
  postData.extra_para = getExpendParams(data)
  // Object.defineProperty(postData, 'timestamp', { value: new Date().getTime() })
  // Object.defineProperty(postData, 'distinct_id', { value: uuid() })
  // Object.defineProperty(postData, 'event_type', { value: data?.event_type })
  // Object.defineProperty(postData, 'event', { value: data?.event })
  // Object.defineProperty(postData, 'project', { value: data?.project ? data.project : 'ideaman' })
  // Object.defineProperty(postData, 'properties', { value: data })
  // Object.defineProperty(postData, 'system', { value: getSystemData() })
  // Object.defineProperty(postData, 'extra_para', { value: getExpendParams(data) })
  return postData
}

function getSystemData () {
  const systemData = {}
  systemData.$ip = ''
  systemData.$app_version = '0.1.0'
  systemData.$wifi = ''
  systemData.$province = ''
  systemData.$city = ''
  systemData.$user_agent = ''
  systemData.$screen_width = ''
  systemData.$screen_height = ''

  // Object.defineProperty(systemData, '$ip', { value: '' })
  // Object.defineProperty(systemData, '$app_version', { value: '0.1.0' })
  // Object.defineProperty(systemData, '$wifi', { value: '1' })
  // Object.defineProperty(systemData, '$province', { value: '' })
  // Object.defineProperty(systemData, '$city', { value: '' })
  // Object.defineProperty(systemData, '$user_agent', { value: '' })
  // Object.defineProperty(systemData, '$screen_width', { value: '' })
  // Object.defineProperty(systemData, '$screen_height', { value: '' })
  return systemData
}

function getExpendParams (data) {
  return data?.extra_para ? data.extra_para : {}
}

function uuid () {
  const s = []
  const hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'

  const uuid = s.join('')
  return uuid
}

function getParams () {
  return {
    // distinct_id: "2b0a6f51a3cd6775", // 这次事件的唯一标识符，用于确定此次事件
    // timeStamp: 1434556935000, // 上报时间戳
    // event_type: "Online", // 用来表示事件的类型，这里是追踪，应该填入追踪事件定义的事件id，但由于目前还未确定是否固定事件类型，因此暂时全部使用字符串代替
    // event: "$Register", // 事件
    // project: "project1",
    // properties: { // 对应事件需要传递的字段
    //   page_name: "登录页", // 主要根据浏览器 window.document.title, 后续做具体规定
    //   url: "www.demo.com",
    //   referer: "www.referer.com", // 从哪里跳转过来的
    // },
    // system: {
    //   $ip: "192.168.0.1",
    //   $app_version: "1.3", // 建议在window对象下注册全局变量 app_version，方便日后调试
    //   $wifi: 1,
    //   $province: "辽宁",
    //   $city: "沈阳",
    //   $user_agent: "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/58.0.3029.113 Mobile/14F89 Safari/602.1",
    //   $screen_width: 320, // 从window对象获取
    //   $screen_height: 640 // 从window对象获取
    // },
    // extra_para: {
    //   // (扩展参数结构体)：如果各业务有新的需求，需要透传新的参数，来实现新的需求，都会加到这个扩展参数字段中；如果推荐端有部分字段需要加入到数据分析的地方，当前端请求推荐接口时，推荐接口会给出完整的extra_para结构体数据，前端只要原样上报
    // }

  }
}

export {
  sendEventData,
  getParams
}
