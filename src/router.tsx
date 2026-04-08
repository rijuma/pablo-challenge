import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Challenge01 from "./challenges/01-counter";
import Challenge02 from "./challenges/02-signup-form";
import Challenge03 from "./challenges/03-digital-clock";
import Challenge04 from "./challenges/04-pokedex";
import Challenge05 from "./challenges/05-custom-hook";
import Challenge06 from "./challenges/06-stopwatch";
import Challenge07 from "./challenges/07-theme-switcher";
import Challenge08 from "./challenges/08-shopping-cart";
import Challenge09 from "./challenges/09-rick-morty-catalog";
import Challenge10 from "./challenges/10-pokemon-team-builder";
import Example01 from "./challenges/01-counter/example";
import Example02 from "./challenges/02-signup-form/example";
import Example03 from "./challenges/03-digital-clock/example";
import Example04 from "./challenges/04-pokedex/example";
import Example05 from "./challenges/05-custom-hook/example";
import Example06 from "./challenges/06-stopwatch/example";
import Example07 from "./challenges/07-theme-switcher/example";
import Example08 from "./challenges/08-shopping-cart/example";
import Example09 from "./challenges/09-rick-morty-catalog/example";
import Example10 from "./challenges/10-pokemon-team-builder/example";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/challenges/01" replace /> },
      { path: "challenges/01", element: <Challenge01 /> },
      { path: "challenges/01/example", element: <Example01 /> },
      { path: "challenges/02", element: <Challenge02 /> },
      { path: "challenges/02/example", element: <Example02 /> },
      { path: "challenges/03", element: <Challenge03 /> },
      { path: "challenges/03/example", element: <Example03 /> },
      { path: "challenges/04", element: <Challenge04 /> },
      { path: "challenges/04/example", element: <Example04 /> },
      { path: "challenges/05", element: <Challenge05 /> },
      { path: "challenges/05/example", element: <Example05 /> },
      { path: "challenges/06", element: <Challenge06 /> },
      { path: "challenges/06/example", element: <Example06 /> },
      { path: "challenges/07", element: <Challenge07 /> },
      { path: "challenges/07/example", element: <Example07 /> },
      { path: "challenges/08", element: <Challenge08 /> },
      { path: "challenges/08/example", element: <Example08 /> },
      { path: "challenges/09", element: <Challenge09 /> },
      { path: "challenges/09/example", element: <Example09 /> },
      { path: "challenges/10", element: <Challenge10 /> },
      { path: "challenges/10/example", element: <Example10 /> },
    ],
  },
]);
