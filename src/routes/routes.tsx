import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import LoginLayout from "../ui/layout/login-layout";
import MainLayout from "../ui/layout/main-layout";
import Login from "../ui/pages/login/login";
import CashRegister from "../ui/pages/register/cash-register";

const Routes = () => {
  const auth = false;
  const routes = auth ? (
    <Route path="/" element={<MainLayout />}>
      <Route path="register" element={<CashRegister />} />
    </Route>
  ) : (
    <Route path="/" element={<LoginLayout />}>
      <Route path="login" element={<Login />} />
    </Route>
  );
  const router = createBrowserRouter(createRoutesFromElements(routes));
  return <RouterProvider router={router} />;
};

export default Routes;
