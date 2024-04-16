import Branch from "./branch";
import Role from "./role";

interface User {
  id: number;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  mobileNo: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  activeBranchId: number;
  activeBranch: Branch;
  branches: Array<Branch>;
  roles: Array<Role>;
}

export default User;
