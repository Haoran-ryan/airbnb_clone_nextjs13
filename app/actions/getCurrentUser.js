import { getServerSession } from 'next-auth/next';

import authOptions from '@/app/api/auth/[...nextauth]/authOptions';
import prisma from '@/app/libs/prismadb';
import {error} from 'next/dist/build/output/log';

export async function getSession(){
    return await getServerSession(authOptions);
}

export default async function getCurrentUser(req, res){
    try{
        const session = await getSession();

        if(!session?.user?.email){
            return null
        }

        const currentUser = await prisma.user.findUnique({
            where:{
                email: session.user.email
            }
        })

        if(!currentUser){
            return null
        }

        return currentUser;
    }
    catch(err){
        console.log(err);
        return null
    }
}