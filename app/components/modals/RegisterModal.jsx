'use client';

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import {
    Fieldvalues,
    handleSubmit,  // SubmitHanlder is for TS
    useForm,
} from 'react-hook-form';

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "@/app/components/modals/Modal";
import Heading from "@/app/components/Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues:{
            name:'',
            email:'',
            password:'',
        }
    });
    // TODO: handleSubmit should wrap the onSubmit function
    const onSubmit =(data)=>{
        setIsLoading(true);
        axios.post('/api/register',data) // TODO: api has not been created yet
            .then(()=>{
                registerModal.onClose();
            })
            .catch((err)=>{
                toast.error(`Oophs, something went wrong :( \t${ err.message }`);
            })
            .finally(()=>{
                setIsLoading(false);
            })

    };
    
    const bodyContent =(
        <div className="flex flex-col gap-4">
            <Heading 
                title='Welcome to Airbnb'
                subtitle='Create an account'
            />
            <Input 
                id='email'
                label='Email'
                type="email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required={true}
            />
            <Input 
                id='name'
                label='Name'
                disabled={isLoading}
                register={register}
                errors={errors}
                required={true}
            />
            <Input 
                id='password'
                label='Password'
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required={true}
            />
        </div>
    )
    
    const footerContent =(
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button 
                outline={true}
                label='Continue with Google'
                icon={FcGoogle}
                onClick={()=>{}}
            />
            <Button 
                outline={true}
                label='Continue with Github'
                icon={AiFillGithub}
                onClick={()=>{}}
            />
            <div className="
                text-neutral-500
                text-center
                mt-4
                font-light
            ">
                <div className="flex flex-row items-center justify-center gap-2">
                    <div>Already have an account? </div>
                    <div 
                    onClick={ registerModal.onClose }
                    className="text-neutral-800 cursor-pointer hover:underline">Log in </div>
                </div>
            </div>
        </div>
    )
    return (
        <Modal
            disabled={isLoading} // if it's loading, a user cannot click the buttons
            isOpen={registerModal.isOpen}
            onClose={registerModal.onClose}
            title = 'Register'
            actionLabel='Continue'
            onSubmit={handleSubmit(onSubmit)}
            body={ bodyContent }
            footer={ footerContent }

        />

    );
};

export default RegisterModal;
