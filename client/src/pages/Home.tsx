const Home = () => {
  return (
    <div className="">
      {/* persistent banner */}

      {/* SECTION: trending products */}
      <h2 className="text-2xl font-bold my-4 text-gray-800 dark:text-white">
        Trending Sustainable Products SECTION
      </h2>

      <div className="bg-gray-100 grid grid-cols-3 gap-4">
        {[...Array(6)].map((_, index) => {
          return (
            <div className="bg-gray-300 text-gray-100 shadow-sm p-4 rounded-md hover:shadow-md cursor-pointer">
              <h3>Product {index + 1}</h3>
              <p>description</p>
              <p>price</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
