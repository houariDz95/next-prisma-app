'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import {useState} from 'react';
import Toggle from './Toggle';
import axios from 'axios';
import toast from 'react-hot-toast';


type EditProps = {
  id: string,
  avatar: string,
  name: string,
  title: string,
  comments?: {
    id: string,
    postId: string,
    userId: string,
  }[]
}

export default function EditPost({avatar, name, title, comments, id}: EditProps){
  const [toggle, setToggle] = useState(false);
  let deleteToastId: string;
  const queryClient = useQueryClient();
  const {mutate} = useMutation(
    async (id: string) =>  await axios.delete('/api/posts/deletePost', {data: id}),
    {
      onError: (error) => {
        console.log(error)
        toast.error('Error deleting that post', {id: deleteToastId})
      },
      onSuccess: (data) => {
        toast.success("post has been deleted", {id: deleteToastId});
        queryClient.invalidateQueries(["auth-posts"])
      }
    }
  )

  const deletePost = () => {
    deleteToastId = toast.loading("Deleting your post.", {id: deleteToastId})
    mutate(id)
  }

  return(
    <div className="bg-white my-8 p-8 rounded-lg">
      <div className="flex items-center gap-2">
        <Image src={avatar} width={32} height={32} alt="avatar" className="rounded-full"/>
        <h3 className="font-bold text-gray-700">{name}</h3>
      </div>
      <div className="my-2">
        <p className="break-all">{title}</p>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-sm font-bold text-gray-700">
          {comments?.length} commetns
        </p>
        <button className="text-sm font-bold text-red-500" onClick={() => setToggle(true)}>Delete</button>
      </div>
      {toggle && <Toggle setToggle={setToggle} deletePost={deletePost} />} 
    </div>
  )
}