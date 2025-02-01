import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import "./App.css";

const BASE_API_URL = "http://localhost:4000";

interface Product {
  name: string;
  price: number;
  characteristics: string[];
}

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // get everything...
        const products: AxiosResponse<Product[]> = await axios.get(
          `${BASE_API_URL}/products`
        );
        setProducts(products.data);
      } catch (error) {
        console.error("Error fetching product tests:", error);
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
            products.map((product: Product, index: number) => {
              console.log("product", product, "index", index);
              if (!product) {
                return <></>;
              }
              return (
                <div key={index} className="product-item">
                  <h2>{product.name}</h2>
                  <h4>{product.price}</h4>
                  {/* {product.characteristics.map(
                    (char: string, charIndex: number) => (
                      <span key={charIndex} className="characteristic-tag">
                        {char}
                      </span>
                    )
                  )} */}
                </div>
              );
            })
        }
      </div>
    </div>
  );
};

export default App;
