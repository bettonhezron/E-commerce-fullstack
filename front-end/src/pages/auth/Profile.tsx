import React, { useState, useEffect } from "react";
import { User, Package, Heart, LogOut, Mail, Phone, MapPin, CreditCard, Edit, Camera, AlertCircle, Check } from "lucide-react";
import { getUser, isAuthenticated, logout } from "../../api/auth";
import PageLoader from "../../components/Loader";
import { useNavigate } from "react-router-dom";

interface UserProfile {
  id: string;
  firstName?: string; 
  lastName?: string; 
  email: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  avatar?: string;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: string;
  total: number;
  items: number;
}

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("profile");
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [notification, setNotification] = useState<{ type: string; message: string } | null>(null);

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      const authStatus = isAuthenticated();
      
      if (!authStatus) {
        navigate("/signin");
        return;
      }
      
      await fetchUserData();
    };
    
    checkAuth();
  }, [navigate]);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      // In a real application, you would fetch this data from your API
      // const response = await fetch(`${import.meta.env.VITE_SERVER_HEAD}/api/user/profile`);
      // const data = await response.json();
      // setProfile(data.user);
      
      // Mock data for demonstration
      const userData = getUser() || {
        id: "user123",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        address: {
          street: "123 Main Street",
          city: "Cityville",
          state: "State",
          zipCode: "12345",
          country: "United States"
        },
        avatar: ""
      };
      
      setProfile(userData);
      setEditedProfile(userData);
      
      // Mock recent orders
      setRecentOrders([
        {
          id: "order1",
          orderNumber: "ORD-2025-1234",
          date: "Apr 5, 2025",
          status: "Delivered",
          total: 129.99,
          items: 3
        },
        {
          id: "order2",
          orderNumber: "ORD-2025-1156",
          date: "Mar 22, 2025",
          status: "Processing",
          total: 85.50,
          items: 2
        },
        {
          id: "order3",
          orderNumber: "ORD-2025-0987",
          date: "Feb 15, 2025",
          status: "Delivered",
          total: 210.75,
          items: 4
        }
      ]);
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleEditToggle = () => {
    if (isEditing && editedProfile) {
      // Save changes
      setProfile(editedProfile);
      setNotification({ type: "success", message: "Profile updated successfully!" });
      setTimeout(() => setNotification(null), 3000);
    }
    setIsEditing(!isEditing);
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (editedProfile) {
      if (name.includes('.')) {
        // Handle nested objects like address.city
        const [parent, child] = name.split('.');
        setEditedProfile({
          ...editedProfile,
          [parent]: {
            ...editedProfile[parent as keyof UserProfile] as object,
            [child]: value
          }
        });
      } else {
        setEditedProfile({
          ...editedProfile,
          [name]: value
        });
      }
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header (You can include your site header here) */}
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">My Account</h1>
          <p className="text-gray-600">Manage your profile and view your orders</p>
        </div>
        
        {notification && (
          <div className={`mb-6 p-4 rounded-lg flex items-center ${notification.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {notification.type === 'success' ? (
              <Check size={20} className="mr-2" />
            ) : (
              <AlertCircle size={20} className="mr-2" />
            )}
            {notification.message}
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex items-center mb-6">
                <div className="relative">
                  <div className="bg-gray-200 rounded-full w-16 h-16 flex items-center justify-center overflow-hidden">
                    {profile?.avatar ? (
                      <img 
                        src={profile.avatar} 
                        alt={`${profile.firstName} ${profile.lastName}`} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={32} className="text-gray-500" />
                    )}
                  </div>
                </div>
                <div className="ml-4">
                  <h2 className="font-bold text-lg">{profile?.firstName} {profile?.lastName}</h2>
                  <p className="text-gray-600 text-sm">{profile?.email}</p>
                </div>
              </div>
              
              <ul className="space-y-1">
                <li>
                  <button 
                    className={`w-full text-left py-2 px-3 rounded-lg flex items-center ${activeTab === 'profile' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'}`}
                    onClick={() => setActiveTab('profile')}
                  >
                    <User size={18} className="mr-3" />
                    <span>My Profile</span>
                  </button>
                </li>
                <li>
                  <button 
                    className={`w-full text-left py-2 px-3 rounded-lg flex items-center ${activeTab === 'orders' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'}`}
                    onClick={() => setActiveTab('orders')}
                  >
                    <Package size={18} className="mr-3" />
                    <span>My Orders</span>
                  </button>
                </li>
                <li>
                  <button 
                    className={`w-full text-left py-2 px-3 rounded-lg flex items-center ${activeTab === 'wishlist' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'}`}
                    onClick={() => setActiveTab('wishlist')}
                  >
                    <Heart size={18} className="mr-3" />
                    <span>My Wishlist</span>
                  </button>
                </li>
                <li>
                  <button 
                    className="w-full text-left py-2 px-3 rounded-lg flex items-center text-red-600 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut size={18} className="mr-3" />
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 flex justify-between items-center border-b">
                  <h2 className="text-xl font-semibold">Personal Information</h2>
                  <button 
                    onClick={handleEditToggle}
                    className={`flex items-center text-sm font-medium px-4 py-2 rounded-lg ${isEditing ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    {isEditing ? (
                      <>
                        <Check size={16} className="mr-2" />
                        Save Changes
                      </>
                    ) : (
                      <>
                        <Edit size={16} className="mr-2" />
                        Edit Profile
                      </>
                    )}
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="mb-8">
                    <div className="flex justify-center mb-4">
                      <div className="relative">
                        <div className="bg-gray-200 rounded-full w-24 h-24 flex items-center justify-center overflow-hidden">
                          {profile?.avatar ? (
                            <img 
                              src={profile.avatar} 
                              alt={`${profile.firstName} ${profile.lastName}`} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User size={40} className="text-gray-500" />
                          )}
                        </div>
                        {isEditing && (
                          <button className="absolute bottom-0 right-0 bg-green-500 text-white p-2 rounded-full shadow-md">
                            <Camera size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="firstName"
                          value={editedProfile?.firstName || ''}
                          onChange={handleProfileChange}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      ) : (
                        <p className="text-gray-800">{profile?.firstName}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="lastName"
                          value={editedProfile?.lastName || ''}
                          onChange={handleProfileChange}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      ) : (
                        <p className="text-gray-800">{profile?.lastName}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <div className="flex items-center">
                          <Mail size={16} className="mr-2 text-gray-500" />
                          Email Address
                        </div>
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={editedProfile?.email || ''}
                          onChange={handleProfileChange}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      ) : (
                        <p className="text-gray-800">{profile?.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <div className="flex items-center">
                          <Phone size={16} className="mr-2 text-gray-500" />
                          Phone Number
                        </div>
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={editedProfile?.phone || ''}
                          onChange={handleProfileChange}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      ) : (
                        <p className="text-gray-800">{profile?.phone || 'Not specified'}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4 flex items-center">
                      <MapPin size={18} className="mr-2 text-gray-500" />
                      Address Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="address.street"
                            value={editedProfile?.address?.street || ''}
                            onChange={handleProfileChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          />
                        ) : (
                          <p className="text-gray-800">{profile?.address?.street || 'Not specified'}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="address.city"
                            value={editedProfile?.address?.city || ''}
                            onChange={handleProfileChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          />
                        ) : (
                          <p className="text-gray-800">{profile?.address?.city || 'Not specified'}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="address.state"
                            value={editedProfile?.address?.state || ''}
                            onChange={handleProfileChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          />
                        ) : (
                          <p className="text-gray-800">{profile?.address?.state || 'Not specified'}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="address.zipCode"
                            value={editedProfile?.address?.zipCode || ''}
                            onChange={handleProfileChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          />
                        ) : (
                          <p className="text-gray-800">{profile?.address?.zipCode || 'Not specified'}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="address.country"
                            value={editedProfile?.address?.country || ''}
                            onChange={handleProfileChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          />
                        ) : (
                          <p className="text-gray-800">{profile?.address?.country || 'Not specified'}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4 flex items-center">
                      <CreditCard size={18} className="mr-2 text-gray-500" />
                      Payment Methods
                    </h3>
                    
                    <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded">
                          <svg className="w-8 h-8 text-blue-600" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M44 11H4V37H44V11Z" fill="#E6EEF8"/>
                            <path d="M4 18H44V24H4V18Z" fill="currentColor"/>
                          </svg>
                        </div>
                        <div className="ml-4">
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className="text-sm text-gray-500">Expires 12/2026</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Default</span>
                    </div>
                    
                    <button className="mt-4 text-green-600 font-medium flex items-center hover:text-green-700">
                      <Edit size={16} className="mr-1" />
                      Manage Payment Methods
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold">My Orders</h2>
                  <p className="text-gray-600 text-sm mt-1">View and track your recent orders</p>
                </div>
                
                <div className="p-6">
                  {recentOrders.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Order Number
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Total
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {recentOrders.map((order) => (
                            <tr key={order.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="font-medium text-gray-900">{order.orderNumber}</div>
                                <div className="text-sm text-gray-500">{order.items} items</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {order.date}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                  {order.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                ${order.total.toFixed(2)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <a href={`/orders/${order.id}`} className="text-green-600 hover:text-green-900">View Details</a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Package size={48} className="mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-1">No orders yet</h3>
                      <p className="text-gray-500">Start shopping and your orders will appear here</p>
                      <a href="/" className="mt-4 inline-block bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition duration-200">
                        Browse Products
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold">My Wishlist</h2>
                  <p className="text-gray-600 text-sm mt-1">Products you've saved for later</p>
                </div>
                
                <div className="p-6 text-center py-12">
                  <Heart size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Your wishlist is empty</h3>
                  <p className="text-gray-500">Add items to your wishlist while browsing our store</p>
                  <a href="/shop" className="mt-4 inline-block bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition duration-200">
                    Continue Shopping
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Footer (You can include your site footer here) */}
    </div>
  );
};

export default ProfilePage;