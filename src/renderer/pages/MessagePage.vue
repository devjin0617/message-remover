<template>
  <div>
    <h2>Message Page</h2>
    <div>
      <ul>
        <li
          v-for="(item, index) in list"
          :key="index"
        >{{ item.user }}: {{ item.text }} ({{ item.ts }})</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'message-page',
  data () {
    return {
      id: -1,
      list: []
    }
  },
  watch: {
    '$route': 'loadData'
  },
  methods: {
    loadData () {
      this.id = this.$route.params.id
      this.getHistory()
    },
    async getHistory () {
      const { data } = await axios.get('/conversations.history', {
        params: {
          token: localStorage.getItem('token'),
          channel: this.id
        }
      })
      this.$message({
        message: '메시지 목록을 가져왔습니다.',
        type: 'success'
      })
      this.list = data.messages
    }
  }
}
</script>

<style>
</style>