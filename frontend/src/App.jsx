import LoginPage from "./pages/LoginPage";
import ListPage from "./pages/ListPage";
import FormPage from "./pages/FormPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const path = window.location.pathname;

  if (path === "/login") return <LoginPage />;

  if (path === "/form") {
    return (
      <ProtectedRoute>
        <FormPage />
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <ListPage />
    </ProtectedRoute>
  );
}

export default App;