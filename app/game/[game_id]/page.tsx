import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { steamApi } from "@/lib/steam-fetch";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function GamePage({
  params,
}: {
  params: { game_id: string };
}) {
  const gameId = Number(params.game_id);

  if (isNaN(gameId)) {
    return notFound();
  }

  // Fetch game data from the API
  const gameData = await steamApi.getGameDetails(gameId);
  const gameSchema = await steamApi.getGameSchema(gameId);

  if (!gameData || !gameSchema) {
    return notFound();
  }

  const {
    name,
    header_image,
    detailed_description,
    developers,
    publishers,
    genres,
    platforms,
    screenshots,
    release_date,
  } = gameData;

  const gameAchievements = gameSchema.availableGameStats.achievements;

  return (
    <div className="container mx-auto p-6 mt-10">
      {/* Header section */}
      <div className="flex flex-col lg:flex-row items-center gap-6 mb-8">
        <Image
          src={header_image}
          alt={name}
          width={460}
          height={215}
          className="rounded-lg"
        />
        <div className="text-center lg:text-left">
          <div className="flex gap-2 items-center">
            <h1 className="text-4xl font-bold">{name}</h1>
            <ExternalLink />
          </div>
          <p className="text-sm text-gray-500">
            Release Date: {release_date.date}
          </p>
          <div className="text-md mt-4">
            <strong>Developers:</strong> {developers.join(", ")}
          </div>
          <div className="text-md mt-1">
            <strong>Publishers:</strong> {publishers.join(", ")}
          </div>
          <div className="text-md mt-1">
            <strong>Genres:</strong>{" "}
            {genres.map((g: any) => g.description).join(", ")}
          </div>
          <div className="text-md mt-1">
            <strong>Platforms:</strong> {Object.keys(platforms).join(", ")}
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="achievements" className="w-full">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="guides">Guides</TabsTrigger>
        </TabsList>

        {/* Achievements Content */}
        <TabsContent value="achievements">
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {gameAchievements.map((achievement: any) => (
                  <li
                    key={achievement.name}
                    className="bg-gray-800 p-4 rounded-md flex justify-between items-center space-x-4"
                  >
                    <div className="flex items-center space-x-4">
                      <Image
                        src={achievement.icon}
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
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Guides Content */}
        <TabsContent value="guides">
          <Card>
            <CardHeader>
              <CardTitle>Guides</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Guides will be displayed here.</p>
              {/* Add logic to display guides if available */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
