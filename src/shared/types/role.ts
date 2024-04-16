import FunctionType from "./function";

interface Role {
  id: number;
  title: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  functions: Array<FunctionType>;
}

export default Role;
