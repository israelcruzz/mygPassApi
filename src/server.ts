import fastify from "fastify";
import { env } from "./env";
import appRoutes from "./http/routes";
import { ZodError } from "zod";
import fastifyJwt from "@fastify/jwt";
export const app = fastify();

app.register(fastifyJwt, {
  secret: "@api-gym",
});

app.register(appRoutes);
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation Zod Error", issues: error.format() });
  }

  return reply.send({ message: "Internal Server Error" });
});

app
  .listen({
    port: env.PORT,
    path: "0.0.0.0",
  })
  .then(() => console.log("🚀 Server Online"));
