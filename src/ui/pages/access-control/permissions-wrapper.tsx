import {
  Children,
  FC,
  PropsWithChildren,
  cloneElement,
  isValidElement,
} from "react";
import { FeatureEnum, PermissionAtom } from "../../../shared/types/generic";
import useUserPermissions from "../../../utils/auth/use-user-permissions";

export interface PermissionsWrapper extends PropsWithChildren {
  permission?: PermissionAtom;
  feature?: FeatureEnum;
  disabled?: boolean;
}

const PermissionsWrapper: FC<PermissionsWrapper> = ({
  children,
  permission,
  feature,
  disabled,
}) => {
  const { canAccessResource, withFeatureEnabled } = useUserPermissions();

  const getAuthorizedResource = () => {
    let authorizedResource = null;
    if (permission)
      authorizedResource = canAccessResource(
        children,
        permission.permissionType,
        permission.action
      );
    else if (feature) {
      authorizedResource = withFeatureEnabled(children, feature);
    }
    return authorizedResource;
  };

  const getReturnedResource = () => {
    let returnedResourse = null;
    const authorizedResource = getAuthorizedResource();
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

  return getReturnedResource();
};

export default PermissionsWrapper;
