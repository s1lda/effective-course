import { useRoutes } from "react-router-dom";
import routesConfig from "../../config/routesConfig";
function AppRoutes() {
  return useRoutes(routesConfig);
}

export default AppRoutes;
