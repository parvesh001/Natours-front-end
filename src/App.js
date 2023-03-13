import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import TourOverview from "./pages/tourOverview/TourOverview";
import Login from "./pages/authentication/Login";
import Signup from "./pages/authentication/Signup";
import UserProfile from "./pages/userProfile/UserProfile";
import NotFound from "./pages/notFound/NotFound";
import { useContext } from "react";
import { AuthContext } from "./context/auth-ctx";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/tour/:slug" element={<TourOverview />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {authCtx.isLoggedIn && (
          <Route path="/my-profile" element={<UserProfile />} />
        )}
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
