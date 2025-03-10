import UpdateIcon from "@mui/icons-material/Update";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import {
  PERMISSIONS,
  PERMISSION_ACTIONS,
} from "../../../constants/iam-constants";
import ROUTE_PATHS from "../../../constants/route-paths";
import TabLayout from "../../../shared/components/tab-layout";
import useUserPermissions from "../../../utils/auth/use-user-permissions";

const PawnTicketLayout = () => {
  const { canAccessResource } = useUserPermissions();

  const authorizedAllPawnTicketTab = canAccessResource(
    {
      title: "Pawn Ticket",
      icon: <ViewCompactIcon color="inherit" />,
      to: `/${ROUTE_PATHS.PAWN_TICKET.BASE}/${ROUTE_PATHS.PAWN_TICKET.ALL}`,
    },
    PERMISSIONS.PAWN_TICKET,
    PERMISSION_ACTIONS.VIEW
  );
  const authorizedPawnTicketView = canAccessResource(
    {
      title: "Update Ticket",
      icon: <UpdateIcon color="inherit" />,
      to: `/${ROUTE_PATHS.PAWN_TICKET.BASE}/${ROUTE_PATHS.PAWN_TICKET.UPDATE}`,
    },
    PERMISSIONS.PAWN_TICKET,
    PERMISSION_ACTIONS.VIEW
  );

  const tabs = [];

  if (authorizedAllPawnTicketTab) {
    tabs.push(authorizedAllPawnTicketTab);
  }
  if (authorizedPawnTicketView) {
    tabs.push(authorizedPawnTicketView);
  }
  return <TabLayout tabs={tabs} />;
};

export default PawnTicketLayout;
