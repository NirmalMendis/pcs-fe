import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import useMetaData from "../api/meta-data/use-get-metadata";
import useGetUserPermissions from "../api/user/use-get-user-permissions";
import ROUTE_PATHS from "../constants/route-paths";
import { MetaDataEnum } from "../constants/string-constants";
import useAuthStore from "../store/use-auth-store-state";
import LoginLayout from "../ui/layout/login-layout";
import MainLayout from "../ui/layout/main/main-layout";
import ErrorBoundary from "../ui/pages/access-control/error-boundary";
import SettingUp from "../ui/pages/access-control/setting-up";
import Unauthorized from "../ui/pages/access-control/unauthorized";
import Dashboard from "../ui/pages/dashboard/dashboard";
import LandingPage from "../ui/pages/landing-page/landing-page";
import ForgotPassword from "../ui/pages/login/forgot-password/forgot-password";
import Login from "../ui/pages/login/login";
import SetNewPassword from "../ui/pages/login/set-new-password/set-new-pwd";
import useCustomerRoutes from "./use-customer-routes";
import useIAMRoutes from "./use-iam-routes";
import usePawnTicketRoutes from "./use-pawn-ticket-routes";

const Routes = () => {
  const auth = useAuthStore((state) => state.isAuthenticed);
  const { isFetching: isFetchingUserPermissions } = useGetUserPermissions();
  const { isFetching: isFetchingAppFeatures } = useMetaData({
    type: MetaDataEnum.APP_FEATURES,
  });

  const featureEnabledPawnCategory = usePawnTicketRoutes();
  const featureEnabledIAMCategory = useIAMRoutes();
  const featureEnabledCustomerCategory = useCustomerRoutes();

  const getFallBackRouteElement = () => {
    if (isFetchingAppFeatures || isFetchingUserPermissions) {
      return <SettingUp />;
    } else {
      return <Unauthorized />;
    }
  };

  const routes = auth ? (
    <Route element={<MainLayout />} errorElement={<ErrorBoundary />}>
      <Route path={ROUTE_PATHS.DASHBOARD} element={<Dashboard />} />
      {featureEnabledPawnCategory}
      {featureEnabledIAMCategory}
      {featureEnabledCustomerCategory}
      <Route path="*" element={getFallBackRouteElement()} />
    </Route>
  ) : (
    <Route path="/" element={<LoginLayout />}>
      <Route path={ROUTE_PATHS.LANDING_PAGE} element={<LandingPage />} />
      <Route path={ROUTE_PATHS.LOGIN} element={<Login />} />
      <Route path={ROUTE_PATHS.SET_NEW_PASSWORD} element={<SetNewPassword />} />
      <Route path={ROUTE_PATHS.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path="*" element={<Navigate to={ROUTE_PATHS.LOGIN} />} />
    </Route>
  );
  const router = createBrowserRouter(createRoutesFromElements(routes));
  return <RouterProvider router={router} />;
};

export default Routes;
