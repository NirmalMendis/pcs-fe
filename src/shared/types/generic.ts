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
  MULTIPLE_ITEM_TYPES = "MULTIPLE_ITEM_TYPES",
  IAM = "IAM",
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

export enum OrderDirection {
  DESC = "DESC",
  ASC = "ASC",
}

export interface OrderPaginatedRequest {
  page: number;
  pageSize: number;
  orderBy?: string;
  orderDirection?: OrderDirection;
}

export enum TimePeriod {
  month = "month",
  year = "year",
}

export enum ItemTypes {
  GENERIC = "Generic",
  GOLD = "Gold",
  VEHICLE = "Vehicle",
}

export enum ItemDetailKey {
  CARATAGE = "caratage",
  WEIGHT = "weight",
  VEHICLE_NO = "vehicleNo",
}

export const ItemDetailMeta: Record<
  ItemDetailKey,
  { label: string; unit: string }
> = {
  [ItemDetailKey.CARATAGE]: {
    label: "Caratage",
    unit: "K",
  },
  [ItemDetailKey.WEIGHT]: {
    label: "Weight",
    unit: "g",
  },
  [ItemDetailKey.VEHICLE_NO]: {
    label: "Vehicle No",
    unit: "",
  },
};
