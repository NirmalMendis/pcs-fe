import { Navigate, Route } from "react-router-dom";
import { PERMISSIONS, PERMISSION_ACTIONS } from "../constants/iam-constants";
import ROUTE_PATHS from "../constants/route-paths";
import { FeatureEnum } from "../shared/types/generic";
import AllPawnTickets from "../ui/pages/pawn-ticket/all-tickets/all-pawn-tickets";
import PawnTicketLayout from "../ui/pages/pawn-ticket/pawn-ticket-layout";
import UpdateTicket from "../ui/pages/pawn-ticket/update-ticket/update-ticket";
import useUserPermissions from "../utils/auth/use-user-permissions";

const usePawnTicketRoutes = () => {
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

  return featureEnabledPawnCategory;
};

export default usePawnTicketRoutes;
