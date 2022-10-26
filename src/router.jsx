import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { useLocalStorage } from "react-use";

import App from './App'

import { Login } from './pages/Login';
import { Signup } from "./pages/Signup";
import { Profile } from "./pages/Profile";
import { Dashboard } from "./pages/Dashboard";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/:username",
      element: <Profile />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ]);

export const Router = () => (
    <RouterProvider router={router} />
)