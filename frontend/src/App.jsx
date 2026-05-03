import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthContext } from "./context/AuthContext";
import Add from "./pages/Add/Add";
import Auth from "./pages/Auth/Auth";
import Edit from "./pages/Edit/Edit";
import Home from "./pages/Home/Home";

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="app">
      {isAuthenticated ? <Navbar /> : null}
      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <Add />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <Edit />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
