// this shim is required
import { createExpressServer } from "routing-controllers";
import { ProductController } from "./src/controllers/ProductController";
import { IpLoggingMiddleware } from "./src/middlewares/ip-logging.middleware";
import { ResponseStatusMiddleware } from "./src/middlewares/response-status-logging.middleware";
import { CustomErrorHandler } from "./src/middlewares/error-handler.middleware";
import { AuthController } from "./src/controllers/AuthController";

const PORT = 8080;

// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
  cors: {
    origin: "*", // allow all origins
    credentials: true, // enable cookies
  },
  defaultErrorHandler: false,
  routePrefix: "/api",
  controllers: [AuthController, ProductController], // we specify controllers we want to use
  middlewares: [
    IpLoggingMiddleware,
    CustomErrorHandler,
    ResponseStatusMiddleware,
  ],
});

// run express application on port 3000
app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});
