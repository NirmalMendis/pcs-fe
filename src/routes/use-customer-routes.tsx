import { Navigate, Route } from "react-router-dom";
import { PERMISSIONS, PERMISSION_ACTIONS } from "../constants/iam-constants";
import ROUTE_PATHS from "../constants/route-paths";
import { FeatureEnum } from "../shared/types/generic";
import AllCustomers from "../ui/pages/customer/all-customers/all-customers";
import CustomerLayout from "../ui/pages/customer/customer-layout";
import UpdateCustomer from "../ui/pages/customer/update-customer/update-customer";
import useUserPermissions from "../utils/auth/use-user-permissions";

const useCustomerRoutes = () => {
  const { canAccessResource, withFeatureEnabled } = useUserPermissions();

  const authorizedCustomerCategory = canAccessResource(
    <CustomerLayout />,
    PERMISSIONS.CUSTOMER,
    PERMISSION_ACTIONS.VIEW
  );

  const authorizedAllCustomers = withFeatureEnabled(
    canAccessResource(
      <AllCustomers />,
      PERMISSIONS.CUSTOMER,
      PERMISSION_ACTIONS.VIEW
    ),
    FeatureEnum.CUSTOMER
  );

  const authorizedUpdateCustomer = withFeatureEnabled(
    canAccessResource(
      <UpdateCustomer />,
      PERMISSIONS.CUSTOMER,
      PERMISSION_ACTIONS.VIEW
    ),
    FeatureEnum.CUSTOMER
  );

  const featureEnabledCustomerCategory = withFeatureEnabled(
    <Route
      path={ROUTE_PATHS.CUSTOMER.BASE}
      element={authorizedCustomerCategory}
    >
      <Route
        index
        element={<Navigate replace to={ROUTE_PATHS.CUSTOMER.ALL} />}
      />
      <Route path={ROUTE_PATHS.CUSTOMER.ALL} element={authorizedAllCustomers} />
      <Route
        path={ROUTE_PATHS.CUSTOMER.UPDATE}
        element={authorizedUpdateCustomer}
      >
        <Route path=":id" element={authorizedUpdateCustomer} />
      </Route>
    </Route>,
    FeatureEnum.CUSTOMER
  );

  return featureEnabledCustomerCategory;
};

export default useCustomerRoutes;
