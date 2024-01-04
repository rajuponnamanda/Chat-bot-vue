const express = require("express");
const http = require("http").createServer(express);
const socketIO = require("socket.io");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

const io = socketIO(http, {
  cors: {
    origins: ["*"],
  },
});

// class for Gpt4Request
class Gpt4Request {
  constructor() {
    this.temperature = 0.3;
    this.max_tokens = 800;
    this.top_p = 0.5;
    this.frequency_penalty = 0;
    this.presence_penalty = 0;
    this.stop = null;
  }
}

// custom response class
class DetectIntentResponse {
  constructor(queryResult) {
    this.queryResult = queryResult;
  }
}

class QueryResult {
  constructor(fulfillmentText, fulfillmentMessages, intent) {
    this.fulfillmentText = fulfillmentText;
    this.fulfillmentMessages = fulfillmentMessages;
    this.intent = intent;
  }
}

class Intent {
  constructor(displayName) {
    this.displayName = displayName;
  }
}

async function makeOpenAIRequest(jsonPayload, openaiEndpoint, apiKey) {
  try {
    const headers = {
      "Content-Type": "application/json",
      "API-Key": apiKey,
    };

    // console.log("OpenAI Request Details:");
    // console.log("Endpoint:", openaiEndpoint);
    // console.log("Headers:", headers);
    // console.log("Payload:", jsonPayload);

    const response = await axios.post(openaiEndpoint, jsonPayload, {
      headers,
    });

    // console.log("OpenAI Response:", response.data);
    console.log(
      response.data.choices[0].message.context.messages[0].content,
      "shewww"
    );
    return response.data.choices[0].message;
  } catch (error) {
    console.error("Error in OpenAI request:", error);
    throw new Error("OpenAI Request Error");
  }
}

let users = [];
// console.log(users, "asndfasdf");
let responseArray = null;
let responseCitations = null;

io.on("connect", (socket) => {
  socket.on("RequestToJoin", (socketId) => {
    console.log("raju", socketId);
    const roomId = socketId;
    console.log(users.includes(roomId));
    socket.join(roomId);
    if (users.includes(roomId)) {
      console.log(`Joining existing room with ID - ${roomId}`);
      socket.join(roomId);
      socket.to(roomId).emit("JoinedNotification", roomId);
      socket.emit("JoinedNotificationOp", roomId);
    } else {
      users.push(roomId);
      socket.join(roomId);
      socket.broadcast.emit("RequestOperatorToJoin", roomId);
    }

    // Get all rooms the socket is in
    // const rooms = Array.from(socket.rooms);

    // if (rooms.length > 1) {
    //   // The socket is already in a room, handle accordingly
    //   // ...

    //   // Callback with the assigned roomId (assuming callback is used)
    //   callback(rooms[1]);
    // } else {
    //   const roomId = generateRoomId();
    //   if (users.includes(roomId)) {
    //     console.log(`Joining existing room with ID - ${roomId}`);
    //     socket.join(roomId);
    //     socket
    //       .to(roomId)
    //       .emit(
    //         "JoinedNotification",
    //         "An operator has joined the session...Your session Id is - " + roomId
    //       );
    //   } else {
    //     users.push(roomId);
    //     socket.join(roomId);
    //     socket.broadcast.emit("RequestOperatorToJoin", roomId);
    //     console.log(`Creating a new room with ID - ${roomId} and joining`);
    //   }

    //   // Callback with the assigned roomId (assuming callback is used)
    //   // callback(roomId);
    // }

    socket.on("CustomerTextMessage", (data) => {
      console.log(`Message from customer in room ${data.roomId}:`, data);
      socket.to(data.roomId).emit("CustomerMessageToOperator", data);
      const queryText = data.input;

      runSample(queryText).then(() => {
        socket.emit("dfResponseToCustomer", responseArray);
        setTimeout(() => {
          socket.to(data.roomId).emit("dfresponseToOperator", {
            response: responseArray,
            citation: responseCitations,
            roomId: data.roomId,
          });
        }, 1500);
      });
    });

    socket.on("disconnect", () => {
      console.log(`Socket ID ${socket.id} disconnected`);

      // Get all rooms the socket is in
      const rooms = Array.from(socket.rooms);

      // Remove the disconnected socket from each room
      rooms.forEach((room) => {
        socket.to(room).emit("customerDisconnect", room);
        users = users.filter((item) => item !== room);
      });
    });
  });
});

async function runSample(queryText, sessionId) {
  const request = {
    session: sessionId,
    queryInput: {
      text: {
        text: queryText,
        languageCode: "en-US",
      },
    },
  };
  const openaiEndpoint =
    "https://sst-openai.openai.azure.com/openai/deployments/gpt432k/extensions/chat/completions?api-version=2023-08-01-preview";
  const apiKey = "9f2e59e714a94317a4a06a839ab4ac26";

  const msgData = [
    {
      role: "user",
      content: queryText,
    },
  ];
  const aISummaryRequest = new Gpt4Request();
  aISummaryRequest.messages = msgData;
  aISummaryRequest.dataSources = [
    {
      type: "AzureCognitiveSearch",
      parameters: {
        endpoint: "https://speechtotextsearchservice.search.windows.net",
        key: "HjNThlHNKAN3bzGu4NvRJMHWgu1UsipniyAGDzzhmAAzSeBw406M",
        indexName: "sstpoc-index",
      },
    },
  ];
  const jsonPayload = JSON.stringify(aISummaryRequest, null, 2);
  const responseTextOAI = await makeOpenAIRequest(
    jsonPayload,
    openaiEndpoint,
    apiKey
  );

  const intentText =
    responseTextOAI.content.includes("Het spijt me") ||
    responseTextOAI.content.includes("Sorry, I didn't get that.") ||
    queryText.includes("talk to human")
      ? "manual"
      : "";

  const responses = [];
  responses[0] = new DetectIntentResponse(
    new QueryResult(responseTextOAI.content, ["test"], new Intent(intentText))
  );
  responseCitations = responseTextOAI.context.messages[0].content;
  responseArray = responses[0];
  console.log(responseCitations, "salaar");
  const result = responses[0].queryResult;
  // console.log(result);
  const responseText = result.fulfillmentText;

  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log("  No intent matched.");
  }
}

function generateRoomId() {
  return Math.random().toString(36).substring(2, 15);
}

app.get("/", (req, res) => res.send("hello...!!!"));

http.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
