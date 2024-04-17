import { FastifyInstance } from "fastify";
import register from "./controllers/register-controller";
import authenticate from "./controllers/authenticate-controller";
import { Profile } from "./controllers/profile-controller";
import { jwtVerify } from "./middlewares/verify-jwt";

export default async function appRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate)

  // Authenticate

  app.get("/me", { onRequest: [jwtVerify] }, Profile)
}
