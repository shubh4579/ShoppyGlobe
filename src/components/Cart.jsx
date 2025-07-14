// importing redux tools for interaction
import { useSelector, useDispatch } from "react-redux";
// import actions to remove items and update quantity
import { removeFromCart, updateQuantity } from "../utils/cartSlice";
// display toast alert
import { toast } from "react-hot-toast";
// icons
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
// import link to navigate to checkout page
import { Link } from "react-router-dom";

function Cart() {
  // get cart item from redux
  const cart = useSelector((state) => state.cart);
  // to dispacth actions
  const dispatch = useDispatch();
  //calculate total price of all items in cart
  const filteredCart = cart.filter((item) => item.quantity > 0);
  const total = filteredCart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // if cart is empty show msg
  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center flex flex-col items-center justify-center gap-4 mt-8">
        <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
        <ShoppingCartIcon className="w-100 h-100 text-grey-500" />
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="p-4 mt-4">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-6">
          Your Shopping Cart
          <ShoppingCartIcon className="h-10 w-10 text-red-500" />
        </h2>
      </div>

      {/** loop through each item in the cart */}
      <div className="space-y-6">
        {cart.map((item) => {
          const ratingStars = [...Array(Math.round(item.rating))];

          return (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center justify-between gap-4  border-2 border-red-400 rounded-lg shadow-md bg-red-200 p-4"
            >
              <div className="flex items-center gap-4 w-full md:w-2/3">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-24 h-24 object-contain rounded-md"
                />
                <div className="flex flex-col gap-3">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-900">Brand: {item.brand}</p>
                  <p className="flex items-center gap-1 text-yellow-500">
                    {ratingStars.map((_, index) => (
                      <StarIcon key={index} className="h-5 w-5" />
                    ))}
                    <span className="text-gray-900 text-sm ml-1">
                      ({Math.round(item.rating)})
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 text-sm">
                  {/** quantity input field */}
                  <label>Qty:</label>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => {
                      const newQty = Number(e.target.value);
                      if (newQty >= 1) {
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: newQty,
                          })
                        );
                      }
                    }}
                    className="w-14 border rounded px-2 py-1 text-center"
                  />
                </div>
                <p className="text-md font-medium text-green-700">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>

                {/**  remove item btn */}
                <button
                  onClick={() => {
                    dispatch(removeFromCart(item.id));
                    toast.success(`${item.title} Removed from cart `);
                  }}
                  className="bg-red-500  hover:bg-red-400  px-2 py-2 text-white cursor-pointer rounded-md font-medium text-sm "
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/** total price and checkout button */}
      <div className="mt-8 text-right">
        <h3 className="text-2xl font-bold text-gray-800">
          Total: ₹{total.toFixed(2)}
        </h3>
        {filteredCart.length > 0 && (
          <Link to="/checkout">
            <button className="mt-4 cursor-pointer bg-red-500 hover:bg-red-400 text-white text-sm px-2 py-2 rounded-md font-medium">
              Proceed to Checkout
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Cart;
