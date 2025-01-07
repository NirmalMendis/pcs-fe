interface Customer {
  id: number;
  nicNo: string;
  email?: string | null;
  firstName: string;
  lastName: string;
  name: string;
  mobileNo: string;
  addressLine1: string;
  addressLine2?: string | null;
  addressLine3?: string | null;
  city: string;
  postalCode?: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  lastUpdatedById: number;
}

export default Customer;
