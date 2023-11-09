'use client';
import React, { use, useMemo, useState } from 'react'
import Modal from './Modal'
import CategoryInput from '../inputs/CategoryInput';
import useRentModal from '@/app/hooks/useRentModal'
import Heading from '../Heading';
import CountrySelect from '../inputs/CountrySelect';
import Map from '../Map';
import Counter from '../inputs/Counter';
import Input from '../inputs/Input';
import { categories } from '../navbar/Catogeries';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import ImageUpload from '../inputs/ImageUpload';
import toast from 'react-hot-toast';


// simulate `enum` in typescript 
const STEPS = {
  CATEGORY: 0,
  LOCATION: 1,
  INFO: 2,
  IMAGES: 3,
  DESCRIPTION: 4,
  PRICE: 5,
};

const RentModal = () => {
  const router =useRouter();
  const rentModal = useRentModal();
  const [isLoading, setIsLoading] = useState(false);

  const [step, setStep ] = useState(STEPS.CATEGORY);
  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm({
    defaultValues:{
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    }
  });

  const category = watch('category');
  const location = watch('location');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');

  const setCustomValue = (id, value) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }

  const onBack = () => {
    setStep((prev) => prev - 1);
  }

  const onNext = () => {
    setStep((prev) => prev + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE){
      return 'Create'
    }
    return 'Next'; 
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY){
      return undefined
    }
    return 'Back'; 
  }, [step]);

  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading 
        title = "Which of these best describes your place?"
        subtitle = "Pick a category"
      />
      <div
        className='
        grid
        grid-col-1
        md:grid-cols-2
        gap-3
        max-h-[50vh]
        overflow-y-auto
        '
      >
        { categories.map((item) => (
          <div key={item.label} className='col-span-1'>
            <CategoryInput 
              onClick={(category) => setCustomValue('category', category)}
              isSelected = { category === item.label }
              label = { item.label }
              icon = { item.icon }
            />
            </div>
        ))}
      </div>
    </div>
  )

  if (step === STEPS.LOCATION){
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading 
          title='Where is your place located? '
          subtitle='Help guess find you! '
        />
        <CountrySelect 
          value={location} 
          onChange={(value) => setCustomValue('location', value)} 
        />
        <Map />
      </div>
    )
  }
  if (step === STEPS.INFO){
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading 
          title='Share some basics about your place'
          subtitle='What amenities do you have?'
        />
        <Counter 
          title ='Guests'
          subtitle='how many guests'
          value = {guestCount}
          onChange={(value) => setCustomValue('guestCount', value)}
        />
       <Counter 
          title ='Rooms'
          subtitle='how many rooms'
          value = {roomCount}
          onChange={(value) => setCustomValue('roomCount', value)}
        />
        <Counter 
          title ='Bathrooms'
          subtitle='how many bathrooms'
          value = {bathroomCount}
          onChange={(value) => setCustomValue('bathroomCount', value)}
        />
      </div>
    )
  }
  
  if (step === STEPS.IMAGES){
    bodyContent = (<div className='flex flex-col gap-8'>
      <Heading
        title='Add a photo of your place'
        subtitle='show guests what your place is like'
      />
      <ImageUpload 
        value={imageSrc}
        onChange={(value) => setCustomValue('imageSrc', value)}
      />
    </div>)
  };

  if(step ===STEPS.DESCRIPTION) {
    bodyContent = (<div
    className='
    flex
    flex-col
    gap-8
    '>
      <Heading 
        title='How woud you describe your place?'
        subtitle='Short and sweet works'
        />
        <Input
          id='title'
          label='Title'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
          <hr/>
          <Input
          id='description'
          label='Description'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
    </div>)
  }

  if(step===STEPS.PRICE) {
    bodyContent = (<div
    className='flex flex-col gap-8'>
      <Heading 
        title = 'How much do you want to charge?'
        subtitle='per night'
      />
      <Input
          id="price"
          label="Price"
          formatPrice 
          type="number" 
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
    </div>)
  }

  const onSubmit = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }
    setIsLoading(true);

    axios.post('/api/listings',data)
    .then(() => {
      toast.success('Listing created successfully');
      router.refresh();
      reset();
      setStep(STEPS.CATEGORY);
      rentModal.onClose();
    })
    .catch(() => {
      toast.error('Something went wrong');
    })
    .finally(() => {
      setIsLoading(false);
    })
  }
  return (
    <Modal 
      isOpen={ rentModal.isOpen }
      onClose={ rentModal.onClose }
      onSubmit={ handleSubmit(onSubmit) }
      actionLabel={ actionLabel }
      secondaryActionLabel ={ secondaryActionLabel }
      secondaryAction={ step === STEPS.CATEGORY ? undefined : onBack }
      body = { bodyContent }
      title='Airbnb your home'
    />
  )
}

export default RentModal