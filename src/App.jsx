import { Outlet, useLocation } from "react-router";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/navbar/Navbar";
import { ToastContainer } from 'react-toastify'
import { useShowMessage } from "./hooks/useShowMessage";
import { useSelector } from "react-redux";

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth)
  const location = useLocation()
  const route = location.pathname
  const isConnectionPage = route.startsWith("/connections");
  useShowMessage()

  return (
    <div className="flex flex-col main-bg w-full min-h-dvh select-none">
      <ToastContainer theme="colored" className="lowercase" />
      <Navbar isLoggedIn={isLoggedIn} />
      <main className="container mx-auto px-5 flex-1 flex flex-col">
        <Outlet />
      </main>
      {!isConnectionPage && <Footer />}
    </div>
  );
}

export default App;
