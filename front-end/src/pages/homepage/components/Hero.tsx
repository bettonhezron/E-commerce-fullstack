import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
	{
	  title: "Spring Collection 2025",
	  subtitle: "Refresh your style with our latest arrivals",
	  imageUrl:
		"https://images.pexels.com/photos/11739182/pexels-photo-11739182.jpeg?auto=compress&cs=tinysrgb&w=600",
	  ctaText: "Shop Now",
	},
	{
	  title: "Exclusive Deals",
	  subtitle: "Up to 40% off on selected items",
	  imageUrl:
		"https://images.pexels.com/photos/7564227/pexels-photo-7564227.jpeg?auto=compress&cs=tinysrgb&w=600",
	  ctaText: "View Offers",
	},
	{
	  title: "Sustainable Fashion",
	  subtitle: "Eco-friendly products for a better tomorrow",
	  imageUrl:
		"https://images.pexels.com/photos/13680054/pexels-photo-13680054.jpeg?auto=compress&cs=tinysrgb&w=600",
	  ctaText: "Discover More",
	},
  ];

  const nextSlide = () => {
	setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
	setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
	const interval = setInterval(nextSlide, 5000);
	return () => clearInterval(interval);
  }, []);

  return (
	<div className="relative w-full h-96 overflow-hidden">
	  <div
		className="flex transition-transform duration-500 ease-in-out h-full"
		style={{
		  transform: `translateX(-${currentSlide * 100}%)`,
		  width: '100%',
		}}
	  >
		{slides.map((slide, index) => (
		  <div key={index} className="relative w-full h-full flex-shrink-0">
			<img
			  src={slide.imageUrl}
			  alt={slide.title}
			  className="absolute inset-0 w-full h-full object-cover"
			/>
			<div className="absolute inset-0 flex flex-col items-center justify-center text-gray-200 p-4">
			  <h1 className="text-4xl font-bold mb-2">{slide.title}</h1>
			  <p className="text-xl mb-6">{slide.subtitle}</p>
			  <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-full font-medium transition duration-300">
				{slide.ctaText}
			  </button>
			</div>
		  </div>
		))}
	  </div>
	  <button
		onClick={prevSlide}
		className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition duration-300"
	  >
		<ChevronLeft size={24} />
	  </button>
	  <button
		onClick={nextSlide}
		className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition duration-300"
	  >
		<ChevronRight size={24} />
	  </button>
	  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
		{slides.map((_, index) => (
		  <button
			key={index}
			onClick={() => setCurrentSlide(index)}
			className={`w-3 h-3 rounded-full ${
			  currentSlide === index ? "bg-green-500" : "bg-white bg-opacity-50"
			}`}
		  ></button>
		))}
	  </div>
	</div>
  );
};

export default Hero;