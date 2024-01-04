"
<template>
  <nav class="bg-[#0073dd] navBar left-0 right-0">
    <div class="px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-12 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <button
            @click="toggleMobileMenu"
            class="relative inline-flex rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <svg
              v-if="!mobileMenuOpen"
              class="block h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
            <svg
              v-else
              class="block h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <div class="flex justify-start icon-container pt-3">
          <div>
            <img
              class="h-6 w-auto"
              src="https://boekhouden-tst.snelstart.nl/nl/assets/snelstart-logo-small.svg"
              alt="Your Company"
            />
          </div>
          <span class="beta-title me-2 ms-2 h-4 w-auto">BETA</span>
        </div>
        <!-- <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <a
                v-for="item in navigation"
                :key="item.name"
                :href="item.href"
                :class="[
                  item.current
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'rounded-md px-3 py-2 text-sm font-medium'
                ]"
                :aria-current="item.current ? 'page' : undefined"
                >{{ item.name }}</a
              >
            </div>
          </div> -->

        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <!-- <button
            type="button"
            class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <span class="absolute -inset-1.5" />
            <span class="sr-only">View notifications</span>
            <svg
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21v-2a5 5 0 00-5-5H8a5 5 0 00-5 5v2"
              ></path>
            </svg>
          </button> -->

          <!-- Profile dropdown -->
          <div class="relative ml-3 flex">
            <h1 class="text-white mt-1 me-2 font-semibold pt-2 pe-2 ps-2 pb-2 hover:bg-[#0057aa]">
              Welcome to, Operator view
            </h1>
            <button @click="toggleProfileMenu" class="relative flex rounded-full text-small">
              <span class="sr-only">Open user menu</span>
              <img
                v-if="userStore.isAuthenticated && userStore.image"
                :src="userStore.image"
                class="w-8 h-8 rounded-full mt-2"
              />
              <div
                v-else
                class="w-9 h-9 mt-1 rounded-full bg-white text-black flex items-center justify-center font-bold"
              >
                {{ account.name.charAt(0).toUpperCase() }}
              </div>
            </button>
            <!-- <span
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-8 text-white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                />
              </svg>
            </span> -->
            <div
              v-if="profileMenuOpen"
              class="absolute right-0 z-10 mt-10 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <a
                class="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-600 hover:text-white"
                >Your Profile</a
              >
              <a
                class="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-600 hover:text-white"
                >Settings</a
              >
              <a
                class="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-600 hover:text-white"
                @click="logout"
                >Sign out</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="mobileMenuOpen" class="sm:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <a
          v-for="item in navigation"
          :key="item.name"
          :href="item.href"
          :class="[
            item.current
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'block rounded-md px-3 py-2 text-base font-medium'
          ]"
          :aria-current="item.current ? 'page' : undefined"
          @click="toggleMobileMenu"
          >{{ item.name }}</a
        >
      </div>
    </div>
  </nav>
</template>

<!-- YourComponent.vue -->
<script setup lang="ts">
import { error } from 'console'
import { onMounted, ref } from 'vue'
import { myMSALObj } from '../msalConfig'
import { useUserStore } from '../stores/counter'
import axios from 'axios'

const userStore = useUserStore()
let accessToken = ref('')
const account = ref({ name: '', username: '', profileImageUrl: '' })

const mobileMenuOpen = ref(false)
const profileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const toggleProfileMenu = () => {
  profileMenuOpen.value = !profileMenuOpen.value
}

onMounted(async () => {
  try {
    const res = await myMSALObj.handleRedirectPromise()
    if (res != null && res.account != null) {
      myMSALObj.setActiveAccount(res.account)

      sessionStorage.setItem('accessToken', res.accessToken)
      userStore.isAuthenticated = true

      const profileImageUrl = await getProfileImage(res.accessToken)
      const accountObj: any = myMSALObj.getActiveAccount()
      account.value = {
        name: accountObj.name ?? '',
        username: accountObj.username ?? '',
        profileImageUrl: userStore.image ?? ''
      }
    }
  } catch (error: any) {
    console.error('Error during redirect promise:', error)
  }
})

const getProfileImage = async (accessToken: string) => {
  try {
    const headers = { Authorization: `Bearer ${accessToken}` }
    const response = await axios.get('https://graph.microsoft.com/v1.0/me/photo/$value', {
      headers,
      responseType: 'arraybuffer'
    })
    const blob = new Blob([response.data], {
      type: response.headers['content-type']
    })

    const imageUrl = URL.createObjectURL(blob)
    userStore.image = imageUrl
    return imageUrl
  } catch (err) {
    console.error(err)
    return null
  }
}

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false }
]

const logout = async () => {
  try {
    await myMSALObj.logoutRedirect()
    account.value = { name: '', username: '', profileImageUrl: '' }
    userStore.isAuthenticated = false
    sessionStorage.removeItem('authenticated')
  } catch (err: any) {
    console.error('Error during logout:', err)
  }
}
</script>

<style scoped>
/* Add any scoped styles here */
.profile-dropdown {
  position: absolute;
  right: 0;
  z-index: 10;
  margin-top: 10px;
  width: 48px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.profile-dropdown a {
  display: block;
  padding: 8px 16px;
  text-decoration: none;
  color: #333;
}

.profile-dropdown a:hover {
  background-color: #f0f0f0;
}
.beta-title {
  font-weight: 500;
  font-size: 10px;
  background-color: #bbdbff;
  padding-left: 10px;
  padding-right: 10px;
  color: black;
  border-radius: 5px;
  margin-top: 2px;
  padding-top: 1px;
}
.icon-container {
  border-right: 1px solid rgb(238, 236, 236);
  height: 100%;
  text-align: center;
}
</style>
