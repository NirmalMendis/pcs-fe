import {
  Children,
  FC,
  PropsWithChildren,
  cloneElement,
  isValidElement,
} from "react";
import {
  PERMISSIONS,
  PERMISSION_ACTIONS,
} from "../../../constants/iam-constants";
import useUserPermissions from "../../../utils/auth/use-user-permissions";

export interface PermissionsWrapper extends PropsWithChildren {
  permission: PERMISSIONS;
  action: PERMISSION_ACTIONS;
  disabled?: boolean;
}

const PermissionsWrapper: FC<PermissionsWrapper> = ({
  children,
  action,
  permission,
  disabled,
}) => {
  const canAccessResource = useUserPermissions();

  const authorizedResource = canAccessResource(children, permission, action);

  let returnedResourse = null;
  if (authorizedResource) {
    returnedResourse = authorizedResource;
  } else if (disabled && children && isValidElement(children)) {
    returnedResourse = Children.map(children, (child, index) =>
      cloneElement(child, {
        key: index,
        disabled: true,
      } as never)
    );
  }
  return returnedResourse;
};

export default PermissionsWrapper;
