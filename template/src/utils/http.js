/**
 * Created by liekkas on 2017/6/11.
 */
import axios from 'axios'
import {REST_API} from '../config'
import {Message} from 'iview'
import store from '../store';

axios.defaults.timeout = 10000
axios.defaults.baseURL = REST_API
axios.defaults.showSpin = true  //请求加载loading效果
axios.defaults.showMsg = false  //请求后是否弹出消息

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  config.headers['Authorization'] = 'Bearer '+store.getters.token
  if(config.showSpin) {
    document.querySelector('#global-spin').style.display = 'block'
  }
  return config;
}, function (error) {
  console.log('>>> 发送失败。', error)
  document.querySelector('#global-spin').style.display = 'none'
  return Promise.reject(error);
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  document.querySelector('#global-spin').style.display = 'none'
  return check(response)
}, function (error) {
  check(error.response)
  console.log('>>> 返回失败。', error.response)
  document.querySelector('#global-spin').style.display = 'none'
  return Promise.reject(error);
})

/**
 * 错误分两种：
 * 1、请求失败，根据错误码显示对应的错误信息
 * 2、请求成功，但结果可能出错，此时根据后台的错误码进行显示。（这种情况需要后台提供支持）
 */
function check (response) {
  if (!response) {
    Message.error('服务超时！')
    return
  }

  if (response.status >= 200 && response.status < 300) {
    if(response.data && response.data.hasOwnProperty('hyz_code')) { //简单判断结果是否来自约定的后台服务
      const {hyz_code, hyz_message, hyz_result} = response.data
      if (hyz_code === 20000) {
        if(response.config.showMsg) {
          Message.success(hyz_message)
        }
        return hyz_result
      } else if (hyz_code === 50200) {
        Message.error(hyz_message)
        return hyz_result
      } else {
        if(response.config.showMsg) {
          Message.error(hyz_message)
        }
        throw new Error(hyz_message)
      }
    } else {
      return response.data
    }
  }

  let msg
  if (response.status === 404) {
    msg = '404, 要访问的地址找不到了, 操作失败'
  } else if (response.status === 403) {
    msg = '403, 服务器拒绝本次访问, 操作失败'
  } else if (response.status === 400) {
    msg = '400, 本次请求无效, 操作失败'
  } else if (response.status === 401) { //没权限的话跳回登录界面
    msg = '未授权或授权过期，请重新登录！'
    console.log('木有权限啊');
    if(response.config.showMsg) {
     Message.error(msg)
    }
    return
  } else if (response.status === 405) {
    msg = '405, 不允许的操作, 操作失败'
  } else if (response.status === 500) {
    msg = '500, 后台服务运行出错, 操作失败'
  } else {
    msg = '错误代码:' + response.status
  }
  if(response.config.showMsg) {
    Message.error(msg)
  }
}

export default axios