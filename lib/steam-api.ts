import { STEAM_API_KEY } from "./env";
import {
  Achievement,
  GameSchema,
  OwnedGame,
  SteamUserSummary,
} from "./types/steam-api";

const STEAM_API_BASE_URL = "https://api.steampowered.com";

class SteamApi {
  apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  // Helper method for API requests with typed return
  async fetchFromSteamApi<T>(
    endpoint: string,
    params: Record<string, string | number>,
  ): Promise<T> {
    const url = new URL(`${STEAM_API_BASE_URL}${endpoint}`);
    url.searchParams.append("key", this.apiKey);
    Object.keys(params).forEach((key) => {
      url.searchParams.append(key, String(params[key]));
    });

    const response = await fetch(url.toString(), {
      next: { revalidate: 60 * 60 * 60 * 24 }, // Cache for 10 minutes, then revalidate
    });

    if (!response.ok) {
      throw new Error(`Steam API request failed: ${response.statusText}`);
    }
    return response.json();
  }

  // Method to get user summary with typed return
  async getUserSummary(steamId: string): Promise<SteamUserSummary> {
    const endpoint = "/ISteamUser/GetPlayerSummaries/v2/";
    const params = { steamids: steamId };
    const data = await this.fetchFromSteamApi<{
      response: { players: SteamUserSummary[] };
    }>(endpoint, params);
    return data.response.players[0]; // Return the first player in the response
  }

  // Method to get user achievements for a game with typed return
  async getUserAchievements(
    steamId: string,
    appId: string,
  ): Promise<Achievement[]> {
    const endpoint = "/ISteamUserStats/GetPlayerAchievements/v1/";
    const params = { steamid: steamId, appid: appId };

    try {
      const data = await this.fetchFromSteamApi<{
        playerstats: {
          achievements?: Achievement[];
          error?: string;
          success: boolean;
        };
      }>(endpoint, params);

      // Check if the response contains an error (indicating no achievements)
      if (data.playerstats.error) {
        return []; // Return an empty array if there are no achievements
      }

      return data.playerstats.achievements || [];
    } catch (error) {
      return [];
    }
  }

  // Method to get game details with typed return
  async getGameDetails(appId: string): Promise<GameSchema> {
    const endpoint = "/ISteamUserStats/GetSchemaForGame/v2/";
    const params = { appid: appId };
    const data = await this.fetchFromSteamApi<{ game: GameSchema }>(
      endpoint,
      params,
    );
    return data.game;
  }

  // Method to get user's owned games with typed return
  async getUserOwnedGames(steamId: string): Promise<OwnedGame[]> {
    const endpoint = "/IPlayerService/GetOwnedGames/v1/";
    const params = {
      steamid: steamId,
      include_appinfo: 1,
      include_played_free_games: 1,
    };
    const data = await this.fetchFromSteamApi<{
      response: { games: OwnedGame[] };
    }>(endpoint, params);
    return data.response.games;
  }
}

export const steamApi = new SteamApi(STEAM_API_KEY);
