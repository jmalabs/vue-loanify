<script setup>
import BuyNow from '@core/components/BuyNow.vue'
</script>

<template>
  <VApp>
    <VLayout class="layout-wrapper layout-nav-type-vertical">
      <DefaultLayoutWithVerticalNav />
      <RouterView />
      <!-- <BuyNow /> -->
    </VLayout>
  </VApp>
</template>


<script>
import DefaultLayoutWithVerticalNav from '../src/layouts/components/DefaultLayoutWithVerticalNav.vue'

export default {

  components: [DefaultLayoutWithVerticalNav],
  setup() {


  }
}
</script>