import { FastifyInstance } from "fastify";
import register from "./controllers/register-controller";
import authenticate from "./controllers/authenticate-controller";

export default async function appRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate)
}
