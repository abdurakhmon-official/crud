import { Request, Response } from "express";
import { Middleware, ExpressMiddlewareInterface } from "routing-controllers";

@Middleware({ type: "before" })
export class IpLoggingMiddleware implements ExpressMiddlewareInterface {
  use(request: Request, response: Response, next: (err?: any) => any): void {
    const ip =
      request.headers["x-forwarded-for"] ||
      request.socket.remoteAddress ||
      null;
    console.log("request IP :", ip, request.method, request.originalUrl);

    next();
  }
}
