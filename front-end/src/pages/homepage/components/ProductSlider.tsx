import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "../types/Product";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductSlider: React.FC<{ title: string; products: Product[] }> = ({
  title,
  products,
}) => {
  const scrollContainer = React.useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
	if (scrollContainer.current) {
	  scrollContainer.current.scrollBy({ left: -300, behavior: "smooth" });
	}
  };

  const scrollRight = () => {
	if (scrollContainer.current) {
	  scrollContainer.current.scrollBy({ left: 300, behavior: "smooth" });
	}
  };

  return (
	<div className="mb-12">
	  <div className="flex justify-between items-center mb-6">
		<h2 className="text-2xl font-bold text-gray-800">{title}</h2>
		<div className="flex space-x-2">
		  <button
			onClick={scrollLeft}
			className="bg-green-100 hover:bg-green-200 text-green-700 p-2 rounded-full transition duration-300"
		  >
			<ChevronLeft size={20} />
		  </button>
		  <button
			onClick={scrollRight}
			className="bg-green-100 hover:bg-green-200 text-green-700 p-2 rounded-full transition duration-300"
		  >
			<ChevronRight size={20} />
		  </button>
		</div>
	  </div>
	  <div
		ref={scrollContainer}
		className="flex space-x-4 overflow-x-auto pb-4 hide-scrollbar"
		style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
	  >
		{products.length === 0 ? (
		  // Banner creative banner for empty products
		  <div className="flex-shrink-0 w-full">
			<div className="bg-gray-100 p-8 rounded-lg text-center">
			  <h2 className="text-2xl font-bold text-gray-800 mb-2">
				No products found
			  </h2>
			  <p className="text-gray-600 mb-6">
				Check back later
			  </p>
			</div>
		  </div>
		) : (
		  products.map((product) => (
			<div key={product.id} className="flex-shrink-0 w-64">
			  <ProductCard product={product} />
			</div>
		  ))
		)}
	  </div>
	</div>
  );
};

export default ProductSlider;