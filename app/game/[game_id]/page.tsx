import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { steamApi } from "@/lib/steam-fetch";
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

  if (!gameData) {
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
          <h1 className="text-4xl font-bold">{name}</h1>
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
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        {/* Overview Content */}
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>{name} - Overview</CardTitle>
              <CardContent>
                <div
                  dangerouslySetInnerHTML={{ __html: detailed_description }}
                  className="prose prose-sm "
                />
              </CardContent>
            </CardHeader>
          </Card>
        </TabsContent>

        {/* Media Content */}
        <TabsContent value="media">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {screenshots.map((screenshot: any) => (
              <div key={screenshot.id} className="relative w-full h-60">
                <Image
                  src={screenshot.path_full}
                  alt={`Screenshot ${screenshot.id}`}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-lg"
                />
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Reviews Content */}
        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle>Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-md">
                “Unlike anything else I've played.” – Polygon
              </p>
              <p className="text-md">
                “A hallmark of excellence.” – Destructoid
              </p>
              <p className="text-md">
                “The most innovative shooter I’ve played in years.” – Washington
                Post
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
