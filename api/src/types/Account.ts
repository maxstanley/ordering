import { Document } from 'mongoose';

interface Account extends Document {
  comparePassword(Password: string): Account | undefined;
  DisplayName: string;
  Email: string;
  Password: string;
  IsAdmin?: Boolean;
  Salt?: string;
  EmailIsValidated?: boolean;
  ActivationID?: string;
};

export default Account;