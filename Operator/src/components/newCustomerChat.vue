<template>
  <div class="chat-container h-[500px] w-[400px] mt-2 ms-2 flex flex-col">
    <div class="header bg-black h-[60px] sticky top-0 pt-1">
      <span v-if="roomId" class="text-white">Room ID: {{ roomId }}</span>
    </div>

    <div class="message-content flex-1 overflow-y-auto">
      <div
        class="message-list text-black font-[400] text-[12px] flex justify-center mt-2 mb-2"
        v-if="messages && messages.length > 0"
      >
        <span>{{ formatDate(messages[0].date) }}</span>
      </div>
      <div
        v-for="message in messages || []"
        :key="message.date"
        class="message-container flex flex-col mb-2 text-sm ms-2 me-2"
        :style="{
          width: 'fit-content',
          border: '1px solid #ccc',
          borderRadius: '5px',
          padding: '8px',
          marginBottom: '10px',
          color: message.type === 'customer' ? 'black' : 'white',
          alignSelf: message.type === 'customer' ? 'left' : 'right',
          backgroundColor: message.type === 'customer' ? '#c2c3c3' : '#313131'
        }"
      >
        <div class="message-text text-xs rounded">
          <div>
            <p class="text-[10px] font-semibold">{{ message.type }}</p>
            <p class="{message.type === 'customer' ? 'text-black' : text-white}">
              {{ message.message }}
            </p>

            <!-- Display citations as referral links -->
            <p v-if="message.type === 'bot'" @click="toggleCitationsPopup">
              <a target="_blank" class="referral-link hover:text-white cursor-pointer">citations</a>
            </p>
            <div v-if="showPopup" class="modal rounded-lg">
              <div class="modal-header flex justify-between h-12 text-white bg-[#0073dd]">
                <h4 class="text-xl font-semibold text-white">Citations</h4>
                <h4 class="close" @click="toggleCitationsPopup">&times;</h4>
              </div>
              <div class="modal-content">
                <div
                  class="message-text mt-[3px]"
                  :style="{ whiteSpace: 'pre-wrap' }"
                  v-for="citation in message.citations"
                  :key="citation"
                >
                  <div v-for="content in citation" :key="content">
                    {{ content.content }}
                  </div>
                </div>
                <!-- Add styling or additional content for the modal as needed -->
              </div>
            </div>
          </div>
          <div class="flex justify-start">
            <span class="{message.type === 'customer' ? 'text-black' : 'text-white'} text-[8px]">{{
              formatTime(message.date)
            }}</span>
          </div>
        </div>
      </div>
      <!-- <div
        v-for="message in operatorMessages"
        :key="message"
        class="bg-black text-white w-14 ms-2 border border-1"
      >
        <p class="text-[10px] font-semibold">{{ message.type }}</p>
        <p class="{message.type === 'customer' ? 'text-black' : text-white} p-2 rounded-md">
          {{ message.text }}
        </p>
      </div> -->
    </div>
    <div class="relative flex w-full flex-wrap items-stretch mb-3">
      <input
        type="text"
        v-model="messageInput"
        @keyup.enter="sendMessage"
        placeholder="Message Here"
        class="px-3 ms-2 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-96 pr-10"
      />
      <span
        @click="sendMessage"
        class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-12 right-0 pr-3 py-3 cursor-pointer"
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
      <!-- <button class="bg-black text-white rounded-lg ms-2 ps-2 pe-2 h-9 mt-1">Agent</button> -->
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import io from 'socket.io-client'
interface MessageType {
  type: string
  message: string
  date: string
  roomId: string
  citations?: any
}

interface OperatorMessageType {
  text: string
  sender: string
  picture: string
  date: string
  pointsList?: string
}

export default {
  props: {
    userName: String,
    messages: Array as () => MessageType[] | undefined,
    roomId: String
  },
  setup(props: any) {
    const formatDate = (dateString: string) => {
      const date = new Date(dateString)
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }
      return date.toLocaleDateString('en-US', options)
    }
    console.log(props.messages, 'pppppppp')
    const formatTime = (dateString: string) => {
      const date = new Date(dateString)
      const options: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: 'numeric'
      }
      return date.toLocaleTimeString('en-US', options)
    }

    const messageInput = ref<string>('')
    const messages = ref<Array<MessageType>>([])
    const operatorMessages = ref<Array<OperatorMessageType>>([])
    const socket = io('http://localhost:3000') // Update with your server URL
    const isTyping = ref(false)

    const showPopup = ref(false)

    const toggleCitationsPopup = () => {
      showPopup.value = !showPopup.value
    }
    const sendMessage = () => {
      let messageInputValue = messageInput.value
      console.log(messageInput.value, 'hiiiii rajjjjj')
      if (messageInputValue.trim() !== '') {
        socket.emit('OperatorMessage', { input: messageInputValue, roomId: props.roomId })
        const userMessage = createMessage(messageInputValue, 'Operator')
        addMessageToUI(userMessage)

        messageInput.value = ''
      }
    }
    const createMessage = (text: string, sender: string): OperatorMessageType => {
      return {
        text,
        sender: sender,
        picture: '',
        date: new Date().toISOString()
      }
    }

    const addMessageToUI = (message: OperatorMessageType) => {
      console.log('message', message)
      operatorMessages.value = [...operatorMessages.value, message]
    }

    console.log('operator messages', operatorMessages)

    // const messageContainerClass = (messageType: string) => {
    //   return {
    //     'bg-gray-300': message.type === 'sender',
    //     'bg-gray-700': messageType !== 'sender',
    //     'bg-red-500': messageType === 'another-sender'
    //   }
    // }

    // const messageTextColorClass = (messageType: string) => {
    //   return messageType !== 'sender' ? 'text-white' : 'text-black'
    // }

    return {
      formatDate,
      formatTime,
      showPopup,
      toggleCitationsPopup,
      sendMessage,
      messageInput,
      operatorMessages
      // messageContainerClass,
      // messageTextColorClass
    }
  }
}
</script>

<style scoped>
.chat-container {
  border: 1px solid #ccc;
  border-radius: 5px;
}

.referral-link {
  color: #007bff; /* Set the color of the referral link */
  text-decoration: underline; /* Add underline for the link */
  margin-right: 5px; /* Adjust margin for spacing between links */
}
.header {
  background-color: #000;
  color: #fff;
  padding: 10px;
  border-radius: 5px 5px 0 0;
  justify-content: space-between;
  align-items: center;
}

.message-container {
  border-radius: 5px;
  max-width: 80%;
}
.message-content::-webkit-scrollbar {
  width: 4px;
}

/* Styling for the scrollbar handle (thumb) */
.message-content::-webkit-scrollbar-thumb {
  background-color: gray;
  border-radius: 5px;
}

/* Styling for the scrollbar handle when hovering */
.message-content::-webkit-scrollbar-thumb:hover {
  background-color: #dcdbdb;
}

/* Styling for the scrollbar track when not hovering over the scrollbar */
.message-content::-webkit-scrollbar-track {
  background-color: #ccc;
}

/* Styling for the scrollbar track when hovering over the scrollbar */
.message-content::-webkit-scrollbar-track:hover {
  background-color: #ddd;
}

/* Add your component-specific styles here */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  padding: 10%;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  justify-content: center;
  align-items: center;
  z-index: 1000;
  border-radius: 8px;
}

.modal-content {
  background-color: #fff;
  color: #000;
  padding: 20px;
  /* border-radius: 8px; */
  position: relative;
  height: 80%;
  overflow-y: scroll;
  border-bottom-left-radius: 8px;
}
.modal-content::-webkit-scrollbar {
  width: 8px;
  /* Set the width of the scrollbar */
}

.modal-content::-webkit-scrollbar-thumb {
  background-color: #ee8f22; /* Color of the scrollbar thumb */
  border-radius: 6px; /* Radius of the scrollbar thumb */
}

.modal-content::-webkit-scrollbar-track {
  background-color: #f1f1f1;
  border-radius: 6px; /* Radius of the scrollbar thumb */
  /* Color of the scrollbar track */
}

.close {
  font-size: 30px;
  cursor: pointer;
  color: white;
}

.modal-header {
  padding: 15px;
  border-bottom: 1px solid #ddd;
  border-radius: 8px 8px 0 0;
  position: relative;
}
</style>
