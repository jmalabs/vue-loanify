<template>
  <div class="logout-message">
    <h1>You have been logged out</h1>
    <p>Thank you for using our application. You can log in again anytime.</p>
    <RouterLink to="/login">
      Return to Login
    </RouterLink>
  </div>
</template>

<script>
import { onMounted } from 'vue';

export default {
  name: 'LogoutRedirect',

  setup() {
    onMounted(() => {

      console.log('LogoutRedirect >>>')
    })

  },

}
</script>

<style scoped>
.logout-message {
    text-align: center;
    margin-top: 50px;
}
</style>