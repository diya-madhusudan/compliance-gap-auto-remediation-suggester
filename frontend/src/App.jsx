import ListPage from "./pages/ListPage";
import FormPage from "./pages/FormPage";

function App() {
  const path = window.location.pathname;

  return (
    <div>
      {path === "/form" ? <FormPage /> : <ListPage />}
    </div>
  );
}

export default App;