import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth';
import prisma from '../../../prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === "GET"){
  
    try {
    const data = await prisma.post.findUnique({
      where: {
        id: req.query.details
      },
      include: {
        user: true,
        Comment: {
          orderBy: {createdAt: "desc"},
          include: {
            user: true,
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
