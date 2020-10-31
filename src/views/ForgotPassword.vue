<template>
  <div style="margin: 0 200px;">
    <h1>Find password.</h1>
    <Form
      ref="findPasswordForm"
      style="margin-top: 60px"
      :model="findPasswordForm"
      label-position="right"
      :label-width="200"
    >
      <FormItem label="用户名" class="findPassword-element">
        <Input v-model="findPasswordForm.username" placeholder="在 Ideaman 整个平台中的唯一名字，1到9位数字字母下划线" />
      </FormItem>
      <FormItem label="新密码" class="findPassword-element">
        <Input type="password" v-model="findPasswordForm.password" placeholder="密码，6到20位数字字母下划线" />
      </FormItem>
      <FormItem label="确认密码" class="findPassword-element">
        <Input type="password" v-model="findPasswordForm.passwordConfirmed" placeholder="再次输入密码" />
      </FormItem>
      <FormItem label="验证码" class="findPassword-element">
        <Input type="password" v-model="findPasswordForm.verificationCode" placeholder="输入验证码" style= "width: 50%"/>
        <Button type="primary" shape="circle" id="verificationButton" class="getVerificationCode-button" @click="sendVerificationSubmit">{{verificationButtonInfo}}</Button>
      </FormItem>
      <FormItem label class="findPassword-element">
        <Button type="primary" class="findPassword-element" style= "width: 100px" @click="sendFindtPassword">提交</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { sendVerificationCode as SendVerificationApi, forgetPassword as ForgetPasswordApi } from '../api/sign'

export default {
  data () {
    return {
      findPasswordForm: {
        username: '',
        password: '',
        passwordConfirmed: '',
        verificationCode: ''
      },
      verificationButtonInfo: '获取验证码'
    }
  },

  methods: {
    async sendVerificationSubmit () {
      document.getElementById('verificationButton').disabled = true // 防止连续点击
      // 向后端发起发送验证码请求
      try {
        const res = await SendVerificationApi({ username: this.findPasswordForm.username })
        if (res.code === 2) {
          this.$Message.error('用户不存在！')
          document.getElementById('verificationButton').disabled = false
        } else if (res.code === 3) {
          this.$Message.error('服务器出错，请联系管理员排查问题')
          document.getElementById('verificationButton').disabled = false
        } else if (res.code === 0) {
          this.$Message.success('发送成功（请输入您邮箱收到的验证码后提交）')
          const endTime = (new Date()).getTime() + 30000
          window.localStorage.setItem('myEndTime', JSON.stringify(endTime)) // 30s内不能发送验证码，将30s后时间存储，防止用户刷新
          this.timeCount(endTime) // 调用计时器
        }
      } catch (error) {
        this.$Message.error('发送失败：' + error)
        document.getElementById('verificationButton').disabled = false
      }
    },
    // 计时器，用来显示多少秒后可以再次发送验证码
    timeCount: function (endTime) {
      document.getElementById('verificationButton').disabled = true
      this.verificationButtonInfo = '...'
      let leftTime = Math.ceil((endTime - (new Date()).getTime()) / 1000)
      const interval = setInterval(() => {
        if (leftTime > 0) {
          this.verificationButtonInfo = leftTime
          leftTime--
        } else {
          clearInterval(interval)
          window.localStorage.removeItem('myEndTime')
          this.verificationButtonInfo = '获取验证码'
          document.getElementById('verificationButton').disabled = false
        }
      }, 1000)
    },

    checkPassword () {
      const userReg = /^[a-zA-Z0-9_-]{6,20}$/
      if (!userReg.test(this.findPasswordForm.password)) {
        throw new Error('密码不符合要求！')
      }
    },
    checkPasswordComfirm () {
      if (!(this.findPasswordForm.password === this.findPasswordForm.passwordConfirmed)) {
        throw new Error('两次密码输入不同，请检查！')
      }
    },
    async sendFindtPassword () {
      try {
        this.checkPassword()
        this.checkPasswordComfirm()
        const res = await ForgetPasswordApi(this.findPasswordForm)
        if (res.code === 1) {
          this.$Message.error('验证码错误！')
        } else if (res.code === 2) {
          this.$Message.error('用户不存在！')
        } else if (res.code === 3) {
          this.$Message.error('修改失败（服务器出错，请联系管理员排查问题）')
          this.$Message.error(res.message)
        } else if (res.code === 0) {
          this.$Message.success('修改成功（请在新打开的页面登录）')
          this.$router.push({ path: '/login' })
        }
      } catch (error) {
        this.$Message.error('注册失败：' + error)
      }
    }
  },
  // 挂载后在本地查询禁止发送验证码的过期时间并传入计时器
  mounted: function () {
    const myEndTime = window.localStorage.getItem('myEndTime')
    myEndTime && this.timeCount(JSON.parse(myEndTime))
  }
}
</script>

<style scoped>
.findPassword-element {
  margin-top: 18px;
  width: 80%;
}
.getVerificationCode-button {
  margin-left: 18px;
  width: 100px
}
</style>
