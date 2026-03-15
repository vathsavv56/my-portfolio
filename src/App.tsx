import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

import Main from "./components/Main";
import Resume from "./components/Resume";
import Blogs from "./components/Blogs";
import { cn } from "./cn";
import Home from "./components/Home";
import PageAnalytics from "./components/PageAnalytics";
import PlayGround from "./components/PlayGround";
import Loader from "./components/Loader";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "resume",
        element: <Resume />,
      },
      {
        path: "blogs",
        element: <Blogs />,
      },
      {
        path: "analytics",
        element: <PageAnalytics />,
      },
      {
        path: "playground",
        element: <PlayGround />,
      },
    ],
  },
]);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div
      className={cn(
        "h-fit w-full max-w-2xl mx-auto  bg-[#100F0F] text-white font-grosek container",
      )}
    >
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
