<script lang="ts">
import  User from '../utils/userInterface'
import router from "../router/index"
export default {
  data() {
    return {
      formData: {
        userName: '',
        userPassword: '',
        userEmail: ''
      } as User
    }
  },
  methods: {
    async submitForm() {
      // Validate form data
      if (this.isValid(this.formData)) {
        // Submit form data to server
        try {
          const res = await fetch(`http://localhost:3001/api/auth/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.formData)
          })

          if (!res.ok) {
            console.error(`HTTP error! status: ${res.status}`);
            return;
          }

          const data = await res.json()

            if(data?.token){
         console.log('User created successfully:', data)
         localStorage.setItem('id_token', data?.token);
         router.push('/')
            }else{
            console.error('Error Creating User:', data)
            }
        } catch (err) {
          console.log(err instanceof Error ? err.message : 'unknown error')
        }
      } else {
        console.error('Form data is invalid')
      }
    },
    isValid(formData: User): boolean {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      const alphanumericPattern = /^[a-zA-Z0-9]+$/

      if (!formData.userName) {
        console.error('Username is required')
        return false
      }
      if (!alphanumericPattern.test(formData.userName)) {
        console.error('Username must be alphanumeric')
        return false
      }
      if (!formData.userPassword) {
        console.error('Password is required')
        return false
      }
      if (formData.userPassword.length <= 8) {
        console.error('Password must be greater than 8 characters')
        return false
      }
      if (!formData.userEmail || !emailPattern.test(formData.userEmail)) {
        console.error('Valid email is required')
        return false
      }
      return true
    }
  }
}

</script>
<template>
  <h2 class="text-center text-2xl underline font-extrabold">Sign Up Form</h2>
  <form @submit.prevent="submitForm">
    <label className="input input-bordered flex items-center gap-2">
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
          d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
        />
      </svg>
      <input type="text" className="grow" placeholder="Email" v-model="formData.userEmail" />
    </label>

    <label className="input input-bordered flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="w-4 h-4 opacity-70"
      >
        <path
          d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
        />
      </svg>
      <input type="text" className="grow" placeholder="Username" v-model="formData.userName" />
    </label>

    <label className="input input-bordered flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="w-4 h-4 opacity-70"
      >
        <path
          fillRule="evenodd"
          d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
          clipRule="evenodd"
        />
      </svg>
      <input type="password" className="grow" value="password" v-model="formData.userPassword" />
    </label>
    <button type="submit" class="btn btn-neutral my-4">Sign Up</button>
  </form>
</template>
