<template>
  <svg :width="widPx" :height="widPx" :viewBox="getViewBox" version="1.1"
       xmlns="http://www.w3.org/2000/svg"
       xmlns:xlink="http://www.w3.org/1999/xlink">
    <desc></desc>
    <defs></defs>
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g>
        <circle :fill="iconColor" :cx="wid" :cy="wid" r="25"></circle>
        <text font-family="Roboto-Regular, Roboto" :font-size="wid / 2 - 1" font-weight="normal" fill="#FFFFFF">
          <tspan x="17" y="33">{{ character }}</tspan>
        </text>
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'DefaultAvatar',
  props: [
    'character',
    'wid'
  ],
  data () {
    return {
      colorPool: [
        'red',
        'yellow',
        'blue',
        'green'
      ],
      iconColor: 'red'
    }
  },
  created () {
    this.iconColor = this.colorPool[Math.floor(Math.random() * this.colorPool.length)]
  },
  computed: {
    widPx () {
      return this.wid + 'px'
    },
    getViewBox () {
      return '0 0 ' + this.wid + ' ' + this.wid
    }
  }
}
</script>

<style scoped>

</style>
