import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth';
import {authOptions} from '../auth/[...nextauth]';
import prisma from '../../../prisma/client';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === "POST"){
    const session = await getServerSession(req, res, authOptions);
    if(!session) return res.status(401).json({message: "Please sing in to make a post!"});
    const title: string = req.body.title;
    const prismaUser = await prisma.user.findUnique({
      where: {email: session?.user?.email}
    })

    if(title.length > 300) return res.status(403).json({message: "please write a shorter post!"})
    if(!title.length) return res.status(403).json({message: "please do not leave this empty!"})
    try {
      const result = await prisma.post.create({
        data: {
          title,
          userId: prismaUser.id,
        }
      })
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json(error)
    }
  }
}
