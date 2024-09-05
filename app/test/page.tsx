import { getGuidesOverview } from "@/lib/fetch-guides";

export default async function Page() {
  const guides = await getGuidesOverview("730");
  console.log(guides);

  return (
    <div>
      <h1>Page</h1>
    </div>
  );
}
