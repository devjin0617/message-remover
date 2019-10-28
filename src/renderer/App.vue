<template>
  <div id="app">
    <div class="container">
      <el-input style="width:400px;" placeholder="input slack legacy token"></el-input>
      <div style="margin-top:10px;">
        <el-button type="primary" :round="true" @click="saveToken">save token</el-button>
      </div>
      {{ message }}
    </div>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
  export default {
    name: 'slack-message-remover',
    data () {
      return {
        message: ''
      }
    },
    methods: {
      saveToken () {
        this.message = 'saved'
      }
    }
  }
</script>

<style>
/* CSS */
#app {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.container {
  text-align: center;
}
</style>
