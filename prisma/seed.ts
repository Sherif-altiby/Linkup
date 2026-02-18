import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    phone: "01000000001",
    email: "alice@prisma.io",
    password: "hashedpassword123",
    posts: {
      create: [
        {
          content: "Hello world from Alice 🚀",
        },
        {
          content: "Building a social media app with Next.js 🔥",
        },
      ],
    },
  },
  {
    name: "Bob",
    phone: "01000000002",
    email: "bob@prisma.io",
    password: "hashedpassword456",
    posts: {
      create: [
        {
          content: "Prisma + PostgreSQL is powerful 💪",
        },
      ],
    },
  },
];

async function main() {
  console.log("Start seeding...");

  for (const u of userData) {
    await prisma.user.create({
      data: u,
    });
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
