import { PERMISSIONS } from "../../constants/iam-constants";

interface FunctionType {
  id: number;
  title: PERMISSIONS;
  view: string;
  create: string;
  update: string;
  delete: string;
  createdAt: string;
  updatedAt: string;
}

export default FunctionType;
