import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ROUTE_PATHS from "../constants/route-paths";
import useAuthStore from "../store/use-auth-store-state";
import LoginLayout from "../ui/layout/login-layout";
import MainLayout from "../ui/layout/main/main-layout";
import Login from "../ui/pages/login/login";
import CashRegister from "../ui/pages/register/cash-register";

const Routes = () => {
  const auth = useAuthStore((state) => state.isAuthenticed);

  const routes = auth ? (
    <Route path="/" element={<MainLayout />}>
      <Route path={ROUTE_PATHS.REGISTER} element={<CashRegister />} />
      {/* Update with unauthorized page */}
      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  ) : (
    <Route path="/" element={<LoginLayout />}>
      <Route path={ROUTE_PATHS.LOGIN} element={<Login />} />
      <Route path="*" element={<Navigate to={ROUTE_PATHS.LOGIN} />} />
    </Route>
  );
  const router = createBrowserRouter(createRoutesFromElements(routes));
  return <RouterProvider router={router} />;
};

export default Routes;
