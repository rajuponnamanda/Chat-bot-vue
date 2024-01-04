<template>
  <div>
    <NavBarVue />
    <div
      class="main-container min-h-screen flex bg-cover shadow-lg bg-no-repeat sm:bg-auto md:bg-auto lg:bg-auto xl:bg-cover"
    >
      <!-- Main content area -->
      <div v-if="isAuthenticated !== null" class="flex-grow grid grid-cols-12">
        <div class="col-span-12">
          <img src="./assets/Screenshot 2023-12-26 103443.png" alt="" />

          <!-- Main content area -->
          <!-- <h1 class="text-vlack font-extrabold text-5xl text-center mt-56">
            {{ isAuthenticated ? `Welcome, ${user?.nickname}` : 'Please sign in' }}
          </h1> -->

          <!-- Chat container -->
          <div v-if="openBot" class="chat-container">
            <ChatAppVue
              :users="users"
              :isBotOpen="isBotOpen"
              @closeBot="closeBot"
              class="fixed bottom-0 right-0 p-4 max-h-[80vh] overflow-y-auto"
            />
          </div>
        </div>
      </div>
      <div v-else>
        <!-- Show loading state or spinner -->
        Loading...
      </div>

      <!-- Chat icon at the bottom right -->
      <div class="grid justify-end p-3 absolute bottom-0 right-0">
        <div @click="openChat" class="cursor-pointer">
          <div v-if="!openBot" class="chat-icon bg-orange-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="white"
              class="p-2.5 bg-orange-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
              />
            </svg>
          </div>
          <div v-else>
            <!-- <ChatAppVue
              @click="closeBot"
              :users="users"
              class="fixed bottom-0 right-0 p-4 max-h-[80vh] overflow-y-auto"
            /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChatAppVue from './components/ChatApp.vue'
import NavBarVue from './components/NavBar.vue'
import { ref, onMounted } from 'vue'
import { auth0 } from './auth0Config'

const users = ref(/* User data goes here */)
const isBotOpen = ref(true)

const closeBot = () => {
  console.log('Bot closed!')
  openBot.value = false
}
const { loginWithRedirect, isAuthenticated, user, handleRedirectCallback } = auth0
const openBot = ref(false)

onMounted(async () => {
  try {
    // Check for query parameters before calling handleRedirectCallback
    const hasQueryParams = window.location.search.length > 0

    if (hasQueryParams) {
      await handleRedirectCallback()
    } else {
      // If there are no query parameters, initiate the login process
      await loginWithRedirect()
    }
  } catch (error) {
    // console.error('Error handling redirect callback:', error)
  } finally {
    try {
      // Set isAuthenticated once the callback handling is done
      isAuthenticated.value = auth0.isAuthenticated.value
    } catch (error) {
      console.error('Error checking authentication status:', error)
    }
  }
})

const openChat = () => {
  openBot.value = !openBot.value
}

// const login = () => {
//   const state =
//     Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
//   loginWithRedirect({ state })
// }
</script>

<style scoped>
.main-container {
  height: 90vh;
  background-image: url('./assets/Screenshot\ 2023-12-24\ 190412.png') !important;
  background-size: cover; /* Add this line for responsiveness */
}

/* Responsive background size */
@media (min-width: 640px) {
  .main-container {
    background-size: auto; /* Small screens */
  }
}

@media (min-width: 768px) {
  .main-container {
    background-size: auto; /* Medium screens */
  }
}

@media (min-width: 1024px) {
  .main-container {
    background-size: auto; /* Large screens */
  }
}

@media (min-width: 1280px) {
  .main-container {
    background-size: cover; /* Extra-large screens (xl) */
  }
}

.chat-icon {
  @apply rounded-full p-2;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.chat-icon svg {
  @apply w-12 h-12; /* Adjust the size as needed */
  border-radius: 50%;
}
</style>
