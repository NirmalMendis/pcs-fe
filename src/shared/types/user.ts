interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  mobileNo: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  branchId: number;
}

export default User;
