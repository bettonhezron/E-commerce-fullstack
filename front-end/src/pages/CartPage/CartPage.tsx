import React, { useState, useEffect } from "react";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, X, CreditCard, Truck, ShieldCheck, Heart } from "lucide-react";
import PageLoader from "../../components/Loader";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  variant?: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  variants?: string[];
  description?: string;
}

interface PromoCode {
  code: string;
  discount: number;
  isPercent: boolean;
  isValid?: boolean;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [promoCode, setPromoCode] = useState<string>("");
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(true);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  
  // Mock shipping options
  const shippingOptions = [
    { id: "standard", name: "Standard Shipping", price: 4.99, days: "3-5" },
    { id: "express", name: "Express Shipping", price: 12.99, days: "1-2" },
    { id: "free", name: "Free Shipping", price: 0, days: "5-7", minimum: 50 }
  ];
  
  const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0].id);

  // Green theme colors
  const themeColors = {
    primary: "bg-green-600 hover:bg-green-700 focus:ring-green-500",
    secondary: "text-green-600 hover:text-green-700",
    light: "bg-green-50",
    border: "border-green-200",
    accent: "text-green-800",
  };

  // Fetch cart data
  useEffect(() => {
    const fetchCart = async () => {
      setIsLoading(true);
      try {
        // In a real app, you would fetch this from your API
        // const response = await fetch(`${import.meta.env.VITE_SERVER_HEAD}/api/cart`);
        // const data = await response.json();
        // setCartItems(data.items);
        
        // Mock data for demonstration
        setTimeout(() => {
          setCartItems([
            {
              id: "item1",
              name: "Wireless Headphones",
              price: 199.99,
              quantity: 1,
              imageUrl: "https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg?auto=compress&cs=tinysrgb&w=600",
              variant: "Black"
            },
            {
              id: "item2",
              name: "Organic Cotton T-Shirt",
              price: 29.99,
              quantity: 2,
              imageUrl: "https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg?auto=compress&cs=tinysrgb&w=600",
              variant: "Medium, Green"
            },
            {
              id: "item3",
              name: "Eco-Friendly Water Bottle",
              price: 24.50,
              quantity: 1,
              imageUrl: "https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg?auto=compress&cs=tinysrgb&w=600"
            }
          ]);
          
          // Fetch recommended products
          setRecommendedProducts([
            {
              id: "rec1",
              name: "Bamboo Toothbrush",
              price: 12.99,
              imageUrl: "https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg?auto=compress&cs=tinysrgb&w=600"
            },
            {
              id: "rec2",
              name: "Reusable Shopping Bag",
              price: 9.99,
              imageUrl: "https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg?auto=compress&cs=tinysrgb&w=600"
            },
            {
              id: "rec3",
              name: "Organic Lip Balm",
              price: 4.99,
              imageUrl: "https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg?auto=compress&cs=tinysrgb&w=600"
            }
          ]);
          
          setIsLoading(false);
        }, 500); // Simulate API delay
      } catch (error) {
        console.error("Error fetching cart:", error);
        setIsLoading(false);
      }
    };
    
    fetchCart();
  }, []);

  // Calculate subtotal
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Get selected shipping option
  const getSelectedShipping = () => {
    const option = shippingOptions.find(opt => opt.id === selectedShipping);
    
    // If free shipping option is selected but minimum not met, revert to standard
    if (option?.id === "free" && option.minimum && subtotal < option.minimum) {
      return shippingOptions[0];
    }
    
    return option || shippingOptions[0];
  };
  
  // Calculate discount amount
  const getDiscountAmount = () => {
    if (!appliedPromo) return 0;
    
    return appliedPromo.isPercent 
      ? (subtotal * appliedPromo.discount / 100) 
      : appliedPromo.discount;
  };

  // Calculate total
  const total = subtotal + getSelectedShipping().price - getDiscountAmount();

  // Update item quantity
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  // Apply promo code
  const applyPromoCode = () => {
    // Reset previous promo error
    setPromoError(null);
    
    if (!promoCode.trim()) {
      setPromoError("Please enter a promo code");
      return;
    }
    
    // In a real app, you would validate the promo code with your API
    // For demonstration, we'll use some mock promo codes
    const mockPromoCodes: PromoCode[] = [
      { code: "GREEN10", discount: 10, isPercent: true },
      { code: "SAVE20", discount: 20, isPercent: true },
      { code: "FLAT15", discount: 15, isPercent: false }
    ];
    
    const foundPromo = mockPromoCodes.find(
      p => p.code.toLowerCase() === promoCode.trim().toLowerCase()
    );
    
    if (foundPromo) {
      setAppliedPromo({ ...foundPromo, isValid: true });
      setPromoCode("");
    } else {
      setPromoError("Invalid promo code");
    }
  };
  
  // Remove applied promo code
  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoError(null);
  };
  
  // Toggle cart visibility
  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };
  
  // Add item to cart
  const addToCart = (product: Product, quantity: number = 1, variant?: string) => {
    // Check if product is already in cart
    const existingItemIndex = cartItems.findIndex(item => 
      item.id === product.id && (!variant || item.variant === variant)
    );
    
    if (existingItemIndex >= 0) {
      // Update quantity of existing item
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += quantity;
      setCartItems(updatedItems);
    } else {
      // Add new item to cart
      setCartItems([...cartItems, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        imageUrl: product.imageUrl,
        variant
      }]);
    }

    // Show cart if it's closed
    if (!isCartOpen) {
      setIsCartOpen(true);
    }
  };
  
  // Toggle wishlist item
  const toggleWishlistItem = (productId: string) => {
    if (wishlistItems.includes(productId)) {
      setWishlistItems(wishlistItems.filter(id => id !== productId));
    } else {
      setWishlistItems([...wishlistItems, productId]);
    }
  };
  
  // Proceed to checkout
  const proceedToCheckout = () => {
    // In a real app, you would navigate to checkout page or show checkout modal
    console.log("Proceeding to checkout with", { cartItems, shipping: getSelectedShipping(), discount: getDiscountAmount(), total });
    alert("Proceeding to checkout! Total: $" + total.toFixed(2));
  };
  
  // Save cart for later
  const saveCartForLater = () => {
    // In a real app, you would save the cart to user's account
    localStorage.setItem('savedCart', JSON.stringify(cartItems));
    alert("Cart saved for later!");
  };
  
  if (isLoading) {
    return <PageLoader />;
  }
  
  if (cartItems.length === 0) {
    return (
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="text-center py-16">
          <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h2>
          <p className="mt-1 text-sm text-gray-500">Start shopping to add items to your cart</p>
          <div className="mt-6">
            <a href="/" className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${themeColors.primary}`}>
              Continue Shopping
            </a>
          </div>
        </div>
        
        {recommendedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-900">Recommended Products</h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedProducts.map(product => (
                <div key={product.id} className="border rounded-lg overflow-hidden shadow-sm">
                  <div className="relative h-48">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-center object-cover"
                    />
                    <button
                      onClick={() => toggleWishlistItem(product.id)}
                      className="absolute top-2 right-2 p-1 rounded-full bg-white shadow"
                    >
                      <Heart 
                        className={`h-5 w-5 ${wishlistItems.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                      />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                    <p className="mt-1 text-sm font-bold text-gray-900">${product.price.toFixed(2)}</p>
                    <button
                      onClick={() => addToCart(product)}
                      className={`mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${themeColors.primary}`}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
        <ShoppingBag className="mr-3 h-8 w-8 text-green-600" />
        Your Shopping Cart
        <button 
          onClick={handleCartClick} 
          className="ml-auto text-sm font-medium bg-green-100 py-2 px-4 rounded-md text-green-700 hover:bg-green-200"
        >
          {isCartOpen ? "Minimize Cart" : "Expand Cart"}
        </button>
      </h1>
      
      {isCartOpen && (
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          <div className="lg:col-span-7">
            {/* Cart Items */}
            <ul className="divide-y divide-gray-200 border-t border-b border-gray-200">
              {cartItems.map((item) => (
                <li key={item.id} className="py-6 flex">
                  <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-center object-cover"
                    />
                  </div>

                  <div className="ml-4 flex-1 flex flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{item.name}</h3>
                        <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      {item.variant && (
                        <p className="mt-1 text-sm text-gray-500">{item.variant}</p>
                      )}
                    </div>
                    
                    <div className="flex-1 flex items-end justify-between text-sm">
                      <div className="flex items-center border rounded-md">
                        <button
                          type="button"
                          className="p-2 text-gray-500 hover:text-gray-700"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 py-2">{item.quantity}</span>
                        <button
                          type="button"
                          className="p-2 text-gray-500 hover:text-gray-700"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex space-x-4">
                        <button
                          type="button"
                          className={`font-medium ${themeColors.secondary} flex items-center`}
                          onClick={() => toggleWishlistItem(item.id)}
                        >
                          <Heart className={`h-4 w-4 mr-1 ${wishlistItems.includes(item.id) ? 'fill-red-500 text-red-500' : ''}`} /> 
                          Save
                        </button>
                        
                        <button
                          type="button"
                          className="font-medium text-red-600 hover:text-red-500 flex items-center"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={saveCartForLater}
                className="text-sm font-medium text-gray-600 hover:text-gray-500"
              >
                Save cart for later
              </button>
              
              <a
                href="/"
                className={`text-sm font-medium ${themeColors.secondary} flex items-center`}
              >
                Continue Shopping
              </a>
            </div>
            
            {/* Recommended Products */}
            <div className="mt-12">
              <h2 className="text-lg font-medium text-gray-900 mb-4">You might also like</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {recommendedProducts.map(product => (
                  <div key={product.id} className="border rounded-lg overflow-hidden shadow-sm">
                    <div className="relative h-32">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-center object-cover"
                      />
                      <button
                        onClick={() => toggleWishlistItem(product.id)}
                        className="absolute top-2 right-2 p-1 rounded-full bg-white shadow"
                      >
                        <Heart 
                          className={`h-4 w-4 ${wishlistItems.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                        />
                      </button>
                    </div>
                    <div className="p-3">
                      <h3 className="text-xs font-medium text-gray-900">{product.name}</h3>
                      <p className="mt-1 text-xs font-bold text-gray-900">${product.price.toFixed(2)}</p>
                      <button
                        onClick={() => addToCart(product)}
                        className={`mt-2 w-full inline-flex justify-center items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white ${themeColors.primary}`}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 lg:mt-0 lg:col-span-5">
            <div className={`${themeColors.light} rounded-lg p-6 shadow-sm`}>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              
              {/* Order summary details */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</div>
                  <div className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</div>
                </div>
                
                {/* Shipping options */}
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Shipping</h3>
                  
                  {shippingOptions.map((option) => (
                    <div key={option.id} className="flex items-center mb-2">
                      <input
                        id={`shipping-${option.id}`}
                        name="shipping-option"
                        type="radio"
                        checked={selectedShipping === option.id}
                        onChange={() => setSelectedShipping(option.id)}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        disabled={option.id === "free" && !!option.minimum && subtotal < option.minimum}
                      />
                      <label htmlFor={`shipping-${option.id}`} className="ml-3 text-sm text-gray-700 flex justify-between flex-1">
                        <div>
                          {option.name} ({option.days} business days)
                          {option.minimum && (
                            <span className="text-xs ml-1 text-gray-500">
                              {subtotal < option.minimum ? 
                                `(Spend $${option.minimum.toFixed(2)} to qualify)` : 
                                "(Qualified)"}
                            </span>
                          )}
                        </div>
                        <span className="font-medium">
                          {option.price === 0 ? "Free" : `$${option.price.toFixed(2)}`}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
                
                {/* Promo code */}
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Promo Code</h3>
                  
                  {appliedPromo ? (
                    <div className={`${themeColors.light} rounded-md p-3 flex justify-between items-center border ${themeColors.border}`}>
                      <div>
                        <p className="text-sm font-medium text-green-800">{appliedPromo.code}</p>
                        <p className="text-xs text-green-700">
                          {appliedPromo.isPercent
                            ? `${appliedPromo.discount}% off`
                            : `$${appliedPromo.discount.toFixed(2)} off`}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={removePromoCode}
                        className="text-green-700 hover:text-green-800"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Enter promo code"
                          className="block w-full shadow-sm sm:text-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md"
                        />
                        <button
                          type="button"
                          onClick={applyPromoCode}
                          className={`inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${themeColors.primary}`}
                        >
                          Apply
                        </button>
                      </div>
                      {promoError && (
                        <p className="mt-2 text-sm text-red-600">{promoError}</p>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Total */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <div className="text-base font-medium text-gray-900">Order total</div>
                    <div className="text-base font-medium text-gray-900">${total.toFixed(2)}</div>
                  </div>
                  {getDiscountAmount() > 0 && (
                    <div className="mt-1 text-sm text-green-700 text-right">
                      You saved ${getDiscountAmount().toFixed(2)}!
                    </div>
                  )}
                </div>
                
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={proceedToCheckout}
                    className={`w-full border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white ${themeColors.primary} flex items-center justify-center`}
                  >
                    Checkout <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
                
                {/* Trust badges */}
                <div className="mt-6 border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <ShieldCheck className="h-5 w-5 mr-1 text-green-600" />
                      Secure Checkout
                    </div>
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-1 text-green-600" />
                      Multiple Payment Options
                    </div>
                    <div className="flex items-center">
                      <Truck className="h-5 w-5 mr-1 text-green-600" />
                      Fast Delivery
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Eco-friendly message */}
            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-green-800 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Eco-Friendly Shopping
              </h3>
              <p className="mt-2 text-sm text-green-700">
                We use sustainable packaging and carbon-neutral shipping methods. Thank you for shopping responsibly!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;