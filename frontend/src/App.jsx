import { Outlet, useLocation } from "react-router";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/navbar/Navbar";
import { ToastContainer } from 'react-toastify'
import { useShowMessage } from "./hooks/useShowMessage";
import { useSelector } from "react-redux";
import { SocketProvider } from "./context/SocketProvider";

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth)
  const location = useLocation()
  const route = location.pathname
  const isConnectionPage = route.startsWith("/connections");
  const isConnectionProfilePage = route.startsWith("/connections/profile");
  // the connections list + chat fill the screen and scroll inside their own panes
  const isChatLayout = isConnectionPage && !isConnectionProfilePage;
  useShowMessage()

  return (
    <SocketProvider>
      <div className={`flex flex-col main-bg w-full select-none ${isChatLayout ? "h-dvh overflow-hidden" : "min-h-dvh"}`}>
        <ToastContainer theme="colored" className="lowercase" />
        <Navbar isLoggedIn={isLoggedIn} />
        <main className="container mx-auto px-5 flex-1 flex flex-col min-h-0">
          <Outlet />
        </main>
        {!isConnectionPage && <Footer />}
        {isConnectionProfilePage && <Footer />}
      </div>
    </SocketProvider>
  );
}

export default App;
