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
  },
  methods: {
    saveToken () {
      if (!this.token) {
        this.$message({
          message: '토큰을 입력하세요',
          type: 'error'
        })
        return
      }
      localStorage.setItem('token', this.token)
      this.$message({
        message: '토큰이 저장되었습니다.',
        type: 'success'
      })
    }
  }
}
</script>

<style>
</style>