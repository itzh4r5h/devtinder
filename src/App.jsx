import { Outlet, useLocation } from "react-router";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/navbar/Navbar";

function App() {
  const isLoggedIn = true
  const location = useLocation()
  const route = location.pathname
  const isConnectionPage = route.startsWith("/connections");

  return (
    <div className="flex flex-col main-bg w-full min-h-dvh select-none">
      <Navbar isLoggedIn={isLoggedIn}/>
      <main className="container mx-auto px-5 flex-1 flex flex-col">
       <Outlet/>
      </main>
     {!isConnectionPage &&  <Footer />}
    </div>
  );
}

export default App;
