"use client"

import { DashboardHeader } from "@/components/header";
import { Shell } from "@/components/shell";

export default function Home() {
  return (
    <Shell>
      <DashboardHeader heading="Welcome" text="Benefits to Tracking:" />
      <div
        className={
          "flex min-h-[400px] flex-col justify-center rounded-md border p-8 animate-in fade-in-50"
        }
      >
        <p className="mb-6 mt-2 text-sm font-normal leading-6 text-muted-foreground">
          Our brains, and ESPECIALLY ADHD/neurodiverse brains, need “evidence”
          of work. It’s like gamifying something. With our digital age it can
          be easy to forget how much we’ve worked on a book and how many pages
          have actually been written, because we look at our documents on the
          screen.
        </p>
        <p className="mb-6 mt-2 text-sm font-normal leading-6 text-muted-foreground">
          Our brains like to see a real, physical manifestation of our
          writing. But writing is so much more than just putting words on the
          page, and that’s what this tracker helps you recognize and track. It
          tracks everything that helps you write.
        </p>
        <p className="mb-8 mt-2 text-sm font-normal leading-6 text-muted-foreground">
          First, let's talk about what you'll track:
        </p>
        <h2 className="font-extrabold underline mb-4 mt-2 leading-6 text-muted-foreground">
          Play
        </h2>
        <p className="mb-8 mt-2 text-sm font-normal leading-6 text-muted-foreground">
          Making art or having fun for play's sake. Not for consumption or to impress anyone. To literally just create for the joy of it. Rapidwriting counts, as does freewriting!
        </p>
        <h2 className="font-extrabold underline mb-4 mt-2 leading-6 text-muted-foreground">
          Here are some ideas to get you started:
        </h2>
        <ul className="mb-8 mt-2 text-sm font-normal leading-6 text-muted-foreground">
          <li className="mb-2">Freewriting</li>
          <li className="mb-2">Listening to music</li>
          <li className="mb-2">Coloring</li>
          <li className="mb-2">Making collages</li>
          <li className="mb-2">Sketching</li>
          <li className="mb-2">Playing with play doh</li>
          <li className="mb-2">Singing</li>
          <li className="mb-2">Dancing</li>
          <li className="mb-2">Taking photography pictures</li>
          <li className="mb-2">Playing an instrument</li>
          <li className="mb-2">Daydreaming</li>
          <li className="mb-2">Painting</li>
        </ul>
        <h2 className="font-extrabold underline mb-4 mt-2 leading-6 text-muted-foreground">
          Benefits of Play:
        </h2>
        <p className="mb-8 mt-2 text-sm font-normal leading-6 text-muted-foreground">
          Our minds are currently trained to do something because it’s “productive.” We want to make a product out of everything in capitalism. Play is about letting go of the demand to always be productive. Always be Doing Something Significant (as Roseanne Bane puts it). It’s teaching your brain to let go. Play teaches our brain that we can surrender our fears of making mistakes—the things that often cause our resistance.
        </p>
        <p className="mb-8 mt-2 text-sm font-normal leading-6 text-muted-foreground">
          Brenda Ueland says in her book If You Want to Write: "So you see the imagination needs moodling--long, inefficient, happy idling and puttering." Play puts you in the creative flow. It gives your brain permission to be free.

        </p>
      </div>
    </Shell>
  );
}
