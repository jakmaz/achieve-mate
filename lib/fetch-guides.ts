import * as cheerio from "cheerio";

type GuideInfo = {
  title: string;
  author: string;
  description: string;
  rating: number;
};

export const getGuidesOverview = async (
  gameId: string,
): Promise<GuideInfo[] | null> => {
  try {
    // Construct the URL using the gameId
    const url = `https://steamcommunity.com/app/${gameId}/guides/?searchText=&browsefilter=toprated&requiredtags%5B%5D=Achievements&requiredtags%5B%5D=English`;

    // Step 1: Fetch the HTML page
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch the page: ${response.statusText}`);
    }
    const html = await response.text();

    // Step 2: Load the HTML into cheerio
    const $ = cheerio.load(html);

    // Step 3: Extract guides overview
    const guides: GuideInfo[] = [];

    $(".workshopItemCollectionContainer").each((_index, element) => {
      const title = $(element).find(".workshopItemTitle").text().trim();
      const author = $(element).find(".workshopItemAuthorName").text().trim();
      const description = $(element)
        .find(".workshopItemShortDesc")
        .text()
        .trim();
      const rating = $(element).find(".fileRating").length; // Assuming fileRating class repeats for each star

      guides.push({
        title,
        author,
        description,
        rating,
      });
    });

    return guides;
  } catch (error) {
    console.error("Error scraping guide info:", error);
    return null;
  }
};
