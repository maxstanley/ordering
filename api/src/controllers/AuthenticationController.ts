import { Request, Response, Router, CookieOptions } from "express";
import * as HTTPStatus from "http-status-codes";
import { sign, SignOptions } from "jsonwebtoken";
import { randomBytes } from "crypto";

import IController from "../interfaces/IController";
import TokenClaim from "../types/TokenClaim";
import { checkAccountDetails, hashString } from "../services/account";

class AuthenticationController implements IController {
  public path: string;

  public router: Router;

  private tokenCookieOptions: CookieOptions = {
    domain: process.env.COOKIE_DOMAIN,
    maxAge: 7200000,
    httpOnly: false,
    secure: (process.env.NODE_ENV === "production"),
    sameSite: "strict"
  };

  private xsrfCookieOptions: CookieOptions = {
    domain: process.env.COOKIE_DOMAIN,
    maxAge: 7200000,
    httpOnly: true,
    secure: (process.env.NODE_ENV === "production"),
    sameSite: "strict"
  };

  private expireCookieOptions: CookieOptions = {
    expires: new Date(0),
    domain: process.env.COOKIE_DOMAIN,
    maxAge: 0,
    httpOnly: true,
    secure: (process.env.NODE_ENV === "production"),
    sameSite: "strict"
  };

  private jwtOptions: SignOptions = {
    algorithm: "RS256",
    expiresIn: "2h"
  };

  private privateKey: string = process.env.PRIVATE_KEY!;

  constructor() {
    this.path = "/v1";
    this.router = Router();
    this.initRoutes();
  }

  public initRoutes() {
    // Log into account and receive JWT and CSRF (For Browsers)
    this.router.post("/login", this.login);

    // Logout of Account
    this.router.get("/logout", this.logout);

    // Log into account and recieve JWT (For direct API Access)
    this.router.post("/token", this.token);
  }

  login = async (request: Request, response: Response) => {
    const { Email, Password } = request.body;
    const user = await checkAccountDetails(Email, Password);

    if (!user) {
      return response.status(HTTPStatus.BAD_REQUEST).send();
    }

    const XSRF = randomBytes(12).toString("base64");
    const { Hash: XSRFHash, Salt } = hashString(XSRF);

    const payload = {
      AccountID: user._id,
      DisplayName: user.DisplayName,
      IsAdmin: user.IsAdmin,
      xsrfHash: XSRFHash,
      xsrfSalt: Salt
    };

    const token = sign(payload, this.privateKey, this.jwtOptions);

    // We are setting two cookies to prevent XSRF
    // https://stackoverflow.com/questions/27067251/where-to-store-jwt-in-browser-how-to-protect-against-csrf
    response.cookie("token", token, this.tokenCookieOptions);
    response.cookie("XSRF", XSRF, this.xsrfCookieOptions);
    return response.status(HTTPStatus.OK).send();
  };

  logout = async (request: Request, response: Response) => {
    response.cookie("token", '', this.expireCookieOptions);
    response.cookie("XSRF", '', this.expireCookieOptions);
    return response.status(HTTPStatus.NO_CONTENT).send();
  };

  token = async (request: Request, response: Response) => {
    const { Email, Password } = request.body;
    const user = await checkAccountDetails(Email, Password);

    if (!user) {
      return response.status(HTTPStatus.BAD_REQUEST).send();
    }

    const payload = {
      AccountID: user._id,
      DisplayName: user.DisplayName,
      IsAdmin: user.IsAdmin
    };

    const token = sign(payload, this.privateKey, this.jwtOptions);

    return response.status(HTTPStatus.OK).send(token);
  };
}

export default AuthenticationController;
