<template>
  <div>
      <div v-if="papers.length > 0">
        <div class="offline-rec-container">
          <div class="rec-item" v-for="paper in papers" :key="paper.id">
            <Card>
              <!-- <h5>
                <a :href="paper.link" target="_blank">{{ paper.title }}</a>
              </h5> -->
              <h5 @click="onRelatedRecPaperTapped(paper.id)">
                {{ paper.title }}
              </h5>
            </Card>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="no-rec-tips">
          该论文尚无离线推荐结果，推荐引擎正在疯狂计算中。。。
        </div>
      </div>
      <Row style="margin-top: 10px"> </Row>
  </div>
</template>

<script>
export default {
  name: 'PaperRelatedRecs',
  props: ['papers'],
  data () {
    return {}
  },
  mounted () {
    console.log(this.papers)
  },
  methods: {
    onRelatedRecPaperTapped (id) {
      this.$router.push({ path: '/arxiv/' + id })
      this.$router.go(0)
    }
  }

}
</script>

<style scoped>
.offline-rec-container {
  display: flex;
  flex-direction: row;
}

.rec-item {
  margin: 10px;
}

.no-rec-tips {
  font-weight: 500;
  opacity: 0.6
}
</style>
