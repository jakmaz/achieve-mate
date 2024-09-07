import * as cheerio from "cheerio";

type GuideInfo = {
  title: string;
  author: string;
  description: string;
  rating: number;
  icon: string;
  guideLink: string;
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

      // Extracting the star rating from the image file name
      const ratingImageSrc = $(element).find(".fileRating").attr("src");
      let rating = 0;
      if (ratingImageSrc) {
        const ratingMatch = ratingImageSrc.match(/(\d)-star\.png/);
        if (ratingMatch) {
          rating = parseInt(ratingMatch[1], 10);
        }
      }

      // Extracting the guide link
      const guideLink = $(element)
        .find("a.workshopItemCollection")
        .attr("href");

      // Extracting the icon image
      const icon = $(element).find(".workshopItemPreviewImage").attr("src");

      guides.push({
        title,
        author,
        description,
        rating,
        icon: icon ? icon : "", // Handle cases where icon might be missing
        guideLink: guideLink ? guideLink : "", // Handle cases where link might be missing
      });
    });

    return guides;
  } catch (error) {
    console.error("Error scraping guide info:", error);
    return null;
  }
};
