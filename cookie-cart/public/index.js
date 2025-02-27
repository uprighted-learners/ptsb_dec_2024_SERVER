const card = document.querySelector(".card");
const cardContainer = document.querySelector(".card-container");
const cartContainer = document.querySelector(".cart-container");
const status = document.querySelector(".status");

let cart = [];

const getItems = async () => {
  const results = await fetch("./db.json");
  const json = await results.json();
  console.log(json);

  displayItems(json, "items");
};

getItems();

const displayItems = (jsonArray, location) => {
  if (location == "cart") {
    while (cartContainer.firstChild) {
      cartContainer.removeChild(cartContainer.firstChild);
    }
  }

  jsonArray.forEach((i, idx) => {
    let card = document.createElement("div");
    card.classList.add("card");

    let name = document.createElement("h2");
    name.textContent = i.item;
    let price = document.createElement("h3");
    price.textContent = `$${i.price}`;
    let emoji = document.createElement("h1");
    emoji.textContent = i.emoji;

    card.appendChild(emoji);
    card.appendChild(name);
    card.appendChild(price);

    card.style.cursor = "pointer";
    if (location === "items") {
      cardContainer.appendChild(card);
      card.addEventListener("click", async (e) => {
        console.log("card was clicked");
        cart.push({
          id: i.id,
          item: i.item,
          emoji: i.emoji,
          price: i.price,
        });

        await addItem(i);
        displayItems(cart, "cart");
      });
    } else {
      cartContainer.appendChild(card);
      card.addEventListener("click", (e) => {
        console.log("card was clicked");
        cart = cart.filter((c) => c.id !== i.id);
        displayItems(cart, "cart");
      });
    }
  });
};

const addItem = async (obj) => {
  const res = await fetch("http://localhost:4003/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cart),
  });

  const json = await res.json();
  console.log(json);

  await displayStatus();
};

const displayStatus = async () => {
  const res = await fetch("http://localhost:4003/get-updated-items");
  const json = await res.json();

  while (status.firstChild) {
    status.removeChild(status.firstChild);
  }

  console.log(json);

  if(json.cookies.cart){
    cart=json.cookies.cart
    displayItems(cart,"cart")
  }

  if (json.total) {
    let total = document.createElement("h2");
    total.textContent = "$" + json.total;

    status.appendChild(total);
    console.log(json.total);
  }

  if(json.oldTotal ){
    let oldTotal = document.createElement("h2");
    let newTotal = document.createElement("h2");
    let savings = document.createElement("h2");
    
    oldTotal.textContent = "Old Total:"+  json.oldTotal;
    newTotal.textContent = "New Total:"+  json.newTotal;
    savings.textContent = "Savings:"+  json.savings;

    status.appendChild(oldTotal);
    status.appendChild(newTotal);
    status.appendChild(savings);
  }



  if (json.default) {
    let total = document.createElement("h2");
    total.textContent =  json.default;
    status.appendChild(total);
    console.log(json.total);
  }
};

displayStatus();



