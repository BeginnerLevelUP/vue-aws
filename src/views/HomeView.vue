<template>
  <div>
    <RouterLink to="/login">
      <button v-if="!user" class="btn btn-neutral my-4">Login</button>
      <button @click="logOut()" v-else class="btn btn-neutral my-4">Logout</button>
    </RouterLink>
    <h1 class="text-3xl"> {{ user ? ` Welcome Home ${user?.data?.userName}`: 'Please Login In' }}</h1>
  </div>
  <div>
    <div style="height: 100vh">
      <PrettyChatWindow
        :projectId="projectId"
        :username="username"
        :secret="secret"
      />
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'
import { jwtDecode } from "jwt-decode";
import { PrettyChatWindow } from "react-chat-engine-pretty";
import { applyReactInVue } from "veaury";

export default {
  components: {
    PrettyChatWindow: applyReactInVue(PrettyChatWindow),
    RouterLink
  },
  data() {
    return {
      user: null,
      projectId: "a753e243-722c-40b5-8313-8edd7608ef8a",
      username: "",
      secret: ""
    }
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
        this.username = decoded.data.userName;  // Assuming userName is part of the data object
        this.secret = 'password123';      // Assuming secret is part of the data object
        console.log(this.user.data);
      }
    },
    logOut() {
      localStorage.removeItem('id_token');
      this.user = null;
      this.username = "";
      this.secret = "";
    }
  }
}
</script>
