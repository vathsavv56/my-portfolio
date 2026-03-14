import { createBrowserRouter, RouterProvider } from "react-router";

import Main from "./components/Main";
import Resume from "./components/Resume";
import Blogs from "./components/Blogs";
import { cn } from "./cn";
import Home from "./components/Home";
import PageAnalytics from "./components/PageAnalytics";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children : [
      {
        index:true,
        element:<Home/>
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
      }
    ]
  }
]);

const App = () => {
  return (
    <div className={
        cn(
            "h-fit w-full max-w-2xl mx-auto  bg-[#100F0F] text-white font-grosek container"
        )
    }>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
