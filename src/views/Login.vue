<template>
  <div style="padding-top: 10px">
    <Row>
      <i-col span="12">
        <h1>IdeaMan</h1>
        <h3>{{left_desc.cn}}</h3>
        <h3>{{left_desc.en}}</h3>
      </i-col>
      <i-col span="12">
        <div class="container">
          <div class="login-box">
            <div>
              <Input
                placeholder="用户名（不是姓名）"
                v-model="formLogin.usernameOrEmail"
                class="login-form-element"
              >
                <Icon type="ios-contact" slot="prefix" />
              </Input>
            </div>
            <div class="login-input">
              <Input placeholder="密码" class="login-form-element" v-model="formLogin.password">
                <Icon type="ios-key" slot="prefix" />
              </Input>
            </div>
            <div class="login-input">
              <Button type="info" class="login-form-element" @click="login">登录</Button>
            </div>
            <div class="login-input">
              <Row class="login-form-element">
                <i-col span="12">
                  <div>
                    <router-link to="/register">新用户</router-link>
                  </div>
                </i-col>
                <i-col span="12">
                  <div style="text-align: right">
                    <router-link to="/forgotpassword">忘记密码</router-link>
                  </div>
                </i-col>
              </Row>
            </div>
          </div>
        </div>
      </i-col>
    </Row>
  </div>
</template>

<script>
import { login as LoginApi } from '../api/sign'
import config from '../config'

export default {
  name: 'Login',
  data () {
    return {
      formLogin: {
        usernameOrEmail: '',
        password: ''
      },
      left_desc: {
        cn: config.login_left_desc.cn,
        en: config.login_left_desc.en
      }
    }
  },
  methods: {
    async login () {
      try {
        const res = await LoginApi({
          username: this.formLogin.usernameOrEmail,
          password: this.formLogin.password
        })
        if (res.code === 0) {
          // localStorage 存储
          window.localStorage.setItem(
            'ideaman_info',
            JSON.stringify(res.data[0])
          )

          const userinfo = JSON.parse(window.localStorage.getItem('ideaman_info'))
          const ideamanToken = window.localStorage.getItem('ideaman_token')

          this.$store.commit('authorize', {
            name: userinfo.name,
            username: userinfo.username,
            avatar: userinfo.avatar,
            token: ideamanToken
          })
          this.$Message.success('登录成功。')
          this.$router.push({ path: '/' })
        }
      } catch (e) {
        console.log(e)
        this.$Message.error('登录失败：' + e)
      }
    }
  }
}
</script>

<style scoped>
.container {
  float: left;
  position: relative;
  left: 45%;
}

.login-box {
  position: relative;
  left: -45%;
}

.login-input {
  margin-top: 18px;
}

.login-form-element {
  width: 200%;
}
</style>
