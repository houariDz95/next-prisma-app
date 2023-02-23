import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth';
import {authOptions} from '../auth/[...nextauth]';
import prisma from '../../../prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === "GET"){
    const session = await getServerSession(req, res, authOptions);
    if(!session) return res.status(401).json({message: "Please sing in to make a post!"});
    try {
      const data = await prisma.user.findUnique({
        where: {
          email: session?.user?.email,
        },
        include: {
          Post: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              Comment: true,
            },
          },
        },
      })
      return res.status(201).json(data);
    } catch (error) {
      return res.status(500).json(error)
    }
  }
}
