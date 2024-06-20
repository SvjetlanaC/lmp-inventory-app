import React from "react";
import "./App.css";
import Login from "./components/login/Login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./components/registration/Register";
import Inventory from "./components/inventory/Inventory";
import { ItemContextProvider } from "./contexts/ItemsContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import { UserContextProvider } from "./contexts/UserContext";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: (
        <UserContextProvider>
          <Login />
        </UserContextProvider>
      ),
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      element: (
        <UserContextProvider>
          <ProtectedRoute />
        </UserContextProvider>
      ),
      children: [
        {
          path: "/inventory",
          element: (
            <ItemContextProvider>
              <Inventory />
            </ItemContextProvider>
          ),
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={route} />
    </div>
  );
}

export default App;
