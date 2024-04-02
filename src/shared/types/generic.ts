import { PERMISSIONS, PERMISSION_ACTIONS } from "../../constants/iam-constants";
import FeatureType from "./feature";
import SettingType from "./setting";

export enum MaterialContentTypes {
  HTML = "HTML",
  PDF = "PDF",
}

export enum SettingEnum {
  INVOICE_PDF_MARGIN = "INVOICE_PDF_MARGIN",
  INVOICE_PDF_SIZE = "INVOICE_PDF_SIZE",
}

export enum FeatureEnum {
  PAWN_TICKET = "PAWN_TICKET",
  MULTIPLE_BRANCHES = "MULTIPLE_BRANCHES",
}

export type PermissionAtom = {
  permissionType: PERMISSIONS;
  action: PERMISSION_ACTIONS;
};

export type InvoiceSettingsType = {
  margin: SettingType;
  pageSize: SettingType;
};

export type AppFeaturesType = Array<FeatureType>;

export enum PawnTicketStatusEnum {
  ACTIVE = "Active",
  DUE = "Due",
  RECOVERED = "Recovered",
  FORFEITED = "Forfeited",
  REVISED = "Revised",
}

export enum InterestStatusEnum {
  UPCOMING = "Upcoming",
  DUE = "Due",
  PAID = "Paid",
  OVERDUE = "Overdue",
}

export interface OrderPaginatedRequest {
  page: number;
  pageSize: number;
  orderBy?: string;
  orderDirection?: "DESC" | "ASC";
}
