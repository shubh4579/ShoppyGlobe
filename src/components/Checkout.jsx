//importing useState hook for managing state
import { useState } from "react";
// importing redux tools for interaction
import { useDispatch, useSelector } from "react-redux";
// for showing msg alert
import { toast } from "react-hot-toast";
// action to empty the cart
import { emptyCart } from "../utils/cartSlice";

function Checkout() {
  const dispatch = useDispatch();

  // get all items currently in cart from redux store
  const cartItems = useSelector((state) => state.cart);
  // state to store the selected payment option
  const [payment, setPayment] = useState("cod");

  // calculate the total price of all items in the cart
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // handle submit form
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    dispatch(emptyCart()); // empty cart after placing order
    toast.success(
      `Order placed with ${
        payment === "cod" ? "Cash on Delivery" : "Online Payment"
      }`
    );
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-5">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="bg-red-200 rounded p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {cartItems.length === 0 ? (
          <p className="text-red-500">Your cart is empty.</p>
        ) : (
          <ul className="space-y-3">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <span>
                  {item.title} (x{item.quantity})
                </span>
                <span className="text-right font-medium">
                  ₹{item.price * item.quantity}
                </span>
              </li>
            ))}
            <li className="flex justify-between font-bold text-lg pt-4">
              <span>Total</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </li>
          </ul>
        )}
      </div>

      <div className="bg-red-100 rounded p-4">
        <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Shipping Address"
            className="w-full border p-2 rounded"
            required
          />

          <div className="space-y-2">
            <h3 className="font-medium">Payment Method</h3>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={payment === "cod"}
                onChange={(e) => setPayment(e.target.value)}
              />
              <span>Cash on Delivery</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="payment"
                value="online"
                checked={payment === "online"}
                onChange={(e) => setPayment(e.target.value)}
              />
              <span>Online Payment</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-red-500 hover:bg-red-400 text-white py-2 rounded font-semibold"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
