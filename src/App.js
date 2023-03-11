import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import TourOverview from "./pages/tourOverview/TourOverview";
import Login from './pages/authentication/Login'
import Signup from './pages/authentication/Signup'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tour/:slug" element={<TourOverview />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Layout>
  );
}

export default App;
