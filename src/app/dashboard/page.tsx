"use client"
// import { CreatePost } from "@/app/_components/create-post";
// import { api } from "@/trpc/server";

export default function Home() {
  console.log("DASHBOARD")
  // const hello = await api.post.hello.query({ text: "from tRPC" });

  return (
    <main className="grid w-full grid-cols-12 grid-rows-2 gap-2 px-8">
      <div className="col-span-12 h-[300px] px-1">
        <h2 className="top-1 z-10">
          <p className="py-1 font-bold uppercase text-black">Welcome</p>
        </h2>
        <div className="col-span-12">
          <p className="pb-3 text-black">Benefits to Tracking:</p>
          <p className="pb-3 text-black">
            Our brains, and ESPECIALLY ADHD/neurodiverse brains, need “evidence”
            of work. It’s like gamifying something. With our digital age it can
            be easy to forget how much we’ve worked on a book and how many pages
            have actually been written, because we look at our documents on the
            screen.
          </p>
          <p className="pb-3 text-black">
            Our brains like to see a real, physical manifestation of our
            writing. But writing is so much more than just putting words on the
            page, and that’s what this tracker helps you recognize and track. It
            tracks everything that helps you write.
          </p>
          <p className="text-black">
            First, let's talk about what you'll track:
          </p>
        </div>
      </div>
    </main>
  );
}
