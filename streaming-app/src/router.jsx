import React from 'react'
import ReactDOM from 'react-dom/client'
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App.jsx'
import Navbar from './components/Navbar.jsx';
import Root from "./routes/Root.jsx";
import ErrorPage from "./error-page.jsx";
import Login from './views/Login.jsx'
import Register from './views/Register.jsx';
import Movies from './views/Movies.jsx';
import Series from './views/Series.jsx';
import SearchBar from './components/SearchBar.jsx';
import Home from './views/Home.jsx';
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/movies",
        element: <Movies />,
      },
      {
        path: "/series",
        element: <Series />
      },
      {
        path: "/search",
        element: <SearchBar />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>,
)

export default router;
