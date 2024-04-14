import { RegisterUseCase } from "../../use-cases/register";
import prismaUserRepository from "../../repositories/prisma/prisma-user-repository";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UserAlredyExistsError } from "../../errors/user-already-exists-erros";

export default async function register(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerUserSchema.parse(request.body);

  const registerUseCase = new RegisterUseCase(prismaUserRepository);

  try {
    await registerUseCase.execute({ name, email, password });
    reply.status(201).send();
  } catch (error) {
    if (error instanceof UserAlredyExistsError) {
      return reply.status(409).send({ error: error.message });
    }
  }
}
