<!-- OperaterCaht.vue -->
<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <div>
      <h1 class="text-[24px] font-bold">Welcome to Operator View</h1>
    </div>
    <div
      v-if="socketConnection"
      class="border border-gray-300 w-[400px] h-[500px] mt-48 flex flex-col justify-end rounded-md me-5 shadow-lg"
    >
      <div class="header bg-black flex rounded-t-md shadow-md">
        <h1 class="text-white p-3">Welcome to Operator Dashboard</h1>
      </div>
      <div class="chat-container flex-1 overflow-y-auto bg-gray-100">
        <ul class="message-list" id="message-list">
          <li
            v-for="(message, index) in messages"
            :key="index"
            class="message-item me-2 ms-1 text-[14px]"
            :style="{
              width: 'fit-content',
              border: '1px solid #ccc',
              borderRadius: '5px',
              padding: '8px',
              marginBottom: '10px',
              color: message.sender === 'Customer' ? 'black' : 'white',
              alignSelf: message.sender === 'Customer' ? 'flex-start' : 'flex-end',
              backgroundColor: message.sender === 'Customer' ? '#c2c3c3' : '#313131'
            }"
          >
            <div class="flex">
              <div class="message-text flex mt-[3px]">
                {{ message.text }}
                <img
                  v-if="message.picture"
                  :src="message.picture"
                  alt=""
                  class="w-6 h-6 rounded-full ms-4"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div class="date-time mt-[2px]">{{ formattedTime(message.date) }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import io from 'socket.io-client'

interface MessageType {
  text: string
  sender: string
  picture: string
  date: string
  citations?: any
}

interface UserDetails {
  userEmail: string
  userName: string
}

const socketConnection = ref(false)
const messages = ref<Array<MessageType>>([])
const socket = io('http://localhost:3000') // Replace with your server's IP address

socket.on('connect', () => {
  console.log('Operator Socket connected')
  socketConnection.value = true
})

socket.on('disconnect', () => {
  console.log('Operator Socket disconnected')
  socketConnection.value = false
})

socket.on('CustomerMessageToOperator', (data: MessageType) => {
  console.log('Received message from customer:', data)
  addMessageToUI(data)
})
socket.on('dfresponseToOperator', (data: MessageType) => {
  console.log('Received message from customer:', data)
  addMessageToUI(data)
})

socket.on('JoinedNotification', (userDetails: UserDetails) => {
  console.log(
    `User joined with ${userDetails.userEmail} as email and ${userDetails.userName} as username`
  )
})

socket.on('customerDisconnect', (roomId: string) => {
  console.log(`Customer disconnected from room ${roomId}`)
  // Handle customer disconnect event if needed
})

const addMessageToUI = (message: MessageType) => {
  messages.value = [...messages.value, message]
}

const formattedTime = (dateString: string) => {
  const date = new Date(dateString)
  const options: any = {
    hour: 'numeric',
    minute: 'numeric'
  }
  return date.toLocaleTimeString('en-US', options)
}
</script>
