const getCustomerLabel = (customerId?: number, name?: string) => {
  return customerId !== undefined ? `${customerId} - ${name}` : undefined;
};

export default getCustomerLabel;
