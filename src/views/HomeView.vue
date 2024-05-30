<template>
  <div>
    <RouterLink to="/login">
        <button   v-if="!user" class="btn btn-neutral my-4">Login</button>
         <button @click="logOut()" v-else class="btn btn-neutral my-4">Logout</button>
    </RouterLink>
       <h1 class="text-3xl"> {{ user ? ` Welcome Home ${user?.data?.userName}`: 'Please Login In' }}</h1>

  </div>
</template>

<script>
import { RouterLink } from 'vue-router'
import { jwtDecode } from "jwt-decode";

export default {
  components: {
    RouterLink
  },
  data() {
    return {
      user: null
    }
  },
  created() {
    this.getUserToken();
  },
  methods: {
   getUserToken() {
  const token = localStorage.getItem('id_token');
  if (token) {
    this.user = jwtDecode(token) || {};
    console.log(this.user.data);
  }
}
,
    logOut(){
       localStorage.removeItem('id_token')
    }
  }
}
</script>
