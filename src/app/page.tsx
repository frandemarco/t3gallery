import Link from "next/link";

const mockUrls=[
  "https://utfs.io/f/802a8b3f-943d-4cc6-85c2-fdd9408340a1-pjusa3.png",
  "https://utfs.io/f/1744bdc6-220d-47c0-a911-8a774592d23c-cgjhqk.png",
  "https://utfs.io/f/f3afea59-125c-411d-9c7f-f389ac3f092b-j4q4mr.png",
]
const mockImages=mockUrls.map((url, index)=>({
 id: index + 1,
 url,
}
))
export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">{
        [...mockImages,...mockImages,...mockImages].map((image)=>(
          <div key={(image.id)} className="w-48">
            <img src={image.url} alt="text" />
          </div>
        ))
      }
      </div>
      Hello (gallery in progress)
    </main>
  );
}
