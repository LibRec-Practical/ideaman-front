<template>
  <div>
    <Card>
      <div slot="title">
        <!--<img style="width: 50px; height: 50px;" :src="userAvatarUrl" class="user-avatar" alt="用户头像" />-->
        <a :href="userUrl">{{ username }}</a> 发表了动态
      </div>
      <!--<div slot="extra">-->
        <!--<Button v-if="!followed" type="text"><Icon type="md-add" /> Follow</Button>-->
        <!--<Button v-if="followed" type="text"><Icon type="md-checkmark" /> Followed</Button>-->
        <!--<Button type="text"><Icon type="ios-more" /></Button>-->
      <!--</div>-->
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
  name: 'FollowedPeopleStatus',
  props: [
    'userAvatarUrl',
    'username',
    'followed',
    'userUrl',
    'text'
  ]
}
</script>

<style scoped>
  .user-avatar {
    border-radius: 50%;
    width: 10%;
  }
</style>
