import Account from "../models/account";

import { createHash, randomBytes } from "crypto";

const createAccount = async (DisplayName: string, Email: string, Password: string, IsAdmin: Boolean) => {
  await Account.create({
    DisplayName,
    Email,
    Password,
    IsAdmin
  });
}

const checkAccountDetails = async (Email: string, Password: string) => {
  const user = await Account.findOne({ Email });

  if (user === null) { return undefined; }

  if (user.comparePassword(Password)) {
    return user;
  }
  return undefined;
}

const hashString = (string: string, salt?: string) => {
  if (!salt) {
    salt = randomBytes(12).toString("base64");
  }

  const hasher = createHash(process.env.HASH_ALGORITHM || "sha512");
  const hash = hasher.update(string + salt, "utf8");

  return {
    Hash: hash.digest("hex"),
    Salt: salt
  };
}

export {
  createAccount,
  checkAccountDetails,
  hashString
}