import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const BASE_API_URL = "http://localhost:5001";

/** what is a product? typescript wants to know  */
interface Product {
  name: string;
  characteristics: string[];
}

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response: { data: Product[] } = await axios.get(
          `${BASE_API_URL}/products`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="App">
      <header className="header">
        <h1>Product Compass: test</h1>
      </header>
      <div className="setup-message">
        ✅ If you're seeing the list of products below, everything is up and
        running!
      </div>
      <div>
        {
          // compiler is unable to infer the type of 'products'
          products &&
            products.map((product: Product, index: number) => (
              <div key={index} className="product-item">
                <h3>{product.name}</h3>
                {product.characteristics.map(
                  (char: string, charIndex: number) => (
                    <span key={charIndex} className="characteristic-tag">
                      {char}
                    </span>
                  )
                )}
              </div>
            ))
        }
      </div>
    </div>
  );
};

export default App;
