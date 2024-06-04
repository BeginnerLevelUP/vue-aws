<template>
  <loginForm ></loginForm>
  <signupForm></signupForm>
  <div v-if="!user" class="p-6 flex justify-center my-64">
    <h1 class="text-3xl inline mx-10">
      {{ user ? `Welcome Home ${user?.data?.userName}` : 'Please Log In' }}
    </h1>
    <navigate :logOut="logOut" :user="user"></navigate>
  </div>

  <div v-if="user">
    <navigate :logOut="logOut" :user="user"></navigate>
    <div style="height: 100vh">
      <PrettyChatWindow :projectId="projectId" :username="user?.data?.userName" :secret="user?.data?.userName" />
    </div>
  </div>
</template>

<script>
import {jwtDecode} from 'jwt-decode';
import { PrettyChatWindow } from 'react-chat-engine-pretty';
import { applyReactInVue } from 'veaury';
import navigate from '@/components/nav.vue';
import loginForm from '@/components/loginForm.vue';
import signupForm from '@/components/signupForm.vue';

export default {
  components: {
    PrettyChatWindow: applyReactInVue(PrettyChatWindow),
    navigate,
    loginForm,
    signupForm,
  },
  data() {
    return {
      user: null,
      projectId: 'a753e243-722c-40b5-8313-8edd7608ef8a',
      username: null,
      secret: null,
    };
  },
  created() {
    this.getUserToken();
  },
  methods: {
    getUserToken() {
      const token = localStorage.getItem('id_token');
      if (token) {
        const decoded = jwtDecode(token) || {};
        this.user = decoded;
      }
    },
    logOut() {
      localStorage.removeItem('id_token');
      this.user = null;
    },

  },
};
</script>
