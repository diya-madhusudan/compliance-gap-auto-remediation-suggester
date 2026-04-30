import LoginPage from "./pages/LoginPage";
import ListPage from "./pages/ListPage";
import FormPage from "./pages/FormPage";
import Dashboard from "./pages/Dashboard";
import DetailPage from "./pages/DetailPage";
import Analytics from "./pages/Analytics";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const path = window.location.pathname;

  // 🔐 Login
  if (path === "/" || path === "/login") return <LoginPage />;

  // 📊 Dashboard
  if (path === "/dashboard") {
    return (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    );
  }

  // 📈 Analytics
  if (path === "/analytics") {
    return (
      <ProtectedRoute>
        <Analytics />
      </ProtectedRoute>
    );
  }

  // 📄 Detail Page
  if (path.startsWith("/detail")) {
    return (
      <ProtectedRoute>
        <DetailPage />
      </ProtectedRoute>
    );
  }

  // 📝 Form Page
  if (path === "/form") {
    return (
      <ProtectedRoute>
        <FormPage />
      </ProtectedRoute>
    );
  }

  // 📋 Default → List Page
  return (
    <ProtectedRoute>
      <ListPage />
    </ProtectedRoute>
  );
}

export default App;