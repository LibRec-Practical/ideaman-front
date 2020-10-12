<template>
  <div style="margin: 0 200px;">
    <h1>Register in seconds.</h1>
    <Form
      ref="registrationForm"
      style="margin-top: 60px"
      :model="registrationForm"
      label-position="right"
      :label-width="200"
    >
      <FormItem label="用户名">
        <Input v-model="registrationForm.username" placeholder="在 Ideaman 整个平台中的唯一名字，1到9位数字字母下划线" />
      </FormItem>
      <FormItem label="姓名" class="register-element">
        <Input v-model="registrationForm.name" placeholder="您在出版物中使用的名字；如果经常发表英文文献，可使用英文名" />
      </FormItem>
      <FormItem label="密码" class="register-element">
        <Input type="password" v-model="registrationForm.password" placeholder="密码，6到20位数字字母下划线" />
      </FormItem>
      <FormItem label="确认密码" class="register-element">
        <Input type="password" v-model="registrationForm.passwordConfirmed" placeholder="再次输入密码" />
      </FormItem>
      <FormItem label="Email" class="register-element">
        <Input
          type="email"
          v-model="registrationForm.email"
          placeholder="请使用 .edu 等教育机构或 .com / .org 等研究机构"
        />
      </FormItem>
      <!-- <FormItem label="手机号码" class="register-element">
        <Input v-model="registrationForm.phoneNumber" placeholder="您的手机号码">
          <Select v-model="registrationForm.phoneAreaCode" slot="prepend" style="min-width: 150px">
            <Option v-for="p in phoneAreaCodes" :key="p.code" :value="p.code">{{ p.name }}</Option>
          </Select>
        </Input>
      </FormItem>
      <FormItem label="短信验证码" class="register-element">
        <Input v-model="registrationForm.phoneNumberValidationCode" placeholder="6 位短信验证码">
          <Button slot="append">获取验证码</Button>
        </Input>
      </FormItem>-->
      <FormItem label class="register-element">
        <Button type="primary" @click="registerSubmit" class="register-element">确认注册</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { register as RegisterApi } from '../api/sign'

export default {
  name: 'Register',
  data () {
    return {
      registrationForm: {
        username: '',
        name: '',
        password: '',
        passwordConfirmed: '',
        email: '',
        phoneNumber: '',
        phoneNumberValidationCode: '',
        phoneAreaCode: '+86'
      },
      phoneAreaCodes: [
        {
          name: 'China (+86)',
          code: '+86'
        },
        {
          name: 'United States (+1)',
          code: '+1'
        }
      ]
    }
  },
  methods: {
    checkUsername () {
      const userReg = /^[a-zA-Z0-9_-]{1,9}$/
      if (!userReg.test(this.registrationForm.username)) {
        throw new Error('用户名不符合要求！')
      }
    },
    checkName () {
      if (this.registrationForm.name.trim() === '') {
        throw new Error('请输入姓名！')
      }
    },
    checkPassword () {
      const userReg = /^[a-zA-Z0-9_-]{6,20}$/
      if (!userReg.test(this.registrationForm.password)) {
        throw new Error('密码不符合要求！')
      }
    },
    checkEmail () {
      const userReg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
      if (!userReg.test(this.registrationForm.email)) {
        throw new Error('请输入正确的邮箱！')
      }
    },
    checkPasswordComfirm () {
      if (!(this.registrationForm.password === this.registrationForm.passwordConfirmed)) {
        throw new Error('两次密码输入不同，请检查！')
      }
    },
    async registerSubmit () {
      try {
        // 检查表单
        this.checkUsername()
        this.checkName()
        this.checkPassword()
        this.checkEmail()
        this.checkPasswordComfirm()
        // 注册
        const res = await RegisterApi(this.registrationForm)
        if (res.code === 2) {
          this.$Message.error('注册失败（该用户名已经被注册！）')
        } else if (res.code === 3) {
          this.$Message.error('注册失败（服务器出错，请联系管理员排查问题）')
          this.$Message.error(res.message)
        } else if (res.code === 0) {
          this.$Message.success('注册成功（请在新打开的页面登录）')
          this.$router.push({ path: '/login' })
        }
      } catch (error) {
        this.$Message.error('注册失败：' + error)
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
.register-element {
  margin-top: 18px;
}
</style>
