<template>
  <div>
    <Card>
      <div class="offline-rec-container">
        <div v-for="paper in papers" :key="paper">
          {{ item }}
        </div>
      </div>
      <Row style="margin-top: 10px"> </Row>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'PaperRelatedRecs',
  props: ['papers']
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
</style>
