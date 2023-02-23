export type PostType = {
  id: string, 
  title: string,
  createdAt: string,
  user: {
    name: string,
    image: string,
  },
  Comment?: {
    createdAt: string,
    id: string,
    postId: string,
    userId: string,
    message?: string,
  }[]
}