import { FastifyReply, FastifyRequest } from "fastify";
import { InvalidCredentials } from "src/errors/invalid-credential";
import prismaUserRepository from "src/repositories/prisma/prisma-user-repository";
import { AuthenticateUseCase } from "src/use-cases/authenticate";
import { z } from "zod";

export default async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateSchema = z.object({
    email: z.string(),
    password: z.string(),
  });

  const { email, password } = authenticateSchema.parse(request.body);

  const authenticateUseCase = new AuthenticateUseCase(prismaUserRepository);

  try {
    const user = await authenticateUseCase.execute({ email, password });

    return reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      }
    );
  } catch (error) {
    if (error instanceof InvalidCredentials) {
      return reply.status(409).send({ error: error.message });
    }
  }
}
