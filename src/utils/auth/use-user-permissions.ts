/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQueryClient } from "@tanstack/react-query";
import { GetUserResponse } from "../../api/user/use-get-user-permissions";
import { PERMISSIONS, PERMISSION_ACTIONS } from "../../constants/iam-constants";
import { GET_METADATA, GET_USER_PERMISSIONS } from "../../constants/query-leys";
import { MetaDataEnum } from "../../constants/string-constants";
import { AppFeaturesType, FeatureEnum } from "../../shared/types/generic";

const useUserPermissions = () => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<GetUserResponse>([
    GET_USER_PERMISSIONS,
  ]);
  const appFeatures = queryClient.getQueryData<AppFeaturesType>([
    GET_METADATA,
    MetaDataEnum.APP_FEATURES,
  ]);

  const canAccessResource = (
    resource: any,
    permission: PERMISSIONS,
    action: PERMISSION_ACTIONS,
    fallback?: any
  ) => {
    const hasPermission = data
      ? data[action].find(
          (userPermission) => userPermission.title === permission
        )
      : false;

    return hasPermission ? resource : fallback;
  };

  const withFeatureEnabled = (
    resource: any,
    feature: FeatureEnum,
    fallback?: any
  ) => {
    const hasFeature = appFeatures
      ? appFeatures.find((appFeature) => appFeature.featureType === feature)
      : false;

    return hasFeature ? resource : fallback;
  };

  return { canAccessResource, withFeatureEnabled };
};

export default useUserPermissions;
