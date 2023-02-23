'use client'
import React from 'react';
import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios, {AxiosError} from 'axios';
import toast from 'react-hot-toast';

export default function CreatePost(){
  const [title, setTitle] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  let toastPostId: string
  const {mutate} = useMutation(
    async (title: string) => await axios.post('/api/posts/addPosts', {title}),
    {
    onError: (error) => {
      if(error instanceof AxiosError){
        toast.error(error?.response?.data.message, {id: toastPostId});
      }
      setIsDisabled(false)
      setTitle("")
    },
    onSuccess: (data) => {
      toast.success('Post has been made 🔥', {id: toastPostId})
      queryClient.invalidateQueries(["posts"])
      setTitle("") 
      setIsDisabled(false)
    }

  })

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    toastPostId = toast.loading('Creating your post', {id: toastPostId})
    setIsDisabled(true)
    mutate(title)
  }

  return(
    <form className="bg-white my-8 p-8 rounded-md" onSubmit={submitPost}>
      <div className="flex flex-col my-4">
        <textarea 
        className="p-4 text-lg rounded-md my-2 bg-gray-200 "
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="what's on your mind?"
        ></textarea>
      </div>
      <div className="flex items-center justify-between gap-2 ">
        <p 
        className={`font-bold text-sm ${title.length > 300 ? 'text-red-700' : 'text-gray-700'}`}>
          {`${title.length}/300`}
        </p>
        <button
        disabled={isDisabled}
        className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
        type="submit"
        >
          Create a post
        </button>
      </div>
    </form>
  )
}