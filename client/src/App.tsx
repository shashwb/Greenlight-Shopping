import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import "./App.css";

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
  // const [products, setProducts] = useState<Product[]>([]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const products: any = await axios.get(`${BASE_API_URL}/products`);
  //       console.log("products", products);
  //       setProducts(products.data);
  //     } catch (error) {
  //       console.error("Error fetching product tests:", error);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

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
