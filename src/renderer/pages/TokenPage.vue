<template>
  <div>
    <el-input style="width:400px;" placeholder="input slack legacy token" v-model="token"></el-input>
    <div style="margin-top:10px;">
      <el-button type="primary" :round="true" @click="saveToken">save token</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'token-page',
  data () {
    return {
      token: ''
    }
  },
  mounted () {
    const localToken = localStorage.getItem('token')
    if (localToken) {
      this.token = localToken
    }
  }
}
</script>

<style>
</style>