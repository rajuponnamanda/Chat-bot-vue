// const http = require('http')
// const WebSocket = require('ws')

// const server = http.createServer()
// const wss = new WebSocket.Server({ server })

// let clients = new Map()
// let clientId = 1

// wss.on('connection', (ws) => {
//   const userId = clientId++
//   const userDetails = {
//     id: userId,
//     name: `User ${userId}`,
//     picture: null
//   }
//   clients.set(userId, { ws, userDetails })

//   console.log(`${userDetails.name} connected`)

//   ws.on('message', (message) => {
//     try {
//       const parsedMessage = JSON.parse(message)
//       console.log(parsedMessage)

//       if ('picture' in parsedMessage) {
//         for (const [clientId, client] of clients) {
//           if (client.ws.readyState === WebSocket.OPEN) {
//             const msg = {
//               id: parsedMessage.sender,
//               text: parsedMessage.text,
//               sender: parsedMessage.sender,
//               picture: parsedMessage.picture
//             }
//             client.ws.send(JSON.stringify(msg))
//           }
//         }
//       } else {
//         console.error("'picture' property is missing in the received message")
//       }
//     } catch (error) {
//       console.error('Error parsing incoming message:', error)
//     }
//   })

//   ws.on('close', () => {
//     console.log(`${userDetails.name} disconnected`)
//     clients.delete(userId)
//   })
// })

// const PORT = process.env.PORT || 3000

// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`)
// })