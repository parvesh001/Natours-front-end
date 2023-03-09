import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import TourOverview from "./pages/tourOverview/TourOverview";

function App() {
  console.log(process.env.REACT_APP_API_KEY)
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tour/:slug" element={<TourOverview />} />
      </Routes>
    </Layout>
  );
}

export default App;
