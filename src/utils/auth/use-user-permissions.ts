import { useQueryClient } from "@tanstack/react-query";
import { GetUserResponse } from "../../api/user/use-get-user-permissions";
import { PERMISSIONS, PERMISSION_ACTIONS } from "../../constants/iam-constants";
import { GET_USER_PERMISSIONS } from "../../constants/query-leys";

const useUserPermissions = () => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<GetUserResponse>([
    GET_USER_PERMISSIONS,
  ]);

  const canAccessResource = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resource: any,
    permission: PERMISSIONS,
    action: PERMISSION_ACTIONS
  ) => {
    const hasPermission = data
      ? data[action].find(
          (userPermission) => userPermission.title === permission
        )
      : false;

    return hasPermission ? resource : null;
  };

  return canAccessResource;
};

export default useUserPermissions;
