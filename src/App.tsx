import './App.css'
import Characters from './pages/Characters/Characters'
import Comics from './pages/Comics/Comics';
import Layout from './Layout';
import { BrowserRouter, Navigate } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import CharacterDetail from './pages/CharacterDetail/CharacterDetail';
import ComicDetail from './pages/ComicDetail/ComicDetail';
import Favourites from './pages/Favourites/Favourites';
function AppRoutes() {
  const routes = [
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Navigate to="/characters" replace /> },
        { path: "characters", element: <Characters /> },
        { path: "comics", element: <Comics /> },
        { path: "characters/:id", element: <CharacterDetail /> },
        { path: "comics/:id", element: <ComicDetail /> },
        { path: "favourites", element: <Favourites /> },
      ],
    },
  ];

  return useRoutes(routes);
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;