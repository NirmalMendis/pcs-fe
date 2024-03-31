import { FeatureEnum } from "./generic";

interface FeatureType {
  id: number;
  description: string;
  featureType: FeatureEnum;
  value: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  lastUpdatedById: number;
}

export default FeatureType;
