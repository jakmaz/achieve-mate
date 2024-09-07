import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Adjust path as needed
import { getGuidesOverview } from "@/lib/fetch-guides";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: { game_id: string };
}) {
  const guides = await getGuidesOverview(params.game_id);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Top Rated Guides</h1>
      {guides ? (
        <div className="space-y-8">
          {guides.map((guide, index) => (
            <Card
              key={index}
              className="flex items-start space-x-6 p-6 hover:shadow-lg transition-shadow"
            >
              {/* Guide Icon */}
              {guide.icon && (
                <div className="flex-shrink-0">
                  <Image
                    src={guide.icon}
                    alt={`${guide.title} icon`}
                    width={150}
                    height={150}
                    className="rounded-xl object-cover"
                  />
                </div>
              )}

              {/* Guide Info */}
              <div className="flex-1">
                <CardHeader className="p-0">
                  <CardTitle className="text-2xl font-bold">
                    <a
                      href={guide.guideLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {guide.title}
                    </a>
                  </CardTitle>
                  <CardDescription className="text-gray-400 mb-2">
                    By {guide.author}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-0">
                  {/* Description */}
                  {guide.description && (
                    <p className="text-sm mb-4 line-clamp-3">
                      {guide.description}
                    </p>
                  )}

                  {/* Rating */}
                  <p className="text-sm font-medium text-yellow-400">
                    Rating: {guide.rating} / 5
                  </p>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-400">No guides found</p>
      )}
    </div>
  );
}
