<template>
  <VBadge v-bind="avatarBadgeProps">
    <VAvatar
      style="cursor: pointer;"
      color="primary"
      variant="tonal"
    >
      <VImg :src="avatar1" />

      <!-- SECTION Menu -->
      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="14px"
      >
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge v-bind="avatarBadgeProps">
                  <VAvatar
                    color="primary"
                    size="40"
                    variant="tonal"
                  >
                    <VImg :src="avatar1" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              {{ profileName }}
            </VListItemTitle>
            <VListItemSubtitle class="text-disabled">
              Admin
            </VListItemSubtitle>
          </VListItem>

          <!-- <VDivider class="my-2" /> -->

          <!-- 👉 Profile -->
          <!--
            <VListItem link>
            <template #prepend>
            <VIcon
            class="me-2"
            icon="mdi-account-outline"
            size="22"
            />
            </template>

            <VListItemTitle>Profile</VListItemTitle>
            </VListItem> 
          -->

          <!-- 👉 Settings -->
          <!--
            <VListItem link>
            <template #prepend>
            <VIcon
            class="me-2"
            icon="mdi-cog-outline"
            size="22"
            />
            </template>

            <VListItemTitle>Settings</VListItemTitle>
            </VListItem> 
          -->

          <!-- 👉 Pricing -->
          <!--
            <VListItem link>
            <template #prepend>
            <VIcon
            class="me-2"
            icon="mdi-currency-usd"
            size="22"
            />
            </template>

            <VListItemTitle>Pricing</VListItemTitle>
            </VListItem> 
          -->

          <!-- 👉 FAQ -->
          <!--
            <VListItem link>
            <template #prepend>
            <VIcon
            class="me-2"
            icon="mdi-help-circle-outline"
            size="22"
            />
            </template>

            <VListItemTitle>FAQ</VListItemTitle>
            </VListItem> 
          -->

          <!-- Divider -->
          <VDivider class="my-2" />

          <!-- 👉 Logout -->
          <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="mdi-logout-variant"
                size="22"
              />
            </template>

            <VListItemTitle @click="logout">
              Logout
            </VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>

<script>
import avatar1 from '@/assets/images/avatars/avatar-1.png';
import { onMounted } from 'vue';
import { getAccount, logout } from '../../services/loanify/authService';


export default {
  setup() {
    // Make sure onMounted is called correctly

    let profileName = ref(null)
    onMounted(async () => {
      const account = await getAccount() // Ensure the function exists and is properly called
      console.log('account', account)    // Log the account to verify it's fetched

      profileName.value = account?.name
      console.log('profileName 2', profileName.value)
    })

    console.log('profileName 1', profileName.value)
    const avatarBadgeProps = {
      dot: true,
      location: 'bottom right',
      offsetX: 3,
      offsetY: 3,
      color: 'success',
      bordered: true,
    }

    return {
      logout,
      avatarBadgeProps,
      profileName,
      avatar1,
    }
  },
}
</script>
