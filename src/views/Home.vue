<template>
  <div>
    <Row :gutter="16">
      <i-col span="16">
        <!-- 展示区域 -->
        <div v-for="s in statuses" :key="s.id" style="margin-bottom: 20px;">
          <FollowedPeoplePaper
            v-if="s.status_type === 'followed_people_paper'"
            :id="s.id"
            :type="s.type"
            :authors="s.authors"
            :user="s.user"
            :title="s.title"
            :abstract="s.abstract"
            :tags="s.tags"
            :link="s.link"
            :keywords="s.keywords"
            :thumbnail-url="samplePaper"
          />
          <FollowedPeopleStatus
            v-if="s.status_type === 'followed_people_status'"
            :user-avatar-url="sampleAvatar"
            :user-url="s.userURL"
            :username="s.username"
            :followed="s.followed"
            :text="s.text"
          />
          <RecommendedPaper
            v-if="s.status_type === 'recommended_paper'"
            :type="s.type"
            :authors="s.authors"
            :user="s.user"
            :title="s.title"
            :abstract="s.abstract"
            :recommended-field="s.recommendedField"
            :tags="s.tags"
            :url="s.url"
            :keywords="s.keywords"
            :thumbnail-url="samplePaper"
          />
          <RecommendedStatus
            v-if="s.status_type === 'recommended_status'"
            :user-avatar-url="sampleAvatar"
            :user-url="s.userURL"
            :username="s.username"
            :followed="s.followed"
            :text="s.text"
          />
        </div>
      </i-col>

      <i-col span="8">
        <!-- 登陆后，对话 -->
        <Card style="width: 100%;" v-if="isAuthorized">
          <p slot="title">
            <Icon type="md-link" />人脉圈
          </p>
          <CellGroup>
            <Cell v-for="c in connections" :key="c.id">
              <Badge :count="c.badge" slot="extra" />
              <!-- <img :src="c.userAvatarURL" style="width: 15px; height: 15px;" alt="Avatar" class="user-avatar" /> -->
              {{ c.name }}
            </Cell>
          </CellGroup>
        </Card>

        <!-- 未登录时，登录或注册 -->
        <div v-if="!isAuthorized" style="margin-top: 100px; text-align: center; width: 100%;">
          <p>
            登录以管理学术人脉圈，
            <br />或者寻找更多研究机会。
          </p>
          <p style="margin-top: 10px;">
            还没有注册？
            <router-link to="/register">马上注册</router-link>
          </p>
        </div>
      </i-col>
    </Row>
  </div>
</template>

<script>
// @ is an alias to /src
import paperSample from '@/assets/1806.07822v2.pdf.jpg'
import defaultUserIcon from '@/assets/defaultusericon.png'
import FollowedPeoplePaper from '@/components/status/FollowedPeoplePaper'
import FollowedPeopleStatus from '@/components/status/FollowedPeopleStatus'
import RecommendedPaper from '@/components/status/RecommendedPaper'
import RecommendedStatus from '@/components/status/RecommendedStatus'

import { connection as ConnectionApi } from '../api/connection'
import { firstPaint as FirstPaintApi } from '../api/firstPaint'

export default {
  name: 'Home',
  components: {
    RecommendedStatus,
    RecommendedPaper,
    FollowedPeopleStatus,
    FollowedPeoplePaper
  },
  data () {
    return {
      samplePaper: paperSample,
      sampleAvatar: defaultUserIcon,
      statuses: [],
      connections: []
    }
  },
  mounted () {
    this.getFirstPaintData()
    this.getConnections()
  },

  computed: {
    isAuthorized () {
      return this.$store.getters.isAuthorized
    }
  },

  methods: {
    async getFirstPaintData () {
      try {
        // 这里是首屏数据
        const firstPaintRes = await FirstPaintApi()
        if (firstPaintRes.code === 0) {
          this.statuses = firstPaintRes.data
        }
      } catch (err) {
        console.log(err)
      }
    },

    async getConnections () {
      try {
        // 这里是当前作者关注的人的请求
        const connectionRes = await ConnectionApi()
        if (connectionRes.code === 0) {
          this.connections = connectionRes.data
          // this.connections = [
          //   {
          //     id: 1,
          //     name: "什么鬼",
          //     badge: 0,
          //   },
          // ];
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
.user-avatar {
  border-radius: 50%;
  width: 10%;
}
</style>
