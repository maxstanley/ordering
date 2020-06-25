interface Account {
  AccountID: string;
  DisplayName: string;
  IsAdmin: Boolean;
  exp: number;
  iat: number;
  xsrfHash: string;
  xsrfSalt: string;
};

export default Account;