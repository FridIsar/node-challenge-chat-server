const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

var id = 1;
const welcomeMessage = {
  id: id,
  from: "Ali",
  text: "Welcome to MigraCode chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

//START OF YOUR CODE...

// Define the POST /messages route
app.post('/messages', (request, response) => {
  // Set the message using request body values (and auto incrementing id)
	const {from, text} = request.body;
	if (from === "" || text === "")	{
		response.sendStatus(400);
	}
	else	{
		id = id + 1;
	  const message = {
		  id: id,
		  from: from,
		  text: text,
		};
	  // Add the message to the messages array
	  messages.push(message);
	  // Send the message as the response
	  response.send(message);
	}
});

// Define the GET /messages route
app.get('/messages', (req, res) => {
  // Send the messages as the response
  res.send(messages);
});

// Define the GET /messages/:id route
app.get('/messages/:id', (req, res) => {
  // Get the message id from the route parameter
  const id = req.params.id;

  // Find the message with the matching id
  const message = messages.find((message) => message.id === Number(id));

  // If a message was found, send it as the response. Otherwise, send a 404 response.
  if (message) {
    res.send(message);
  } else {
    res.sendStatus(404);
  }
});

// Define the DELETE /messages/:id route
app.delete('/messages/:id', (req, res) => {
  // Get the message id from the route parameter
  const id = req.params.id;

  // Find the index of the message with the matching id
  const index = messages.findIndex((message) => message.id === Number(id));

  // If a message was found, delete it from the messages array and send a 200 response.
  // Otherwise, send a 404 response.
  if (index !== -1) {
    messages.splice(index, 1);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

//...END OF YOUR CODE

module.exports = app