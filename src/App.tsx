import { createBrowserRouter, RouterProvider } from "react-router";
import Main from "./components/Main";
import { cn } from "./cn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
]);

const App = () => {
  return (
    <div className={
        cn(
            "h-fit w-full max-w-2xl border mx-auto bg-[#100F0F] outline-white outline text-white font-grosek container"
        )
    }>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
