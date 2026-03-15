import { Request, Response } from "express";
import { Middleware, ExpressMiddlewareInterface } from "routing-controllers";

@Middleware({ type: "after" })
export class ResponseStatusMiddleware implements ExpressMiddlewareInterface {
  use(request: Request, response: Response, next: (err?: any) => any): void {
    console.log("response status: ", response.statusCode);

    next();
  }
}
