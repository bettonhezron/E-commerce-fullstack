import { Category } from "../types/Category";

const CategoryCard: React.FC<{ category: Category }> = ({ category }) => {
  return (
	<div className="relative rounded-lg overflow-hidden shadow-md group cursor-pointer">
	  <img
		src={category.imageUrl}
		alt={category.name}
		className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
	  />
	  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
	  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
		<h3 className="font-bold text-lg">{category.name}</h3>
		<p className="text-sm">{category.productCount} products</p>
	  </div>
	</div>
  );
};

export default CategoryCard;