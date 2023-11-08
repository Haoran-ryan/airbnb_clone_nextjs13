'use client';
import React, { useMemo, useState } from 'react'
import Modal from './Modal'
import CategoryInput from '../inputs/CategoryInput';
import useRentModal from '@/app/hooks/useRentModal'
import Heading from '../Heading';
import CountrySelect from '../inputs/CountrySelect';
import { categories } from '../navbar/Catogeries';

import { useForm } from 'react-hook-form';


// simulate `enum` in typescript 
const STEPS = {
  CATEGORY: 0,
  LOCATION: 1,
  INFO: 2,
  IMAGES: 3,
  DESCRIPTION: 4,
  TITLE: 5,
};

const RentModal = () => {
  const rentModal = useRentModal();

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
    if (step === STEPS.PRICE){ // if this is the last step? 
      return 'Create'
    }
    return 'Next'; 
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY){ // if this is the last step? 
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
              isSelected = { false }
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
      </div>
    )
  }
  return (
    <Modal 
      isOpen={ rentModal.isOpen }
      onClose={ rentModal.onClose }
      onSubmit={ onNext }
      actionLabel={ actionLabel }
      secondaryActionLabel ={ secondaryActionLabel }
      secondaryAction={ step === STEPS.CATEGORY ? undefined : onBack }
      body = { bodyContent }
      title='Airbnb your home'
    />
  )
}

export default RentModal