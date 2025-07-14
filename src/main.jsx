//imported strict mode to help catch errors
import { StrictMode } from "react";
// render our react app to html page
import { createRoot } from "react-dom/client";
//load component only when needed
import { lazy, Suspense } from "react";
//main component of of the app which have header and outlet
import App from "./App.jsx";
//setting up routing switching between pages
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//these components load only when user wants to visits that page
const ProductList = lazy(() => import("./components/ProductList.jsx"));
const Cart = lazy(() => import("./components/cart.jsx"));
const Checkout = lazy(() => import("./components/Checkout.jsx"));
const ProductDetails = lazy(() => import("./components/ProductDetails.jsx"));
//error component shows when something went wrong with routing
import Error from "./components/Error.jsx";
//setting up redux so all components have access the global state
import { Provider } from "react-redux";
import { store } from "./utils/store.js";

const appRouter = createBrowserRouter([
  {
    path: "/", //main route
    element: <App />, //main component
    errorElement: <Error />, //shows if there routing error
    children: [
      {
        path: "/", //Home page route
        element: (
          <Suspense
            fallback={
              <div className="text-center mt-10">Loading Product...</div>
            }
          >
            <ProductList />
          </Suspense>
        ),
      },
      {
        path: "/Product/:id", //product details route
        element: (
          <Suspense
            fallback={
              <div className="text-center mt-10">
                Loading Product Details...
              </div>
            }
          >
            <ProductDetails />
          </Suspense>
        ),
      },
      {
        path: "/cart", //cart page route
        element: (
          <Suspense
            fallback={<div className="text-center mt-10">Loading Cart...</div>}
          >
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "/checkout", //checkout page route
        element: (
          <Suspense
            fallback={
              <div className="text-center mt-10">Loading Checkout...</div>
            }
          >
            <Checkout />
          </Suspense>
        ),
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  //render all components in root index.html
  //Provider provides redux store access to all components
  //RouterProvider routes with the help of appRouter
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  </StrictMode>
);
