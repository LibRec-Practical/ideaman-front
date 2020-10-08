<template>
  <div class="about">
    <h1 style="text-align:center;margin:0 0 0 10px;" @click="collectEvent">IdeaMan介绍页</h1>
    <section class="librec-offical-website-wrapper">
      <iframe
        class="librec-offical-website-iframe"
        frameborder="0"
        src="https://guoguibing.github.io/librec/index.html"
      ></iframe>
    </section>
  </div>
</template>

<script>
import { sendEventData as sendEventDataApi } from '../utils/dcpRequest'
export default {
  data () {
    return {
      data: {
        distinct_id: '2b0a6f51a3cd6775',
        timeStamp: 1434556935000,
        event_type: '$Track',
        event: '$PageView',
        project: 'project1',
        properties: {
          page_name: '网站首页',
          url: 'www.demo.com',
          referer: 'www.referer.com',
          page_id: '/home',
          page_path: '/home',
          product_id: 12345, // 当前该物料的唯一标识符
          product_name: '物料1', // 当前该物料的唯一标识符
          product_classify: '物料类型1', // 当前该物料的所属类型
          product_price: 14.0, // 当前该物料的唯一标识符
          residence_time: 193000 // 停留时间, 单位毫秒
        },
        system: {
          $ip: '192.168.0.1',
          $app_version: '1.3', // 建议在window对象下注册全局变量 app_version，方便日后调试
          $wifi: 1,
          $province: '辽宁',
          $city: '沈阳',
          $user_agent:
            'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/58.0.3029.113 Mobile/14F89 Safari/602.1',
          $screen_width: 320, // 从window对象获取
          $screen_height: 640 // 从window对象获取
        },
        extra_para: {
          // (扩展参数结构体)：如果各业务有新的需求，需要透传新的参数，来实现新的需求，都会加到这个扩展参数字段中；如果推荐端有部分字段需要加入到数据分析的地方，当前端请求推荐接口时，推荐接口会给出完整的extra_para结构体数据，前端只要原样上报
        }
      }
    }
  },
  methods: {
    async collectEvent () {
      await sendEventDataApi(this.data)
      console.log('收集事件成功')
    }
  }
}
</script>
<style scoped>
.librec-offical-website-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.librec-offical-website-iframe {
  width: 80vw;
  height: 70vh;
}
</style>
