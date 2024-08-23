import { UserInitializer } from "~/app/_components/user-initializer";
import { HydrateClient } from "~/trpc/server";

export default function Page({ params }: { params: { username: string } }) {
  return (
    <HydrateClient>
      <main className="flex min-h-screen w-full flex-col items-center gap-4">
        <UserInitializer params={params} />
      </main>
    </HydrateClient>
  );
}
