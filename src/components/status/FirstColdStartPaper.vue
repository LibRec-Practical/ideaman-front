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
        <h3>
          <a :href="link">{{ title }}</a>
        </h3>
        <div>{{ abstractStriped }}</div>
        <div>
          <Button v-for="t in tags" :key="t" type="text" icon="md-pricetag">{{ t }}</Button>
        </div>
        <div>
          <img style="margin-top: 10px; width: 100%;" :src="thumbnailUrl" alt="Paper Thumbnails" />
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
</style>
