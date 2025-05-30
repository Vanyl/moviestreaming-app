import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import ErrorPage from "./error-page.jsx";
import Home from "./views/Home.jsx";
import Login from "./views/Login.jsx";
import Register from "./views/Register.jsx";
import Movies from "./views/Movies.jsx";
import MoviePage from "./views/MoviePage.jsx";
import Series from "./views/Series.jsx";
import SeriePage from './views/SeriePage.jsx'
import SearchBar from "./components/SearchBar.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "movies",
        element: <Movies />,
      },
      {
        path: "movie/:id",
        element: <MoviePage />
      },
      {
        path: "series",
        element: <Series />,
      },
      {
        path: "tv/:id",
        element: <SeriePage />
      },
      {
        path: "search",
        element: <SearchBar />,
      },
    ],
  },
]);

// ReactDOM.createRoot(document.getElementById('root')).render(
//   // <React.StrictMode>
//     <RouterProvider router={router} />
//   // </React.StrictMode>,
// )

export default router;
