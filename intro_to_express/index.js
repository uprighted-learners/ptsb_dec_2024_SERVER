const express = require("express"); // Importing the express library that was installed
const useDate = require("usedate");
const app = express(); // Creating an instance of an Express Application
const port = 3000; // Providing a port number to access our server

//? Middleware
// Allows the parsing of data that is submitted through a form
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Allows the parsing of json data, allows our endpoint to receive json data
app.use(express.json());

// To access, send a GET request to localhost:3000
app.get("/hello", (request, response) => {
  response.status(200).json({status: "Hello world"});
});

app.get("/date", (req, res) => {
  res.send(useDate("fdn, fmn dd yyyy"));
});

// Using req params to access unique values that can be sent to our endpoint
app.get("/delete/comment/:commentId", (req, res) => {
  // if connected to database one would carry over the comment id, and query the database

  // Any query parameters are going to be found in the req object, ex. req.params
  console.log(req.params.commentId);
  res.send(req.params);
});

// Endpoint to match our form in the static html file
app.post("/submit-form", (req, res) => {
  // console.log(req.body);

  let userName = req.body.username;
  let password = req.body.password;
  let email = req.body.email;

  // Save the data to a database
  // ...

  // Other computational logic
  res.json({
    status: `Thank you, ${userName}, you are signed up!`,
    email: email,
  });
});

app.get("/api/users/:userId", (req, res) => {

  // Access our parameter variable's value
  
  console.log(req.params.userId)

  // Assigning our req.param value to a variable, and utilizing the '+' sign to convert our numerical string into a number
  let userId = +req.params.userId

  // Create a users array
  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ];


  // Filtering through the users array, to find an obj with a matching id to our req.param 
  const myFilteredArray = users.filter((userObj) => userObj.id === userId )

  // console.log(myFilteredArray);

  // send the array back as a JSON response
  res.json(myFilteredArray[0])

});

app.post("/create-user", (req, res)=> {

  console.log("THE BODY: ", req.body);

  let userName = req.body.username
  let password = req.body.password

  // Write the user data to a database here ... 

  res.json({
    status: `${userName} was created!`
  })
  
})


// Listens for connections to our port
app.listen(port, () => {
  console.log(`Spinning at port: ${port}!`);
});
