<script setup>
import upgradeBannerDark from '@/assets/images/pro/upgrade-banner-dark.png'
import upgradeBannerLight from '@/assets/images/pro/upgrade-banner-light.png'
//import logo from '@/assets/logo-no-background.svg?raw'
//import logo from '@/assets/logo.svg?raw'
import logo from '@/assets/loanify.svg?raw'

import stripe from '@/assets/images/logos/stripe.png'
import {
  VerticalNavLink,
  VerticalNavSectionTitle,
} from '@layouts'
import { useTheme } from 'vuetify'

const vuetifyTheme = useTheme()
const upgradeBanner = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? upgradeBannerLight : upgradeBannerDark
})
</script>

<template>
  <!-- 👉 Nav header -->
  <div class="nav-header">
    <RouterLink to="/home" class="app-logo d-flex align-center gap-x-3 app-title-wrapper">

      <div>
        <div v-html="logo" />
      </div>

      <!-- <Transition name="vertical-nav-app-title">
        <h1 class="font-weight-semibold leading-normal text-md text-uppercase">
          Loanify
        </h1>
      </Transition> -->
    </RouterLink>
  </div>

  <!-- 👉 Nav items -->
  <ul>
    <VerticalNavLink :item="{
      title: 'Dashboard',
      to: '/home',
      icon: { icon: 'mdi-home-outline' }
    }" />
    <VerticalNavLink :item="{
      title: 'Account Settings',
      to: '/account-settings',
      icon: { icon: 'mdi-account-cog-outline' }
    }" />
    <!-- 👉 Pages -->
    <VerticalNavSectionTitle :item="{ heading: 'Pages' }" />
    <VerticalNavLink :item="{
      title: 'Debtors',
      to: 'debtors',
      icon: { icon: 'mdi-login' }
    }" />
    <VerticalNavLink :item="{
      title: 'Apply',
      to: '/applications',
      icon: { icon: 'mdi-account-plus-outline' }
    }" />

    <!-- ℹ️ This path doesn't exist so 404 route will catch this undefined path -->
    <!-- <VerticalNavLink :item="{
      title: 'Error',
      to: { path: '/error' },
      icon: { icon: 'mdi-alert-circle-outline' }
    }" /> -->

    <!-- 👉 User Interface -->
    <!-- <VerticalNavSectionTitle :item="{ heading: 'User Interface' }" />

    <VerticalNavLink
      :item="{
        title: 'Typography',
        to: 'typography',
        icon: { icon: 'mdi-alpha-t-box-outline' }
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Icons',
        to: 'icons',
        icon: { icon: 'mdi-eye-outline' }
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Cards',
        to: 'card-basic',
        icon: { icon: 'mdi-credit-card-outline' }
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Tables',
        to: 'tables',
        icon: { icon: 'mdi-table' }
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Form Layouts',
        to: 'form-layouts',
        icon: { icon: 'mdi-form-select' }
      }"
    /> -->
  </ul>

  <!-- 👉 illustration
  <a
    href="https://themeselection.com/item/materio-vuetify-vuejs-admin-template"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      :src="upgradeBanner"
      alt="upgrade-banner"
      transition="scale-transition"
      class="upgrade-banner mx-auto"
      style="max-width: 230px"
    >
  </a> -->
</template>

<style lang="scss">
// .v-navigation-drawer {
//   height: 100%;

//   .v-navigation-drawer__content {
//     display: flex;
//     flex-direction: column;

//     > ul {
//       flex-grow: 1;
//     }
//   }
// }

.upgrade-banner {
  margin-top: auto;
  // position: absolute;
  // bottom: 13px;
  // left: 50%;
  // transform: translateX(-50%);
}
</style>
