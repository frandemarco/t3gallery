import { getImage } from "~/server/queries";
import { clerkClient } from "@clerk/nextjs/server";

export default async function FullPageImageView(props:{id:number}) {
  const image = await getImage(props.id);
  const uploaderInfo = await clerkClient.users.getUser(image.userId);
  return <div className="flex w-full h-full min-w-0">
    <div className="flex flex-shrink items-center justify-center">
        <img src={image.url} className="flex-shrink object-contain" />
    </div>
    <div className="w- flex flex-col flex-shrink-0 gap-2 border-l">
        <div className="border-b p-2 text-center text-lg">{image.name}</div>
        <div className="flex flex-col p-2"> <span>Uploaded by: </span><span>{uploaderInfo.fullName}</span></div>
        <div className="flex flex-col p-2"> 
          <span>Created on: </span>
        <span>{new Date(image.createdAt).toLocaleDateString()}</span></div>
    </div> 
    
  </div>;
}