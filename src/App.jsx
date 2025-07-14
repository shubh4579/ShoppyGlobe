//import the header component
import Header from "./components/Header";
//importing tailwind css across all components
import "./App.css";
//outlet is used to render the matching child route component
import { Outlet } from "react-router-dom";
//toaster from react hot toast shows messages like success alerts
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      {/* toaster component to show notification centered at top with 3sec of duration */}
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      {/* header will always visible on all pages  */}
      <Header />
      {/* the actual component will render here based on the current route  */}
      <main className="pt-15">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
