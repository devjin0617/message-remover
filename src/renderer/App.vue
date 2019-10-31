<template>
  <div id="app">
    <el-container style="height:100vh; border: 1px solid #eee;">
      <el-aside style="background-color: rgb(238, 241, 246)">
        <el-menu>
          <el-menu-item @click="selectMenu('TOKEN_PAGE')">
            <i class="el-icon-menu"></i>
            <span>Set SlackToken</span>
          </el-menu-item>
          <el-menu-item @click="getChannels">
            <i class="el-icon-menu"></i>
            <span>Get Channels</span>
          </el-menu-item>
          <el-submenu v-if="channels.length > 0">
            <template slot="title">
              <i class="el-icon-message"></i>Channel List
            </template>
            <el-menu-item
              v-for="item in channels"
              :key="item.id"
              @click="selectMenu({type: 'MESSAGE_PAGE', id: item.id})"
            >{{ item.name }}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <h1>Message Remover</h1>
        </el-header>
        <el-main>
          <router-view></router-view>
          <div style="margin-top:20px;">
            {{ message }}
            <div v-if="channels.length > 0" style="margin-top:20px;">
              <el-select v-model="value" placeholder="select channel">
                <el-option
                  v-for="item in channels"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
            {{ channel }}
          </div>
        </el-main>
      </el-container>
    </el-container>
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
      message: '',
      value: '',
      channels: [],
      cursor: ''
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
    async getChannels () {
      const loading = this.$loading()
      const token = localStorage.getItem('token')
      if (!token) {
        this.$message({
          message: '토큰을 지정해주세요',
          type: 'info'
        })
        return
      }
      try {
        const { data } = await axios.get('/channels.list', {
          params: {
            token
          }
        })
        this.$message({
          message: '채널목록을 불러왔습니다.',
          type: 'success'
        })
        this.channels = data.channels
      } catch (e) {
        this.$message({
          message: e.msg,
          type: 'error'
        })
      } finally {
        loading.close()
      }
    },
    selectMenu ({ type, id }) {
      switch (type) {
        case 'TOKEN_PAGE':
          this.$router.push('/token')
          break
        case 'MESSAGE_PAGE':
          this.$router.push('/message/' + id)
          break
        default:
          break
      }
    },
    async deleteMessage (ts) {
      // const { data } = await axios.post('/chat.delete', {
      //   params: {
      //     token: this.token,
      //     channel: this.channel,
      //     ts
      //   }
      // })
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
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
.el-aside {
  color: #333;
}
</style>
