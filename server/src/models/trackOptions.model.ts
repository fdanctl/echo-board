import prisma from "../config/prismaClient";
import { TrackOptionsDBRes } from "../types/trackOptions";

export const readAllTrackOptions = async (): Promise<TrackOptionsDBRes[]> => {
  return await prisma.$queryRaw`SELECT *, 'trackType' as source FROM "TrackType"
                                UNION
                                SELECT *, 'mood' AS source FROM "Mood" 
                                UNION 
                                SELECT *, 'genre' AS source FROM "Genre" 
                                UNION 
                                SELECT *, 'tag' AS source FROM "Tag"
                                ORDER BY id ASC
                                ;`;
};
