import { Request, Response } from "express";
import {
  Middleware,
  ExpressErrorMiddlewareInterface,
} from "routing-controllers";

@Middleware({ type: "after" })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  error(
    error: Error,
    request: Request,
    response: Response,
    next: (err?: any) => any
  ) {
    if (error) {
      console.log(error);
      response.status(400).send({
        message: error.message,
      });
      next();
    }
  }
}
