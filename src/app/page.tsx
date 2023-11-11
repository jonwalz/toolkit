import { Button } from "@nextui-org/button";

import Sidebar from "./_components/Sidebar";
import { Nav } from "./_components/Navbar";

// import { CreatePost } from "~/app/_components/create-post";
// import { api } from "~/trpc/server";

export default function Home() {
  // const hello = await api.post.hello.query({ text: "from tRPC" });

  return (
    <main className="">
      <Nav />
      <div className="border-t">
        <div className="bg-background">
          <div className="grid lg:grid-cols-5">
            <Sidebar className="hidden lg:block" />
          </div>
        </div>
      </div>
    </main>
  );
}
