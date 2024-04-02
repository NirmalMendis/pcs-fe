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

export const AUTH_API = {
  LOGIN: `${AUTH_ENDPOINT}/login`,
  LOGOUT: `${AUTH_ENDPOINT}/logout`,
  REFRESH: `${AUTH_ENDPOINT}/refresh`,
};

export const USER_API = {
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
