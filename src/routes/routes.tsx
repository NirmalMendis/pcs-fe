import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import useAuthStore from "../store/use-auth-store-state";
import LoginLayout from "../ui/layout/login-layout";
import MainLayout from "../ui/layout/main-layout";
import Login from "../ui/pages/login/login";
import CashRegister from "../ui/pages/register/cash-register";

const Routes = () => {
  const auth = useAuthStore((state) => state.isAuthenticed);

  const routes = auth ? (
    <Route path="/" element={<MainLayout />}>
      <Route path="register" element={<CashRegister />} />
      {/* Update with unauthorized page */}
      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  ) : (
    <Route path="/" element={<LoginLayout />}>
      <Route path="login" element={<Login />} />
      <Route path="*" element={<Navigate to="login" />} />
    </Route>
  );
  const router = createBrowserRouter(createRoutesFromElements(routes));
  return <RouterProvider router={router} />;
};

export default Routes;
