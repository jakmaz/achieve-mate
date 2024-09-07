import { AchievementList } from "@/components/achievement-list";
import Breadcrumbs from "@/components/breadcrumbs-wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { steamApi } from "@/lib/steam-fetch";
import Link from "next/link";
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
  steamApi;

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

  // Split achievements into completed and missing
  const completedAchievements = mergedAchievements.filter(
    (achievement: any) => achievement.unlocked,
  );
  const missingAchievements = mergedAchievements.filter(
    (achievement: any) => !achievement.unlocked,
  );

  return (
    <div className="flex flex-col gap-4 mt-10">
      <div className="flex gap-4 items-center">
        <Breadcrumbs
          userId={playerInfo.nickname}
          gameName={gameSchema.gameName}
        />
        <Link href={`/game/${params.game_id}`}>
          <Button variant="outline">View Game Info</Button>
        </Link>
      </div>

      <Tabs defaultValue="completed" className="w-full">
        <TabsList className="w-full flex justify-center">
          <TabsTrigger value="completed" className="w-1/2">
            Completed
          </TabsTrigger>
          <TabsTrigger value="missing" className="w-1/2">
            Missing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <AchievementList achievements={completedAchievements} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="missing">
          <Card>
            <CardHeader>
              <CardTitle>Missing Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <AchievementList achievements={missingAchievements} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
