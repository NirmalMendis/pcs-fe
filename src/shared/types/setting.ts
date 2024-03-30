import { SettingEnum } from "./generic";

interface SettingType {
  id: number;
  description: string;
  settingType: SettingEnum;
  value: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  lastUpdatedById: number;
}

export default SettingType;
