import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Ratings from "./pages/Ratings/Ratings";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import "./App.css";
import Login from "./pages/Auth/LoginPage/LoginPage";
import Register from "./pages/Auth/RegisterPage/RegisterPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import BigLocation from "./pages/BigLocation/BigLocation";

// App.js
function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ratings" element={<Ratings />} />
            <Route path="/location/:id" element={<BigLocation />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminPanel />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}
export default App;
