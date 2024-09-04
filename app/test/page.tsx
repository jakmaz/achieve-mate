import { steamApi } from "@/lib/steam-fetch";

export default async function Page() {
  const games = await steamApi.getUserOwnedGames("76561198989375284");
  const gamesPlayed = games.filter((game) => game.minutes > 0);

  console.log(gamesPlayed);
  return (
    <div>
      <h1>Page</h1>
    </div>
  );
}
