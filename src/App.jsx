import { Outlet } from "react-router";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/navbar/Navbar";

function App() {
  return (
    <div className="flex flex-col main-bg w-full h-full">
      <Navbar />
      <main className="container mx-auto px-5 flex-1">
       <Outlet/>
      </main>
      <Footer />
    </div>
  );
}

export default App;
