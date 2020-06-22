import express, { RequestHandler, Application } from "express";

import IController from "./interfaces/IController";

class App {
  public app: Application;

  public port: number;

  constructor(options: {
    port: number;
    middleware: RequestHandler[];
    controllers: IController[];
  }) {
    const {
      port, middleware, controllers,
    } = options;
    this.app = express();
    this.port = port;

    this.middleware(middleware);
    this.controllers(controllers);
  }

  public async middleware(middleware: RequestHandler[]) {
    middleware.forEach(async (middleware: RequestHandler) => {
      await this.app.use(middleware);
    });
  }

  public controllers(controllers: IController[]) {
    controllers.forEach(async (controller: IController) => {
      await this.app.use(controller.path, controller.router);
    });
  }

  public async listen() {
    await this.app.listen(this.port);
    // tslint:disable-next-line:no-console
    console.log(`App listening on the http://localhost:${this.port}`);
  }
}

export default App;
