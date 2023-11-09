'use client'
import React, {useCallback} from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { TbPhotoPlus } from 'react-icons/tb'

const ImageUpload = ({
  onChange,
  value
}) => {
  const handleUpload = useCallback((result) => {
    onChange(result.info.secure_url)
  },[])
  return (
      <CldUploadWidget
        onUpload={handleUpload}
        uploadPreset='wje9eamf'
        options={{maxFiles: 1}}
      >
        {({open}) =>{
          return (
            <div
              onClick={() => open?.()} // ? is optional chaining
              className='
              relative
              cursor-pointer
              hover:opacity-70
              transition
              border-2
              p-20
              border-neutral-300
              flex
              flex-col
              justify-center
              items-center
              gap-4
              text-netural-600
              '
            >
              <TbPhotoPlus size={50}/>
              <div className='font-semibold text-lg'>
                Click to upload
              </div>
              {
                value && (
                  <div
                    className='absolute inset-0 w-full h-full'
                  >
                    <Image 
                      alt='upload'
                      fill
                      size = {{ Object: 'cover'}}
                      src = {value}
                    />
                  </div>
                )
              }
            </div>
          )
        }}
      </CldUploadWidget>
  )
}

export default ImageUpload