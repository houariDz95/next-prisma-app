export type PostType = {
  id: string,
  title: string,
  createdAt: string,
  user: {
    email: string,
    id: string,
    image: string,
    name: string,
  }
  Comment: {
    createdAt?: string,
    id: string,
    postId: string,
    message: string,
    userId: string,
    user:{
      email: string,
      id: string,
      image: string,
      name: string,
    }
  }[]
}