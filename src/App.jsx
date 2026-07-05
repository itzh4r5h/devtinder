import { Footer } from "./components/Footer";
import { Navbar } from "./components/navbar/Navbar";
import { Home } from "./pages/home/Home";

function App() {
  return (
    <div className="grid grid-cols-1 grid-rows-[1fr_10fr_1fr] main-background w-full h-full">
      <Navbar />
      <main className="container mx-auto px-5">
       <Home/>
      </main>
      <Footer />
    </div>
  );
}

export default App;
