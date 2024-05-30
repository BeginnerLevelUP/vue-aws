<script setup lang="ts">
import loginForm from '../components/loginForm.vue'
import signUpForm from '../components/signupForm.vue'
</script>

<template>
  <h1 class="font-extrabold text-3xl mx-4">Continue With US!!!</h1>
  <!-- <div role="alert" class="alert alert-warning object-cover my-4 h-fit w-fit" >
  <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-8 w-8" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
  <span>Warning: Invalid email address!</span>
</div> -->
<!-- <div role="alert" class="alert alert-success">
  <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  <span>Your purchase has been confirmed!</span>
</div> -->
  <div class="flex justify-evenly my-44">
    <loginForm></loginForm>
    <div class="divider divider-horizontal">OR</div>
    <signUpForm></signUpForm>
  </div>
</template>
