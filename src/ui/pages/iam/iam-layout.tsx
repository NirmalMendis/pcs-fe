import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import {
  PERMISSIONS,
  PERMISSION_ACTIONS,
} from "../../../constants/iam-constants";
import ROUTE_PATHS from "../../../constants/route-paths";
import TabLayout from "../../../shared/components/tab-layout";
import useUserPermissions from "../../../utils/auth/use-user-permissions";

const IAMLayout = () => {
  const { canAccessResource } = useUserPermissions();

  const authorizedUserManagementTab = canAccessResource(
    {
      title: "User Management",
      icon: <ViewCompactIcon color="inherit" />,
      to: `/${ROUTE_PATHS.IAM.BASE}/${ROUTE_PATHS.IAM.USER_MANAGEMENT}`,
    },
    PERMISSIONS.IAM,
    PERMISSION_ACTIONS.VIEW
  );

  const authorizedRoleManagementTab = canAccessResource(
    {
      title: "Role Management",
      icon: <ViewCompactIcon color="inherit" />,
      to: `/${ROUTE_PATHS.IAM.BASE}/${ROUTE_PATHS.IAM.ROLE_MANAGEMENT}`,
    },
    PERMISSIONS.IAM,
    PERMISSION_ACTIONS.VIEW
  );

  const tabs = [];

  if (authorizedUserManagementTab) {
    tabs.push(authorizedUserManagementTab);
  }
  if (authorizedRoleManagementTab) {
    tabs.push(authorizedRoleManagementTab);
  }

  return <TabLayout tabs={tabs} />;
};

export default IAMLayout;
