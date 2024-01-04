<template>
  <div>
    <div v-if="!isAuthenticated">
      <OperatorNav />
      <!-- <pre>{{ conversation }}</pre> -->
      <div v-if="operatorChatEnabled" class="flex gap-2 flex-wrap">
        <newCustomerChat
          v-for="user in conversation"
          :key="user.roomId"
          :userName="user.userName"
          :messages="user.messages"
          :roomId="user.roomId"
          :style="{ whiteSpace: 'pre-wrap' }"
        />
      </div>
      <div v-else class="text-lg text-center mt-36 font">Waiting For User..</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { graphScopes, myMSALObj } from './msalConfig'
import { useUserStore } from './stores/counter'
import OperatorNav from './components/OperaterNav.vue'
import newCustomerChat from './components/newCustomerChat.vue' // Corrected component name
import type { AuthenticationResult } from '@azure/msal-browser'
import { io } from 'socket.io-client'
import router from './router'

interface MessageType {
  type: string
  message: string
  date: string
  roomId: string
  citations?: any
}

interface IUser {
  roomId: string
  userName: string
  messages: MessageType[]
}

const conversation = ref<IUser[]>([])
const userStore = useUserStore()
const room = ref('')
const isAuthenticated = ref(false) // Updated to boolean
const socketConnection = ref(false)
const socket = io('http://localhost:3000')
const operatorChatEnabled = ref(false)

onMounted(async () => {
  isAuthenticated.value = sessionStorage.getItem('authenticated') === 'true'

  try {
    const res = await myMSALObj.handleRedirectPromise()

    if (res?.account) {
      myMSALObj.setActiveAccount(res.account)
      userStore.idToken = res.idToken
      router.push('/')
      userStore.isAuthenticated = true
      window.history.pushState('', '')
      sessionStorage.setItem('authenticated', 'true')
    } else {
      userStore.isAuthenticated = false
      sessionStorage.removeItem('authenticated')
      await myMSALObj.loginRedirect(graphScopes)
    }
  } catch (error) {
    console.error('MSAL handleRedirectPromise error:', error)
  }
})
socket.on('connect', () => {
  console.log('Operator Socket connected')
  socketConnection.value = true
})

socket.on('RequestOperatorToJoin', (roomId: any) => {
  console.log('Request operator to join the room received')
  socket.emit('RequestToJoin', roomId)
})

socket.on('disconnect', () => {
  console.log('Operator Socket disconnected')
  socketConnection.value = false
})

socket.on('CustomerMessageToOperator', (data) => {
  console.log(data, 'shivani')

  console.log('Received message from customer:', data)
  updateConversation('customer', data.roomId, data.input, '')
})

socket.on('dfresponseToOperator', (data) => {
  console.log('Received response from Bot:', data)
  let updatedCitations = JSON.parse(data.citation)
  console.log('updatedCitations', updatedCitations)
  updateConversation(
    'bot',
    data.roomId,
    data.response.queryResult.fulfillmentText,
    updatedCitations
  )
})

socket.on('JoinedNotificationOp', (roomId) => {
  operatorChatEnabled.value = true
  room.value = roomId
  console.log(`User joined with ${roomId}`)

  // Add the new user to the conversation array
  conversation.value.push({
    roomId: roomId,
    userName: `User${conversation.value.length + 1}`,
    messages: []
  })
})

socket.on('customerDisconnect', (roomId: string) => {
  console.log(`Customer disconnected from room ${roomId}`)
  // Handle customer disconnect event if needed
})

const updateConversation = (type: string, roomId: string, message: string, citation: any) => {
  const userIndex = conversation.value.findIndex((user) => user.roomId === roomId)

  if (userIndex !== -1) {
    conversation.value[userIndex].messages.push({
      type,
      message,
      date: new Date().toISOString(),
      roomId: roomId,
      citations: citation
    })
  } else {
    conversation.value.push({
      roomId,
      userName: `User${conversation.value.length + 1}`,
      messages: [
        {
          type,
          message,
          date: new Date().toISOString(),
          roomId: roomId,
          citations: citation
        }
      ]
    })
  }
}

const getMessagesForUser = (roomId: string) => {
  const user = conversation.value.find((user) => user.roomId === roomId)

  // Check if user and messages exist, then return the messages array
  if (user && user.messages) {
    return user.messages
  }

  // If user or messages is undefined, return an empty array
  return []
}

const formattedDateTime = (dateString: string) => {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  }
  return date.toLocaleDateString('en-US', options)
}

const formattedTime = (dateString: string) => {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  }
  return date.toLocaleTimeString('en-US', options)
}
</script>
