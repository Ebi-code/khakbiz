import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./components/NotFound/NotFound";

import Petrochemicals from "./Pages/Petrochemicals/Petrochemicals";
import Products from "./Pages/Products/Products";
import Buyers from "./Pages/Buyers/Buyers";
import Product from "./Pages/Products/Product/Product";
import Buyer from "./Pages/Buyers/Buyer/Buyer";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
  },

  {
    path: "/petrochemicals",
    element: <Petrochemicals />,
  },
  {
    path: "/buyers",
    element: <Buyers />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/products/product/:productId",
    element: <Product />,
  },
  {
    path: "/buyers/buyer/:buyerId",
    element: <Buyer />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("wrap"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
