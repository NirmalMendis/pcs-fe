import { MetaDataEnum } from "./string-constants";

export const AUTH_ENDPOINT = "auth";
export const USER_ENPOINT = "user";
export const METADATA_ENDPOINT = "metadata";
export const BRANCH_ENPOINT = "branch";
export const CUSTOMER_ENPOINT = "customer";
export const PAWN_TICKET_ENDPOINT = "pawn-ticket";
export const INVOICE_ENDPOINT = "invoice";
export const ITEM_ENDPOINT = "item";
export const INTEREST_ENDPOINT = "interest";
export const STAT_ENDPOINT = "stat";
export const ROLE_ENDPOINT = "role";
export const FUNCTION_ENDPOINT = "function";

export const AUTH_API = {
  LOGIN: `${AUTH_ENDPOINT}/login`,
  LOGOUT: `${AUTH_ENDPOINT}/logout`,
  REFRESH: `${AUTH_ENDPOINT}/refresh`,
  SET_NEW_PASSWORD: `${AUTH_ENDPOINT}/set-new-password`,
  FORGOT_PASSWORD: `${AUTH_ENDPOINT}/forgot-password`,
};

export const USER_API = {
  GET_ALL_USERS: `${USER_ENPOINT}`,
  POST_CREATE_USER: `${USER_ENPOINT}`,
  GET_USER: (id: number) => `${USER_ENPOINT}/${id}`,
  PATCH_USER_ACTIVE_BRANCH: `${USER_ENPOINT}/active-branch`,
  GET_USER_PERMISSIONS: `${USER_ENPOINT}/permissions`,
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
  GET_CUSTOMER_BY_ID: (id: number) => `${CUSTOMER_ENPOINT}/${id}`,
};

export const PAWN_TICKET_API = {
  POST_CREATE_PAWN_TICKET: `${PAWN_TICKET_ENDPOINT}/`,
  GET_ALL_PAWN_TICEKTS: `${PAWN_TICKET_ENDPOINT}/`,
  GET_PAWN_TICKET_BY_ID: (id: number) => `${PAWN_TICKET_ENDPOINT}/${id}`,
  GET_CALCULATE_MONTHLY_INTEREST: `${PAWN_TICKET_ENDPOINT}/calculate-monthly-interest`,
  GET_REVISION_IDS: (id: number) => `${PAWN_TICKET_ENDPOINT}/revision/${id}`,
  POST_CREATE_REVISION: (id: number) =>
    `${PAWN_TICKET_ENDPOINT}/revision/${id}`,
  PATCH_UPDATE_INVOICE: (id: number) => `${PAWN_TICKET_ENDPOINT}/${id}/invoice`,
  PATCH_UPDATE_PAWN_TICKET_GENERAL: (id: number) =>
    `${PAWN_TICKET_ENDPOINT}/${id}/general`,
};

export const INVOICE_API = {
  POST_DRAFT_TICKET_INVOICE: `${INVOICE_ENDPOINT}/draft`,
  GET_TICKET_INVOICE: (id: number) => `${INVOICE_ENDPOINT}/${id}`,
};

export const ITEM_API = {
  GET_ITEMS_BY_PAWN_TICKET_ID: (id: number) =>
    `${ITEM_ENDPOINT}/pawn-ticket/${id}`,
};

export const INTEREST_API = {
  GET_INTERESTS_BY_PAWN_TICKET_ID: (id: number) =>
    `${INTEREST_ENDPOINT}/pawn-ticket/${id}`,
};

export const STATS_API = {
  GET_TICKET_STATUS_STATS: `${STAT_ENDPOINT}/ticket-status`,
};

export const ROLE_API = {
  GET_ALL_ROLES: `${ROLE_ENDPOINT}`,
  POST_CREATE_ROLE: `${ROLE_ENDPOINT}`,
};

export const FUNCTION_API = {
  GET_ALL_FUNCTIONS: `${FUNCTION_ENDPOINT}`,
};
