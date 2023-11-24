'use client'
import React from 'react'

const ListingCategory = ({
  icon: Icon,
  label,
  description
}) => {
  return (
    <div className='flex flex-col gap6'>
      <div className='flex flex-row items-center gap-4'>
        <Icon size={40} className='text-neutral-600'/>
        <div className='flex flex-col'>
          <div className='text-lg font-semibold'>
            { label }
          </div>
          <div className='text-neutral-500 font-light'>{ description }</div>
        </div>
      </div>
    </div>
  )
}

export default ListingCategory