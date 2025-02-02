import react from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  characteristics: string[];
  sustainabuyScore: number;
}

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
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
};

export default ProductCard;
