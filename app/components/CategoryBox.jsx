'use client'; 

import React, { useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';

const CategoryBox = ({
  icon: Icon,
  label,
  isSelected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    // params can be null
    if(params){
      console.log('params', params);
      currentQuery = qs.parse(params.toString());
      console.log('currentQuery', currentQuery);
    }

    const updatedQuery = {
      ...currentQuery,
      category: label,
    };
    console.log('updatedQuery', updatedQuery);

    if(params?.get('category') === label){
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl({
      url:'/',
      query: updatedQuery,
    },{ skipNull: true });

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`
        flex
        flex-col
        items-center
        justify-center
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        tarnsition
        cursor-pointer
        ${isSelected? 'border-b-neutral-800' : 'border-b-transparent'}
        ${isSelected? 'text-neutral-800' : 'text-neutral-500'}
      `}
    >
      <Icon size={26}/>
      <div
        className='font-medium text-sm'
      >
        {label}
      </div>
    </div>
  )
}

export default CategoryBox