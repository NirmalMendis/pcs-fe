import { PERMISSIONS } from "../../constants/iam-constants";

interface FunctionType {
  id: number;
  title: PERMISSIONS;
  description: string;
  view: string;
  create: string;
  update: string;
  delete: string;
  createdAt: string;
  updatedAt: string;
}

export default FunctionType;
