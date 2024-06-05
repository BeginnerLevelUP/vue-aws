<template>
  <div class="flex justify-between p-8 m-8 border-b-4 border-black">
    <div class="flex">
      <h2 class="text-2xl font-extrabold mx-8">Settings</h2>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
      </svg>
    </div>

    <navigate :logOut="logOut" :user="user"></navigate>
  </div>

  <div
    class="bg-white w-full flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931] flex justify-center">
    <main class="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
      <div class="p-2 md:p-4">
        <div class="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
          <h2 class="pl-6 text-2xl font-bold sm:text-xl">{{ user?.userName }} Profile</h2>

          <div class="grid max-w-2xl mx-auto mt-8">
            <div class="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
              <div>
                <img
                  class="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                  v-if="user?.profileImageUrl"
                  :src="user?.profileImageUrl"
                  alt="Bordered avatar"
                />
                <div class="avatar" v-else>
                  <div class="w-24 rounded-full bg-gray-200 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-12 h-12 text-gray-500 ml-6 my-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div class="flex flex-col space-y-5 sm:ml-8">
    <form @submit.prevent="uploadFile">
<input type="file" class="file-input file-input-bordered file-input-error w-full max-w-xs" @change="handleFileChange" />
                <button
                  type="submit"
                  class="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200"
                >
                  Change picture
                </button>
                </form>
               <div v-if="message" role="alert" class="alert alert-success">
  <span>{{ message }}</span>
</div>

              </div>
            </div>

            <div class="items-center mt-8 sm:mt-14 text-[#202142]">
              <div
                class="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6"
              >
              <div class="items-center mt-8 sm:mt-14 text-[#202142]">

             <form @submit.prevent="update">
                <div class="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                  <div class="w-full">
                    <label
                      for="first_name"
                      class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                      >Your first name</label
                    >
                    <input
                      type="text"
                      id="first_name"
                      class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                      placeholder="Your first name"
                      required
                      v-model="user.firstName"
                    />
                  </div>

                  <div class="w-full">
                    <label
                      for="last_name"
                      class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                      >Your last name</label
                    >
                    <input
                      type="text"
                      id="last_name"
                      class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                      placeholder="Your last name"
                      required
                      v-model="user.lastName"
                    />
                  </div>
                </div>

                <div class="mb-2 sm:mb-6">
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >Your email</label
                  >
                  <input
                    type="email"
                    id="email"
                    class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                    required
                    v-model="user.userEmail"
                  />
                </div>

                <div class="flex justify-end">
                  <button
                    type="submit"
                    class="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                  >
                    Save
                  </button>
                </div>
              </form> 

            </div>
          </div>
        </div>
      </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import navigate from '../components/nav.vue'
import { jwtDecode } from 'jwt-decode'
import { updateAccount,uploadImage } from '@/utils/chatEngineApi';
export default {
  components: {
    navigate
  },
  data() {
    return {
      user:null,
      file:null,
      message:null
    }
  },
  created() {
    this.getUser()
  },
  methods: {
async getUser() {
  const token = localStorage.getItem('id_token');
  if (token) {
 const decoded = jwtDecode(token) || {};
    this.user = decoded.data ;
            try {
          const res = await fetch(`http://localhost:3001/api/users/${this.user?.userName}`, {
            method: 'Get',
            headers: {
              'Content-Type': 'application/json'
            },
          })


          const data = await res.json()
          this.user=data
          console.log(this.user)

        } catch (err) {
          console.error(err instanceof Error ? err.message : 'unknown error')
        }
  }
},

    logOut() {
      localStorage.removeItem('id_token')
      this.user = null
      this.$router.push('/')
    },
   async update(){
        try {
          console.log(this.user)
          const res = await fetch(`http://localhost:3001/api/users/${this.user?.userName}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body:JSON.stringify(this.user)
          })


          const data = await res.json()
          
          if(data){
             await updateAccount(
        data.Attributes.userName,
        data.Attributes.userName, // Assuming you have a field like userSecret in your user object
        data.Attributes.userEmail,
        data.Attributes.firstName,
       data.Attributes.lastName,
        null
    );
    this.message='profile update'
          }

        } catch (err) {
          console.error(err instanceof Error ? err.message : 'unknown error')
        }
      },
    deleteProfile(){

    },
        handleFileChange(event) {
      this.file = event.target.files[0];
    },
    async uploadFile() {
      if (!this.file) {
        this.message = 'No file selected.';
        return;
      }

      const formData = new FormData();
      formData.append('media', this.file);

      try {
        const response = await fetch(`http://localhost:3001/api/users/${this.user?.userName}/media-upload`, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        if(data){
       await uploadImage(this.file,this.user.userName,this.user.userName)
        this.message = 'File uploaded successfully: ' + JSON.stringify(data);
        // this.$router.go(0)

        }

      } catch (error) {
        this.message = 'Error uploading file: ' + error.message;
      }
    },
  },



  }

</script>
