// import react router hook to get dynamic product id from url
import { useParams } from "react-router-dom";

// import custom data fetching hook
import useFetch from "../utils/useFetch";

// import redux tools to access and update cart state
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../utils/cartSlice";

// toast for alert
import { toast } from "react-hot-toast";

// star icon to show product rating
import { StarIcon } from "@heroicons/react/24/solid";

function ProductDetails() {
  const dispatch = useDispatch();

  // get the product id from url
  const { id } = useParams();

  // fetch data from custom hook which is useFetch
  const [data, loading, error] = useFetch(
    `https://dummyjson.com/products/${id}`
  );

  // get the current items in the cart
  const cartItems = useSelector((state) => state.cart);

  // display loading animation while fetching the data
  if (loading)
    return (
      <div className="p-6 text-center flex-col items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-15 w-15 border-2 border-t-red-400 border-red-200 mb-2"></div>
        <p className="text-sm text-gray-900">Loading product details...</p>
      </div>
    );

  // display error msg  if fetch fails
  if (error)
    return (
      <div className="p-6 text-center  bg-red-100 border border-red-300 ">
        <h2 className="text-red-700 font-bold mb-1">Something went wrong</h2>
        <p className="text-sm text-red-600">Error: {error}</p>
      </div>
    );

  // store product data
  const product = data;

  // check if this product is already in the cart
  const isInCart = cartItems.find((item) => item.id == product.id);

  // Calculate discount and original price
  const { price, discountPercentage } = product;
  const discountAmount = Math.round((price * discountPercentage) / 100);
  const actualPrice = Math.round(price + discountAmount);

  return (
    <div className="mt-19 bg-red-200 rounded-4xl max-w-5xl mx-auto p-4 grid md:grid-cols-2 gap-8">
      <div>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-80 object-contain  rounded-lg"
        />
      </div>

      <div>
        <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>
        <p className="text-sm text-gray-600">Brand: {product.brand}</p>
        <p className="text-sm text-gray-600 mb-2">
          Category: {product.category}
        </p>

        <div className="text-md flex gap-4 items-center mb-2">
          <span className="text-green-700 font-bold text-xl">
            ₹{Math.round(price)}
          </span>
          <span className="line-through text-gray-500 text-sm">
            ₹{actualPrice}
          </span>
          <span className="text-red-600 font-medium text-sm">
            (-₹{discountAmount})
          </span>
        </div>

        <div className="flex items-center  gap-1 text-sm text-yellow-500 mt-1">
          {[...Array(Math.round(product.rating))].map((_, index) => (
            <StarIcon key={index} className="h-5 w-5" />
          ))}
          <span className="text-gray-900 ml-1">
            ({Math.round(product.rating)})
          </span>
        </div>

        <p className="mt-4 text-gray-900">{product.description}</p>

        <div className="mt-6 space-y-2 text-sm text-gray-600">
          <p>
            <strong>Shipping:</strong> {product.shippingInformation}
          </p>
          <p>
            <strong>Return Policy:</strong> {product.returnPolicy}
          </p>
          <p>
            <strong>Warranty:</strong> {product.warrantyInformation}
          </p>
        </div>

        {/** add or remove from cart and toast msg wheather it added or removed */}
        {isInCart ? (
          <button
            onClick={() => {
              dispatch(removeFromCart(product.id));
              toast.success(`${product.title} removed from cart`);
            }}
            className="mt-4 cursor-pointer  bg-gray-500 hover:bg-gray-600 text-white text-sm px-2 py-2 rounded-md font-medium"
          >
            - Remove from Cart
          </button>
        ) : (
          <button
            onClick={() => {
              dispatch(addToCart(product));
              toast.success(`${product.title} added to cart`);
            }}
            className="mt-4 cursor-pointer  bg-red-500 hover:bg-red-400 text-white text-sm px-2 py-2 rounded-md font-medium"
          >
            + Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
