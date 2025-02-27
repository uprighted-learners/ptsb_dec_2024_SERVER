const router = require("express").Router();
const db = require("../public/db.json");

router.post("/add", (req, res) => {
  try {
    /*
      [
          {
              "item": "milk",
              "price": 1.00
          }
      ]
    */
    // httpOnly: true, allows the cookie to be accessed by the web server
    // Expiration set in milliseconds for maxAge
    // res.cookie("cart", [...req.body],  { maxAge: 2000, httpOnly: true });
    res.cookie("cart", [...req.body],  { maxAge: 1000,  httpOnly: true });

    res.status(200).json("Added item");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// router.get("/added-items", (req, res) => {
//   try {
//     //? Create a cookie, a piece of data that can be saved to the user's machine from the server
//     res.cookie("cart", [
//       { item: "milk", price: 1.00 },
//       { item: "cheese", price: 3.00 },
//       { item: "dog food", price: 10.0 },
//     ]);
//     res.send("Added");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get("/get-updated-items", (req, res) => {
  try {
    // console.log(req.cookies);

    //? Assigning avail cookies to a variable
    const check = req.cookies;
    console.log("Current Cart:", check.cart);

    //? Array which will contain lower priced item objs... if found
    let offer = [];

    //? Creating an an empty array which will hold onto our current cart items.
    let cartUnupdated = [];

    //? Checking if cart exists
    if (check.cart) {
      check.cart.forEach((cartItem) => {
        console.log("obj", cartItem);

        //? Adding all of our current cart items to our un-updated array, creating a container for the "old" cart prices
        cartUnupdated.push({ ...cartItem });

        //? Pushing to our offer array if a lower priced item has been found from the database
        offer.push(
          //? Spreading the values from the filter method, or else offer will be an array that contains arrays.
          ...db.filter((dbItem) => {
            //? If item located and lower price found, add it to the filter
            if (dbItem.item == cartItem.item && dbItem.price < cartItem.price) {
              //? Updating current cart items price from db
              cartItem.price = dbItem.price;
              return true;
            } else {
              return false;
            }
          })
        );
      });
    }
    
    //? Creating an expression which will get our brand new total
    const total = check?.cart
      ?.reduce((acc, i) => (acc += i.price), 0)
      .toFixed(2);

    //? Same as above but for our old prices
    const oldPrice = cartUnupdated
      .reduce((acc, i) => (acc += i.price), 0)
      .toFixed(2);

    //? Checking our offer array, if a lower priced item is found, we'll send this back as our array
    if (offer.length > 0) {
      res.send({
        offer: `Found ${offer.length} item/s from updated db with lower prices!!`,
        newTotal: "$" + total,
        oldTotal: "$" + oldPrice,
        savings: `$${(oldPrice - total).toFixed(2)}`,
        itemsWithLowerPrices: offer,
        oldCartPrices: cartUnupdated,
        cookies: check,
      });
    } else {
      res.send({
        default: "No lower priced items found",
        total: total,
        cookies: check,
      });
    }
  } catch (err) {
    res.send(500).json(err);
  }
});

module.exports = router;
