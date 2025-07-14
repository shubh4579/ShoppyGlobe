// import React hooks
import { useEffect, useState } from "react";
// custom hook to fetch data from any given URL
function useFetch(url) {
  // state to store the fetched data
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    // define an async function to fetch data
    const fetchData = async () => {
      setLoading(true);
      try {
        //make an api call
        const res = await fetch(url);
        //if response is not ok throw an error
        if (!res.ok) throw new Error("Something went wrong");
        //parse the response json
        const result = await res.json();
        //save the result in state
        setData(result);
      } catch (err) {
        setError(err.message); //catch an error and save the message
      } finally {
        setLoading(false); //stop loading weather success or error
      }
    };

    fetchData(); //call the fetch func
  }, [url]); //dependency re-render if url changes
  return [data, loading, error]; //return data in array form
}
export default useFetch;
