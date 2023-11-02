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
                console.log(err);
            })
            .finally(()=>{
                setIsLoading(false);
            })

    };

    return (
        <Modal
            disabled={isLoading} // if it's loading, a user cannot click the buttons
            isOpen={registerModal.isOpen}
            onClose={registerModal.onClose}
            title = 'Register'
            actionLabel='Continue'
            onSubmit={handleSubmit(onSubmit)}


        />

    );
};

export default RegisterModal;
