const Newsletter: React.FC = () => {
  return (
	<div className="bg-green-50 p-8 rounded-lg text-center mb-12">
	  <h2 className="text-2xl font-bold text-gray-800 mb-2">
		Join Our Newsletter
	  </h2>
	  <p className="text-gray-600 mb-6">
		Subscribe to receive updates on new arrivals and special offers
	  </p>
	  <div className="flex max-w-md mx-auto">
		<input
		  type="email"
		  placeholder="Your email address"
		  className="flex-grow px-4 py-2 rounded-l-lg border-2 border-green-300 focus:outline-none focus:border-green-500"
		/>
		<button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-r-lg transition duration-300">
		  Subscribe
		</button>
	  </div>
	</div>
  );
};

export default Newsletter;