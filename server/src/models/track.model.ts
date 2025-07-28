import prisma from "../config/prismaClient";
import { Filters, NewTrack } from "../types/track";

export const readManyTracks = async (f: Filters) => {
  return await prisma.track.findMany({
    include: {
      User: {
        select: {
          id: true,
          name: true,
          username: true,
        },
      },
      trackType: true,
      genre: true,
      Mood: true,
      Tag: true,
      Comment: {
        include: {
          User: {
            select: {
              name: true,
              username: true,
              avatarUrl: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 20,
      },
      _count: {
        select: {
          Like: true,
          TrackPlay: true,
          Comment: true,
        },
      },
    },
    where: {
      name: { contains: f.q, mode: "insensitive" },
      trackTypeId: f.trackTypes.length ? { in: f.trackTypes } : undefined,
      genreId: f.genres.length ? { in: f.genres } : undefined,
      moodId: f.moods.length ? { in: f.moods } : undefined,
      keyId: f.keys.length ? { in: f.keys } : undefined,
      Tag: f.tags.length
        ? {
          some: {
            id: { in: f.tags },
          },
        }
        : undefined,
    },
    orderBy: { publishAt: "desc" },
    take: 20,
  });
};

export const readProducerTracks = async (username: string) => {
  return await prisma.track.findMany({
    include: {
      User: {
        select: {
          id: true,
          name: true,
          username: true,
        },
      },
      trackType: true,
      genre: true,
      Mood: true,
      Tag: true,
      Comment: {
        include: {
          User: {
            select: {
              name: true,
              username: true,
              avatarUrl: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 20,
      },
      _count: {
        select: {
          Like: true,
          TrackPlay: true,
          Comment: true,
        },
      },
    },
    where: {
      User: { username: username },
    },
    orderBy: { publishAt: "desc" },
    take: 20,
  });
};

export const readOneTrack = async (id: string) => {
  return await prisma.track.findUnique({
    include: {
      User: {
        select: {
          id: true,
          name: true,
          username: true,
        },
      },
      trackType: true,
      genre: true,
      Mood: true,
      Tag: true,
      Comment: {
        include: {
          User: {
            select: {
              name: true,
              username: true,
              avatarUrl: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 20,
      },
      _count: {
        select: {
          Like: true,
          TrackPlay: true,
          Comment: true,
        },
      },
    },
    where: {
      id: id,
    },
  });
};

export const readOneTrackWithIsLiked = async (
  trackId: string,
  userId: string,
) => {
  const [track, like] = await prisma.$transaction([
    prisma.track.findUnique({
      include: {
        User: {
          select: {
            id: true,
            name: true,
          },
        },
        trackType: true,
        genre: true,
        Mood: true,
        Tag: true,
        Comment: {
          include: {
            User: {
              select: {
                name: true,
                username: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 20,
        },
        _count: {
          select: {
            Like: true,
            TrackPlay: true,
            Comment: true,
          },
        },
      },
      where: {
        id: trackId,
      },
    }),
    prisma.like.findUnique({
      where: {
        userId_trackId: { userId, trackId },
      },
    }),
  ]);

  return { track, likedByUser: !!like };
};

export const createOneTrack = async (data: NewTrack) => {
  const { tagsId, ...rest } = data;
  return await prisma.track.create({
    data: {
      ...rest,
      Tag: {
        connect: tagsId.map((id) => ({ id })),
      },
    },
  });
};
