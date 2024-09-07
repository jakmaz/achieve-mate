import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Ensure to adjust the import path if needed
import Image from "next/image";

export function AchievementList({ achievements }: { achievements: any[] }) {
  return (
    <ul className="space-y-4">
      {achievements.map((achievement: any) => (
        <li key={achievement.name}>
          <Card className="flex justify-between items-center p-4 space-x-4">
            {/* Left Section: Icon and Achievement Details */}
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
                <CardHeader className="p-0">
                  <CardTitle className="text-xl font-semibold">
                    {achievement.displayName}
                  </CardTitle>
                  <CardDescription>{achievement.description}</CardDescription>
                </CardHeader>
              </div>
            </div>

            {/* Right Section: Unlock Information */}
            <CardContent className="p-0">
              <p>
                {achievement.unlocked
                  ? `Unlocked on ${new Date(achievement.unlockedTimestamp * 1000).toLocaleDateString()}`
                  : "Not unlocked yet"}
              </p>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}
