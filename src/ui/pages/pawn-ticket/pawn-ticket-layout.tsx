import UpdateIcon from "@mui/icons-material/Update";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import TabLayout from "../../../shared/components/tab-layout";

const PawnTicketLayout = () => {
  const tabs = [
    {
      title: "All Pawn Tickets",
      icon: <ViewCompactIcon />,
      to: "/pawn-ticket/all",
    },
    {
      title: "Update Ticket",
      icon: <UpdateIcon />,
      to: "/pawn-ticket/update",
    },
  ];

  return <TabLayout tabs={tabs} />;
};

export default PawnTicketLayout;
