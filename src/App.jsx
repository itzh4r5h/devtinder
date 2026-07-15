import { Outlet } from "react-router";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/navbar/Navbar";

function App() {
  const isLoggedIn = true

  return (
    <div className="flex flex-col main-bg w-full h-full select-none">
      <Navbar isLoggedIn={isLoggedIn}/>
      <main className="container mx-auto px-5 flex-1">
       <Outlet/>
      </main>
      <Footer />
    </div>
  );
}

export default App;
