// importing icons
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
// to navigate between pages
import { Link } from "react-router-dom";

// importing icons
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
// to get current cart data
import { useSelector } from "react-redux";

function Header() {
  // accessing cart items from store
  const cartItems = useSelector((store) => store.cart);

  return (
    //here i have created sticky header stays on top
    <header className="fixed top-0 left-0 w-full z-50 bg-red-300 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-black underline">
            ShoppyGlobe
          </h1>
          <ShoppingBagIcon className="w-8 h-8 sm:w-10 sm:h-10 text-black" />
        </div>

        <nav className="flex items-center space-x-4 sm:space-x-6 text-base sm:text-lg font-sans">
          <Link to={"/"} className="hover:text-white">
            Home
          </Link>

          <Link to={"/cart"} className="relative">
            <ShoppingCartIcon className="h-6 w-6 text-black hover:text-white cursor-pointer" />

            {/** display item count only when cart is not emptys */}
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
