//import hooks from react
import { useEffect, useState } from "react";

//import custom hook for fetching data
import useFetch from "../utils/useFetch";

//product card component to display individual product
import ProductItem from "./ProductItem";

// toast for alert
import { toast } from "react-hot-toast";

function ProductList() {
  // states to hold the search input value
  const [search, setSearch] = useState("");

  // states to hold filtered search result
  const [filteredProducts, setFilteredProducts] = useState(null);

  // display toast if search return no results
  useEffect(() => {
    if (filteredProducts !== null && productsToShow.length === 0) {
      toast.error("No matching products found");
    }
  }, [filteredProducts]);

  // use custom hook to fetch products from API
  const [data, loading, error] = useFetch("https://dummyjson.com/products");

  // display loading animation while data is being fetched
  if (loading)
    return (
      <div className="p-6 text-center flex-col items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-2 border-t-red-400 border-red-200 mb-2"></div>
        <p className="text-sm text-gray-900">Loading product details...</p>
      </div>
    );

  // display error msg is fetch fails
  if (error)
    return (
      <div className="p-6 text-center bg-red-100 border border-red-300">
        <h2 className="text-red-700 font-bold mb-1">Something went wrong</h2>
        <p className="text-sm text-red-600">Error: {error}</p>
      </div>
    );

  // function to handle search button click
  const handleSearch = () => {
    const results = data.products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(results);
  };

  // decide which product list to show filtered or full product
  const productsToShow =
    filteredProducts !== null ? filteredProducts : data.products;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row gap-2 items-center justify-center mb-6 mt-6">
        <input
          type="text"
          placeholder="Search Product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 mt-3 px-4 py-2 border-2 border-red-300  rounded-lg  "
        />
        <button
          onClick={handleSearch}
          className="px-6 py-2 mt-3 cursor-pointer bg-red-500 text-white rounded hover:bg-red-400 "
        >
          Search
        </button>
      </div>

      {/* display product grid only id product are available*/}
      {filteredProducts !== null && productsToShow.length === 0 ? null : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productsToShow.map((item) => (
            <ProductItem key={item.id} product={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
