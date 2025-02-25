// Creating a variable to house the express router, providing us the ability to house endpoints/routes in this separate file
const router = require("express").Router();

// Importing the file reader/writer library
const fs = require("fs").promises;

// Variable to house the path to our mock data
const filePath = "./mock-data.json";

router.get("/all", async (req, res) => {
  try {
    // Using the fs library and the readfile method to read through our data
    let data = await fs.readFile(filePath, "utf8");

    // Converting the JSON mock data to a usable JS object
    let parsedData = JSON.parse(data);

    // Send back the posts using dot notation on the object.
    res.status(200).json({
      posts: parsedData.posts,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// localhost:8080/posts/create
router.post("/create", async (req, res) => {
  try {
    // Using the fs library and the readfile method to read through our data
    let data = await fs.readFile(filePath, "utf8");
    // Converting the JSON mock data to a usable JS object
    let parsedData = JSON.parse(data);

    // console.log(parsedData);
    // Create a new object to house the new data captured in req.body
    let newData = {
      id: parsedData.posts.length + 1,
      userId: req.body.userId,
      title: req.body.title,
      body: req.body.body,
    };

    // Push the newData object to the posts array
    parsedData.posts.push(newData);

    // Writing back to our mock data file with the newest changes (new post added)
    await fs.writeFile(filePath, JSON.stringify(parsedData));
    console.log("File written successfully!");

    res.status(200).json({
      status: "Success",
      posts: parsedData.posts,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

router.get("/params/:postId", async (req, res) => {
  try {
    // Using the fs library and the readfile method to read through our data
    let data = await fs.readFile(filePath, "utf8");
    // Converting the JSON mock data to a usable JS object
    let parsedData = JSON.parse(data);

    let filtered = parsedData.posts.filter((post) => post.id === +req.params.postId )

    if (filtered.length === 0) throw new Error("Post not found!")

    res.status(200).json({
        post: filtered[0]
    })

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// Exporting our router so it may be accessed in index.js
module.exports = router;
