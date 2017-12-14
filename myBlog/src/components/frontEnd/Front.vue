<template>
  <div class="wrapper">
    <vhead class="head"></vhead>
    <router-view></router-view>
    <vfoot class="foot"></vfoot>
  </div>
</template>

<script>
  import ls from 'store2'
  import vhead from './vheader'
  import vfoot from './vfooter'
  import api from '../../api'

  export default {
    name: "front",
    data() {
      return {
        items: [],
        loading2: false
      }
    },
    components: {
      vfoot,
      vhead
    }
  }
</script>

<style scoped>

</style>
