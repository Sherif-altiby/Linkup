import { PrismaClient } from "../app/generated/prisma/client"; // relative path, not @/
import { PrismaPg } from "@prisma/adapter-pg";
import { hash } from "bcryptjs";
import * as dotenv from "dotenv";

dotenv.config();

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  console.log("🌱 Seeding database...");

  // ─── Clean existing data (order matters for FK constraints) ───────────────
  await prisma.follow.deleteMany();
  await prisma.like.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  // ─── Users ────────────────────────────────────────────────────────────────
  const password = await hash("password123", 10);

  const alice = await prisma.user.create({
    data: {
      name: "Alice Johnson",
      email: "alice@example.com",
      emailVerified: new Date(),
      location: "New York, USA",
      birthDate: "1995-04-12",
      phone: "+11234567890",
      password,
      bio: "Coffee addict ☕ | Frontend dev | Dog mom 🐶",
      image: "https://i.pravatar.cc/150?img=1",
    },
  });

  const bob = await prisma.user.create({
    data: {
      name: "Bob Martinez",
      email: "bob@example.com",
      emailVerified: new Date(),
      location: "Austin, TX",
      birthDate: "1992-08-23",
      phone: "+10987654321",
      password,
      bio: "Full-stack engineer. I build things that (usually) work.",
      image: "https://i.pravatar.cc/150?img=2",
    },
  });

  const carol = await prisma.user.create({
    data: {
      name: "Carol Kim",
      email: "carol@example.com",
      emailVerified: new Date(),
      location: "Seoul, South Korea",
      birthDate: "1998-01-30",
      phone: "+821012345678",
      password,
      bio: "Designer & illustrator 🎨 | Making the web prettier one pixel at a time.",
      image: "https://i.pravatar.cc/150?img=3",
    },
  });

  const dan = await prisma.user.create({
    data: {
      name: "Dan Cooper",
      email: "dan@example.com",
      emailVerified: new Date(),
      location: "London, UK",
      birthDate: "1990-11-05",
      phone: "+447700900123",
      password,
      bio: "Backend wizard 🧙 | Go, Rust, and the occasional TypeScript rant.",
      image: "https://i.pravatar.cc/150?img=4",
    },
  });

  const eva = await prisma.user.create({
    data: {
      name: "Eva Rossi",
      email: "eva@example.com",
      emailVerified: new Date(),
      location: "Milan, Italy",
      birthDate: "1996-06-18",
      phone: "+393331234567",
      password,
      bio: "Product manager | Turning chaos into roadmaps 🗺️",
      image: "https://i.pravatar.cc/150?img=5",
    },
  });

  console.log("✅ Users created");

  // ─── Posts ────────────────────────────────────────────────────────────────
  const post1 = await prisma.post.create({
    data: {
      authorId: alice.id,
      content:
        "Just shipped a brand-new feature using Next.js Server Actions. The DX is incredible — no more boilerplate API routes! 🚀",
      image: "https://picsum.photos/seed/post1/600/400",
    },
  });

  const post2 = await prisma.post.create({
    data: {
      authorId: bob.id,
      content:
        "Hot take: writing tests *first* actually saves time in the long run. Change my mind. 🧪",
    },
  });

  const post3 = await prisma.post.create({
    data: {
      authorId: carol.id,
      content:
        "Redesigned our onboarding flow and reduced drop-off by 34%. Good design really does move the needle. 🎯",
      image: "https://picsum.photos/seed/post3/600/400",
    },
  });

  const post4 = await prisma.post.create({
    data: {
      authorId: dan.id,
      content:
        "Migrated a critical service from Node.js to Go today. Cold start times went from 800ms → 12ms. Worth every hour. ⚡",
    },
  });

  const post5 = await prisma.post.create({
    data: {
      authorId: eva.id,
      content:
        "Q3 planning done! Roadmap is locked. Now let's actually build the thing 🛠️",
      image: "https://picsum.photos/seed/post5/600/400",
    },
  });

  const post6 = await prisma.post.create({
    data: {
      authorId: alice.id,
      content:
        "Reminder: taking breaks makes you a *better* developer, not a lazy one. Step away from the screen! 🌿",
    },
  });

  const post7 = await prisma.post.create({
    data: {
      authorId: bob.id,
      content:
        "Prisma ORM is genuinely fun to work with. Type-safety all the way down 🔒",
    },
  });

  console.log("✅ Posts created");

  // ─── Comments ─────────────────────────────────────────────────────────────
  await prisma.comment.createMany({
    data: [
      // on post1 (alice's Next.js post)
      { postId: post1.id, authorId: bob.id,   content: "Server Actions are a game changer. Been using them for a week and I'm already hooked." },
      { postId: post1.id, authorId: carol.id, content: "Does it work well with Prisma? Thinking of switching our stack." },
      { postId: post1.id, authorId: alice.id, content: "@carol Absolutely! I'll write a post about it soon 🙌" },

      // on post2 (bob's TDD post)
      { postId: post2.id, authorId: alice.id, content: "100% agree. Past-me always regretted skipping tests." },
      { postId: post2.id, authorId: dan.id,   content: "Depends on the domain. For infra scripts? I'll pass. For business logic? Always." },
      { postId: post2.id, authorId: eva.id,   content: "Speaking as PM: tests = fewer emergency calls at 2am. Please write tests. 🙏" },

      // on post3 (carol's design post)
      { postId: post3.id, authorId: eva.id,   content: "34%! That's huge. What was the biggest change you made?" },
      { postId: post3.id, authorId: alice.id, content: "Would love to see a case study on this Carol!" },

      // on post4 (dan's Go migration post)
      { postId: post4.id, authorId: bob.id,   content: "800ms → 12ms is wild. What was causing the Node.js slowdown?" },
      { postId: post4.id, authorId: carol.id, content: "I don't understand Go but those numbers are impressive 😂" },

      // on post7 (bob's Prisma post)
      { postId: post7.id, authorId: alice.id, content: "That's literally what this seed file is using 😄" },
      { postId: post7.id, authorId: dan.id,   content: "Agreed. The migration workflow is so clean compared to alternatives." },
    ],
  });

  console.log("✅ Comments created");

  // ─── Likes ────────────────────────────────────────────────────────────────
  await prisma.like.createMany({
    data: [
      // post1
      { postId: post1.id, userId: bob.id   },
      { postId: post1.id, userId: carol.id },
      { postId: post1.id, userId: dan.id   },
      { postId: post1.id, userId: eva.id   },

      // post2
      { postId: post2.id, userId: alice.id },
      { postId: post2.id, userId: carol.id },
      { postId: post2.id, userId: eva.id   },

      // post3
      { postId: post3.id, userId: alice.id },
      { postId: post3.id, userId: bob.id   },
      { postId: post3.id, userId: dan.id   },
      { postId: post3.id, userId: eva.id   },

      // post4
      { postId: post4.id, userId: alice.id },
      { postId: post4.id, userId: bob.id   },
      { postId: post4.id, userId: carol.id },

      // post5
      { postId: post5.id, userId: alice.id },
      { postId: post5.id, userId: bob.id   },

      // post6
      { postId: post6.id, userId: carol.id },
      { postId: post6.id, userId: dan.id   },
      { postId: post6.id, userId: eva.id   },

      // post7
      { postId: post7.id, userId: alice.id },
      { postId: post7.id, userId: carol.id },
      { postId: post7.id, userId: eva.id   },
    ],
  });

  console.log("✅ Likes created");

  // ─── Follows ──────────────────────────────────────────────────────────────
  // alice  ← followed by: bob, carol, dan, eva
  // bob    ← followed by: alice, carol, eva
  // carol  ← followed by: alice, bob, dan
  // dan    ← followed by: bob, carol, eva
  // eva    ← followed by: alice, carol, dan
  await prisma.follow.createMany({
    data: [
      { followerId: bob.id,   followingId: alice.id },
      { followerId: carol.id, followingId: alice.id },
      { followerId: dan.id,   followingId: alice.id },
      { followerId: eva.id,   followingId: alice.id },

      { followerId: alice.id, followingId: bob.id   },
      { followerId: carol.id, followingId: bob.id   },
      { followerId: eva.id,   followingId: bob.id   },

      { followerId: alice.id, followingId: carol.id },
      { followerId: bob.id,   followingId: carol.id },
      { followerId: dan.id,   followingId: carol.id },

      { followerId: bob.id,   followingId: dan.id   },
      { followerId: carol.id, followingId: dan.id   },
      { followerId: eva.id,   followingId: dan.id   },

      { followerId: alice.id, followingId: eva.id   },
      { followerId: carol.id, followingId: eva.id   },
      { followerId: dan.id,   followingId: eva.id   },
    ],
  });

  console.log("✅ Follows created");
  console.log("\n🎉 Seeding complete!");
  console.log("\nTest accounts (password: password123)");
  console.log("  alice@example.com");
  console.log("  bob@example.com");
  console.log("  carol@example.com");
  console.log("  dan@example.com");
  console.log("  eva@example.com");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });