/** components */
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";

interface Product {
  id: string;
  name: string;
  price: number;
  characteristics: string[];
  imageUrl: string;
  sustainabuyScore: number;
}

const App = () => {
  return (
    <div className="App bg-gray-100 dark:bg-gray-900 flex flex-col min-h-screen w-full">
      <Navbar />
      <main className="flex-grow w-full max-w-7xl mx-auto p-6 rounded-3xl">
        <Home />
      </main>
      <Footer />
    </div>
  );
};

export default App;
