import { Provider } from "./components/ui/provider";
import DashboardPage from "./dashboard/components/DashboardPage";

function App() {
  return (
    <Provider>
      <DashboardPage />
    </Provider>
  );
}

export default App;
