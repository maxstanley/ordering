import * as bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { RequestHandler } from "express";
import { connect, ConnectionOptions } from "mongoose";

import IController from "./interfaces/IController";
import TokenClaim from "./types/TokenClaim";

import Authentication from "./middleware/Authenticate";

import AccountController from "./controllers/AccountController";
import AuthenticationController from "./controllers/AuthenticationController";
import OrderController from "./controllers/OrderController";
import ProductController from "./controllers/ProductController";

import App from "./App";

declare global {
  namespace Express {
    interface Request {
      account?: TokenClaim
    }
  }
}

const PORT = 3000;

// List of Controllers
const controllers: IController[] = [
  new AccountController(),
  new AuthenticationController(),
  new OrderController(),
  new ProductController(),
];

// List of Middleware
const middleware: RequestHandler[] = [
  cookieParser(),
  bodyParser.urlencoded({ extended: false }),
  bodyParser.json(),
  Authentication,
];

// App Options
const options = {
  port: PORT,
  controllers,
  middleware,
};

// Create App
const app = new App(options);

const {
  DATABASE_HOST,
  DATABASE_USER,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  EMAIL_SMTP_SERVER,
  EMAIL_USER,
  EMAIL_PASS
} = process.env;

if (!EMAIL_SMTP_SERVER) {
  console.log("EMAIL_SMTP_SERVER env Required");
  process.exit(1);
}

if (!EMAIL_USER) {
  console.log("EMAIL_USER env Required");
  process.exit(1);
}

if (!EMAIL_PASS) {
  console.log("EMAIL_PASS env Required");
  process.exit(1);
}

if (!DATABASE_HOST) {
  console.log("DATABASE_HOST env Required");
  process.exit(1);
}

if (!DATABASE_NAME) {
  console.log("DATABASE_NAME env Required");
  process.exit(1);
}

if (!DATABASE_PASSWORD) {
  console.log("DATABASE_PASSWORD env Required");
  process.exit(1);
}


if (!DATABASE_USER) {
  console.log("DATABASE_USER env Required");
  process.exit(1);
}


const mongoOptions: ConnectionOptions = {
  user: DATABASE_USER,
  pass: DATABASE_PASSWORD,
  useNewUrlParser: true,
};

connect(DATABASE_HOST, mongoOptions).then(() => {
  // Start Listening
  app.listen();
}).catch((error) => {
  console.log(error);
});
