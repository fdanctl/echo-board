import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const genres = await prisma.genre.createMany({
    data: [
      { name: "trap" },
      { name: "hip hop" },
      { name: "rock" },
      { name: "lofi" },
      { name: "jazz" },
      { name: "edm" },
      { name: "pop" },
      { name: "ambient" },
      { name: "r&b" },
      { name: "reggae" },
    ],
    skipDuplicates: true,
  });

  const tags = await prisma.tag.createMany({
    data: [
      { name: "808" },
      { name: "vinyl" },
      { name: "acoustic" },
      { name: "chill" },
      { name: "synth" },
      { name: "boom bap" },
      { name: "vocals" },
      { name: "instrumental" },
      { name: "live" },
      { name: "remix" },
    ],
    skipDuplicates: true,
  });

  const moods = await prisma.mood.createMany({
    data: [
      { name: "chill" },
      { name: "dark" },
      { name: "uplifting" },
      { name: "sad" },
      { name: "energetic" },
      { name: "mellow" },
      { name: "dreamy" },
      { name: "aggressive" },
      { name: "romantic" },
      { name: "groovy" },
    ],
    skipDuplicates: true,
  });

  console.log("Seed data inserted.");
  console.log("Genre:\n", genres);
  console.log("Tags:\n", tags);
  console.log("Moods:\n", moods);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
