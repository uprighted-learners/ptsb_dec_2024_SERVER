const express = require("express") // Importing the express library that was installed
const app = express() // Creating an instance of an Express Application
const port = 3000 // Providing a port number to access our server

const useDate = require("usedate")

// To access, send a GET request to localhost:3000
app.get("/user", (request, response) => {
    response.send("Hello world")
})

app.get("/date", (req, res) => {
    res.send(useDate("fdn, fmn dd yyyy"))
})

// Using req params to access unique values that can be sent to our endpoint
app.get("/delete/comment/:commentId", (req, res) => {
    // if connected to database one would carry over the comment id, and query the database

    // Any query parameters are going to be found in the req object, ex. req.params
    console.log(req.params.commentId)
    res.send(req.params)
})

// Listens for connections to our port
app.listen(port, () => {
    console.log(`Spinning at port: ${port}!`);
})