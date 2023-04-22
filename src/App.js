import React, { Suspense } from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/auth-ctx";
import { useDispatch } from "react-redux";
import { fetchAllTours } from "./store/tour-actions";
import Layout from "./components/layout/Layout";
import Model from "./UIs/Model/Model";
import Loader from "./UIs/loader/Loader";
import Home from "./pages/home/Home";


const Login = React.lazy(() => import("./pages/authentication/Login"));
const Signup = React.lazy(() => import("./pages/authentication/Signup"));
const UserProfile = React.lazy(() => import("./pages/userProfile/UserProfile"));
const NotFound = React.lazy(() => import("./pages/notFound/NotFound"));
const BookingSuccess = React.lazy(() =>
  import("./pages/booking/BookingSuccess")
);
const MyBookings = React.lazy(() =>
  import("./pages/userProfile/selfManagment/MyBookings")
);
const MyBilling = React.lazy(() =>
  import("./pages/userProfile/selfManagment/MyBilling")
);
const MyReviews = React.lazy(() =>
  import("./pages/userProfile/selfManagment/MyReviews")
);
const ForgetPassword = React.lazy(() =>
  import("./pages/authentication/ForgetPassword")
);
const ResetPassword = React.lazy(() =>
  import("./pages/authentication/ResetPassword")
);
const ManageToursPage = React.lazy(() =>
  import("./pages/userProfile/managment/ManageToursPage")
);
const ManageUsersPage = React.lazy(() =>
  import("./pages/userProfile/managment/ManageUsersPage")
);
const ManageReviewsPage = React.lazy(() =>
  import("./pages/userProfile/managment/ManageReviewsPage")
);
const ManageBookingsPage = React.lazy(() =>
  import("./pages/userProfile/managment/ManageBookingsPage")
);
const ProfileSettingsPage = React.lazy(() =>
  import("./pages/userProfile/selfManagment/ProfileSettingsPage")
);
const TourOverviewPage = React.lazy(() =>
  import("./pages/tourOverview/TourOverviewPage")
);

function App() {
  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllTours());
  }, [dispatch]);

  const fallbackContent = (
    <Model>
      <Loader />
    </Model>
  );

  return (
    <Suspense fallback={fallbackContent}>
      <Layout>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/tour/:slug" element={<TourOverviewPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route
            path="/password-reset/:resetToken"
            element={<ResetPassword />}
          />
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
                <Route
                  path="manage-bookings"
                  element={<ManageBookingsPage />}
                />
              )}
            </Route>
          )}
          <Route path="/bookings/success" element={<BookingSuccess />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Suspense>
  );
}

export default App;
