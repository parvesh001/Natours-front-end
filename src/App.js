import { Routes, Route, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/auth-ctx";
import { useDispatch } from "react-redux";
import { fetchAllTours } from "./store/tour-actions";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import TourOverview from "./pages/tourOverview/TourOverview";
import Login from "./pages/authentication/Login";
import Signup from "./pages/authentication/Signup";
import UserProfile from "./pages/userProfile/UserProfile";
import NotFound from "./pages/notFound/NotFound";
import ForgetPassword from "./pages/authentication/ForgetPassword";
import ResetPassword from "./pages/authentication/ResetPassword";
import ManageToursPage from "./pages/userProfile/managment/ManageToursPage";
import ManageUsersPage from "./pages/userProfile/managment/ManageUsersPage";
import ManageReviewsPage from "./pages/userProfile/managment/ManageReviewsPage";
import ManageBookingsPage from "./pages/userProfile/managment/ManageBookingsPage";
import ProfileSettingsPage from "./pages/userProfile/selfManagment/ProfileSettingsPage";
import BookingSuccess from "./pages/booking/BookingSuccess";
import MyBookings from "./pages/userProfile/selfManagment/MyBookings";
import MyReviews from "./pages/userProfile/selfManagment/MyReviews";
import MyBilling from "./pages/userProfile/selfManagment/MyBilling";

function App() {
  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllTours());
  }, [dispatch]);

  return (
    <Layout>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/tour/:slug" element={<TourOverview />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/password-reset/:resetToken" element={<ResetPassword />} />
        {authCtx.isLoggedIn && (
          <Route path="/my-profile" element={<UserProfile />}>
            <Route path="settings" element={<ProfileSettingsPage />} />
            <Route path="my-bookings" element={<MyBookings />} />
            <Route path="my-reviews" element={<MyReviews />} />
            <Route path="my-billing" element={<MyBilling />} />
            {authCtx.user.role === "admin" && (
              <Route path="manage-tours" element={<ManageToursPage />} />
            )}
            {authCtx.user.role === "admin" && (
              <Route path="manage-users" element={<ManageUsersPage />} />
            )}
            {authCtx.user.role === "admin" && (
              <Route path="manage-reviews" element={<ManageReviewsPage />} />
            )}
            {authCtx.user.role === "admin" && (
              <Route path="manage-bookings" element={<ManageBookingsPage />} />
            )}
          </Route>
        )}
        <Route path="/bookings/success" element={<BookingSuccess />} />
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
