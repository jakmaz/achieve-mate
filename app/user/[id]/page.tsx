import GameList from "@/components/ui/games-list";
import { steamApi } from "@/lib/steam-fetch";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  let user;
  try {
    user = await steamApi.getUserSummary(params.id);
  } catch (error) {
    return notFound();
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{user.nickname} Games</h1>
      <GameList steamId={params.id} />
    </div>
  );
}
