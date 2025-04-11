import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/HomePage";
import ErrorPage from "./pages/ErrorPage";
import SignIn from "./pages/auth/SignIn";
import Register from "./pages/auth/Register";
import { useEffect, useState } from "react";
import { getCurrentUser, isAuthenticated } from "./api/auth";
import CartPage from "./pages/CartPage/CartPage";
import ProfilePage from "./pages/auth/Profile";

const App: React.FC = () => {
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (isAuthenticated()) {
        try {
          await getCurrentUser();
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setAuthChecked(true);
    };

    checkAuth();
  }, []);

  if (!authChecked) {
    return <div>Loading...</div>; 
  }

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
