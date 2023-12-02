"use client"

import { DashboardHeader } from "@/components/header";
import { Shell } from "@/components/shell";

// import { CreatePost } from "@/app/_components/create-post";
// import { api } from "@/trpc/server";

export default function Home() {
  console.log("DASHBOARD")
  // const hello = await api.post.hello.query({ text: "from tRPC" });

  return (
    <Shell>
      <DashboardHeader heading="Welcome" text="Benefits to Tracking:"/>
      <div
        className={
          "flex min-h-[400px] flex-col justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50"
        }
      >
        <p className="mb-8 mt-2 text-sm font-normal leading-6 text-muted-foreground">
          Our brains, and ESPECIALLY ADHD/neurodiverse brains, need “evidence”
          of work. It’s like gamifying something. With our digital age it can
          be easy to forget how much we’ve worked on a book and how many pages
          have actually been written, because we look at our documents on the
          screen.
        </p>
        <p className="mb-8 mt-2 text-center text-sm font-normal leading-6 text-muted-foreground">
          Our brains like to see a real, physical manifestation of our
          writing. But writing is so much more than just putting words on the
          page, and that’s what this tracker helps you recognize and track. It
          tracks everything that helps you write.
        </p>
        <p className="mb-8 mt-2 text-center text-sm font-normal leading-6 text-muted-foreground">
          First, let's talk about what you'll track:
        </p>
      </div>
    </Shell>
  );
}
