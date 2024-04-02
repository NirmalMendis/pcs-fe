import UpdateIcon from "@mui/icons-material/Update";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import {
  PERMISSIONS,
  PERMISSION_ACTIONS,
} from "../../../constants/iam-constants";
import TabLayout from "../../../shared/components/tab-layout";
import useUserPermissions from "../../../utils/auth/use-user-permissions";

const PawnTicketLayout = () => {
  const { canAccessResource } = useUserPermissions();

  const authorizedAllPawnTicketTab = canAccessResource(
    {
      title: "Pawn Ticket",
      icon: <ViewCompactIcon color="inherit" />,
      to: "/pawn-ticket/all",
    },
    PERMISSIONS.PAWN_TICKET,
    PERMISSION_ACTIONS.VIEW
  );
  const authorizedPawnTicketView = canAccessResource(
    {
      title: "Update Ticket",
      icon: <UpdateIcon color="inherit" />,
      to: "/pawn-ticket/update",
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
