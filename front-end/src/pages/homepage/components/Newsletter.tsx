const Newsletter: React.FC = () => {
	return (
	  <div className="bg-green-50 px-4 py-8 sm:px-6 md:px-12 rounded-lg mb-12">
		<div className="text-center md:text-left max-w-2xl mx-auto">
		  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
			Join Our Newsletter
		  </h2>
		  <p className="text-gray-600 mb-6 text-sm md:text-base">
			Subscribe to receive updates on new arrivals and special offers
		  </p>
		  <form
			onSubmit={(e) => e.preventDefault()}
			className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-md mx-auto md:mx-0"
		  >
			<input
			  type="email"
			  placeholder="Your email address"
			  className="flex-grow px-4 py-2 rounded-lg sm:rounded-l-lg sm:rounded-r-none border-2 border-green-300 focus:outline-none focus:border-green-500"
			/>
			<button
			  type="submit"
			  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg sm:rounded-l-none sm:rounded-r-lg transition duration-300"
			>
			  Subscribe
			</button>
		  </form>
		</div>
	  </div>
	);
  };
  
  export default Newsletter;
  