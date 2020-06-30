import { Request, Response, Router } from "express";
import * as HTTPStatus from "http-status-codes";
import { createTransport } from "nodemailer";
import { v4 as uuid } from "uuid";
import { Options } from "nodemailer/lib/smtp-transport"

import IController from "../interfaces/IController";

import { createAccount, activateAccount } from "../services/account";

class AccountController implements IController {
  public path: string;

  public router: Router;

  private transportOptions: Options = {
    host: process.env.EMAIL_SMTP_SERVER,
    secure: false, // uses ssl instead of tls
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      ciphers: "SSLv3"
    }
  };

  private transport = createTransport(this.transportOptions);

  constructor() {
    this.path = "/v1";
    this.router = Router();
    this.initRoutes();
  }

  public initRoutes() {
    // List All Accounts
    this.router.get("/account");

    // Create an Account
    this.router.post("/account", this.createAccount);

    // Get an Account Information, by its ID
    this.router.get("/account/:AccountID");

    // Update Account
    this.router.put("/account/:AccountID");

    // Activate Account
    this.router.get("/activate/:ActivationID", this.activateAccount);
  }

  createAccount = async (request: Request, response: Response) => {
    const { DisplayName, Email, Password } = request.body;
    const ActivationID = uuid();
    await createAccount(DisplayName, Email, Password, false, ActivationID);

    this.transport.sendMail({
      from: process.env.EMAIL_USER,
      to: Email,
      subject: "Account Activation",
      text: `Please click this link to activate your account. http://localhost/api/v1/activate/${ActivationID}`
    })

    return response.status(HTTPStatus.CREATED).send();
  };

  activateAccount = async (request: Request, response: Response) => {
    const { ActivationID } = request.params;

    await activateAccount(ActivationID);

    return response.redirect("/");
  };
}

export default AccountController;
