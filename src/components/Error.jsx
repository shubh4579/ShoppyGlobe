// importing naviagation and error hook from react-router-dom
import { Link, useRouteError } from "react-router-dom";

function Error() {
  // get error object from router
  const err = useRouteError();

  return (
    <div className="text-center p-8  ">
      <h1 className="text-3xl font-extrabold mb-4 text-red-500">Oops!</h1>

      {/** display error status code and status message */}
      <h2 className="text-xl">
        {err.status} - {err.statusText}
      </h2>

      {/** show extra error msg if available */}
      {err.data && <p className="mt-2">{err.data}</p>}

      {/** button to return back to home */}
      <Link
        to="/"
        className="mt-4 inline-block px-6 py-2 cursor-pointer bg-red-500 text-white rounded hover:bg-red-400  "
      >
        Back to Home
      </Link>
    </div>
  );
}

export default Error;
