import { Prisma } from "../generated/prisma/client";

export type PostWithAuthor = Prisma.PostGetPayload<{
  include: { author: true };
}>;