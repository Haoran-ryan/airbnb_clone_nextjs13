'use client';

import { signIn } from 'next-auth/react';
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import {
    handleSubmit,  // SubmitHanlder is for TS
    useForm,
} from 'react-hook-form';
import { useRouter } from 'next/navigation';

import Modal from "@/app/components/modals/Modal";
import Heading from "@/app/components/Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';

const LoginModal = () => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues:{ // the defaulValues are only for readability 
            email:'',
            password:'',
        }
    });
    // TODO: handleSubmit should wrap the onSubmit function
    const onSubmit =(data)=>{
        setIsLoading(true);

        signIn('credentials', {
            ...data,
            redirect: false,
        })
            .then((callback) => {
                setIsLoading(false);

                if (callback?.ok) {
                    toast.success('Logged in');
                    router.refresh();
                    loginModal.onClose();
                }

                if (callback?.error) {
                    toast.error(callback.error);
                }
            });
    }
    
    const bodyContent =(
        <div className="flex flex-col gap-4">
            <Heading 
                title='Welcome back'
                subtitle='Login to your account'
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
            isOpen={loginModal.isOpen}
            onClose={loginModal.onClose}
            title = 'Log in'
            actionLabel='Continue'
            onSubmit={handleSubmit(onSubmit)}
            body={ bodyContent }
            footer={ footerContent }

        />

    );
};

export default LoginModal;
