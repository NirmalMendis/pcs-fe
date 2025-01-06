import UpdateIcon from "@mui/icons-material/Update";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import {
  PERMISSIONS,
  PERMISSION_ACTIONS,
} from "../../../constants/iam-constants";
import ROUTE_PATHS from "../../../constants/route-paths";
import TabLayout from "../../../shared/components/tab-layout";
import useUserPermissions from "../../../utils/auth/use-user-permissions";

const CustomerLayout = () => {
  const { canAccessResource } = useUserPermissions();

  const authorizedAllCustomersTab = canAccessResource(
    {
      title: "Customer",
      icon: <ViewCompactIcon color="inherit" />,
      to: `/${ROUTE_PATHS.CUSTOMER.BASE}/${ROUTE_PATHS.CUSTOMER.ALL}`,
    },
    PERMISSIONS.PAWN_TICKET,
    PERMISSION_ACTIONS.VIEW
  );
  const authorizedCustomerView = canAccessResource(
    {
      title: "Update Customer",
      icon: <UpdateIcon color="inherit" />,
      to: `/${ROUTE_PATHS.CUSTOMER.BASE}/${ROUTE_PATHS.CUSTOMER.UPDATE}`,
    },
    PERMISSIONS.PAWN_TICKET,
    PERMISSION_ACTIONS.VIEW
  );

  const tabs = [];

  if (authorizedAllCustomersTab) {
    tabs.push(authorizedAllCustomersTab);
  }
  if (authorizedCustomerView) {
    tabs.push(authorizedCustomerView);
  }
  return <TabLayout tabs={tabs} />;
};

export default CustomerLayout;
