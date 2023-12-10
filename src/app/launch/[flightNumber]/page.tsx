import { api } from '@/trpc/server';
import { isNumeric } from '../../utils';

import { AiOutlineNumber } from 'react-icons/ai'
import { FaLocationDot } from 'react-icons/fa6'
import { IoRocketOutline } from 'react-icons/io5'

import { Divider, Tooltip } from '@nextui-org/react';

import Carousel from './carousel'

export const revalidate = 3600

type Params = {
  flightNumber: number;
}

export const metadata = {
  title: 'SpaceX Launches',
  description: 'List of SpaceX Launches',
};

export default async function Home({ params }: {
  params?: Params
}) {
  const flightNumber = isNumeric(params?.flightNumber) ? Number(params?.flightNumber) : 1;
  const launch = await api.spacex.launch.query({
    flightNumber
  });

  return (
    <main className="container mx-auto px-6 mt-12">
      <h1 className="text-gray-500 w-full text-xl md:text-4xl font-medium mb-12 text-center">{launch?.mission_name}</h1>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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

        <Tooltip color='primary' content='Launch Site'>
          <div className='flex items-center mt-4'>
            <FaLocationDot size={24} className='mr-4' /> {launch?.launch_site?.site_name_long}
          </div>
        </Tooltip>
      </div>

      <Divider className='mt-10 mb-10' />

      <div className='prose w-full max-w-full prose-xl'>
        {launch?.details}
      </div>

      <Divider className='mt-10 mb-10' />

      <Carousel images={launch?.links?.flickr_images} />
    </main>
  );
}
