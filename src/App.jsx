import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div className="w-full h-full bg-neutral-950">
      <div className="grid grid-cols-1 grid-rows-[1fr_10fr_1fr] bg-[radial-gradient(circle_at_20%_10%,oklch(0.488_0.243_264.376/.18),transparent_45%),radial-gradient(circle_at_85%_30%,oklch(0.645_0.246_16.439/.15),transparent_50%)] w-full h-full">
        <Navbar />
        <main>
          <h1>main content will goes here</h1>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
