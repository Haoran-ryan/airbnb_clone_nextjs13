'use client';
import React from 'react';
import { get } from 'react-hook-form';
import useCountries from '@/app/hooks/useCountries';
import Avatar from '../Avatar';
import ListingCategory from './ListingCategory';
const ListingInfo = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  locationValue,
}) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.laltng;

  return (
    <div className='col-span-4 flex flex-col gap-8'>
      <div className='flex flex-col gap-2 '>
        <div className='text-xl font-semibold flex flex-row items-center gap-2'>
          <div>Hosted by {user?.name}</div>
          <Avatar 
            src = { user?.image }
          />
        </div>
        <div className='flex flex-row items-center gap-4 font-light text-neutral-500'>
          <div>
          {guestCount} guests
          </div>
          <div >
          {roomCount} guests
          </div>
          <div>
            {bathroomCount} bathroom
          </div>
        </div>
          <hr />
          { category && (
            <ListingCategory 
              icon = { category.icon }
              label = { category.label }
              description = { category.description }
            />
          )}
      </div>
    </div>
  )
}

export default ListingInfo