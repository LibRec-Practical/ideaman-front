<template>
  <div>
    <Card>
      <div slot="title">
        <img :src="userAvatarURL" class="user-avatar" alt="用户头像" />&nbsp;&nbsp;
        <a :href="userURL">{{ username }}</a>
      </div>
      <div slot="extra">
        <Button v-if="!followed" type="text"><Icon type="md-add" /> Follow</Button>
        <Button v-if="followed" type="text"><Icon type="md-checkmark" /> Followed</Button>
        <Button type="text"><Icon type="ios-more" /></Button>
      </div>
      <div>
        {{ text }}
      </div>
      <Row style="margin-top: 10px;">
        <i-col span="8" style="text-align: center;">
          <Button type="text" style="display: inline-block;"><Icon type="ios-redo" /> 转发</Button>
        </i-col>
        <i-col span="8" style="text-align: center;">
          <Button type="text" style="display: inline-block;"><Icon type="md-chatboxes" /> 评论</Button>
        </i-col>
        <i-col span="8" style="text-align: center;">
          <Button type="text" style="display: inline-block;"><Icon type="md-thumbs-up" /> 赞</Button>
        </i-col>
      </Row>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'RecommendedStatus',
  props: [
    'userAvatarURL',
    'username',
    'followed',
    'userURL',
    'text'
  ],
  data () {
    return {
      //
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
