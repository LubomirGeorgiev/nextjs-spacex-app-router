import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

import type { Launch } from '../launch-types'
import { z } from "zod";

const perPage = 10

export const spacexRouter = createTRPCRouter({
  launches: publicProcedure
    .input(z.object({
      page: z.number().optional().default(1),
    }).optional())
    .query(async ({ input }) => {
      const page = input?.page ?? 1

      const launchesResponse = await fetch(`https://api.spacexdata.com/v3/launches?limit=${perPage}&offset=${(page - 1) * perPage}&order=desc`, {
        next: {
          revalidate: 3600
        }
      })

      const totalLaunches = parseInt(launchesResponse.headers.get('spacex-api-count') ?? '0')
      const totalPages = Math.ceil(totalLaunches / perPage)

      const results = await launchesResponse.json() as Launch[]

      return {
        results,
        totalPages,
        totalLaunches,
        page,
        hasNextPage: page < totalPages,
      }
    }),
});
