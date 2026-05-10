import { createBrowserRouter } from "react-router-dom";
import MainLayOut from "../layout/MainLayOut";
import HomePage from "../homePage/HomePage";

import Ticker from "../heroSection/Ticker";
import HeroSection from "../heroSection/HeroSection";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/home",
        element: <HeroSection />,
      },
      {
        path: "/ticker",
        element: <Ticker />,
      }
    ],
  },
]);

export default router;
