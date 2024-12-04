import { log } from "console";
import { desc } from "drizzle-orm";
import { index } from "drizzle-orm/mysql-core";
import Link from "next/link";
import { db } from "~/server/db";
import Image from "next/image";
import { getAlbumFirstImage, getMyImages, getMyImagesByAlbum } from "~/server/queries";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { object } from "zod";
export const dynamic = "force-dynamic";

async function Albums() {
  const albums = await getAlbumFirstImage();
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {albums.map((album) => (
        <div key={album.id} className="flex w-48 flex-col">
         <Link href={`/album/${album.id}`}>
          <Image
            src={album.firstImage!}
            style={{ objectFit: "contain" }}
            width={480}
            height={480}
            alt={album.name}
          />
          </Link>
          <div>{album.name}</div>
        
        </div>
      ))}
    </div>
  );
}
export default async function AlbumImagePage(
   
    ) {
    
    return (
      <main className="">
        <SignedOut>
          <div className="h-full w-full text-center text-2xl">Please Sign In</div>
        </SignedOut>
        <SignedIn>
          <Albums />
        </SignedIn>
      </main>
    );
  }
  

