import { steamApi } from "@/lib/steam-fetch";

export default async function Page({ params }: { params: { id: string } }) {
  // Fetch games from the API
  const games = await steamApi.getUserOwnedGames(params.id);

  // Sort and filter operations
  const recentlyPlayed = [...games]
    .sort((a, b) => b.lastPlayedTimestamp - a.lastPlayedTimestamp)
    .slice(0, 5); // Top 5 recently played games

  const longestPlayedFirst = [...games].sort((a, b) => b.minutes - a.minutes); // Games sorted by playtime

  const gamesPlayed = games.filter((game) => game.minutes > 0); // Games with non-zero playtime

  return (
    <div>
      <h1>User Steam Games</h1>
      <p>Total Games: {games.length}</p>

      {games.length > 0 ? (
        <>
          {/* Recently Played Games */}
          <h2>Recently Played Games</h2>
          <ul>
            {recentlyPlayed.map((game) => (
              <li key={game.game.id}>
                <p>App ID: {game.game.id}</p>
                <p>Playtime (in hours): {(game.minutes / 60).toFixed(2)}</p>
              </li>
            ))}
          </ul>

          {/* All Games by Longest Playtime */}
          <h2>All Games by Longest Playtime</h2>
          <ul>
            {longestPlayedFirst.map((game) => (
              <li key={game.game.id}>
                <p>App ID: {game.game.id}</p>
                <p>Playtime (in hours): {(game.minutes / 60).toFixed(2)}</p>
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
