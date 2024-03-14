import Branch from "./branch";

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  mobileNo: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  activeBranchId: number;
  activeBranch: Branch;
  branches: Array<Branch>;
}

export default User;
