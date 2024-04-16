import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import {
  PERMISSIONS,
  PERMISSION_ACTIONS,
} from "../../../constants/iam-constants";
import TabLayout from "../../../shared/components/tab-layout";
import useUserPermissions from "../../../utils/auth/use-user-permissions";

const IAMLayout = () => {
  const { canAccessResource } = useUserPermissions();

  const authorizedUserManagementTab = canAccessResource(
    {
      title: "User Management",
      icon: <ViewCompactIcon color="inherit" />,
      to: "/pawn-ticket/all",
    },
    PERMISSIONS.IAM,
    PERMISSION_ACTIONS.VIEW
  );

  const tabs = [];

  if (authorizedUserManagementTab) {
    tabs.push(authorizedUserManagementTab);
  }

  return <TabLayout tabs={tabs} />;
};

export default IAMLayout;
