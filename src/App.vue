<script setup lang="ts">
import loginForm from "./components/loginForm.vue"
import signUpForm from  "./components/signupForm.vue"
</script>

<template>
<h1 class="text-center text-orange-500">Hello World</h1>

<div class="flex justify-evenly m-10 p-4">
<loginForm></loginForm>
<signUpForm></signUpForm>
</div>

</template>


