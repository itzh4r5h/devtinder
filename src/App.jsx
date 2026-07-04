import { Footer } from "./components/Footer";
import { Navbar } from "./components/navbar/Navbar";

function App() {
  return (
    <div className="grid grid-cols-1 grid-rows-[1fr_10fr_1fr] main-background w-full h-full">
      <Navbar />
      <main className="container mx-auto">
        <h1>main content will goes here</h1>
      </main>
      <Footer />
    </div>
  );
}

export default App;
