import { steamApi } from "@/lib/steam-fetch";
import Image from "next/image";

export default async function GameList({ steamId }: { steamId: string }) {
  const games = await steamApi.getUserOwnedGames(steamId, {
    includeAppInfo: true,
  });

  // Sort and filter operations
  const recentlyPlayed = [...games]
    .sort((a, b) => b.lastPlayedTimestamp - a.lastPlayedTimestamp)
    .slice(0, 5); // Top 5 recently played games

  const longestPlayedFirst = [...games].sort((a, b) => b.minutes - a.minutes); // Games sorted by playtime

  return (
    <div className="container mx-auto p-6">
      <p className="text-lg mb-6">Total Games: {games.length}</p>

      {games.length > 0 ? (
        <>
          {/* Recently Played Games */}
          <h2 className="text-2xl font-semibold mb-4">Recently Played Games</h2>
          <ul className="space-y-4">
            {recentlyPlayed.map((game) => (
              <li key={game.game.id} className="flex items-center space-x-4">
                <div className="relative w-16 h-16">
                  <Image
                    src={game.game.logoURL}
                    alt={`${game.game.name} logo`}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-md"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{game.game.name}</h3>
                  <p>App ID: {game.game.id}</p>
                  <p>Playtime: {(game.minutes / 60).toFixed(2)} hours</p>
                </div>
              </li>
            ))}
          </ul>

          {/* All Games by Longest Playtime */}
          <h2 className="text-2xl font-semibold mb-4">
            All Games by Longest Playtime
          </h2>
          <ul className="space-y-4">
            {longestPlayedFirst.map((game) => (
              <li key={game.game.id} className="flex items-center space-x-4">
                <div className="relative w-16 h-16">
                  <Image
                    src={game.game.logoURL}
                    alt={`${game.game.name} logo`}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-md"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{game.game.name}</h3>
                  <p>App ID: {game.game.id}</p>
                  <p>Playtime: {(game.minutes / 60).toFixed(2)} hours</p>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No games found for this user.</p>
      )}
    </div>
  );
}
