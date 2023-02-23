'use client'

import Image from 'next/image';
import Post from "@/app/components/Post";
import { useQueries, useQuery } from "@tanstack/react-query";
import axios from 'axios';
import { url } from "inspector";
import { PostType } from "@/app/types/Post";
import AddComment from "@/app/components/AddComment";
const fetchDetails= async(slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  return response.data
}

type URL = {
  params: {
    slug: string,
  }
}
export default function PostDetail(url: URL){
  const {data, isLoading} = useQuery<PostType>({
    queryKey: ['detail-post'],
    queryFn: () => fetchDetails(url.params.slug)
  })
  if(isLoading) return "Loading..."
  return (                               
    <div>
      <Post 
      name={data?.user?.name} 
      title={data?.title} 
      avatar={data?.user?.image} 
      id={data?.id} 
      comments={data?.Comment}
    />
      <AddComment id={data?.id} />
      {data?.Comment.map((item) => (
        <div className="my-6 bg-white p-8 rounded-md" key={item.id}>
          <div className="flex items-center gap-2 ">
            <Image 
              width={24}
              height={24}
              src={item.user?.image}
              alt="avatar"
              className='rounded-full'
            />
            <h3 className='font-bold '>{item?.user?.name}</h3>
            <h2 className='text-sm'>{item?.createdAt}</h2>
          </div>
          <div className='py-4'>{item?.message}</div>
        </div>
      ))}
    </div>
  )
}