import { Decimal } from "@prisma/client/runtime/library";

export interface IGym {
  id?: string;
  title: string;
  description?: string;
  phone?: string;
  latitude: Decimal;
  longitude: Decimal;
}
