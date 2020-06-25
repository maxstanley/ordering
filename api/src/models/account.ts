import { createHash, randomBytes } from "crypto";
import { Schema, model } from "mongoose";

import TAccount from "../types/Account";

const accountSchema = new Schema({
  DisplayName: {
    type: String,
    required: true,
    trim: true,
  },
  Email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  Password: {
    type: String,
    required: true,
    trim: true,
  },
  IsAdmin: {
    type: Boolean,
    required: false,
    default: false,
  },
  Salt: {
    type: String,
    required: false,
  },
  EmailIsValidated: {
    type: Boolean,
    required: false,
    default: false,
  },
  ActivationID: {
    type: String,
    required: false,
  }
});

// https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
accountSchema.pre<TAccount>('save', function(next) {
  if (!this.isModified("Password")) { return next(); }

  const salt = randomBytes(12).toString("base64");

  const hasher = createHash(process.env.HASH_ALGORITHM || "sha512");
  const passwordHash = hasher.update(this.Password + salt, "utf8");
  this.Password = passwordHash.digest("hex");
  this.Salt = salt;
  next();
});

accountSchema.methods.comparePassword = function comparePassword (candidatePassword: any) {
  const hasher = createHash(process.env.HASH_ALGORITHM || "sha512");
  const passwordHash = hasher.update(candidatePassword + this.Salt, "utf8");
  const hexPassword = passwordHash.digest("hex");
  
  return (hexPassword === this.Password);
};

const Account = model<TAccount>("Account", accountSchema, "Account");

export default Account;