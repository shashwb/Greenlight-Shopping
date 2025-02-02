import react from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  characteristics: string[];
  imageUrl: string;
  sustainabuyScore: number;
}

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  return (
    <div
      key={product.id}
      className="bg-stone-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm p-4 rounded-md hover:shadow-md cursor-pointer transition-transform duration-400 transform hover:scale-105"
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-32 object-cover rounded-md mb-2"
      />
      <div className="flex justify-between items-center">
        <h3 className="text-xl alt-main-font font-bold">{product.name}</h3>
        {product.sustainabuyScore > 0 ? (
          <span className="px-2 py-1 text-xs font-bold text-white bg-green-800 rounded-md">
            {product.sustainabuyScore} 🌱
          </span>
        ) : (
          ""
        )}
      </div>
      <p className="alt-main-font text-sm text-gray-900 dark:text-gray-100 mt-1">
        {product.characteristics.join(", ")}
      </p>
      <p className="text-lg font-semibold text-green-700">
        ${product.price.toFixed(2)}
      </p>
    </div>
  );
};

export default ProductCard;
