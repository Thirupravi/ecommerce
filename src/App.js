import "./App.css";

import { DataProvider } from "./Data/DataContext";
import Home from "./Screens/Home/Home";
function App() {
  return (
    <DataProvider>
      <Home />
    </DataProvider>
  );
}

export default App;
