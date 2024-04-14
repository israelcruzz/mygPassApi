import { z } from "zod";
import 'dotenv'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
});

const _env = envSchema.safeParse(process.env);

if(_env.success === false){
  throw new Error('Invalid environment variables')
}

export const env = _env.data;