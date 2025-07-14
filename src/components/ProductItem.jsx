//import link for naviagation
import { Link } from "react-router-dom";
// import useDispatch to send actions to store and useSelector to read the current cart items from store
import { useDispatch, useSelector } from "react-redux";

// import actions to add or remove items from the cart
import { addToCart, removeFromCart } from "../utils/cartSlice";

//import toast to display alert
import { toast } from "react-hot-toast";

// star icon for displaying rating
import { StarIcon } from "@heroicons/react/24/solid";

function ProductItem({ product }) {
  const dispatch = useDispatch();

  // get current cart items from store
  const cartItems = useSelector((state) => state.cart);

  // check if this product is already in the cart
  const isInCart = cartItems.find((item) => item.id == product.id);

  // calculate discounted and original price
  const { price, discountPercentage } = product;
  const discountAmount = Math.round((price * discountPercentage) / 100);
  const actualPrice = Math.round(price + discountAmount);

  return (
    <div className="mt-5 bg-red-200 rounded-xl shadow-md p-4 hover:shadow-lg transition-all duration-300 w-full max-w-xs mx-auto">
      {/** clicking on the products takes the user to detail page */}
      <Link to={`/product/${product.id}`} className="block">
        <div className="flex justify-center">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-40 w-full object-contain rounded-md"
          />
        </div>
        <div className="mt-4">
          <h2 className="text-md font-semibold text-gray-800 truncate flex items-center justify-center">
            {product.title}
          </h2>
          <p className="text-sm text-gray-900 flex items-center justify-center">
            Brand: {product.brand}
          </p>
          <div className="mt-1 gap-5 text-sm flex items-center justify-center">
            <span className="text-green-700 font-bold">
              ₹{Math.round(price)}
            </span>
            <span className="line-through text-gray-600">₹{actualPrice}</span>
            <span className="text-red-600 font-medium">
              (-₹{discountAmount})
            </span>
          </div>
        </div>
      </Link>
      {/** display star icons based on product rating */}
      <div className="flex items-center justify-center gap-1 text-sm text-yellow-500 mt-1">
        {[...Array(Math.round(product.rating))].map((_, index) => (
          <StarIcon key={index} className="h-5 w-5" />
        ))}
        <span className="text-gray-700 ml-1">
          ({Math.round(product.rating)})
        </span>
      </div>

      {/** add to cart or remove from cart based on whether item is in the cart or not */}
      {isInCart ? (
        <button
          onClick={() => {
            dispatch(removeFromCart(product.id));
            toast.success(`${product.title} removed from cart`);
          }}
          className="mt-4 cursor-pointer w-full bg-black hover:bg-gray-600 text-white text-sm py-2 rounded-md font-medium"
        >
          - Remove from Cart
        </button>
      ) : (
        <button
          onClick={() => {
            dispatch(addToCart(product));
            toast.success(`${product.title} added to cart`);
          }}
          className="mt-4 cursor-pointer w-full bg-red-500 hover:bg-red-400 text-white text-sm py-2 rounded-md font-medium"
        >
          + Add to Cart
        </button>
      )}
    </div>
  );
}

export default ProductItem;
