// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { DetailPoke } from "./pages/DetailPoke";
import { DetailItem } from "./pages/DetailItem";
import Favorites from "./pages/Favorites"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "pokemon/:id",
        element: <DetailPoke />,
      },
      {
        path: "item/:id",
        element: <DetailItem />,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
    ],
  },
]);

export { router };