'use client';

import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import { AuthPosts } from '../types/AuthPost';
import EditPost from './EditPost';


const fetchAllPosts = async () => {
  const response = await axios.get('/api/posts/authPosts');
  return response.data
}

export default function MyPosts() {
  const {data, isLoading} = useQuery<AuthPosts>({
    queryFn: fetchAllPosts,
    queryKey: ["auth-posts"]
  })

  if(isLoading) return <h1>Posts are laoding...</h1>
  return(
    <div >
      {data?.Post?.map((post) => (
        <EditPost id={post.id} 
        key={post.id} 
        avatar={data.image} 
        name={data.name} 
        title={post.title} 
        comments={post.Comment}/>
      ))}
    </div>
  )
}