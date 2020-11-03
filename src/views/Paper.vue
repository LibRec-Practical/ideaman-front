<template>
  <div>
    <Row>
      <i-col span="24">
        <a :href="paper.link" target="_blank">
          <h1>{{ paper.title }}</h1>
        </a>
        <p>
          作者:
          <Button v-for="a in paper.authors" :key="a" type="text">{{
            a
          }}</Button>
        </p>
      </i-col>
    </Row>
    <Divider />
    <Row class="row-distance" style="min-height: 100px">
      <i-col span="18">
        <p>
          标签:
          <Button
            v-for="t in paper.tags"
            :key="t"
            type="text"
            icon="md-pricetag"
            >{{ t }}</Button
          >
        </p>
        <p>关键词: {{ keywordsLine }}</p>
      </i-col>
      <i-col span="6">
        <div class="operation-buttons">
          <div class="button-box">
            <Button
              class="button-width-fixed"
              icon="md-cloud-download"
              @click="onDownloadTapped"
              >下载</Button
            >
          </div>
          <div class="button-box">
            <Button v-if="paperCollected"
              class="button-width-fixed"
              icon="ios-star"
              @click="onCollectTapped"
              >取消收藏</Button
            >
            <Button v-else
              class="button-width-fixed"
              icon="ios-star-outline"
              @click="onCollectTapped"
              >收藏</Button
            >
          </div>
          <div class="button-box">
            <Button
              class="button-width-fixed"
              icon="ios-paper"
              @click="onFeedbackTapped"
              >反馈</Button
            >
          </div>
        </div>
      </i-col>
    </Row>
    <Row class="row-distance">
      <i-col span="24">
        <h1>摘要</h1>
        <Divider />
        <p>{{ paper.abstract }}</p>
        <!-- 缩略图 -->
        <div class="thumbnail-wrapper">
          <img v-for="thumbnail in paper.thumbnailURL" :key="thumbnail" class="thumbnail" :src="thumbnail" alt="Paper Thumbnails" />
        </div>
      </i-col>
    </Row>
    <Row class="row-distance">
      <i-col span="24">
        <h1>相关推荐</h1>
        <!-- <div class="box-in-detail">登陆后可查看（该服务暂未开启）</div> -->
        <div class="box-in-detail">
          <PaperRelatedRecs :papers="relatedPapers" />
        </div>
      </i-col>
    </Row>
  </div>
</template>

<script>
import {
  getPaperInfo as getPaperInfoApi,
  getRelatedPaper as getRelatedPaperApi
} from '../api/paper'
import { addLibrary as addLibraryApi, deleteLibrary as deleteLibraryApi, isCollected as isCollectedApi } from '../api/library'
import PaperRelatedRecs from '../components/status/PaperRelatedRecs'
import { sendEventData as sendEventDataApi } from '../utils/dcpRequest'

export default {
  name: 'Paper',
  components: {
    PaperRelatedRecs
  },
  data () {
    return {
      paper: {},
      relatedPapers: [],
      paperCollected: false
    }
  },
  mounted () {
    const paperId = this.$route.params.arxivId
    this.getPaperInfo(paperId)
    this.getRelatedPaper(paperId)
    this.judgePaperCollected()

    const { id } = JSON.parse(window.localStorage.getItem('ideaman_info'))

    sendEventDataApi({
      event_type: 'Online',
      event: '$ItemView',
      userId: id,
      paperId: paperId
    })
  },
  computed: {
    keywordsLine () {
      return this.paper.keywords ? this.paper.keywords.join(', ') : ''
    }
  },
  methods: {
    async getPaperInfo (id) {
      try {
        const res = await getPaperInfoApi({ id })
        if (res.code === 0) {
          this.paper = res.data
        }
      } catch (e) {
        this.$Message.error(e)
      }
    },

    async getRelatedPaper (paperId) {
      try {
        const res = await getRelatedPaperApi({ paperId })
        if (res.code === 0) {
          this.relatedPapers = res.data
        }
      } catch (e) {
        this.$Message.error('暂无法获取猜你喜欢离线推荐')
      }
    },
    async onCollectTapped () {
      try {
        const { id } = JSON.parse(window.localStorage.getItem('ideaman_info'))
        if (!this.paperCollected) { // 该片论文未被收藏
          const res = await addLibraryApi({ userId: id, paperId: this.$route.params.arxivId }) // 将论文加入library
          console.log(res)
          if (res.code === 0) {
            this.$Message.success('收藏成功')
            this.judgePaperCollected() // 重新判断论文收藏情况
          } else {
            this.$Message.error(res.message)
          }
          sendEventDataApi({ // 发送收藏事件
            event_type: 'Click',
            event: '$Collect',
            userId: id,
            paperId: this.$route.params.arxivId
          })
        } else { // 该片论文已经被收藏
          const res = await deleteLibraryApi({ userId: id, paperId: this.$route.params.arxivId }) // 将library数据库中deleted改为1
          if (res.code === 0) {
            this.$Message.success('已取消收藏')
            this.judgePaperCollected()
          } else {
            this.$Message.error(res.message)
          }
        }
      } catch (e) {
        this.$Message.error(e)
      }
    },
    async onDownloadTapped () {
      console.log(
        this.paper.link.split('/')[this.paper.link.split('/').length - 1]
      )
      const pdfLink =
        'http://arxiv.org/pdf/' +
        this.paper.link.split('/')[this.paper.link.split('/').length - 1]
      window.open(pdfLink, '_blank')
    },
    async onFeedbackTapped () {
      this.$Message.success('点击反馈,暂不支持该服务')
    },
    async judgePaperCollected () {
      const { id } = JSON.parse(window.localStorage.getItem('ideaman_info'))
      const res = await isCollectedApi({ userId: id, paperId: this.$route.params.arxivId })
      if (res.data) {
        this.paperCollected = true
      } else {
        this.paperCollected = false
      }
    }
  }
}
</script>

<style scoped>
@import "../styles/commons.css";

.operation-buttons {
  position: absolute;
  right: 0;
}

.button-box {
  margin-bottom: 5px;
}

.button-width-fixed {
  width: 100%;
}

.thumbnail-wrapper {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
}
.thumbnail {
  height: 18vw;
}
</style>
