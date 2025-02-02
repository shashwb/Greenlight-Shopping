import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

/** components */
import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";

const BASE_API_URL = "http://localhost:4000";

interface Product {
  id: number;
  name: string;
  price: number;
  characteristics: string[];
  sustainabuyScore: number;
  imageUrl: string;
}

interface ProductAPIResponse {
  data: {
    products: Product[];
    totalPages: number;
  };
}

const Home: React.FC = () => {
  /** pagination state */
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  /** searchquery */
  const [searchQuery, setSearchQuery] = useState<string>("");

  const productsPerPage = 9;

  const fetchProducts = useCallback(async () => {
    try {
      const params = new URLSearchParams({
        page: String(currentPage),
        q: searchQuery,
        limit: productsPerPage.toString(),
      });

      const apiURL = `${BASE_API_URL}/products?${params.toString()}`;
      console.log("...apiURL", apiURL);
      const productsResponse: ProductAPIResponse = await axios.get(apiURL);
      setProducts(productsResponse.data.products);
      setTotalPages(productsResponse.data.totalPages);
    } catch (error) {
      console.error("Error fetching product tests:", error);
    }
  }, [currentPage, searchQuery]);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, fetchProducts]);

  return (
    <div className="">
      <SearchBar onSearch={setSearchQuery} />
      {/* <Filter onFilterChange={() => {}} /> */}

      <h2 className="text-3xl font-bold my-4 text-gray-800 dark:text-white">
        Trending Sustainable Products
      </h2>

      <div className="grid grid-cols-1 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-3">
        {products &&
          products.map((product, index) => {
            return <ProductCard product={product} index={index} />;
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
