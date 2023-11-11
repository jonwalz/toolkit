import { Button } from "@nextui-org/button";

import Sidebar from "./_components/Sidebar";

// import { CreatePost } from "~/app/_components/create-post";
// import { api } from "~/trpc/server";

export default function Home() {
  // const hello = await api.post.hello.query({ text: "from tRPC" });

  return (
    <main className="">
      <Button>Button</Button>
      <Sidebar />
    </main>
  );
}
