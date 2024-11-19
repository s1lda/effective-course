import './App.css'
import { BrowserRouter} from "react-router-dom";
import './App.css'
import AppRoutes from './components/AppRoutes/AppRoutes';
function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;