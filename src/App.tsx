import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

import Main from "./components/Main";
import Resume from "./components/Resume";

import { cn } from "./cn";
import Home from "./components/Home";
import PageAnalytics from "./components/PageAnalytics";
import PlayGround from "./components/PlayGround";
import LoaderManager from "./components/LoaderManager";
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
  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    return <LoaderManager onComplete={() => setLoaded(true)} />;
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
