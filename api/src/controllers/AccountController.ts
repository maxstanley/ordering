import { Request, Response, Router } from "express";
import * as HTTPStatus from "http-status-codes";

import IController from "../interfaces/IController";

import { createAccount } from "../services/account";

class AccountController implements IController {
  public path: string;

  public router: Router;

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
  }

  createAccount = async (request: Request, response: Response) => {
    const { DisplayName, Email, Password, IsAdmin } = request.body;

    await createAccount(DisplayName, Email, Password, IsAdmin);

    return response.status(HTTPStatus.CREATED).send();
  };
}

export default AccountController;
