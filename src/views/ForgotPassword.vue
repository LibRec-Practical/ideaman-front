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
        <Button type="primary" shape="circle" id="verificationButton" class="getVerificationCode-button" @click="startTimeCount">{{verificationButtonInfo}}</Button>
      </FormItem>
      <FormItem label class="findPassword-element">
        <Button type="primary" class="findPassword-element" style= "width: 100px">提交</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
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
    startTimeCount: function () {
      const endTime = (new Date()).getTime() + 30000
      window.localStorage.setItem('myEndTime', JSON.stringify(endTime))
      this.timeCount(endTime)
    },
    timeCount: function (endTime) {
      this.verificationButtonInfo = '...'
      document.getElementById('verificationButton').disabled = true
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
    }
  },
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
