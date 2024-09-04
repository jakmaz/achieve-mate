import SteamAPI from "steamapi";
import { STEAM_API_KEY } from "./env";

export const steamApi = new SteamAPI(STEAM_API_KEY);
