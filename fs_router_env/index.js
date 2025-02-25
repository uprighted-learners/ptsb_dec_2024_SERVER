// Use dotenv to load the environment variables found in the .env
require("dotenv").config()

// Importing the express library
const express = require("express")

// Creating a variable to house and initialize an express app 
const app = express()

// Assigning a port variable to the value that is found in the .env
// Using || (OR) Operator, to use the env PORT_NUMBER if it exists, if not use 3000
const port = process.env.PORT_NUMBER || 3000

// Import our controller
const postController = require("./controllers/posts_controller.js")

// Using middleware to allow our server to receive JSON
app.use(express.json())

// Using our controller //? (Tip:) You usually want to use them under the middleware
app.use("/posts", postController)


// Initialize our server to spin up at our port number
app.listen(port, () => {
    console.log(`Server spinning up at port: ${port}`);
})

