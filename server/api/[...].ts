import type { H3Event } from "h3";
import { createRouter, defineEventHandler, useBase } from "h3";

import { errors } from "./constants/errors";
import formsRouter from "./routes/forms";

const router = createRouter();

router.get(
  "/health",
  defineEventHandler((event: H3Event) => {
    setResponseStatus(event, 200);
    return {
      status: "OK",
    };
  })
);

router.use("/forms/**", formsRouter.handler);

router.get(
  "/*",
  defineEventHandler((event: H3Event) => {
    setResponseStatus(event, 404);
    return {
      error: errors.ROUTE_NOT_FOUND,
    };
  })
);

export default useBase("/api", router.handler);
