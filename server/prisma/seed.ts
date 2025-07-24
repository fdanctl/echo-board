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
      { name: "witchhouse" },
      { name: "hyperpop" },
      { name: "afro beat" },
      { name: "grime" },
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
      { name: "remix" },
      { name: "guitar" },
      { name: "sematary" },
      { name: "ghost mountain" },
      { name: "emo" },
      { name: "lil peep" },
      { name: "ivoxygen" },
      { name: "drain gang" },
      { name: "jpegmafia" },
      { name: "death grips" },
      { name: "ambient" },
      { name: "lofi" },
      { name: "deftones" },
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

  const trackTypes = await prisma.trackType.createMany({
    data: [
      { name: "beat" },
      { name: "vocal" },
      { name: "stems" },
      { name: "loops" },
    ],
    skipDuplicates: true,
  });

  const keys = [
    "C Major",
    "C Minor",
    "C# Major",
    "C# Minor",
    "D Major",
    "D Minor",
    "D# Major",
    "D# Minor",
    "E Major",
    "E Minor",
    "F Major",
    "F Minor",
    "F# Major",
    "F# Minor",
    "G Major",
    "G Minor",
    "G# Major",
    "G# Minor",
    "A Major",
    "A Minor",
    "A# Major",
    "A# Minor",
    "B Major",
    "B Minor",
  ];

  const keyN = await prisma.key.createMany({
    data: keys.map((k) => ({ name: k })),
    skipDuplicates: true,
  });

  // Sample users
  const hashedPassword =
    "$2b$08$B9Xpzv0N4fTTwQlALw1mj.YZKOlqzBtZR1ai.4Dwbu4UDs8dxkEbS";
  const users = [
    {
      name: "Daniel",
      username: "fdanctl",
      // avatarUrl: "https://i.pravatar.cc/150?img=1",
      email: "test@test.com",
      password: hashedPassword,
      location: "Lisbon",
    },
    {
      name: "Alice Johnson",
      username: "alicej",
      avatarUrl: "https://i.pravatar.cc/150?img=1",
      email: "alice@example.com",
      password: hashedPassword,
      location: "New York",
    },
    {
      name: "Bob Smith",
      username: "bobsmith",
      avatarUrl: "https://i.pravatar.cc/150?img=2",
      email: "bob@example.com",
      password: hashedPassword,
      location: "Los Angeles",
    },
    {
      name: "Charlie Brown",
      username: "charlieb",
      avatarUrl: "https://i.pravatar.cc/150?img=3",
      email: "charlie@example.com",
      password: hashedPassword,
      location: "Chicago",
    },
  ];

  const producer2 = await prisma.user.create({
    data: {
      name: "Mira Lavoie",
      username: "DigitalMira",
      avatarUrl: "https://i.pravatar.cc/150?img=3",
      email: "mira@example.com",
      password: hashedPassword,
      location: "Barcelona",
    },
  });

  const usersN = await prisma.user.createMany({
    data: users.map((data) => data),
    skipDuplicates: true,
  });

  const producerX = await prisma.user.create({
    data: {
      name: "Producer X",
      username: "producerx",
      avatarUrl: "https://i.pravatar.cc/150?img=4",
      email: "producerx@example.com",
      password: hashedPassword,
      location: "Berlin",
    },
  });

  const track = await prisma.track.create({
    data: {
      name: "LO-FI TYPE BEAT - ONE LOVE",
      trackUrl: "/upload/track/[tVcwohev7Aw].mp3",
      imgUrl: "/upload/track/[tVcwohev7Aw].jpg",
      userId: producerX.id,
      genreId: 4,
      moodId: 1,
      trackTypeId: 1,
      keyId: 20,
      bpm: 75,
      price: 1499,
      Tag: {
        connect: [4, 18, 19].map((tag) => ({ id: tag })),
      },
    },
  });

  await prisma.track.create({
    data: {
      name: "bladee x whitearmor x drain gang type beat - solace",
      trackUrl: "/upload/track/[bYN32e385eA].mp3",
      imgUrl: "/upload/track/[bYN32e385eA].jpg",
      userId: producerX.id,
      genreId: 12,
      moodId: 4,
      trackTypeId: 1,
      keyId: 12,
      bpm: 140,
      price: 4999,
      Tag: {
        connect: [15].map((tag) => ({ id: tag })),
      },
    },
  });

  await prisma.track.create({
    data: {
      name: 'Lil Peep x IVOXYGEN "Nostalgia" (Prod. Sanctions x Maestro Wons)',
      trackUrl: "/upload/track/[BpP_reXvLks].mp3",
      imgUrl: "/upload/track/[BpP_reXvLks].jpg",
      userId: producerX.id,
      genreId: 2,
      moodId: 4,
      trackTypeId: 1,
      keyId: 12,
      bpm: 130,
      price: 9999,
      Tag: {
        connect: [13, 12, 14].map((tag) => ({ id: tag })),
      },
    },
  });

  await prisma.track.create({
    data: {
      name: 'Sematary Bloody Angels Type Beat "DIE 4 ME"',
      trackUrl: "/upload/track/[8yk-0oe0LTM].mp3",
      imgUrl: "/upload/track/[8yk-0oe0LTM].jpg",
      userId: producerX.id,
      genreId: 1,
      moodId: 1,
      trackTypeId: 1,
      keyId: 10,
      bpm: 140,
      price: 1999,
      Tag: {
        connect: [10, 11].map((tag) => ({ id: tag })),
      },
    },
  });

  await prisma.track.create({
    data: {
      name: 'earl sweatshirt type beat "DiRT"',
      trackUrl: "/upload/track/[lxJnz7Rk1_8].mp3",
      imgUrl: "/upload/track/[lxJnz7Rk1_8].jpg",
      userId: producerX.id,
      genreId: 2,
      moodId: 1,
      trackTypeId: 1,
      keyId: 20,
      bpm: 81,
      price: 1999,
      Tag: {
        connect: [4].map((tag) => ({ id: tag })),
      },
    },
  });

  await prisma.track.create({
    data: {
      name: 'DEATH GRIPS X JPEGMAFIA TYPE BEAT - "TONE HUNT"',
      trackUrl: "/upload/track/[SdgZOsV-NAg].mp3",
      imgUrl: "/upload/track/[SdgZOsV-NAg].jpg",
      userId: producer2.id,
      genreId: 2,
      moodId: 8,
      trackTypeId: 1,
      keyId: 20,
      bpm: 130,
      price: 4499,
      Tag: {
        connect: [16, 17].map((tag) => ({ id: tag })),
      },
    },
  });

  await prisma.track.create({
    data: {
      name: 'LIL PEEP TYPE BEAT - "YOUR LOVE" | EMO RAP TYPE BEAT',
      trackUrl: "/upload/track/[SX3cBfkBMP0].mp3",
      imgUrl: "/upload/track/[SX3cBfkBMP0].jpg",
      userId: producer2.id,
      genreId: 1,
      moodId: 4,
      trackTypeId: 1,
      keyId: 20,
      bpm: 145,
      price: 4499,
      Tag: {
        connect: [16, 17].map((tag) => ({ id: tag })),
      },
    },
  });

  await prisma.track.create({
    data: {
      name: 'deftones x alternative rock x heavy shoegaze type beat - "rest"',
      trackUrl: "/upload/track/[YFkECFkLNzc].mp3",
      imgUrl: "/upload/track/[YFkECFkLNzc].jpg",
      userId: producer2.id,
      genreId: 3,
      moodId: 8,
      trackTypeId: 1,
      keyId: 10,
      bpm: 120,
      price: 4499,
      Tag: {
        connect: [20].map((tag) => ({ id: tag })),
      },
    },
  });

  // Simulate one play
  await prisma.trackPlay.create({
    data: {
      trackId: track.id,
      userId: producer2.id,
    },
  });

  // One like
  await prisma.like.create({
    data: {
      trackId: track.id,
      userId: producer2.id,
    },
  });

  // One comment
  await prisma.comment.create({
    data: {
      trackId: track.id,
      userId: producer2.id,
      content: "This track is pure fire 🔥!",
    },
  });

  console.log("Seed data inserted.");
  console.log("Genre:\n", genres);
  console.log("Tags:\n", tags);
  console.log("Moods:\n", moods);
  console.log("Track Types:\n", trackTypes);
  console.log("User:\n", usersN);
  console.log("Keys:\n", keyN);
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
