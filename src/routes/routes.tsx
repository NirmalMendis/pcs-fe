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
import ErrorBoundary from "../ui/pages/access-control/error-boundary";
import SettingUp from "../ui/pages/access-control/setting-up";
import Unauthorized from "../ui/pages/access-control/unauthorized";
import Dashboard from "../ui/pages/dashboard/dashboard";
import IAMLayout from "../ui/pages/iam/iam-layout";
import CRURole from "../ui/pages/iam/role-management/cru-role";
import RoleManagement from "../ui/pages/iam/role-management/role-management";
import UserManagement from "../ui/pages/iam/user-management/user-management";
import LandingPage from "../ui/pages/landing-page/landing-page";
import Login from "../ui/pages/login/login";
import SetNewPassword from "../ui/pages/login/set-new-password/set-new-pwd";
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

  const authorizedUpdatePawnTicket = withFeatureEnabled(
    canAccessResource(
      <UpdateTicket />,
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
      <Route
        path={ROUTE_PATHS.PAWN_TICKET.UPDATE}
        element={authorizedUpdatePawnTicket}
      >
        <Route path=":id" element={authorizedUpdatePawnTicket} />
      </Route>
    </Route>,
    FeatureEnum.PAWN_TICKET
  );

  const authorizedIAMCategory = canAccessResource(
    <IAMLayout />,
    PERMISSIONS.IAM,
    PERMISSION_ACTIONS.VIEW
  );

  const authorizedUserManagement = withFeatureEnabled(
    canAccessResource(
      <UserManagement />,
      PERMISSIONS.IAM,
      PERMISSION_ACTIONS.VIEW
    ),
    FeatureEnum.IAM
  );

  const authorizedRoleManagement = withFeatureEnabled(
    canAccessResource(
      <RoleManagement />,
      PERMISSIONS.IAM,
      PERMISSION_ACTIONS.VIEW
    ),
    FeatureEnum.IAM
  );

  const authorizedCURoleManagement = withFeatureEnabled(
    canAccessResource(<CRURole />, PERMISSIONS.IAM, PERMISSION_ACTIONS.VIEW),
    FeatureEnum.IAM
  );

  const featureEnabledIAMCategory = withFeatureEnabled(
    <Route path={ROUTE_PATHS.IAM.BASE} element={authorizedIAMCategory}>
      <Route
        index
        element={<Navigate replace to={ROUTE_PATHS.IAM.USER_MANAGEMENT} />}
      />
      <Route
        path={ROUTE_PATHS.IAM.USER_MANAGEMENT}
        element={authorizedUserManagement}
      >
        <Route path=":id" element={authorizedUserManagement} />
      </Route>
      <Route path={ROUTE_PATHS.IAM.ROLE_MANAGEMENT}>
        <Route index element={authorizedRoleManagement} />
        <Route
          path={ROUTE_PATHS.IAM.ADD_ROLE}
          element={authorizedCURoleManagement}
        />
        {/* <Route
          path={ROUTE_CONFIG.EDIT_ROLE.PATH}
          element={AuthorizedRoleEdit}
        /> */}
      </Route>
    </Route>,
    FeatureEnum.IAM
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
      {featureEnabledIAMCategory}
      <Route path="*" element={getFallBackRouteElement()} />
    </Route>
  ) : (
    <Route path="/" element={<LoginLayout />}>
      <Route path={ROUTE_PATHS.LANDING_PAGE} element={<LandingPage />} />
      <Route path={ROUTE_PATHS.LOGIN} element={<Login />} />
      <Route path={ROUTE_PATHS.SET_NEW_PASSWORD} element={<SetNewPassword />} />
      <Route path="*" element={<Navigate to={ROUTE_PATHS.LOGIN} />} />
    </Route>
  );
  const router = createBrowserRouter(createRoutesFromElements(routes));
  return <RouterProvider router={router} />;
};

export default Routes;
