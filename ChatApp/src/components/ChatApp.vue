<!-- CustomerApp.vue -->
<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <div
      class="border border-gray-300 w-[400px] h-[500px] mt-48 flex flex-col justify-end rounded-md me-5 shadow-lg"
    >
      <div class="header bg-black flex rounded-t-md shadow-md">
        <h1 class="mt-1 mb-1">Welcome, {{ user ? user.name : 'Loading...' }}</h1>
        <button @click="closeBot" class="bg-black rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="white"
            class="w-6 h-6 rounded-full bg-black ms-[110px] pb-[5px]"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="chat-container flex-1 overflow-y-auto bg-gray-100">
        <ul class="message-list" id="message-list">
          <div v-if="messages.length > 0" class="text-center text-xs mt-2 mb-2">
            {{ formattedDateTime(messages[0].date) }}
          </div>
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
              color: message.sender === user?.nickname ? 'black' : 'white',
              alignSelf: message.sender === user?.nickname ? 'flex-end' : 'flex-start',
              backgroundColor: message.sender === user?.nickname ? '#c2c3c3' : '#313131'
            }"
          >
            <div class="flex">
              <div
                class="message-text flex mt-[3px]"
                :style="{ whiteSpace: 'pre-wrap' }"
                v-html="message.text"
              ></div>
              <img
                v-if="message.picture"
                :src="message.picture"
                alt=""
                class="w-6 h-6 rounded-full ms-4"
                referrerPolicy="no-referrer"
              />
            </div>
            <div class="date-time mt-[2px]">{{ formattedTime(message.date) }}</div>
          </li>
          <div class="typing-indicator" v-if="isTyping">
            Is typing
            <span class="mt-1 ms-2"></span>
            <span class="mt-1"></span>
            <span class="mt-1"></span>
          </div>
        </ul>
      </div>
      <div class="relative flex w-full flex-wrap items-stretch bg-gray-100">
        <input
          v-model="messageInput"
          @keyup.enter="sendMessage"
          type="text"
          placeholder="Message Here"
          class="px-3 ms-2 py-3 placeholder-blueGray-300 mb-2 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-80 pr-10"
        />
        <span
          @click="sendMessage"
          class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-28 right-0 pr-3 py-3 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1"
            stroke="gray"
            class="absolute top-2 w-6 h-6 mt-[2px] ms-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </span>
        <button
          :class="{ 'bg-gray-300': isDisabled, 'bg-black': !isDisabled }"
          :disabled="isDisabled"
          class="text-white rounded-lg ms-2 ps-2 pe-2 h-9 mt-1"
        >
          Agent
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { auth0 } from '../auth0Config'
import { ref, onMounted, defineProps, defineEmits, computed } from 'vue'
import io from 'socket.io-client'
import { v4 } from 'uuid'

interface MessageType {
  text: string
  sender: string
  picture: string
  date: string
  pointsList?: string
}

interface BotResponse {
  [x: string]: any
  response: {
    queryResult: {
      fulfillmentText: string
    }
  }
}

interface UserDetails {
  userEmail: string
  userName: string
}

const openBot = ref()
const isDisabled = ref(true)
const emit = defineEmits()

const closeBot = () => {
  // Emit the event to notify the parent component (App.vue) to close the bot
  emit('closeBot')
}

const { user } = auth0
const sessionId = computed<any>(() => {
  if (sessionStorage.getItem('storedSessionId')) {
    return sessionStorage.getItem('storedSessionId')
  } else {
    const sessionId = v4()
    // sessionStorage.setItem('storedSessionId', sessionId)
    return sessionId
  }
})
const messageInput = ref<string>('')
const messages = ref<Array<MessageType>>([])
const socket = io('http://localhost:3000') // Update with your server URL
const isTyping = ref(false)

socket.on('connect', () => {
  console.log('Socket connected')
  const userDetails = {
    userEmail: user.value?.email,
    userName: user.value?.given_name
  }

  console.log(userDetails, sessionId)
  socket.emit('RequestToJoin', sessionId.value)
})

socket.on('disconnect', () => {
  console.log('Socket disconnected')
})

socket.on('JoinedNotification', (roomId) => {
  console.log(`User joined with${roomId} `)
})

const sendMessage = () => {
  let messageInputValue = messageInput.value

  if (messageInputValue.trim() !== '') {
    socket.emit('CustomerTextMessage', { input: messageInputValue, roomId: sessionId.value })
    const userMessage = createMessage(messageInputValue, 'Customer')
    addMessageToUI(userMessage)

    messageInput.value = ''
    showTypingIndicator()
  }
}

const createMessage = (text: string, sender: string): MessageType => {
  return {
    text,
    sender: sender === 'Customer' ? user.value?.nickname || 'Guest' : 'Bot',
    picture: sender === 'Customer' ? user.value?.picture || '' : '',
    date: new Date().toISOString()
  }
}

const addMessageToUI = (message: MessageType) => {
  messages.value = [...messages.value, message]
}

const showTypingIndicator = () => {
  isTyping.value = true
}

const hideTypingIndicator = () => {
  isTyping.value = false
}

onMounted(() => {
  socket.on('dfResponseToCustomer', (data: BotResponse) => {
    console.log('Received response from server:', data)
    if (
      data.queryResult.fulfillmentText ==
      'The requested information is not available in the retrieved data. Please try another query or topic.'
    ) {
      console.log('hello string')
      isDisabled.value = false
    } else {
      console.log('raju')
      isDisabled.value = true
    }
    console.log(data, 'shivani')

    const formattedMessage = {
      text: data.queryResult.fulfillmentText,
      sender: 'Bot',
      picture: '',
      date: new Date().toISOString(),
      pointsList: ''
    }

    messages.value = [...messages.value, formattedMessage]
    console.log(formattedMessage)
    hideTypingIndicator()

    // Emit the customer message to the operator app
    socket.emit('CustomerMessageToOperator', formattedMessage)
  })
})

const formattedDateTime = (dateString: string) => {
  const date = new Date(dateString)
  const options: any = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
  return date.toLocaleDateString('en-US', options)
}

const formattedTime = (dateString: string) => {
  const date = new Date(dateString)
  const options: any = {
    hour: 'numeric',
    minute: 'numeric'
  }
  return date.toLocaleTimeString('en-US', options)
}
// function emits(arg0: string) {
//   throw new Error('Function not implemented.')
// }
</script>

<style scoped>
.header {
  width: 100%;
  padding: 10px;
  text-align: start;
  color: white;
}
.typing-indicator {
  width: fit-content;
  /* border: 1px solid #ccc; */
  border-radius: 5px;
  padding: 8px;
  margin-bottom: 10px;
  color: rgb(0, 0, 0);
  background-color: #f7f4f4;
}
.header-text {
  margin: 0;
}
/* .typing-indicator {
  color: #555;
  font-style: italic;
} */

.chat-container {
  flex: 1;
}

.message-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.message-input {
  flex: 1;
  padding: 8px;
  margin-right: 8px;
}

.send-button {
  padding: 8px;
}

.message-item {
  width: fit-content;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 8px;
  margin-bottom: 10px;
  color: black;
}

.sender-name {
  margin-bottom: 5px;
}

.date-time {
  font-size: 10px;
  text-align: start;
}

.typing-indicator {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.typing-indicator span {
  display: inline-block;
  width: 6px;
  height: 6px;
  margin-right: 3px;
  background-color: #000;
  border-radius: 50%;
  animation: typing 0.6s infinite;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* .typing-indicator.is-typing {
  display: none;
} */

.chat-container::-webkit-scrollbar {
  width: 10px;
}

/* Styling for the scrollbar handle (thumb) */
.chat-container::-webkit-scrollbar-thumb {
  background-color: #4a4a4a;
  border-radius: 5px;
}

/* Styling for the scrollbar handle when hovering */
.chat-container::-webkit-scrollbar-thumb:hover {
  background-color: #333;
}

/* Styling for the scrollbar track when not hovering over the scrollbar */
.chat-container::-webkit-scrollbar-track {
  background-color: #ccc;
}

/* Styling for the scrollbar track when hovering over the scrollbar */
.chat-container::-webkit-scrollbar-track:hover {
  background-color: #ddd;
}
</style>
