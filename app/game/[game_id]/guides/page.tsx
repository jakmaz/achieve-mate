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
      <h1 className="text-4xl font-bold text-center text-white mb-8">
        Top Rated Guides
      </h1>
      {guides ? (
        <div className="space-y-8">
          {guides.map((guide, index) => (
            <div
              key={index}
              className="bg-gray-800 text-white hover:shadow-lg transition-shadow rounded-lg p-6 flex items-start space-x-6"
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
                <h2 className="text-2xl font-bold text-white">
                  <a
                    href={guide.guideLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {guide.title}
                  </a>
                </h2>
                <p className="text-gray-400 mb-2">By {guide.author}</p>

                {/* Description */}
                {guide.description && (
                  <p className="text-sm text-gray-300 mb-4 line-clamp-3">
                    {guide.description}
                  </p>
                )}

                {/* Rating */}
                <p className="text-sm font-medium text-yellow-400">
                  Rating: {guide.rating} / 5
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-400">No guides found</p>
      )}
    </div>
  );
}
