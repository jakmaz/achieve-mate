import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GameList from "@/components/ui/games-list";
import { steamApi } from "@/lib/steam-fetch";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  let user;
  try {
    user = await steamApi.getUserSummary(params.id);
  } catch (error) {
    return notFound();
  }

  // Hardcoded stats for the example
  const totalAchievements = 320;
  const gamesCompleted = 42;
  const totalGames = 120;
  const totalPlaytime = 1600; // in hours

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
          src={user.avatar.large}
          alt={`${user.nickname}'s avatar`}
          width={96}
          height={96}
          className="rounded-xl"
        />
        <div>
          <h1 className="text-4xl font-bold">{user.nickname}</h1>
          <p>{user.steamid}</p>
          <p>
            Member since:{" "}
            {new Date(user.timeCreated * 1000).toLocaleDateString()}
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
                {totalPlaytime} hours
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
