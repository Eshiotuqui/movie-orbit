import { Layout } from "@/components/shared/layout";
import { Home } from "@/pages/home";
import { MovieDetail } from "@/pages/movie-detail";
import { Favorites } from "@/pages/favorites";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: "movie/:id", element: <MovieDetail /> },
      { path: "favorites", element: <Favorites /> },
    ],
  },
]);
