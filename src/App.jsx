import { Footer } from "./components/Footer";
import { Navbar } from "./components/navbar/Navbar";
import { Home } from "./pages/home/Home";

function App() {
  return (
    <div className="flex flex-col main-bg w-full h-full">
      <Navbar />
      <main className="container mx-auto px-5 flex-1">
       <Home/>
      </main>
      <Footer />
    </div>
  );
}

export default App;
