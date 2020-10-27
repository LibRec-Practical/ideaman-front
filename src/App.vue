<template>
  <div class="layout">
    <Layout>
      <Header class="header-home">
        <Row>
          <!-- 三大主页面 -->
          <i-col span="18">
            <Menu mode="horizontal" theme="dark" @on-select="selectMenu">
              <div class="nav-left" @click="onLogoTapped">IdeaMan</div>
              <MenuItem name="/"> <Icon type="ios-paper" />信息流 </MenuItem>
              <MenuItem name="/mylibrary">
                <Icon type="ios-paper" />我保存的文献
              </MenuItem>
              <MenuItem name="/about">
                <Icon type="ios-paper" />关于本站
              </MenuItem>
            </Menu>
          </i-col>
          <!-- 登陆情况 及 个人中心 -->
          <i-col span="6">
            <Menu
              mode="horizontal"
              theme="dark"
              style="position: absolute; right: 0"
              @on-select="selectMenu"
            >
              <MenuItem name="/login" v-if="!isAuthorized">
                <Icon type="md-log-in" />登录
              </MenuItem>
              <MenuItem name="/register" v-if="!isAuthorized">
                <Icon type="md-contact" />注册
              </MenuItem>
              <Submenu name="3" v-if="isAuthorized">
                <template slot="title">
                  <Icon type="md-person" />
                  {{ currentName }}
                </template>
                <MenuItem name="/myprofile">
                  <Icon type="md-create" />个人中心
                </MenuItem>
                <MenuItem name="/settings">
                  <Icon type="md-settings" />账户设置
                </MenuItem>
                <Divider />
                <MenuItem name="/logout">
                  <Icon type="md-log-out" />退出
                </MenuItem>
              </Submenu>
            </Menu>
          </i-col>
        </Row>
      </Header>

      <Content style="padding: 20px 50px">
        <router-view></router-view>
      </Content>

      <Footer
        style="display: flex; justify-content: center; align-items: center"
      >
        {{ footer.front }}
        <a :href="footer.href" target="_blank">
          <i>{{ footer.librec_version }}</i>
        </a>
        <span>：{{ footer.desc }}</span>
      </Footer>
    </Layout>
  </div>
</template>

<script>
import config from './config'

export default {
  name: 'app',
  beforeCreate () {
    const userinfo = JSON.parse(window.localStorage.getItem('ideaman_info'))
    const ideamanToken = window.localStorage.getItem('ideaman_token')

    this.$store.commit('authorize', {
      name: userinfo.name,
      username: userinfo.username,
      avatar: userinfo.avatar,
      token: ideamanToken
    })
  },
  data () {
    return {
      footer: {
        front: config.footer.front,
        href: config.footer.href,
        librec_version: config.footer.librec_version,
        desc: config.footer.desc
      }
    }
  },
  computed: {
    isAuthorized () {
      return this.$store.getters.isAuthorized
    },
    currentName () {
      return this.$store.state.auth.name || '(Name Unknown)'
    }
  },
  methods: {
    onLogoTapped () {
      const homeRouteName = 'Home'
      const { name } = this.$route
      if (name === homeRouteName) {

      } else {
        this.$router.push({ name: 'Home' })
      }
    },
    selectMenu (name) {
      if (name === '/logout') {
        this.logout()
      } else {
        this.$router.push({ path: name })
      }
    },

    logout () {
      this.$store.commit('removeAuthorization', {})
      window.localStorage.removeItem('ideaman_info')
      window.localStorage.removeItem('ideaman_token')
      // window.localStorage.removeItem("auth_name");
      // window.localStorage.removeItem("auth_username");
      // window.localStorage.removeItem("auth_token");
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.layout{
  min-width:1200px;
}
.header-home {
  color: white;
  font-size: 22px;
}

.nav-left {
  float: left;
  position: relative;
  color: white;
  font-size: 24px;
  margin-right: 30px;
}
</style>
