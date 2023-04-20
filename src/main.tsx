import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./routes/Home";
import Profile from "./routes/Profile";
import * as routes from "./constants/routes";

import "./index.css";

const router = createBrowserRouter([
  {
    path: routes.PROFILE,
    element: <App />,
    children: [
      {
        path: routes.PROFILE,
        element: <Profile />,
      },
      {
        path: routes.ORGANIZATION,
        element: <Home />,
      },
    ],
  },
]);

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  cache: new InMemoryCache(),
  headers: {
    Authorization: `bearer ${
      import.meta.env.VITE_GITHUB_PERSONAL_ACCESS_TOKEN
    }`,
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);
