"use client";
import { DashboardHeader } from "@/components/header";
import { Shell } from "@/components/shell";

export const runtime = "edge";

export default function Home() {
  return (
    <Shell>
      <DashboardHeader heading="Welcome" text="Benefits to Tracking:" />
      <div
        className={
          "flex min-h-[400px] flex-col justify-center rounded-md border p-8 animate-in fade-in-50"
        }
      >
        <p className="mb-2 mt-2 text-sm font-normal leading-6 text-muted-foreground">
          Our brains, and ESPECIALLY ADHD/neurodiverse brains, need “evidence”
          of work. It’s like gamifying something. With our digital age it can be
          easy to forget how much we’ve worked on a book and how many pages have
          actually been written, because we look at our documents on the screen.
        </p>
        <p className="mb-2 mt-2 text-sm font-normal leading-6 text-muted-foreground">
          Our brains like to see a real, physical manifestation of our writing.
          But writing is so much more than just putting words on the page, and
          that’s what this tracker helps you recognize and track. It tracks
          everything that helps you write.
        </p>
        <p className="mb-2 mt-2 text-sm font-normal leading-6 text-muted-foreground">
          First, let's talk about what you'll track:
        </p>
        <h2 className="mb-4 mt-4 font-extrabold leading-6 text-muted-foreground underline">
          Play
        </h2>
        <p className="mb-2 mt-2 text-sm font-normal leading-6 text-muted-foreground">
          Making art or having fun for play's sake. Not for consumption or to
          impress anyone. To literally just create for the joy of it.
          Rapidwriting counts, as does freewriting!
        </p>
        <h2 className="mb-4 mt-2 font-extrabold leading-6 text-muted-foreground underline">
          Here are some ideas to get you started:
        </h2>
        <ul className="mb-2 mt-2 text-sm font-normal leading-6 text-muted-foreground">
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
        <h2 className="mt-4 font-extrabold leading-6 text-muted-foreground underline">
          Benefits of Play:
        </h2>
        <p className="mb-2 mt-2 text-sm font-normal leading-6 text-muted-foreground">
          Our minds are currently trained to do something because it’s
          “productive.” We want to make a product out of everything in
          capitalism. Play is about letting go of the demand to always be
          productive. Always be Doing Something Significant (as Roseanne Bane
          puts it). It’s teaching your brain to let go. Play teaches our brain
          that we can surrender our fears of making mistakes—the things that
          often cause our resistance.
        </p>
        <p className="mb-2 mt-2 text-sm font-normal leading-6 text-muted-foreground">
          Brenda Ueland says in her book If You Want to Write: "So you see the
          imagination needs moodling--long, inefficient, happy idling and
          puttering." Play puts you in the creative flow. It gives your brain
          permission to be free.
        </p>
        <p className="mb-2 mt-2 text-sm font-normal leading-6 text-muted-foreground">
          Our right hemisphere is often dominated by the left. Play gives your
          right brain the stage! This helps you have more imagination on the
          page when you enter WIP time. It's an antidote to perfectionism. It’s
          important. You don't have to do it for long. Just 5 minutes.
        </p>
        <h2 className="mb-2 mt-4 font-extrabold leading-6 text-muted-foreground underline">
          WIP Time
        </h2>
        <p className="mb-2 mt-2 text-sm font-normal leading-6 text-muted-foreground">
          This is where you work on writing. That can be anything: reading a
          craft/creativity book, developing characters, developing an outline,
          researching, finding an idea, etc.
        </p>
        <p className="mb-4 mt-2 text-sm font-normal leading-6 text-muted-foreground">
          Here are some examples of WIP time:
        </p>
        <ul className="mb-2 mt-2 text-sm font-normal leading-6 text-muted-foreground">
          <li className="mb-2">
            Showing up at the page and writing a sentence.
          </li>
          <li className="mb-2">Freewriting</li>
          <li className="mb-2">Branching/Brainstorming</li>
          <li className="mb-2">Storyboarding or outlining</li>
          <li className="mb-2">
            Writing character sketches, backstory, or Story Genius/Snowflake
            Method prompts
          </li>
          <li className="mb-2">Drawing a map of your world</li>
          <li className="mb-2">Drafting</li>
          <li className="mb-2">Rapid Writing</li>
          <li className="mb-2">Revising</li>
          <li className="mb-2">Researching potential publishers/agents, etc</li>
          <li className="mb-2">Querying</li>
          <li className="mb-2">Researching setting</li>
          <li className="mb-2">Rewriting</li>
          <li className="mb-2">Getting feedback</li>
          <li className="mb-2">Taking a writing class</li>
          <li className="mb-2">The list goes on</li>
          <p className="mb-2 mt-2 text-sm font-normal leading-6 text-muted-foreground">
            It’s basically anything that is helping you create words and make
            your writing career happen.
          </p>
        </ul>
        <h2 className="mb-4 mt-4 font-extrabold leading-6 text-muted-foreground underline">
          Self Care
        </h2>
        <p className="mb-2 mt-2 text-sm font-normal leading-6 text-muted-foreground">
          It's best to do self care slowly when first building a habit. First,
          go to the gym once or twice a week. And then build from there.
        </p>
        <p className="mb-2 mt-2 text-sm font-normal leading-6 text-muted-foreground">
          Self-Care can look like:
        </p>

        <ul className="mb-2 mt-2 text-sm font-normal leading-6 text-muted-foreground">
          <li className="mb-2">Movement (gym, dance, swim, etc)</li>
          <li className="mb-2">Stretching</li>
          <li className="mb-2">Taking a walk</li>
          <li className="mb-2">Meditation</li>
          <li className="mb-2">Praying to the muse</li>
          <li className="mb-2">Reading</li>
          <li className="mb-2">Journaling</li>
          <li className="mb-2">Making a smoothie</li>
          <li className="mb-2">Going outside</li>
          <li className="mb-2">Anything that feeds your soul</li>
        </ul>
        <h2 className="mb-4 mt-4 font-extrabold leading-6 text-muted-foreground underline">
          Benefits of Self-Care:
        </h2>

        <p className="mb-2 mt-2 text-sm font-normal leading-6 text-muted-foreground">
          A lot of us skimp on this because it’s hard work. But if we don’t
          practice self-care, we can’t expect out bodies and minds to show up
          the way we want them to.
        </p>
        <p className="mb-2 mt-2 text-sm font-normal leading-6 text-muted-foreground">
          Movement is helpful for the brain because there is evidence that it
          improves creativity, reasoning, attention, motivation, and problem
          solving. It also increases the growth of new neurons AND the
          connections between them (if we’re getting technical, this is called
          BDNF: brain-derived neurotrophic factor). It helps regulate serotonin,
          dopamine, and norepinephrine, which helps with anxiety and depression.
        </p>

        <p className="mb-2 mt-2 text-sm font-normal leading-6 text-muted-foreground">
          These things are also critical to our ability to write, because it
          helps us pay attention, focus, and improve cognitive ability.
        </p>
        <p className="mb-2 mt-2 text-sm font-normal leading-6 text-muted-foreground">
          Let me say this: movement does not have to be about “losing weight” or
          any other toxic fatphobic thing. It’s also not accessible to all
          people, so do what works best for you. I personally exercise to help
          prevent migraines and knee issues, and don’t do it to “lose weight” or
          “look good.” The goal can be whatever you need it to be.
        </p>

        <h2 className="mb-4 mt-2 font-extrabold leading-6 text-muted-foreground underline">
          The Paragraph:
        </h2>
        <p className="mb-2 mt-2 text-sm font-normal leading-6 text-muted-foreground">
          This is sort of a journal/diary entry on how your writing has gone for
          you today.
        </p>
        <p className="mb-2 mt-2 text-sm font-normal leading-6 text-muted-foreground">
          You can chronicle:
        </p>

        <ul className="mb-2 mt-2 text-sm font-normal leading-6 text-muted-foreground">
          <li className="mb-2">Your past as a writer</li>
          <li className="mb-2">
            Record your struggles and triumphs (specifically in writing)
          </li>
          <li className="mb-2">What you're working on</li>
          <li className="mb-2">How things are going with your writing today</li>
          <li className="mb-2">
            What's working in your process, or not working
          </li>
          <li className="mb-2">What excites you about writing (or not)</li>
          <li className="mb-2">
            Where you see yourself, or/and where you'd like to be as a writer
          </li>
          <li className="mb-2">
            What it was like doing certain writing/story planning prompts (such
            as reading Save the Cat and doing prompts, or another type of craft
            book).
          </li>
        </ul>
        <p className="mb-2 mt-2 text-sm font-normal leading-6 text-muted-foreground">
          Benefits of the paragraph: It will show you the journey of your
          creativity. You can track your mood and mindset over different aspects
          of your work and see patterns. It’s also a great place to vent or
          celebrate
        </p>
      </div>
    </Shell>
  );
}
