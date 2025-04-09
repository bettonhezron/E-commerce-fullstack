import { useState } from "react";
import { Product } from "../types/Product";
import { Heart, ShoppingCart } from "lucide-react";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
	const [isHovered, setIsHovered] = useState(false);
  
	return (
	  <div
		className="group bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
		onMouseEnter={() => setIsHovered(true)}
		onMouseLeave={() => setIsHovered(false)}
	  >
		<div className="relative h-56 overflow-hidden">
		  <img
			src={product.imageUrl}
			alt={product.name}
			className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
		  />
		  {product.isNew && (
			<div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold uppercase py-1 px-2 rounded">
			  New
			</div>
		  )}
		  {product.discountPrice && (
			<div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold uppercase py-1 px-2 rounded">
			  Sale
			</div>
		  )}
		  <div
			className={`absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2 flex justify-center space-x-2 transition-transform duration-300 ${
			  isHovered ? "translate-y-0" : "translate-y-full"
			}`}
		  >
			<button className="bg-white hover:bg-gray-100 text-green-600 p-2 rounded-full">
			  <ShoppingCart size={16} />
			</button>
			<button className="bg-white hover:bg-gray-100 text-green-600 p-2 rounded-full">
			  <Heart size={16} />
			</button>
		  </div>
		</div>
		<div className="p-4">
		  <h3 className="text-sm text-gray-500 mb-1">{product.category}</h3>
		  <h2 className="font-semibold text-gray-800 mb-2 truncate">
			{product.name}
		  </h2>
		  <div className="flex items-center justify-between">
			<div className="flex items-center">
			  {product.discountPrice ? (
				<>
				  <span className="font-bold text-green-600">
					${product.discountPrice.toFixed(2)}
				  </span>
				  <span className="ml-1 text-sm text-gray-500 line-through">
					${product.price.toFixed(2)}
				  </span>
				</>
			  ) : (
				<span className="font-bold text-green-600">
				  ${product.price.toFixed(2)}
				</span>
			  )}
			</div>
			<div className="flex items-center">
			  <span className="text-yellow-500">★</span>
			  <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
			</div>
		  </div>
		</div>
	  </div>
	);
  };

  export default ProductCard;