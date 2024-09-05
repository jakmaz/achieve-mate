import Breadcrumbs from "@/components/breadcrumbs-wrapper";
import { steamApi } from "@/lib/steam-fetch";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { id: string; game_id: string };
}) {
  const gameId = Number(params.game_id);

  if (isNaN(gameId)) {
    return notFound();
  }

  // Fetch player achievements and game schema
  const playerInfo = await steamApi.getUserSummary(params.id);
  const playerAchievements = (
    await steamApi.getUserAchievements(params.id, gameId)
  ).achievements;
  const gameSchema = await steamApi.getGameSchema(gameId);
  const gameAchievements = gameSchema.availableGameStats.achievements;

  // Merge playerAchievements with gameAchievements by matching "apiname" and "name"
  const mergedAchievements = playerAchievements.map(
    (playerAchievement: any) => {
      const matchingGameAchievement = gameAchievements.find(
        (gameAchievement: any) =>
          gameAchievement.name === playerAchievement.name,
      );

      return {
        ...playerAchievement,
        ...matchingGameAchievement, // Merge achievement details from game schema
      };
    },
  );

  console.log(mergedAchievements);

  return (
    <div className="flex flex-col gap-4 mt-10">
      <Breadcrumbs
        userId={playerInfo.nickname}
        gameName={gameSchema.gameName}
      />

      <p className="text-lg mb-4">Achievements for this game:</p>

      <ul className="space-y-4">
        {mergedAchievements.map((achievement: any) => (
          <li
            key={achievement.name}
            className="bg-gray-800 p-4 rounded-md flex justify-between items-center space-x-4"
          >
            <div className="flex items-center space-x-4">
              <Image
                src={
                  achievement.unlocked ? achievement.icon : achievement.icongray
                }
                className="rounded-lg"
                alt={achievement.displayName}
                width={64}
                height={64}
              />
              <div>
                <h3 className="text-xl font-semibold">
                  {achievement.displayName}
                </h3>
                <p>{achievement.description}</p>
              </div>
            </div>
            <p>
              {achievement.unlocked
                ? `Unlocked on ${new Date(
                    achievement.unlockedTimestamp * 1000,
                  ).toLocaleDateString()}`
                : "Not unlocked yet"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
