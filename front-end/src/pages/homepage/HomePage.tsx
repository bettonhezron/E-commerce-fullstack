import React, { useState, useEffect } from "react";
import { ShoppingCart, Search, Menu, Heart, User, X, LogOut, Tag, Info, HelpCircle, ChevronDown, List, Package, Home, ShoppingBag, ChevronRight } from "lucide-react";
import { Product } from "./types/Product";
import { Category } from "./types/Category";
import ProductSlider from "./components/ProductSlider";
import Hero from "./components/Hero";
import CategoryCard from "./components/CategoryCard";
import Newsletter from "./components/Newsletter";
import PageLoader from "../../components/Loader";
import { getUser, isAuthenticated, logout } from "../../api/auth";


// API fetching functions
const fetchFeaturedProducts = async (): Promise<Product[]> => {
  try {
    // const response = await fetch(
    //   `${import.meta.env.VITE_SERVER_HEAD}/api/products/premium`
    // );
    // if (!response.ok) throw new Error("Failed to fetch premium products");
    // return await response.json().then((data) => data.data);
    const featuredProducts = [
      {
        id: "1",
        name: "Wireless Headphones",
        price: 199,
        imageUrl:
          "https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg?auto=compress&cs=tinysrgb&w=600",
        rating: 4.5,
        category: "Electronics",
      },
      {
        id: "2",
        name: "Leather Jacket",
        price: 299,
        discountPrice: 199,
        imageUrl:
          "https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg?auto=compress&cs=tinysrgb&w=600",
        rating: 4.2,
        category: "Clothing",
      },
      {
        id: "3",
        name: "Running Shoes",
        price: 149,
        imageUrl:
          "https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg?auto=compress&cs=tinysrgb&w=600",
        rating: 4.8,
        category: "Shoes",
      },
      {
        id: "4",
        name: "Leather Bag",
        price: 99,
        imageUrl:
          "https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg?auto=compress&cs=tinysrgb&w=600",
        rating: 4.6,
        category: "Accessories",
      },
      {
        id: "5",
        name: "Coffee Table",
        price: 199,
        imageUrl:
          "https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg?auto=compress&cs=tinysrgb&w=600",
        rating: 4.7,
        category: "Furniture",
      },
      {
        id: "6",
        name: "Wall Clock",
        price: 49,
        imageUrl:
          "https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg?auto=compress&cs=tinysrgb&w=600",
        rating: 4.3,
        category: "Home Decor",
      },
    ];
    return featuredProducts;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const fetchCategories = async (): Promise<Category[]> => {
  try {
    // const response = await fetch(
    //   `${import.meta.env.VITE_SERVER_HEAD}/api/categories`
    // );
    // if (!response.ok) throw new Error("Failed to fetch categories");
    // return await response.json().then((data) => data.data);
    const categories = [
      {
        id: "1",
        name: "Electronics",
        imageUrl:
          "https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg?auto=compress&cs=tinysrgb&w=600",
        productCount: 120,
      },
      {
        id: "2",
        name: "Clothing",
        imageUrl:
          "https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg?auto=compress&cs=tinysrgb&w=600",
        productCount: 120,
      },
      {
        id: "3",
        name: "Shoes",
        imageUrl:
          "https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg?auto=compress&cs=tinysrgb&w=600",
        productCount: 120,
      },
      {
        id: "4",
        name: "Accessories",
        imageUrl:
          "https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg?auto=compress&cs=tinysrgb&w=600",
        productCount: 120,
      },
      {
        id: "5",
        name: "Furniture",
        imageUrl:
          "https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg?auto=compress&cs=tinysrgb&w=600",
        productCount: 120,
      },
      {
        id: "6",
        name: "Home Decor",
        imageUrl:
          "https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg?auto=compress&cs=tinysrgb&w=600",
        productCount: 120,
      },
    ];
    return categories;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const fetchNewestProducts = async (): Promise<Product[]> => {
  try {
    // const response = await fetch(
    //   `${import.meta.env.VITE_SERVER_HEAD}/api/products/newest`
    // );
    // if (!response.ok) throw new Error("Failed to fetch newest products");
    // return await response.json().then((data) => data.data);
    const newestProducts = [
      {
        id: "1",
        name: "Wireless Headphones",
        price: 199,
        imageUrl:
          "https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg?auto=compress&cs=tinysrgb&w=600",
        rating: 4.5,
        category: "Electronics",
        isNew: true,
      },
      {
        id: "2",
        name: "Leather Jacket",
        price: 299,
        discountPrice: 199,
        imageUrl:
          "https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg?auto=compress&cs=tinysrgb&w=600",
        rating: 4.2,
        category: "Clothing",
      },
      {
        id: "3",
        name: "Running Shoes",
        price: 149,
        imageUrl:
          "https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg?auto=compress&cs=tinysrgb&w=600",
        rating: 4.8,
        category: "Shoes",
      },
      {
        id: "4",
        name: "Leather Bag",
        price: 99,
        imageUrl:
          "https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg?auto=compress&cs=tinysrgb&w=600",
        rating: 4.6,
        category: "Accessories",
      },
      {
        id: "5",
        name: "Coffee Table",
        price: 199,
        imageUrl:
          "https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg?auto=compress&cs=tinysrgb&w=600",
        rating: 4.7,
        category: "Furniture",
      },
      {
        id: "6",
        name: "Wall Clock",
        price: 49,
        imageUrl:
          "https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg?auto=compress&cs=tinysrgb&w=600",
        rating: 4.3,
        category: "Home Decor",
      },
    ];
    return newestProducts;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const fetchBudgetProducts = async (): Promise<Product[]> => {
  try {
    // const response = await fetch(
    //   `${import.meta.env.VITE_SERVER_HEAD}/api/products/budget`
    // );
    // if (!response.ok) throw new Error("Failed to fetch budget products");
    // return await response.json().then((data) => data.data);
    const budgetProducts = [
      {
        id: "1",
        name: "Wireless Mouse",
        price: 29,
        imageUrl:
          "https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg?auto=compress&cs=tinysrgb&w=600",
        rating: 4.5,
        category: "Electronics",
      },
      {
        id: "2",
        name: "Graphic Tee",
        price: 19,
        imageUrl:
          "https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg?auto=compress&cs=tinysrgb&w=600",
        rating: 4.2,
        category: "Clothing",
      },
      {
        id: "3",
        name: "Running Socks",
        price: 9,
        imageUrl:
          "https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg?auto=compress&cs=tinysrgb&w=600",
        rating: 4.8,
        category: "Shoes",
      },
      {
        id: "4",
        name: "Sunglasses",
        price: 19,
        imageUrl:
          "https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg?auto=compress&cs=tinysrgb&w=600",
        rating: 4.6,
        category: "Accessories",
      },
      {
        id: "5",
        name: "Dining Chair",
        price: 49,
        imageUrl:
          "https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg?auto=compress&cs=tinysrgb&w=600",
        rating: 4.7,
        category: "Furniture",
      },
      {
        id: "6",
        name: "Wall Art",
        price: 29,
        imageUrl:
          "https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg?auto=compress&cs=tinysrgb&w=600",
        rating: 4.3,
        category: "Home Decor",
      },
    ];
    return budgetProducts;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Main component
const Homepage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newestProducts, setNewestProducts] = useState<Product[]>([]);
  const [budgetProducts, setBudgetProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // Add authentication state
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  // Add mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check authentication status when component mounts
    const checkAuthStatus = () => {
      const authStatus = isAuthenticated();
      setUserAuthenticated(authStatus);
      
      if (authStatus) {
        setCurrentUser(getUser());
      }
    };

    // Fetch data for products and categories
    const fetchData = async () => {
      setIsLoading(true);
      const [featured, cats, newest, budget] = await Promise.all([
        fetchFeaturedProducts(),
        fetchCategories(),
        fetchNewestProducts(),
        fetchBudgetProducts(),
      ]);

      setFeaturedProducts(featured);
      setCategories(cats);
      setNewestProducts(newest);
      setBudgetProducts(budget);
      setIsLoading(false);
    };

    checkAuthStatus();
    fetchData();
  }, []);

  // Handle logout
  const handleLogout = () => {
    logout();
    setUserAuthenticated(false);
    setCurrentUser(null);
    // Close mobile menu if open
    setMobileMenuOpen(false);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
    {/* Header */}
<header className="bg-white shadow-sm sticky top-0 z-50">
  <div className="container mx-auto px-4">
    {/* Top Bar - Hidden on Mobile */}
    <div className="py-2 hidden md:flex items-center justify-between border-b">
      <div className="text-sm flex space-x-6 text-gray-600">
        <a href="#" className="hover:text-green-600 transition duration-200">Help</a>
        <a href="#" className="hover:text-green-600 transition duration-200">Track Order</a>
        <a href="#" className="hover:text-green-600 transition duration-200">Contact Us</a>
      </div>
      <div className="text-sm flex space-x-6 text-gray-600">
        {userAuthenticated ? (
          <>
            <a href="/profile" className="hover:text-green-600 transition duration-200">My Profile</a>
            <a href="/orders" className="hover:text-green-600 transition duration-200">My Orders</a>
            <button onClick={handleLogout} className="hover:text-green-600 transition duration-200">
              Logout
            </button>
          </>
        ) : (
          <>
            <a href="/signin" className="hover:text-green-600 transition duration-200">Sign In</a>
            <a href="/register" className="hover:text-green-600 transition duration-200">Create Account</a>
          </>
        )}
      </div>
    </div>
    
    {/* Main Navigation */}
    <div className="py-4 flex items-center justify-between">
      <div className="flex items-center">
        <button 
          onClick={toggleMobileMenu}
          className="mr-4 lg:hidden text-gray-700" 
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>
        <a href="/" className="text-2xl font-bold text-green-600">
          GreenShop
        </a>
      </div>
      
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center">
        <ul className="flex space-x-8">
          <li>
            <a href="/" className="font-medium text-gray-700 hover:text-green-600 transition duration-200">
              Home
            </a>
          </li>
          <li className="group relative">
            <a href="/shop" className="font-medium text-gray-700 hover:text-green-600 transition duration-200 flex items-center">
              Shop
              <ChevronDown size={16} className="ml-1" />
            </a>
            {/* Shop Dropdown */}
            <div className="absolute left-0 top-full bg-white shadow-lg border rounded-lg w-48 p-3 hidden group-hover:block z-50">
              <ul className="space-y-2">
                <li><a href="/shop/new-arrivals" className="block text-gray-700 hover:text-green-600">New Arrivals</a></li>
                <li><a href="/shop/best-sellers" className="block text-gray-700 hover:text-green-600">Best Sellers</a></li>
                <li><a href="/shop/sale" className="block text-gray-700 hover:text-green-600">Sale Items</a></li>
              </ul>
            </div>
          </li>
          <li className="group relative">
            <a href="/categories" className="font-medium text-gray-700 hover:text-green-600 transition duration-200 flex items-center">
              Categories
              <ChevronDown size={16} className="ml-1" />
            </a>
            {/* Categories Dropdown */}
            <div className="absolute left-0 top-full bg-white shadow-lg border rounded-lg w-48 p-3 hidden group-hover:block z-50">
              <ul className="space-y-2">
                <li><a href="/category/electronics" className="block text-gray-700 hover:text-green-600">Electronics</a></li>
                <li><a href="/category/clothing" className="block text-gray-700 hover:text-green-600">Clothing</a></li>
                <li><a href="/category/home" className="block text-gray-700 hover:text-green-600">Home & Kitchen</a></li>
                <li><a href="/category/books" className="block text-gray-700 hover:text-green-600">Books</a></li>
              </ul>
            </div>
          </li>
          <li>
            <a href="/deals" className="font-medium text-gray-700 hover:text-green-600 transition duration-200">
              Deals
            </a>
          </li>
          <li>
            <a href="/about" className="font-medium text-gray-700 hover:text-green-600 transition duration-200">
              About
            </a>
          </li>
        </ul>
      </nav>
      
      <div className="flex items-center space-x-5">
        {/* Desktop Search */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search products..."
            className="bg-gray-100 rounded-full py-2 px-4 pl-10 w-64 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition duration-200"
          />
          <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
        </div>
        
        {/* User Account Button */}
        <button className="text-gray-700 hover:text-green-600 transition duration-200">
          {userAuthenticated ? (
            <a href="/profile">
              <User size={24} />
            </a>
          ) : (
            <a href="/signin">
              <User size={24} />
            </a>
          )}
        </button>
        
        {/* Wishlist Button */}
        <button className="text-gray-700 hover:text-green-600 transition duration-200">
          <Heart size={24} />
        </button>
        
        {/* Cart Button */}
        <button className="relative text-gray-700 hover:text-green-600 transition duration-200">
          <ShoppingCart size={24} />
          <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
        </button>
      </div>
    </div>
  </div>
  
  {/* Mobile Menu Overlay */}
  {mobileMenuOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden" onClick={toggleMobileMenu}>
      <div className="bg-white h-full w-4/5 max-w-sm overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header with close button */}
        <div className="flex justify-between items-center p-4 border-b bg-gray-100">
          <button onClick={toggleMobileMenu} className="text-gray-700">
            <X size={20} />
          </button>
          <h2 className="text-lg font-bold text-green-600">GreenShop</h2>
          <div className="w-5"></div> {/* Empty div for centering */}
        </div>
        
        {/* User Account Section - Top */}
        {userAuthenticated ? (
          <div className="p-4 bg-green-50 border-b">
            <div className="flex items-center mb-3">
              <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3">
                <User size={20} />
              </div>
              <div>
                <p className="font-medium">{currentUser?.firstName || currentUser?.email}</p>
                <a href="/profile" className="text-sm text-green-600">View Profile</a>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-green-50 border-b">
            <div className="flex items-center space-x-3">
              <div className="bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center">
                <User size={20} className="text-gray-600" />
              </div>
              <div className="flex space-x-2">
                <a href="/signin" className="text-green-600 font-medium">Login</a>
                <span className="text-gray-400">|</span>
                <a href="/register" className="text-green-600 font-medium">Register</a>
              </div>
            </div>
          </div>
        )}
        
        {/* Search */}
        <div className="p-4 border-b">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="bg-gray-100 rounded-lg py-2 px-4 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition duration-200"
            />
            <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
            <button className="absolute right-2 top-2 bg-green-600 text-white rounded px-3 py-1 text-sm">
              Search
            </button>
          </div>
        </div>
        
        {/* Main Navigation Links with Icons */}
        <div className="py-2">
          <a href="/" className="flex items-center px-4 py-3 hover:bg-gray-50">
            <Home size={20} className="text-gray-500 mr-3" />
            <span>Home</span>
          </a>
          
          <a href="/shop" className="flex items-center justify-between px-4 py-3 hover:bg-gray-50">
            <div className="flex items-center">
              <ShoppingBag size={20} className="text-gray-500 mr-3" />
              <span>Shop</span>
            </div>
            <ChevronRight size={16} className="text-gray-500" />
          </a>
          
          <a href="/cart" className="flex items-center px-4 py-3 hover:bg-gray-50">
            <ShoppingCart size={20} className="text-gray-500 mr-3" />
            <span>Cart</span>
            <span className="ml-auto bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </a>
          
          {userAuthenticated && (
            <a href="/orders" className="flex items-center px-4 py-3 hover:bg-gray-50">
              <Package size={20} className="text-gray-500 mr-3" />
              <span>My Orders</span>
            </a>
          )}
          
          {/* Categories with dropdown */}
          <div className="border-t border-b my-2">
            <button 
              className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50"
              onClick={() => {/* Toggle categories dropdown */}}
            >
              <div className="flex items-center">
                <List size={20} className="text-gray-500 mr-3" />
                <span>Categories</span>
              </div>
              <ChevronDown size={16} className="text-gray-500" />
            </button>
            
            {/* Categories dropdown items */}
            <div className="bg-gray-50 px-4 py-2">
              <a href="/category/electronics" className="block py-2 pl-8 text-gray-600 hover:text-green-600">
                Electronics
              </a>
              <a href="/category/clothing" className="block py-2 pl-8 text-gray-600 hover:text-green-600">
                Clothing
              </a>
              <a href="/category/home" className="block py-2 pl-8 text-gray-600 hover:text-green-600">
                Home & Kitchen
              </a>
              <a href="/category/books" className="block py-2 pl-8 text-gray-600 hover:text-green-600">
                Books
              </a>
            </div>
          </div>
          
          {/* Help Center with dropdown */}
          <div className="border-b">
            <button 
              className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50"
              onClick={() => {/* Toggle help dropdown */}}
            >
              <div className="flex items-center">
                <HelpCircle size={20} className="text-gray-500 mr-3" />
                <span>Help Center</span>
              </div>
              <ChevronDown size={16} className="text-gray-500" />
            </button>
            
            {/* Help dropdown items */}
            <div className="bg-gray-50 px-4 py-2">
              <a href="/track-order" className="block py-2 pl-8 text-gray-600 hover:text-green-600">
                Track Order
              </a>
              <a href="/shipping-policy" className="block py-2 pl-8 text-gray-600 hover:text-green-600">
                Shipping & Delivery
              </a>
              <a href="/contact" className="block py-2 pl-8 text-gray-600 hover:text-green-600">
                Contact Us
              </a>
              <a href="/faq" className="block py-2 pl-8 text-gray-600 hover:text-green-600">
                FAQ
              </a>
            </div>
          </div>
          
          {/* About Section */}
          <a href="/about" className="flex items-center px-4 py-3 hover:bg-gray-50">
            <Info size={20} className="text-gray-500 mr-3" />
            <span>About</span>
          </a>
          
          <a href="/deals" className="flex items-center px-4 py-3 hover:bg-gray-50">
            <Tag size={20} className="text-gray-500 mr-3" />
            <span>Deals</span>
          </a>
          
          <a href="/wishlist" className="flex items-center px-4 py-3 hover:bg-gray-50">
            <Heart size={20} className="text-gray-500 mr-3" />
            <span>Wishlist</span>
          </a>
        </div>
        
        {/* Logout button at the very bottom */}
        {userAuthenticated && (
          <div className="p-4 mt-auto border-t">
            <button
              onClick={handleLogout}
              className="flex items-center w-full text-red-600 hover:text-red-700"
            >
              <LogOut size={20} className="mr-3" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )}
</header>

      {/* Main content section remains the same */}
      <main className="container mx-auto lg:px-16 px-2 py-8">
        {isLoading ? (
          <PageLoader />
        ) : (
          <>
            <Hero />

            <div className="my-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Shop by Category
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </div>
            </div>

            <ProductSlider
              title="Featured Products"
              products={featuredProducts}
            />
            <ProductSlider title="New Arrivals" products={newestProducts} />
            <ProductSlider
              title="Budget-Friendly Picks"
              products={budgetProducts}
            />

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-green-100 rounded-lg overflow-hidden relative h-64">
                <img
                  src="https://images.pexels.com/photos/8386657/pexels-photo-8386657.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Summer Collection"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col justify-center p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Summer Collection
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Refresh your wardrobe with our summer essentials
                  </p>
                  <button className="bg-white hover:bg-gray-100 text-green-600 font-medium py-2 px-6 rounded-full w-max transition duration-300">
                    Shop Collection
                  </button>
                </div>
              </div>
              <div className="bg-purple-100 rounded-lg overflow-hidden relative h-64">
                <img
                  src="https://images.pexels.com/photos/5872360/pexels-photo-5872360.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Limited Offers"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col justify-center p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Limited Time Offers
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Up to 50% off on selected items. Hurry now!
                  </p>
                  <button className="bg-white hover:bg-gray-100 text-green-600 font-medium py-2 px-6 rounded-full w-max transition duration-300">
                    View Offers
                  </button>
                </div>
              </div>
            </div>

            <Newsletter />

            <div className="grid md:grid-cols-4 grid-cols-2 gap-8 mb-12">
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Free Shipping</h3>
                <p className="text-sm text-gray-600">On all orders over $50</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">24/7 Support</h3>
                <p className="text-sm text-gray-600">
                  Customer support available
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Secure Payments</h3>
                <p className="text-sm text-gray-600">100% secure checkout</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Easy Returns</h3>
                <p className="text-sm text-gray-600">30 days return policy</p>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">GreenShop</h3>
              <p className="text-gray-400 mb-4">
                Your one-stop destination for all your shopping needs with great
                deals and quality products.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Shop</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-200"
                  >
                    All Products
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-200"
                  >
                    Featured Items
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-200"
                  >
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-200"
                  >
                    Best Sellers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-200"
                  >
                    Special Offers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-200"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-200"
                  >
                    FAQs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-200"
                  >
                    Shipping Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-200"
                  >
                    Returns & Exchanges
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-200"
                  >
                    Track Your Order
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Download Our App</h3>
              <p className="text-gray-400 mb-4">
                Shop on the go with our mobile app and get exclusive app-only
                offers.
              </p>
              <div className="flex space-x-2">
                <a
                  href="#"
                  className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition duration-200"
                >
                  <img
                    src="https://cdn.simpleicons.org/apple/white"
                    alt="PayPal"
                    color="#003087"
                    className="h-6 fill-current"
                  />
                </a>
                <a
                  href="#"
                  className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition duration-200"
                >
                  <img
                    src="https://cdn.simpleicons.org/android"
                    alt="PayPal"
                    color="#003087"
                    className="h-6 fill-current"
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2025 GreenShop. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition duration-200"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition duration-200"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition duration-200"
                >
                  Cookies Settings
                </a>
              </div>
              <div className="flex items-center space-x-2 mt-4 md:mt-0">
                <img
                  src="https://cdn.simpleicons.org/visa"
                  alt="Visa"
                  className="h-8"
                />
                <img
                  src="https://cdn.simpleicons.org/mastercard"
                  alt="Mastercard"
                  className="h-8"
                />
                <img
                  src="https://cdn.simpleicons.org/paypal"
                  alt="PayPal"
                  color="#003087"
                  className="h-8 fill-current"
                />
                <img
                  src="https://cdn.simpleicons.org/applepay/gray"
                  alt="Apple Pay"
                  className="h-8"
                />
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Additional SEO-related components */}
      <Head>
        <title>GreenShop | Your One-Stop E-commerce Destination</title>
        <meta
          name="description"
          content="Shop the latest trends, premium products, and budget-friendly options. Free shipping on orders over $50."
        />
        <meta
          name="keywords"
          content="ecommerce, online shopping, premium products, budget-friendly shopping"
        />
        <meta
          property="og:title"
          content="GreenShop | Your One-Stop E-commerce Destination"
        />
        <meta
          property="og:description"
          content="Shop the latest trends, premium products, and budget-friendly options. Free shipping on orders over $50."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta
          property="og:image"
          content="https://yourdomain.com/og-image.jpg"
        />
        <link rel="canonical" href="https://yourdomain.com" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "GreenShop",
              "url": "https://yourdomain.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://yourdomain.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
          `}
        </script>
      </Head>
    </div>
  );
};

// Add the Head component for SEO
const Head: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export default Homepage;
