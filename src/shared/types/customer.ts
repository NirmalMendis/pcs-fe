interface Customer {
  id: number;
  nicNo: string;
  email: string;
  firstName: string;
  lastName: string;
  name: string;
  mobileNo: string;
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  postalCode?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  lastUpdatedById: number;
}

export default Customer;
