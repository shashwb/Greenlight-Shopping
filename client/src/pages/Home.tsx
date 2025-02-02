import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";

const BASE_API_URL = "http://localhost:4000";

interface Product {
  id: number;
  name: string;
  price: number;
  characteristics: string[];
  sustainabuyScore: number;
}

interface ProductAPIResponse {
  data: {
    products: Product[];
    totalPages: number;
  };
}

interface HomeProps {
  products: Product[];
}
const Home: React.FC = () => {
  /** pagination state */
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 9;

  const fetchProducts = useCallback(async () => {
    console.log("...fetchProducts has been run!");
    try {
      const apiURL = `${BASE_API_URL}/products?page=${currentPage}&limit=${productsPerPage}`;
      console.log("API URL", apiURL);
      const productsResponse: ProductAPIResponse = await axios.get(apiURL);
      console.log("productsResponse", productsResponse.data.products);
      setProducts(productsResponse.data.products);
      setTotalPages(productsResponse.data.totalPages);
    } catch (error) {
      console.error("Error fetching product tests:", error);
    }
  }, [currentPage]);

  useEffect(() => {
    console.log("useeffect() :: currentPage", currentPage);
    fetchProducts();
  }, [currentPage, fetchProducts]);

  return (
    <div className="">
      {/* SECTION: trending products */}
      <h2 className="text-3xl font-bold my-4 text-gray-800 dark:text-white">
        Trending Sustainable Products
      </h2>

      <div className="grid grid-cols-3 gap-4 mx-3">
        {products &&
          products.map((product, index) => {
            // console.log("product", product);
            return (
              <div
                key={index}
                className="bg-gray-300 dark:bg-gray-800 text-gray-100 shadow-sm p-4 rounded-md hover:shadow-md cursor-pointer"
              >
                <div className="alt-main-font text-xl font-bold text-gray-900 dark:text-gray-200">
                  {product.name}
                </div>
                <p className="alt-main-font text-gray-800 dark:text-white text-sm">
                  {product.characteristics.join(", ")}
                </p>
                <p>${product.price.toFixed(2)}</p>
              </div>
            );
          })}
      </div>
      <div className="my-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Home;
