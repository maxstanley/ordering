import { Router } from "express";

interface IController {
  initRoutes(): void;
  router: Router;
  path: string;
}

export default IController;
