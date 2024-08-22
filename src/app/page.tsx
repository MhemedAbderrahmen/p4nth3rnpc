import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
        hi
        {/* <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16"></div> */}
      </main>
    </HydrateClient>
  );
}
