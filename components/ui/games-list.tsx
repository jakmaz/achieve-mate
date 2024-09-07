import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { steamApi } from "@/lib/steam-fetch";
import Image from "next/image";
import Link from "next/link";

export default async function GameList({ steamId }: { steamId: string }) {
  const games = await steamApi.getUserOwnedGames(steamId, {
    includeAppInfo: true,
  });

  const longestPlayedFirst = [...games].sort((a, b) => b.minutes - a.minutes); // Games sorted by playtime

  return (
    <div>
      {games.length > 0 ? (
        <div>
          <h2 className="text-3xl font-bold mb-2">All Games</h2>
          <p className="text-lg mb-6">Total Games: {games.length}</p>
          <ul className="space-y-4">
            {longestPlayedFirst.map((game) => (
              <li key={game.game.id}>
                <Card className="flex items-center justify-between p-4">
                  {/* Left section: Logo and Game Details */}
                  <div className="flex items-center space-x-4">
                    <Link href={`${steamId}/${game.game.id}`}>
                      <Image
                        src={game.game.headerMediumURL}
                        alt={`${game.game.name} logo`}
                        width={200}
                        height={100}
                        className="rounded-md object-contain"
                      />
                    </Link>

                    <div>
                      <CardHeader className="p-0">
                        <CardTitle className="text-xl font-bold">
                          <Link
                            href={`${steamId}/${game.game.id}`}
                            className="hover:underline"
                          >
                            {game.game.name}
                          </Link>
                        </CardTitle>
                      </CardHeader>
                    </div>
                  </div>

                  {/* Right section: Playtime */}
                  <CardContent className="p-0">
                    <CardDescription className="text-right">
                      Playtime: {(game.minutes / 60).toFixed(2)} hours
                    </CardDescription>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-lg">No games found for this user.</p>
      )}
    </div>
  );
}
