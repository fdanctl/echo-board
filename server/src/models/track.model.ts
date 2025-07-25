import prisma from "../config/prismaClient";
import { NewTrack } from "../types/track";

export const readManyTracks = async () => {
  return await prisma.track.findMany({
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
