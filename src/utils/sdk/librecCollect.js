import fetch from './fetch.js' // 发送请求
import app from './app.js' // app 级，可用于获取当前应用的信息(根据 appId, appSecret)
import system from './system.js' // 设备，平台等各方面信息获取

import {
  objectAssign,
  setObjKeyValue,
  isArray,
  isFunction,
  isObject
} from './util.js'

const UNDEF = undefined;
const BLANK_STR = '';
const ZERO_NUMBER = 0;

// 加在defaultPostData.events[i].params⾥
const defaultEventParams = {};
const eventCommonParams = {};

// 内⽹地址
let XHR_SERVER_URL = '0.0.0.0:9810/v1/json';
// 测试服务器地址
let XHR_SERVER_URL_DEV = 'http://49.8.76.217:9810/v1/json';

let isDisableHttps = false;
let sendtimer = null;

let onSuccess = () => { };
let onError = () => { };

//⼀些必备的key。若未赋值时，则event会排队。直到这些key⻬全后，才真正发送请求。
let isApplogPluginReady = false; // 控制打点时机，在必要信息未准备好的情况下，不轻易打点

let isDebugMod = false; // 测试环境
let eventQueue = [] // 待发送队列

const defaultPostData = {
  distinct_id: BLANK_STR, // 这次事件的唯一标识符，用于确定此次事件
  timeStamp: ZERO_NUMBER, // 上报时间戳
  event_type: BLANK_STR, // 用来表示事件的类型，这里是追踪，应该填入追踪事件定义的事件id，但由于目前还未确定是否固定事件类型，因此暂时全部使用字符串代替
  event: BLANK_STR, // 事件
  project: BLANK_STR,
  properties: {
    // 对应事件需要传递的字段
  },
  system: {
    $ip: BLANK_STR,
    $app_version: BLANK_STR, // 建议在window对象下注册全局变量 app_version，方便日后调试
    $wifi: ZERO_NUMBER,
    $province: BLANK_STR,
    $city: BLANK_STR,
    $user_agent: BLANK_STR,
    $screen_width: ZERO_NUMBER, // 从window对象获取
    $screen_height: ZERO_NUMBER // 从window对象获取
  },
  extra_para: {
    // (扩展参数结构体)：如果各业务有新的需求，需要透传新的参数，来实现新的需求，都会加到这个扩展参数字段中；如果推荐端有部分字段需要加入到数据分析的地方，当前端请求推荐接口时，推荐接口会给出完整的extra_para结构体数据，前端只要原样上报
  }
}

/**
 * 设置埋点上报服务器
 * @param {string} server_url
 */
function setServerURL(server_url) {
  // 回头加上正则判断，有意义且符合规则的url
  if (server_url) {
    XHR_SERVER_URL = server_url
  } else {
    console.log('XHR_SERVER_URL 不能设置为空')
  }
}

/**
 * 设置测试埋点上报服务器
 * @param {string} dev_server_url
 */
function setDevServerURL(dev_server_url) {
  // 回头加上正则判断，有意义且符合规则的url
  if (dev_server_url) {
    XHR_SERVER_URL_DEV = dev_server_url
  } else {
    console.log('XHR_SERVER_URL_DEV 不能设置为空')
  }
}

/**
 * 设置埋点header
 * @param {object} key
 * @param {boolean} value
 */
function setDefaultHeaderPostData(key, value) {
  // ⼏乎都是 str，唯⼀⼀个 user_type 明确约定是 Number
  if (defaultPostData.header.hasOwnProperty(key)) {
    defaultPostData.header[key] = value;
  } else if (defaultPostData.header.headers.hasOwnProperty(key)) {
    defaultPostData.header.headers[key] = value;
  } else {
    defaultPostData.header.headers.custom[key] = value;
  }
}


/**
 * 初始化
 * 若设置
 * @param {string} app_id
 * @param {string} app_secret
 * @param {boolean} isDebug
 */
function init({ app_id = '', app_secret = '', isDebug = false }) {
  // app_id 和 app_secret 为空抛错
  if (!app_id || !app_secret) {
    throw new Error('app_id or app_secret can not be null');
  }

  // 设置 debug 模式
  setDebug(isDebug)

  // 获取 app 相关信息
  const appInfo = app.getInfo();

  // 解析 appInfo
  const {
    name, // app 应用名称
    app_version = '', // app 应用版本号
  } = appInfo;

  // 设置
  setDefaultHeaderPostData('app_id', app_id);
  setDefaultHeaderPostData('app_secret', app_secret);
  setDefaultHeaderPostData('app_version', app_version);

  // 获取设备信息
  system.getInfo({
    success: function (res) {
      const {
        brand,
        manufacturer,
        model,
        product,
        osVersionName,
        osVersionCode,
        platformVersionName,
        platformVersionCode,
        language,
        screenWidth,
        screenHeight,
      } = res || {};
      setDefaultHeaderPostData('brand', brand); // ⼿机品牌
      setDefaultHeaderPostData('manufacturer', manufacturer); // 设备⽣产商
      setDefaultHeaderPostData('curstom_device_brand', brand); // ⾃定义⼿机品牌, 放custom字段内
      setDefaultHeaderPostData('device_model', model); // ⼿机型号
      setDefaultHeaderPostData('product', product); // 设备代号
      setDefaultHeaderPostData('os_version', osVersionName); // 操作系统版本名称
      setDefaultHeaderPostData('os_version_code', osVersionCode); // 操作系统版本号
      setDefaultHeaderPostData('platform_version_name', platformVersionName); //运⾏平台版本名称
      setDefaultHeaderPostData('platform_version_code', platformVersionCode); // 运⾏平台版本号
      setDefaultHeaderPostData('language', language); // 系统语⾔
      setDefaultHeaderPostData('region', language); // 系统地区
      setDefaultHeaderPostData('resolution', screenWidth + "x" + screenHeight); // 屏幕分辨率
      setDefaultHeaderPostData('screen_width', screenWidth); // 屏幕⾼度
      setDefaultHeaderPostData('screen_height', screenHeight); // 屏幕⾼度
      isApplogPluginReady = true
    }
  });
}


/**
 * 开启或关闭测试模式。
 * @param mode
 */
function setDebug(mode = false) {
  isDebugMod = mode;
  defaultPostData.verbose = mode ? 1 : 0;
}

/**
 * 是否禁⽤https，改为http协议。
 * @param {boolean} disabled
 */
function disableHttps(disabled) {
  isDisableHttps = disabled !== false;
}

/**
 * 设置event的user字段。
 * @param { object } value
 * @param { boolean } isMerge
 */
function setDeviceId(id = '') {
  defaultPostData.header.device_id = Number(id);
}








/**
 * 真正发送数据给后端的函数。
 * @param user
 * @param header
 * @param events
 * @private
 */
function _collect_events(user, header, events) {
  if (!isArray(events)) {
    events = [events];
  }
  //序列化⼀些字段
  for (let i = 0; i < events.length; i++) {
    events[i].params = JSON.stringify(events[i].params);
    events[i].time = Math.floor((new Date()).getTime() / 1000);
    events[i].local_time_ms = +new Date();
  }
  const newHeader = { ...header };
  newHeader.headers = JSON.stringify(header.headers);
  const logEvent = {
    user,
    header: newHeader,
    events,
  };
  sendToServer(logEvent);
}

/**
 * 获取打点服务器的 url 地址。
 * @return { string } xhrURL
 */
function getServerUrl() {
  let url = XHR_SERVER_URL;
  // 判断是否为测试模式
  if (isDebugMod) {
    url = XHR_SERVER_URL_DEV;
  } else {
    if (isDisableHttps) {
      url = url.replace(/^https:\/\//, 'http://');
    }
  }
  return url;
}

/**
 * 获取打点服务器的 url 地址。
 * @return { string } xhrURL
 */
function sendToServer(dataObj) {
  const url = getServerUrl()
  // fetch.js 中进行请求发送并兼容多端
  fetch.request({
    url,
    method: 'post',
    header: {
      'Content-Type': 'application/json'
    },
    responseType: 'json',
    data: JSON.stringify(dataObj),
    success(res) {
      console.warn('-------埋点参数-------', dataObj);
      const { data = {} } = res || {};
      const { e } = data || {};
      if (Number(e) !== 0) {
        onError(e);
        return;
      }
      onSuccess();
    },
    fail(e) {
      console.error('fail send tea', e);
      onError(e);
    }
  })
}


/**
 * 轮训判断，直到必备字段均⻬全才发送。
 * 且⼀旦发送之后，该函数应该不会再被执⾏。
 * ！假定⼀旦必备字段⻬全，则不会再缺失。
 *
 */
function execQueue() {
  let queueTimer = null;
  let doExeQueue = function () {
    queueTimer && clearTimeout(queueTimer);
    if (eventQueue.length > 0) {
      // 处理每一个埋点事件的 params
      for (let i = 0; i < eventQueue.length; i++) {
        // 添加必备的公共 param 的keyValue
        objectAssign(eventQueue[i].params, eventCommonParams);
      }
      //
      _collect_events(defaultPostData.user, defaultPostData.header, eventQueue);
      eventQueue = [];
    }
  };
  doExeQueue();
}


/**
 * 发送事件（打点）。
 * @param { Array | String } event 事件名或⼆维数组[[event,params]]
 * @param { Object } [params] 事件的params
 */
function collect(event, params = {}, success = () => { }, error = () => { }) {
  //整理成⼆维数组格式
  if (!isArray(event)) {
    if (!isObject(params)) {
      throw ('params的类型不正确！');
    }
    event = [
      [event, params],
    ];
  }

  // 埋点成功回调
  if (isFunction(success)) {
    onSuccess = success;
  }
  // 埋点出错回调
  if (isFunction(error)) {
    onError = error;
  }

  // 将事件数组拼成事件对象。
  const eventData = [];
  for (let i = 0; i < event.length; i++) {
    // params可能为空。
    let newParams = event[i][1] || {};
    objectAssign(newParams, defaultEventParams, eventCommonParams);
    eventData.push({
      event: event[i][0],
      params: newParams,
    });
  }

  // 推送到待发送队列、或直接发送。
  for (let i = 0; i < eventData.length; i++) {
    eventQueue.push(eventData[i]);
  }

  if (isApplogPluginReady) {
    sendtimer = setTimeout(function () {
      execQueue();
    }, 0);
  }

}




