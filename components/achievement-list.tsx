import Image from "next/image";

export function AchievementList({ achievements }: { achievements: any[] }) {
  return (
    <ul className="space-y-4">
      {achievements.map((achievement: any) => (
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
              ? `Unlocked on ${new Date(achievement.unlockedTimestamp * 1000).toLocaleDateString()}`
              : "Not unlocked yet"}
          </p>
        </li>
      ))}
    </ul>
  );
}
