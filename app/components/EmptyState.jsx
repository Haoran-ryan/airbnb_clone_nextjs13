'use client';
import { useRouter } from 'next/navigation'
import React from 'react'
import Heading from './Heading';
import Button from './Button';

const EmptyState = ({ 
  title = 'No match',
  subtitle = 'Try searching for something else',
  showRest,
}) => {
  const router = useRouter()
  return (
    <div
      className='h-[60vh] flex flex-col gap-2 justify-center items-center'
    >
      <Heading 
        center
        title = { title }
        subtitle={ subtitle}
      />
      <div className='w-48 mt-4'>
        { showRest && (
          <Button
            outline={true}
            label = 'remove all filters'
            onClick={() => router.push('/')}
          />
        )}
      </div>
      </div>
  )
}

export default EmptyState