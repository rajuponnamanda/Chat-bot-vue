<template>
  <nav class="bg-[#0073dd] navBar fixed top-0 left-0 right-0 rounded-t-lg ms-1 me-1">
    <div class="px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-12 items-center justify-between">
        <div class="sm:hidden">
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
        <div class="hidden sm:flex justify-start">
          <div class="flex justify-start icon-container pt-3 pb-3">
            <div>
              <img
                class="h-6 w-auto"
                src="https://boekhouden-tst.snelstart.nl/nl/assets/snelstart-logo-small.svg"
                alt="Your Company"
              />
            </div>
            <span class="beta-title me-2 h-4 ms-2 w-auto">BETA</span>
          </div>
          <div class="hover:bg-[#0057aa] ms-4">
            <select
              class="bg-transparent selector font-bold text-gray-200 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>ElecElec</option>
              <option class="text-black" value="CA">Basisinst</option>
              <option class="text-black" value="TX">Texas</option>
            </select>
          </div>
          <div class="flex justify-start">
            <div class="hover:bg-[#0057aa]">
              <option class="text-white pt-2 ps-2 pe-2" value="TX">Finacieel</option>
            </div>
            <div class="hover:bg-[#0057aa]">
              <option class="text-white pt-2 ps-2 pe-2" value="TX">Relaties</option>
            </div>
            <div class="hover:bg-[#0057aa]">
              <option class="text-white pt-2 ps-2 pe-2" value="TX">Facturen</option>
            </div>
            <div class="hover:bg-[#0057aa]">
              <option class="text-white pt-2 ps-2 pe-2" value="TX">Artikelen</option>
            </div>
          </div>
        </div>
        <div class="flex justify-start ms-[1000px]">
          <div class="flex">
            <div class="hover:bg-[#0057aa] flex p-[3px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6 text-white mt-2"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                  clip-rule="evenodd"
                />
              </svg>
              <div>
                <select
                  class="bg-transparent font-semibold ps-1 me-6 text-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ></select>
              </div>
            </div>
            <div class="hover:bg-[#0057aa] ps-[7px] pe-[7px] pt-3 me-3 ms-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div class="hover:bg-[#0057aa] ps-[7px] pe-[7px] pt-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <div class="relative flex border-r-2 border-gray-300 pt-2 pb-2 icon-container me-6">
            <button @click="toggleProfileMenu" class="relative flex rounded-full text-small">
              <span class="sr-only">Open user menu</span>
              <img
                v-if="user?.picture"
                :src="user.picture"
                referrerPolicy="no-referrer"
                alt=""
                class="w-8 rounded-full me-3 ms-2"
              />
              <div
                v-else
                class="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center font-bold"
              >
                {{ user?.name }}
              </div>
            </button>
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
                @click="logoutUser"
                >Sign out</a
              >
            </div>
          </div>
          <div class="hover:bg-[#0057aa] p-[12px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              fill="currentColor"
              class="h-5 w-5 text-white"
            >
              <path
                d="M88 32C110.1 32 128 49.91 128 72V120C128 142.1 110.1 160 88 160H40C17.91 160 0 142.1 0 120V72C0 49.91 17.91 32 40 32H88zM88 64H40C35.58 64 32 67.58 32 72V120C32 124.4 35.58 128 40 128H88C92.42 128 96 124.4 96 120V72C96 67.58 92.42 64 88 64zM88 192C110.1 192 128 209.9 128 232V280C128 302.1 110.1 320 88 320H40C17.91 320 0 302.1 0 280V232C0 209.9 17.91 192 40 192H88zM88 224H40C35.58 224 32 227.6 32 232V280C32 284.4 35.58 288 40 288H88C92.42 288 96 284.4 96 280V232C96 227.6 92.42 224 88 224zM0 392C0 369.9 17.91 352 40 352H88C110.1 352 128 369.9 128 392V440C128 462.1 110.1 480 88 480H40C17.91 480 0 462.1 0 440V392zM32 392V440C32 444.4 35.58 448 40 448H88C92.42 448 96 444.4 96 440V392C96 387.6 92.42 384 88 384H40C35.58 384 32 387.6 32 392zM248 32C270.1 32 288 49.91 288 72V120C288 142.1 270.1 160 248 160H200C177.9 160 160 142.1 160 120V72C160 49.91 177.9 32 200 32H248zM248 64H200C195.6 64 192 67.58 192 72V120C192 124.4 195.6 128 200 128H248C252.4 128 256 124.4 256 120V72C256 67.58 252.4 64 248 64zM160 232C160 209.9 177.9 192 200 192H248C270.1 192 288 209.9 288 232V280C288 302.1 270.1 320 248 320H200C177.9 320 160 302.1 160 280V232zM192 232V280C192 284.4 195.6 288 200 288H248C252.4 288 256 284.4 256 280V232C256 227.6 252.4 224 248 224H200C195.6 224 192 227.6 192 232zM248 352C270.1 352 288 369.9 288 392V440C288 462.1 270.1 480 248 480H200C177.9 480 160 462.1 160 440V392C160 369.9 177.9 352 200 352H248zM248 384H200C195.6 384 192 387.6 192 392V440C192 444.4 195.6 448 200 448H248C252.4 448 256 444.4 256 440V392C256 387.6 252.4 384 248 384zM320 72C320 49.91 337.9 32 360 32H408C430.1 32 448 49.91 448 72V120C448 142.1 430.1 160 408 160H360C337.9 160 320 142.1 320 120V72zM352 72V120C352 124.4 355.6 128 360 128H408C412.4 128 416 124.4 416 120V72C416 67.58 412.4 64 408 64H360C355.6 64 352 67.58 352 72zM408 192C430.1 192 448 209.9 448 232V280C448 302.1 430.1 320 408 320H360C337.9 320 320 302.1 320 280V232C320 209.9 337.9 192 360 192H408zM408 224H360C355.6 224 352 227.6 352 232V280C352 284.4 355.6 288 360 288H408C412.4 288 416 284.4 416 280V232C416 227.6 412.4 224 408 224zM320 392C320 369.9 337.9 352 360 352H408C430.1 352 448 369.9 448 392V440C448 462.1 430.1 480 408 480H360C337.9 480 320 462.1 320 440V392zM352 392V440C352 444.4 355.6 448 360 448H408C412.4 448 416 444.4 416 440V392C416 387.6 412.4 384 408 384H360C355.6 384 352 387.6 352 392z"
              ></path>
            </svg>
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

<script setup lang="ts">
import { ref } from 'vue'
import { auth0 } from '../auth0Config'

const { isAuthenticated, user, logout } = auth0
// console.log(user, 'he;;')
const mobileMenuOpen = ref(false)
const profileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const toggleProfileMenu = () => {
  profileMenuOpen.value = !profileMenuOpen.value
}

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false }
]

const logoutUser = () => {
  logout()
}
</script>

<style scoped>
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
