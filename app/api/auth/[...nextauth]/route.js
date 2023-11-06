import prisma from '@/app/libs/prismadb';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcrypt';
export default NextAuth({
    adapter:PrismaAdapter(prisma),
    providers:[
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name:'Credentials',
            credentials:{
                email:{
                    label:'Email',
                    type:'text',},
                password:{
                    label:'Password',
                    type:'password',
                },
                async authorize(credentials, req){
                    if(!credentials?.email || !credentials?.password){
                        throw new Error('Invalid credentials');
                    }

                    // find the user using credential email
                    const user = await prisma.user.findUnique({
                        where:{
                            email:credentials.email,
                        },
                    });

                    if(!user || !user?.hashedPassword){
                        throw new Error('invalid credentials - user');
                    }

                    const isCorrectPassword = await bcrypt.compare(
                        credentials.password,
                        user.hashedPassword
                    );

                    if(!isCorrectPassword){
                        throw new Error('invalid credentials - password');
                    }

                    return user;
                }
            }
        })
    ],
    pages:{
        signIn:'/'
    },
    debug: process.env.NODE_ENV === 'development',
    session:{
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
});