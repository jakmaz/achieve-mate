import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";

export default function Home() {
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (userId.trim()) {
  //     router.push(`/user/${userId}`);
  //   }
  // };
  async function searchUser(formData: FormData) {
    "use server";
    formData.get("steamId");
    redirect(`/user/${formData.get("steamId")}`);
  }

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center mt-36">
        <h1 className="text-4xl font-bold mb-4">Welcome to AchieveMate</h1>
        <p className="text-lg mb-8">
          Track your Steam achievements and progress with ease.
        </p>
        <form
          action={searchUser}
          className="flex flex-col items-center space-y-4"
        >
          <Input
            name="steamId"
            type="text"
            placeholder="Enter your Steam ID"
            className="w-72"
          />
          <Button type="submit" className="w-72">
            Track Achievements
          </Button>
        </form>
      </div>
    </div>
  );
}
