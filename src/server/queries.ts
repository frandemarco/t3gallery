import { auth } from "@clerk/nextjs/server";
import "server-only";
import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { albums, images } from "./db/schema";
import { and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import analyticsServerClient from "./analytics";


export async function getMyImages() {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");
  const images = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });
  return images;
}
export async function getMyImagesByAlbum(albumId: number){
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");
  const images = await db.query.images.findMany({
    where: (model, { eq, and }) => and(
      eq(model.userId, user.userId),
      eq(model.albumId, albumId)
  ),
    orderBy: (model, { desc }) => desc(model.id),
  });
  return images;
}
export async function getImage(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");
  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
  if (!image) throw new Error("Image not found")
  if (image.userId !== user.userId) throw new Error("Unauthorized");
  return image;
}
export async function deleteImage(id:number) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");
  await db.delete(images).where(and(eq(images.id, id), eq(images.userId, user.userId)));
  analyticsServerClient.capture({distinctId: user.userId,
    event: "delete image",
    properties:{
      imageId: id,
    }
  })
 redirect("../");
}
export async function getAlbumFirstImage() {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");
  const albumImages=db.query.albums.findMany({
    columns:{
      id:true,
      name:true,
    },
    with:{
      images:{
        columns:{
          url:true,
        },
        limit:1,
        orderBy: (images, { desc }) => desc(images.id),
      },
    }
  }).then(albums=>albums.map(album=>({
    id: album.id,
    name: album.name,
    firstImage: album.images[0]?.url 
  })));
  return albumImages;
}