import { api } from "@/trpc/server";
import Pagination from "./pagination";
import { isNumeric } from "./utils";

import { AiOutlineNumber } from "react-icons/ai"
import { FaLocationDot } from "react-icons/fa6"
import { IoRocketOutline } from "react-icons/io5"

import { Badge, Card, CardBody, CardHeader, Divider, Tooltip, Link as NextUiLink } from "@nextui-org/react";
import Image from "next/image";
import clsx from "clsx";
import dayjs from "dayjs";
import Link from "next/link";

type SearchParams = {
  page: number;
}

export const metadata = {
  title: "SpaceX Launches",
  description: "List of SpaceX Launches",
};

export default async function Home({
  searchParams
}: {
  searchParams?: SearchParams
}) {
  const pageSearchParam = isNumeric(searchParams?.page) ? Number(searchParams?.page) : 1;
  const launches = await api.spacex.launches.query({
    page: pageSearchParam,
  });

  return (
    <main className="container mx-auto px-6 mt-12">
      <h1 className="text-gray-500 text-xl md:text-4xl font-medium mb-6 text-center">SpaceX Launches</h1>
      <div className='text-center mb-10'>All data is fetched and Server-Side-Rendered from <NextUiLink href='https://docs.spacexdata.com/' target="_blank">https://docs.spacexdata.com/</NextUiLink></div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {launches?.results?.map((launch) => {

          return (
            <Badge
              content=' '
              size='sm'
              className="right-0 top-0"
              color={launch?.launch_failure_details?.reason ? 'danger' : 'success'}
            >
              <Link
                href={`/launches/${launch?.flight_number}`}
                passHref
                legacyBehavior
              >
                <Card
                  as='a'
                  key={`launch-${launch?.mission_name}`}
                  className='w-full'
                >
                  <CardHeader className='relative py-2 justify-between'>
                    <div>
                      <div className='text-md lg:text-2xl font-bold'>
                        {launch?.mission_name}
                      </div>
                      {launch?.launch_date_utc && (
                        <small className='text-default-500'>
                          {dayjs().to(dayjs(launch?.launch_date_utc))}
                          {' '}
                          - {dayjs(launch?.launch_date_utc).format('MMMM D, YYYY')}
                        </small>
                      )}
                    </div>

                    <Image
                      alt={`Mission patch for ${launch?.mission_name}`}
                      width={100}
                      height={100}
                      className={clsx(
                        'w-[50px] md:w-[18%] h-auto r-[10px]',
                        !launch?.links?.mission_patch_small && 'rounded-full'
                      )}
                      src={launch?.links?.mission_patch_small ?? 'https://dummyimage.com/100x100/474747/ffffff&text=No+Badge'}
                    />
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <div className='grid gap-2 grid-cols-2'>
                      <Tooltip color='primary' content={`Flight Number ${launch?.flight_number}`}>
                        <div className='flex items-center'>
                          <AiOutlineNumber size={24} className='mr-4' />
                          {launch?.flight_number}
                        </div>
                      </Tooltip>

                      <Tooltip color='primary' content='Rocket'>
                        <div className='flex items-center'>
                          <IoRocketOutline size={24} className='mr-4' />
                          {launch?.rocket?.rocket_name}
                        </div>
                      </Tooltip>
                    </div>

                    <Tooltip color='primary' content='Launch Site'>
                      <div className='flex items-center mt-4'>
                        <FaLocationDot size={24} className='mr-4' /> {launch?.launch_site?.site_name_long}
                      </div>
                    </Tooltip>

                    <Divider className='my-4' />

                    <div className='text-default-500'>
                      {launch?.details ? launch?.details : 'No details provided.'}
                    </div>
                  </CardBody>
                </Card>
              </Link>
            </Badge>
          )
        })}
      </div>

      <div className='flex justify-center mt-12 mb-20'>
        <Pagination
          total={launches?.totalPages}
          page={pageSearchParam}
        />
      </div>
    </main>
  );
}
