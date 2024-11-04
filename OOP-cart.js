const CART_ITEMS_CONTAINER = document.getElementById("cart-items-container");
const DISPLAY_CART_TOTAL = document.getElementById("cart-price-total");
const CHECKOUT_BUTTON = document.getElementById("check-out-btn");

class cart {
  constructor(
    product_id,
    product_image,
    product_name,
    product_price,
    product_quantity
  ) {
    this.product_id = product_id;
    this.product_image = product_image;
    this.product_name = product_name;
    this.product_price = product_price;
    this.product_quantity = product_quantity;
  }
}

class cartlists {
  constructor(cartlists) {
    this.cartlists = cartlists;
  }
  // method to delete cart items
  deleteCartItem(ProductID) {
    const productsLeftInCart = [];
    for (let i = 0; i < this.cartlists.length; i++) {
      if (this.cartlists[i].product_id !== ProductID) {
        productsLeftInCart.push(this.cartlists[i]);
      }
    }
    this.cartlists = productsLeftInCart;
    this.display_cart_items();
    this.calculateCartTotal();
  }

  // A method to increase product quantity

  increaseProductQuantity(ProductID) {
    for (let i = 0; i < this.cartlists.length; i++) {
      if (this.cartlists[i].product_id === ProductID) {
        this.cartlists[i].product_quantity++;
      }
    }
    this.display_cart_items();
    this.calculateCartTotal();
  }

  // A method to decrease product quantity
  decreaseProductQuantity(ProductID) {
    for (let i = 0; i < this.cartlists.length; i++) {
      if (this.cartlists[i].product_id === ProductID) {
        this.cartlists[i].product_quantity--;
      }
    }
    this.display_cart_items();
    this.calculateCartTotal();
  }

  // A method to calculate cart total
  calculateCartTotal() {
    let totalCost = 0;
    for (let i = 0; i < this.cartlists.length; i++) {
      totalCost +=
        this.cartlists[i].product_price * this.cartlists[i].product_quantity;
      DISPLAY_CART_TOTAL.textContent = formatToNaira(totalCost);
    }
    return totalCost;
  }

  // A method to display cart lists
  display_cart_items() {
    let product_to_display = [];
    for (let i = 0; i < this.cartlists.length; i++) {
      const cart_product = `
        <div class="cartlists">
          <div class="product">
            <img
              class="product-image"
              src="${this.cartlists[i].product_image}"
              alt="product image"
            />
            <div>
              <h3 class="name">${this.cartlists[i].product_name}</h3>
              <button class="btn-delete" id=${
                this.cartlists[i].product_id
              }>Delete</button>
            </div>
          </div>
          <div class="rate">
            <p class="price">${formatToNaira(
              this.cartlists[i].product_price
            )}</p>
            <div class="selection">
              <button><i class="plus-btn fa-solid fa-plus" id=${
                this.cartlists[i].product_id
              }></i></button>
              <p class="quantity">${this.cartlists[i].product_quantity}</p>
              <button><i class="minus-btn fa-solid fa-minus" id=${
                this.cartlists[i].product_id
              }></i></button>
            </div>
            <p><i class="heart fa-regular fa-heart"></i></p>
          </div>
        </div>
    `;
      product_to_display.push(cart_product);
    }
    console.log(product_to_display);

    if (product_to_display.length === 0) {
      CART_ITEMS_CONTAINER.innerHTML = `<h1 class="price"> Cart item is empty please add items to cart</h1>`;
      DISPLAY_CART_TOTAL.textContent = formatToNaira(0);
      // DISPLAY_CART_TOTAL.textContent = 0;
      return;
    }

    CART_ITEMS_CONTAINER.innerHTML = product_to_display.join("");
    // increase product quantity
    const increase_btn = document.querySelectorAll(".plus-btn");
    increase_btn.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        let productID = parseInt(event.target.getAttribute("id"));
        this.increaseProductQuantity(productID);
      });
    });

    // decrease product quantity
    const decrease_btn = document.querySelectorAll(".minus-btn");
    decrease_btn.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        let productID = parseInt(event.target.getAttribute("id"));
        this.decreaseProductQuantity(productID);
      });
    });

    // delete cart items
    const delete_btn = document.querySelectorAll(".btn-delete");
    delete_btn.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        let productID = parseInt(event.target.getAttribute("id"));
        this.deleteCartItem(productID);
      });
    });
  }
  // display cart lists ends here
}

let cartItems = [
  new cart(
    1,
    "https://th.bing.com/th/id/OIP.49zpK_09Hnm_dqC4iQRCSAHaIC?w=181&h=196&c=7&r=0&o=5&pid=1.7",
    "Luxury Chair",
    1500,
    1
  ),
  new cart(
    2,
    "https://th.bing.com/th/id/OIP.tCue6PLiRdAbLCXivOFPigHaIw?w=162&h=189&c=7&r=0&o=5&pid=1.7",
    "Wooden Chair",
    1500,
    1
  ),
  new cart(
    3,
    "https://th.bing.com/th?id=OIF.Zhgi8mdCH385%2bkeQ1X0Byg&w=156&h=180&c=7&r=0&o=5&pid=1.7",
    "Gaming Chair",
    1500,
    1
  ),
  new cart(
    4,
    "https://th.bing.com/th/id/OIF.VbqwMhD4gtkXQ8xIl1PmdQ?w=189&h=189&c=7&r=0&o=5&pid=1.7",
    "Wheel Chair",
    1500,
    1
  ),
];

// Create an instance of the cart class
const CustomerShoppingCart = new cartlists(cartItems);
CustomerShoppingCart.display_cart_items();
CustomerShoppingCart.calculateCartTotal();

CHECKOUT_BUTTON.addEventListener("click", handleCheckout);
function handleCheckout() {
  console.log(CustomerShoppingCart.cartItems());
  console.log(CustomerShoppingCart.calculateCartTotal());
}

function formatToNaira(amount, options = {}) {
  const { useSymbol = true, decimalplaces = 2, useGrouping = true } = options;

  //check if the input isa valid Number
  if (typeof amount !== "number" || isNaN(amount)) {
    throw new Error("Invalid input. Please provide a valid number.");
  }
  // format the number
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: decimalplaces,
    maximumFractionDigits: decimalplaces,
    useGrouping: useGrouping,
  });

  let formattedAmount = formatter.format(amount);

  // Replace the currency symbol with Naira symbol
  if (useSymbol) {
    formattedAmount = formattedAmount.replace("NGN", "₦");
  } else {
    formattedAmount = formattedAmount.replace("₦", "NGN");
  }
  return formattedAmount;
}
