type TokenClaim = {
  AccountID: string,
  IsCustomer: string,
  IsSupplier: string,
  IsAdmin: string,
  IsActive: string,
  xsrfHash: string,
  xsrfSalt: string
};

export default TokenClaim;
