import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "src/routes/layout";
import HomePage from "src/routes/_index";
import PlannerPage from "src/routes/planner";
import TripsPage from "src/routes/trips";
import HotelDetailsPage from "src/routes/hotels.$id";
import LoginRoute from "src/routes/login";
import RegisterRoute from "src/routes/register";
import RecommendedHotelRoute from "src/routes/recommendedHotel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "planner", element: <PlannerPage /> },
      { path: "trips", element: <TripsPage /> },
      { path: "hotels/:id", element: <HotelDetailsPage /> },
      { path: "recommended-hotels", element: <RecommendedHotelRoute /> },
    ],
  },
  {
    path: "/login",
    element: <LoginRoute />,
  },
  {
    path: "/register",
    element: <RegisterRoute />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
