import { getCurrentUser } from "@/lib/auth/currentUser"
import Image from "next/image"

const UserPage = async () => {

  const user = await getCurrentUser()

  return (
    <div className="container my-10" >
        <div className="flex flex-col md:flex-row gap-10" >
                <div className="md:w-1/2 h-[calc(100vh-65px)] md:sticky top-10" >
                        <Image 
                            src={user?.image || "/default-avatar.png"} 
                            alt="User profile image"
                            className="w-44 h-44 rounded-full object-contain border-3 border-white mb-4"
                            width={176}
                            height={176}
                        />

                        <div className="text-text-color bg-white p-6 rounded-lg shadow-md" >
                                <h2 className="font-semibold text-3xl mb-3" > {user?.name} </h2>
                                <p className="mb-1 text-xl"> Bio: This is a sample user bio. </p>
                                <p className="mb-1 text-xl"> Email: {user?.email} </p>
                                <p className="mb-1 text-xl"> Location: Sample City </p>
                                <p className="mb-1 text-xl"> phone: 123-456-7890 </p>
                        </div>

                </div>

                <div className="md:w-1/2" >
 
                          <button className="mb-5  w-40 bg-secondary-color p-2 rounded-md text-white text-xl cursor-pointer" > Create Post </button>

                          <div>

                                         
                                         <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-sm mb-6 p-5">
                                         
                                               {/* Header */}
                                               <div className="flex items-center justify-between mb-4">
                                                 <div className="flex items-center gap-3">
                                                   <Image
                                                     src={user?.image || "/default-avatar.png"}
                                                     alt="avatar"
                                                     width={45}
                                                     height={45}
                                                     className="rounded-full object-cover"
                                                   />
                                                   <div>
                                                     <h3 className="font-semibold text-gray-800"> {user?.name} </h3>
                                                     <p className="text-sm text-gray-500"> 3 hours ago </p>
                                                   </div>
                                                 </div>
                                         
                                                 <button className="text-gray-400 hover:text-gray-600 text-xl">
                                                   •••
                                                 </button>
                                               </div>
                                         
                                               {/* Content */}
                                               <p className="text-gray-700 leading-relaxed mb-4">
                                                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati et, modi sed aperiam culpa excepturi sequi nam tempora. Modi impedit autem dolores quasi nemo ratione aut obcaecati doloremque doloribus quas.
                                               </p>
                                         
                                               {/* Post Image */}
                                               <div className="relative w-full h-72 rounded-xl overflow-hidden mb-4">
                                                 <Image
                                                   src="https://images.unsplash.com/photo-1492724441997-5dc865305da7"
                                                   alt="post"
                                                   fill
                                                   className="object-cover"
                                                 />
                                               </div>
                                         
                                               {/* Actions */}
                                               <div className="flex justify-between border-t pt-3 text-gray-500">
                                                 <button className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-lg transition w-full justify-center">
                                                   ❤️ Like
                                                 </button>
                                         
                                                 <button className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-lg transition w-full justify-center">
                                                   💬 Comment
                                                 </button>
                                         
                                                 <button className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-lg transition w-full justify-center">
                                                   🔄 Share
                                                 </button>
                                               </div>
                                          </div>
                                         
                                         <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-sm mb-6 p-5">
                                         
                                               {/* Header */}
                                               <div className="flex items-center justify-between mb-4">
                                                 <div className="flex items-center gap-3">
                                                   <Image
                                                     src="https://randomuser.me/api/portraits/men/32.jpg"
                                                     alt="avatar"
                                                     width={45}
                                                     height={45}
                                                     className="rounded-full object-cover"
                                                   />
                                                   <div>
                                                     <h3 className="font-semibold text-gray-800"> user name </h3>
                                                     <p className="text-sm text-gray-500"> 3 hours ago </p>
                                                   </div>
                                                 </div>
                                         
                                                 <button className="text-gray-400 hover:text-gray-600 text-xl">
                                                   •••
                                                 </button>
                                               </div>
                                         
                                               {/* Content */}
                                               <p className="text-gray-700 leading-relaxed mb-4">
                                                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati et, modi sed aperiam culpa excepturi sequi nam tempora. Modi impedit autem dolores quasi nemo ratione aut obcaecati doloremque doloribus quas.
                                               </p>
                                         
                                               {/* Post Image */}
                                               <div className="relative w-full h-72 rounded-xl overflow-hidden mb-4">
                                                 <Image
                                                   src="https://images.unsplash.com/photo-1492724441997-5dc865305da7"
                                                   alt="post"
                                                   fill
                                                   className="object-cover"
                                                 />
                                               </div>
                                         
                                               {/* Actions */}
                                               <div className="flex justify-between border-t pt-3 text-gray-500">
                                                 <button className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-lg transition w-full justify-center">
                                                   ❤️ Like
                                                 </button>
                                         
                                                 <button className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-lg transition w-full justify-center">
                                                   💬 Comment
                                                 </button>
                                         
                                                 <button className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-lg transition w-full justify-center">
                                                   🔄 Share
                                                 </button>
                                               </div>
                                          </div>


                          </div>

                </div>
        </div>
    </div>
  )
}

export default UserPage