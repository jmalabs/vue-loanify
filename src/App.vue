<template>
  <VApp>
    <VLayout class="layout-wrapper layout-nav-type-vertical">
      <DefaultLayoutWithVerticalNav />
      <!-- <BuyNow /> -->
    </VLayout>
  </VApp>
</template>


<script>
import DefaultLayoutWithVerticalNav from '../src/layouts/components/DefaultLayoutWithVerticalNav.vue';

// import { myMSALObject } from './config/msalConfig';
// import { useAuth } from './config/useAuth';




export default {

  components: { DefaultLayoutWithVerticalNav },
  setup() {

  },
}
</script>