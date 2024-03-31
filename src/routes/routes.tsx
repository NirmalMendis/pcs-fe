import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import useMetaData from "../api/meta-data/use-get-metadata";
import useGetUserPermissions from "../api/user/use-get-user-permissions";
import { PERMISSIONS, PERMISSION_ACTIONS } from "../constants/iam-constants";
import ROUTE_PATHS from "../constants/route-paths";
import { MetaDataEnum } from "../constants/string-constants";
import { FeatureEnum } from "../shared/types/generic";
import useAuthStore from "../store/use-auth-store-state";
import LoginLayout from "../ui/layout/login-layout";
import MainLayout from "../ui/layout/main/main-layout";
import Dashboard from "../ui/pages/dashboard/dashboard";
import ErrorBoundary from "../ui/pages/iam/error-boundary";
import SettingUp from "../ui/pages/iam/setting-up";
import Unauthorized from "../ui/pages/iam/unauthorized";
import Login from "../ui/pages/login/login";
import AllPawnTickets from "../ui/pages/pawn-ticket/all-tickets/all-pawn-tickets";
import PawnTicketLayout from "../ui/pages/pawn-ticket/pawn-ticket-layout";
import UpdateTicket from "../ui/pages/pawn-ticket/update-ticket/update-ticket";
import useUserPermissions from "../utils/auth/use-user-permissions";

const Routes = () => {
  const auth = useAuthStore((state) => state.isAuthenticed);
  const { isFetching: isFetchingUserPermissions } = useGetUserPermissions();
  const { isFetching: isFetchingAppFeatures } = useMetaData({
    type: MetaDataEnum.APP_FEATURES,
  });
  const { canAccessResource, withFeatureEnabled } = useUserPermissions();

  const authorizedPawnTicketCategory = canAccessResource(
    <PawnTicketLayout />,
    PERMISSIONS.PAWN_TICKET,
    PERMISSION_ACTIONS.VIEW
  );

  const authorizedAllPawnTickets = withFeatureEnabled(
    canAccessResource(
      <AllPawnTickets />,
      PERMISSIONS.PAWN_TICKET,
      PERMISSION_ACTIONS.VIEW
    ),
    FeatureEnum.PAWN_TICKET
  );

  const featureEnabledPawnCategory = withFeatureEnabled(
    <Route
      path={ROUTE_PATHS.PAWN_TICKET.BASE}
      element={authorizedPawnTicketCategory}
    >
      <Route
        index
        element={<Navigate replace to={ROUTE_PATHS.PAWN_TICKET.ALL} />}
      />
      <Route
        path={ROUTE_PATHS.PAWN_TICKET.ALL}
        element={authorizedAllPawnTickets}
      />
      <Route path={ROUTE_PATHS.PAWN_TICKET.UPDATE} element={<UpdateTicket />} />
    </Route>,
    FeatureEnum.PAWN_TICKET
  );

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
      <Route path="*" element={getFallBackRouteElement()} />
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
