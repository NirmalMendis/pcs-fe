interface Branch {
  id: number;
  name: string;
  mobileNo: string;
  email: string;
  lastName: string;
  activeBranchId: number;
  addressLine1?: string;
  addressLine2?: string;
  addressLine3?: string;
  city?: string;
  postalCode?: string;
  logoURL?: string;
  isMainBranch: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  lastUpdatedById: number;
}

export default Branch;
