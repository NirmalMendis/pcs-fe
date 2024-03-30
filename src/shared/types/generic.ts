import SettingType from "./setting";

export enum MaterialContentTypes {
  HTML = "HTML",
  PDF = "PDF",
}

export enum SettingEnum {
  INVOICE_PDF_MARGIN = "INVOICE_PDF_MARGIN",
  INVOICE_PDF_SIZE = "INVOICE_PDF_SIZE",
}

export type InvoiceSettingsType = {
  margin: SettingType;
  pageSize: SettingType;
};
