import { FastifyReply, FastifyRequest } from "fastify";

export async function Profile(request: FastifyRequest, reply: FastifyReply){
    await request.jwtVerify()

    console.log(request.user.id);

    reply.status(200).send()
}