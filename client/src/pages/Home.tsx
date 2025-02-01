import React, { useState } from "react";
import Pagination from "../components/Pagination";

interface Product {
  name: string;
  price: number;
  characteristics: string[];
}

interface HomeProps {
  products: Product[];
}
const Home: React.FC<HomeProps> = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  /** pagination business logic */
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <div className="">
      {/* SECTION: trending products */}
      <h2 className="cool-font text-3xl font-bold my-4 text-gray-800 dark:text-white">
        Trending Sustainable Products
      </h2>

      <div className="grid grid-cols-3 gap-4 mx-3">
        {paginatedProducts.map((product, index) => {
          console.log("product", product);
          return (
            <div
              key={index}
              className="bg-gray-300 text-gray-100 shadow-sm p-4 rounded-md hover:shadow-md cursor-pointer"
            >
              <h3>{product.name}</h3>
              <p>{product.characteristics.join(", ")}</p>
              <p>{product.price}</p>
            </div>
          );
        })}
      </div>
      <div className="my-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default Home;
