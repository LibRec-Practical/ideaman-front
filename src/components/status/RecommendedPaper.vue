<template>
  <div>
    <Card>
      <p slot="title">
        <Icon type="ios-paper" />推荐给你的文章
      </p>
      <div slot="extra">
        <Icon type="ios-more" />
      </div>
      <h3>
        <a :href="url">{{ title }}</a>
      </h3>
      <div>{{ abstractStriped }}</div>
      <div>
        <Button v-for="t in tags" :key="t" type="text" icon="md-pricetag">{{ t }}</Button>
      </div>
      <div>
        <img style="margin-top: 10px; width: 100%;" :src="thumbnailUrl" alt="Paper Thumbnails" />
      </div>
      <div>
        <Button type="text">去了解「{{ recommendedField }}」领域</Button>&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
        <Button type="text" style="margin-left: 10px;">关注「{{ recommendedField }}」领域动态</Button>
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'RecommendedPaper',
  props: [
    'type',
    'user',
    'title',
    'recommendedField',
    'authors',
    'abstract',
    'tags',
    'url',
    'keywords',
    'thumbnailUrl'
  ],
  data () {
    return {
      //
    }
  },
  computed: {
    abstractStriped () {
      if (this.abstract.length <= 280) {
        return this.abstract
      } else {
        return this.abstract.slice(0, 280) + '...'
      }
    }
  }
}
</script>

<style scoped>
</style>
