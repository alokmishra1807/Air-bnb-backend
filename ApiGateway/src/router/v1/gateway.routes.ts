import { Router } from "express";
import { isAuth } from "../../middleware/isAuth.middleware";
import { authLimiter, IpLimiter } from "../../middleware/ratelimit.middleware";
import { proxyToService } from "../../middleware/proxy.middleware";



const router = Router();

router.use(
  "/hotel",
  isAuth,
  authLimiter,
  proxyToService("http://localhost:3000")
);

router.use(
  "/booking",
  isAuth,
  authLimiter,
  proxyToService("http://localhost:3001")
);

router.use(
  "/user",
  IpLimiter,
  proxyToService("http://localhost:3003")
);

export default router;