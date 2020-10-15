
class LibrecCollect {
  constructor (options) { // options为一个对象
    this.start = false
    this.state = {} // 该 state 可用来放置公用数据
    this.config = {} // 该 config 可用来放置公用配置数据

    options && this.init(...options) // 传入的options就是相当于在向init中传参，但也可以后面再传
  }

  init (options) {
    this.config = options // options 应包含appId,sourceUrl，该 appId 应搭配平台创建
  }

  // 控制可以开始打点
  start () {
    this.start = true
  }

  // 控制关闭打点
  end () {
    this.start = false
  }

  // 设置deviceInfo(device_id),deviceInfo应该是一个对象
  setDeviceId (deviceInfo) {
    this.state.deviceInfo = deviceInfo
  }

  // 设置公共参数
  setEventCommonParams (commonParams) {
    this.state.commonParams = commonParams
  }

  // 设置用户信息, userInfo应该是一个对象
  setUser (userInfo) {
    this.state.userInfo = userInfo
  }

  // 发送埋点信息
  dispatch (eventName, collectData) {
    this.sendEventData({ eventName, collectData })
  }

  sendEventData (data) {
    const xhr = new XMLHttpRequest()
    xhr.open('post', `${this.config.sourceUrl}`, true)

    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    // post 需要传递参数
    xhr.send(`data=${JSON.stringify(data)}`)
  }
}

export default LibrecCollect
