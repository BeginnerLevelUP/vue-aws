<template>
  <loginForm></loginForm>
  <signupForm></signupForm>
  <div v-if="!user" class="p-6 flex justify-center my-64">
    <h1 class="text-3xl inline mx-10">
      {{ user ? ` Welcome Home ${user?.data?.userName}` : 'Please Login In' }}
      <navigate :logOut="logOut" :user="user"></navigate>
    </h1>
  </div>

  <div v-if="user">
    <navigate :logOut="logOut" :user="user"></navigate>
    <div style="height: 100vh">
      <PrettyChatWindow :projectId="projectId" :username="username" :secret="secret" />
    </div>
  </div>
</template>

<script>
import { jwtDecode } from 'jwt-decode'
import { PrettyChatWindow } from 'react-chat-engine-pretty'
import { applyReactInVue } from 'veaury'
import navigate from '@/components/nav.vue'
import loginForm from '@/components/loginForm.vue'
import signupForm from '@/components/signupForm.vue'

export default {
  components: {
    PrettyChatWindow: applyReactInVue(PrettyChatWindow),
    navigate,
    loginForm,
    signupForm
  },
  data() {
    return {
      user: null,
      projectId: 'a753e243-722c-40b5-8313-8edd7608ef8a',
      username: '',
      secret: ''
    }
  },
  created() {
    this.getUserToken()
  },
  methods: {
    getUserToken() {
      const token = localStorage.getItem('id_token')
      if (token) {
        const decoded = jwtDecode(token) || {}
        this.user = decoded
      }
    },
    handleLoginSuccess({ userName, secret }) {
      this.username = userName
      this.secret = secret
    },
    logOut() {
      localStorage.removeItem('id_token')
      this.user = null
      this.username = ''
      this.secret = ''
    }
  }
}
</script>
