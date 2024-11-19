import Layout from "../Layout";
import { Navigate } from "react-router-dom";
import Characters from "../pages/Characters/Characters";
import Comics from "../pages/Comics/Comics";
import CharacterDetail from "../pages/CharacterDetail/CharacterDetail";
import ComicDetail from "../pages/ComicDetail/ComicDetail";
import Favourites from "../pages/Favourites/Favourites";

const routesConfig = [
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

export default routesConfig;
