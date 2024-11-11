import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout.jsx';
import Home from "./pages/Home.jsx";
import FetchOld from './pages/FetchOld';
import FetchTQ from './pages/FetchTQ';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Post from './components/UI/Post.jsx';

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/old",
        element: <FetchOld />
      },
      {
        path: "/tq",
        element: <FetchTQ />
      },
      {
        path: "/tq/:id",
        element: <Post />
      }

    ]
  }
]);
const App = () => {
  //! create Client 
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes}></RouterProvider>
      </QueryClientProvider>
    </>
  )
}

export default App