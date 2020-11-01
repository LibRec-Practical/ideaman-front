<template>
  <div>
    <Card>
      <div @click="onPaperTapped">
        <p slot="title">
          <Icon type="md-star" />
          用户 {{user}} 发表了文章
        </p>
        <div slot="extra">
          <p v-if="type === 'arxiv'">
            来自 arXiv
            <Icon type="ios-more" />
          </p>
        </div>
        <!-- 标题 -->
        <h3>
          <a :href="link">{{ title }}</a>
        </h3>
        <div>{{ abstractStriped }}</div>
        <!-- 标签 -->
        <div>
          <Button v-for="t in tags" :key="t" type="text" icon="md-pricetag">{{ t }}</Button>
        </div>
        <!-- 缩略图 -->
        <div class="thumbnail-wrapper">
          <img v-for="thumbnail in thumbnailUrl" :key="thumbnail" class="thumbnail" :src="thumbnail" alt="Paper Thumbnails" />
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'FirstColdStartPaper',
  props: [
    'id',
    'type',
    'user',
    'title',
    'authors',
    'abstract',
    'tags',
    'link',
    'keywords',
    'thumbnailUrl'
  ],
  data () {
    return {}
  },
  computed: {
    abstractStriped () {
      if (this.abstract.length <= 280) {
        return this.abstract
      } else {
        return this.abstract.slice(0, 280) + '...'
      }
    }
  },
  methods: {
    onPaperTapped () {
      this.$router.push({ path: '/arxiv/' + this.id })
    }
  }
}
</script>

<style scoped>
.thumbnail-wrapper {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
}
.thumbnail {
  height: 12vw;
}
</style>
