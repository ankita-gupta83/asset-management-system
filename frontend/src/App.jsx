import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Assets from "./components/Assets";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Employees from "./components/Employees";
import EmployeeDetail from "./components/EmployeeDetail";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public home */}
        <Route path="/" element={<Home />} />

        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected assets */}
        <Route
          path="/assets"
          element={
            <ProtectedRoute>
              <Assets />
            </ProtectedRoute>
          }
        />
        <Route path="/dash" element={<Dashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
