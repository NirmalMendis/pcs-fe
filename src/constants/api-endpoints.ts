import { MetaDataEnum } from "./string-constants";

export const AUTH_ENDPOINT = "auth";
export const USER_ENPOINT = "user";
export const METADATA_ENDPOINT = "metadata";
export const BRANCH_ENPOINT = "branch";
export const CUSTOMER_ENPOINT = "customer";

export const AUTH_API = {
  LOGIN: `${AUTH_ENDPOINT}/login`,
  LOGOUT: `${AUTH_ENDPOINT}/logout`,
};

export const USER_API = {
  GET_USER: (id: number) => `${USER_ENPOINT}/${id}`,
};

export const METADATA_API = {
  GET_METADATA: (type: MetaDataEnum) => `${METADATA_ENDPOINT}/${type}`,
};

export const BRANCH_API = {
  GET_ALL_BRANCHES: `${BRANCH_ENPOINT}/`,
};

export const CUSTOMER_API = {
  GET_SEARCH_CUSTOMER: `${CUSTOMER_ENPOINT}/search`,
  POST_CREATE_CUSTOMER: `${CUSTOMER_ENPOINT}`,
};
