import { Request, Response, NextFunction, RequestHandler } from "express";
import { verify } from "jsonwebtoken";
import * as HTTPStatus from "http-status-codes";

import protectedRoutes from "../protectedRoutes";
import TokenClaim from "../types/TokenClaim";
import { hashString } from "../services/account";

const authenticationMiddleware: RequestHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const publicKey = process.env.PUBLIC_KEY!;
  const url = request.url.split('?')[0];
  const route: string = (url.substr(-1) === "/") ? url.slice(0, -1) : url;
  const method: string = request.method.toUpperCase();
  const isProtected = isRouteProtected(route, method);

  if (!isProtected) {
    return next();
  }

  let decoded;

  if (request.headers.authorization) {
    const bearer = request.headers.authorization.split("Bearer ")[1];

    try {
      decoded = verify(bearer, publicKey) as TokenClaim;
    } catch (error) {
      console.log(error);
      return response.status(HTTPStatus.UNAUTHORIZED).send();
    }

    request.account = decoded;

    return next();
  }

  if (!request.cookies.token && !request.cookies.XSRF) {
    return response.status(HTTPStatus.UNAUTHORIZED).send();
  }

  const { token, XSRF } = request.cookies;

  try {
    decoded = verify(token, publicKey) as TokenClaim;
  } catch (error) {
    response.clearCookie("token");
    response.clearCookie("XSRF");
    return response.status(HTTPStatus.UNAUTHORIZED).send();
  }

  const { Hash } = hashString(XSRF, decoded.xsrfSalt);

  if (decoded.xsrfHash !== Hash) {
    response.clearCookie("token");
    response.clearCookie("XSRF");
    return response.status(HTTPStatus.UNAUTHORIZED).send();
  }

  request.account = decoded;

  next();
};

const isRouteProtected = (route: string, method: string): boolean => {
  const parts = route.split("/");
  parts.push(method);

  let section = protectedRoutes;
  let index = 1;
  const length = parts.length;

  while (true) {
    if (Object.keys(section).includes(parts[index])) {
      // Normal Path
      section = section[parts[index]];
    } else if (section["*"] && ((length - index) !== 1)) {
      // Variable query parameter at this point cannot be a method
      section = section["*"];
    } else {
      // No Schemas defined for endpoint
      return false;
    }
    index += 1;
    if (index === length) {
      // Return the schema
      return section;
    }
  }
};

export default authenticationMiddleware;
