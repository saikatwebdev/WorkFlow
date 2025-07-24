import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/WorkFlowLanding";
import Dashboard from "./pages/WorkFlowDashboard";
import AdminDashboard from "./components/AdminDashboard";

// 🚨 TEMPORARY: Bypass authentication for testing
const BYPASS_AUTH = true; // Set to false when you want real authentication

const ProtectedRoute = ({ children }) => {
  if (BYPASS_AUTH) {
    console.log("🔓 Auth bypassed for testing");
    return children;
  }

  const userString = localStorage.getItem("user"); // ✅ Changed to "user"
  console.log("🔍 Raw localStorage data:", userString);
  
  let currentUser = null;
  try {
    currentUser = userString ? JSON.parse(userString) : null;
  } catch (error) {
    console.error("❌ Error parsing user from localStorage:", error);
    localStorage.removeItem("user"); // ✅ Changed to "user"
  }
  
  console.log("👤 Parsed currentUser:", currentUser);
  const isAuthenticated = !!currentUser;

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

function App() {
  // For testing: mock current user when bypassing auth
  let currentUser = null;
  
  if (BYPASS_AUTH) {
    // 🚨 CHANGE THIS to test different roles
    currentUser = { id: 1, role: "admin", name: "Test Admin" }; // or role: "user"
    console.log("🔓 Using mock user for testing:", currentUser);
  } else {
    const userString = localStorage.getItem("user"); // ✅ Changed to "user"
    try {
      currentUser = userString ? JSON.parse(userString) : null;
    } catch (error) {
      console.error("❌ Error parsing user in App:", error);
      localStorage.removeItem("user"); // ✅ Changed to "user"
    }
  }

  console.log("🏠 App component - currentUser:", currentUser);

  return (
    <Router>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#333",
            color: "#fff",
          },
          success: {
            style: {
              background: "linear-gradient(to right, #7c3aed, #2563eb)",
            },
          },
        }}
      />

      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Regular user dashboard route */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              {currentUser?.role === "admin" ? (
                <Navigate to="/admin" replace />
              ) : (
                <Dashboard />
              )}
            </ProtectedRoute>
          }
        />

        {/* Admin route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              {currentUser?.role === "admin" ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/dashboard" replace />
              )}
            </ProtectedRoute>
          }
        />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;