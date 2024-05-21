import { Navigate, Route } from "react-router-dom";
import { PERMISSIONS, PERMISSION_ACTIONS } from "../constants/iam-constants";
import ROUTE_PATHS from "../constants/route-paths";
import { FeatureEnum } from "../shared/types/generic";
import IAMLayout from "../ui/pages/iam/iam-layout";
import CRURole from "../ui/pages/iam/role-management/cru-role";
import RoleManagement from "../ui/pages/iam/role-management/role-management";
import UserManagement from "../ui/pages/iam/user-management/user-management";
import useUserPermissions from "../utils/auth/use-user-permissions";

const useIAMRoutes = () => {
  const { canAccessResource, withFeatureEnabled } = useUserPermissions();

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

  return featureEnabledIAMCategory;
};

export default useIAMRoutes;
