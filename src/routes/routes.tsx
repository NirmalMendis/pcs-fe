import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ROUTE_PATHS from "../constants/route-paths";
import useAuthStore from "../store/use-auth-store-state";
import LoginLayout from "../ui/layout/login-layout";
import MainLayout from "../ui/layout/main/main-layout";
import Dashboard from "../ui/pages/dashboard/dashboard";
import Login from "../ui/pages/login/login";
import AllPawnTickets from "../ui/pages/pawn-ticket/all-tickets/all-pawn-tickets";
import PawnTicketLayout from "../ui/pages/pawn-ticket/pawn-ticket-layout";
import UpdateTicket from "../ui/pages/pawn-ticket/update-ticket/update-ticket";

const Routes = () => {
  const auth = useAuthStore((state) => state.isAuthenticed);

  const routes = auth ? (
    <Route element={<MainLayout />}>
      <Route path={ROUTE_PATHS.DASHBOARD} element={<Dashboard />} />
      <Route path={ROUTE_PATHS.PAWN_TICKET.BASE} element={<PawnTicketLayout />}>
        <Route
          index
          element={<Navigate replace to={ROUTE_PATHS.PAWN_TICKET.ALL} />}
        />
        <Route
          path={ROUTE_PATHS.PAWN_TICKET.ALL}
          element={<AllPawnTickets />}
        />
        <Route
          path={ROUTE_PATHS.PAWN_TICKET.UPDATE}
          element={<UpdateTicket />}
        />
      </Route>
      {/* Update with unauthorized page */}
      <Route path="*" element={<Navigate to="/" />} />
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
