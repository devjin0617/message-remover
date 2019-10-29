<template>
  <div id="app">
    <div class="container">
      <div>
        <h1>Message Remover</h1>
      </div>
      <div style="margin-top:20px;">
        <el-input style="width:400px;" placeholder="input slack legacy token" v-model="token"></el-input>
        <div style="margin-top:10px;">
          <el-button type="primary" :round="true" @click="saveToken">save token</el-button>
          <el-button type="primary" :round="true" @click="getChannels">get channels</el-button>
        </div>
        {{ message }}
        <div v-if="channels.length > 0" style="margin-top:20px;">
          <el-select v-model="value" placeholder="select channel">
            <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
        {{ channel }}
        <div v-if="value">
          <el-button @click="getHistory">메시지 가져오기</el-button>
        </div>
      </div>
    </div>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.baseURL = 'https://slack.com/api'

export default {
  name: 'slack-message-remover',
  data () {
    return {
      token: '',
      message: '',
      value: '',
      channels: []
    }
  },
  mounted () {
    const localToken = localStorage.getItem('token')
    if (localToken) {
      this.token = localToken
    }
  },
  computed: {
    channel () {
      if (this.channels.length === 0) {
        return ''
      }
      return this.channels.find(v => v.id === this.value)
    }
  },
  methods: {
    saveToken () {
      localStorage.setItem('token', this.token)
      this.$message({
        message: '토큰이 저장되었습니다.',
        type: 'success'
      })
    },
    async getChannels () {
      const { data } = await axios.get('/channels.list', {
        params: {
          token: this.token
        }
      })
      this.$message({
        message: '채널목록을 불러왔습니다.',
        type: 'success'
      })
      this.channels = data.channels
    },
    async getHistory () {
      const { data } = await axios.get('/conversations.history', {
        params: {
          token: this.token,
          channel: this.value
        }
      })
      this.$message({
        message: '메시지 목록을 가져왔습니다.',
        type: 'success'
      })
      data.messages.forEach(v => {
        console.log(v)
      })
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
