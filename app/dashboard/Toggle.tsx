'use client'

type ToggleProps = {
  deletePost: () => void,
  setToggle: (toggle: boolean) => void
}


export default function Toggle({deletePost, setToggle}: ToggleProps){
  return(
    <div className="fixed bg-black/50 w-full h-full z-20 left-0 top-0" onClick={(e) => setToggle(false)}>
      <div 
      className="absolute bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-6 p-8">
        <h2 className="text-xl">Are you sure you wanna delete this post? 🥺</h2>
        <h3 className="text-red-600 text-sm ">Pressing the delete button will permenetly delete your post</h3>
        <button className="bg-red-600 text-sm text-white py-2 px-4" onClick={deletePost}>
          Delete Post
        </button>
      </div>
    </div>
  )
}