import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GameList from "@/components/ui/games-list";
import { steamApi } from "@/lib/steam-api";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  // Fetch user summary
  let user;
  try {
    user = await steamApi.getUserSummary(params.id);
  } catch (error) {
    return notFound();
  }

  // Fetch owned games
  const userGames = await steamApi.getUserOwnedGames(params.id);

  // Variables to store dynamic stats
  let totalAchievements = 0;
  let gamesCompleted = 0;
  let totalPlaytime = 0;

  // Iterate over each game to fetch achievements and playtime
  for (const game of userGames) {
    const gameAchievements = await steamApi.getUserAchievements(
      params.id,
      game.appid.toString(),
    );

    // Sum up achievements count
    totalAchievements += gameAchievements.length;

    // If the user has unlocked all achievements, count it as a completed game
    const unlockedAchievements = gameAchievements.filter(
      (achievement) => achievement.achieved === 1,
    );

    if (
      unlockedAchievements.length === gameAchievements.length &&
      gameAchievements.length > 0
    ) {
      gamesCompleted++;
    }

    // Sum up the playtime in minutes and convert to hours
    totalPlaytime += game.playtime_forever;
  }

  // Convert totalPlaytime to hours (Steam returns playtime in minutes)
  const totalPlaytimeInHours = (totalPlaytime / 60).toFixed(2);

  // Get total number of games owned
  const totalGames = userGames.length;

  const rareAchievements = [
    {
      title: "Hidden Masterpiece",
      percentage: 0.34,
      icon: "/achievement-icon1.png",
    },
    {
      title: "Unstoppable Force",
      percentage: 0.54,
      icon: "/achievement-icon2.png",
    },
    {
      title: "Perfect Strategy",
      percentage: 0.66,
      icon: "/achievement-icon3.png",
    },
    {
      title: "Last Survivor",
      percentage: 0.89,
      icon: "/achievement-icon4.png",
    },
    {
      title: "Ultimate Victory",
      percentage: 1.12,
      icon: "/achievement-icon5.png",
    },
  ];

  const completedPercentage = ((gamesCompleted / totalGames) * 100).toFixed(2);

  return (
    <div className="container mx-auto p-6">
      {/* User Information Section */}
      <div className="flex items-center space-x-6 mb-8">
        <Image
          src={user.avatarfull}
          alt={`${user.personaname}'s avatar`}
          width={96}
          height={96}
          className="rounded-xl"
        />
        <div>
          <h1 className="text-4xl font-bold">{user.personaname}</h1>
          <p>{user.steamid}</p>
          <p>
            Member since:{" "}
            {new Date(user.timecreated * 1000).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Overall Stats Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">User Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Total Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Total Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-center">
                {totalAchievements}
              </p>
            </CardContent>
          </Card>
          {/* Completed Games */}
          <Card>
            <CardHeader>
              <CardTitle>Games Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-center">
                {gamesCompleted}/{totalGames} ({completedPercentage}%)
              </p>
            </CardContent>
          </Card>
          {/* Total Playtime */}
          <Card>
            <CardHeader>
              <CardTitle>Total Playtime</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-center">
                {totalPlaytimeInHours} hours
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Rarest Achievements Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Rarest Achievements</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {rareAchievements.map((achievement, index) => (
            <Card key={index} className="text-center">
              <CardContent>
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Image
                    src={achievement.icon}
                    alt={achievement.title}
                    width={96}
                    height={96}
                    className="rounded-md"
                  />
                </div>
                <h3 className="text-lg font-semibold">{achievement.title}</h3>
                <p>Unlocked by {achievement.percentage}% of players</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Game List Section */}
      <div className="mb-8">
        <GameList steamId={params.id} />
      </div>
    </div>
  );
}
