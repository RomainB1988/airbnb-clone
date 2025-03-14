import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ListingDetails from "./pages/ListingDetails";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import MyReservations from "./pages/MyReservations";
import Favorites from "./pages/Favorites";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";

function App() {
  return (
    <Router basename="/airbnb-clone">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/listing/:id"
          element={
            <ProtectedRoute>
              <ListingDetails />
            </ProtectedRoute>
          }
        />
        <Route path="/my-reservations" element={<ProtectedRoute><MyReservations /></ProtectedRoute>} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/edit-listing/:id" element={<EditListing />} />


      </Routes>
    </Router>
  );
}

export default App;
