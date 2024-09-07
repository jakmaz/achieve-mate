// Type for User Summary Response (from ISteamUser/GetPlayerSummaries/v2/)
export interface SteamUserSummary {
  steamid: string;
  communityvisibilitystate: number;
  profilestate?: number;
  personaname: string;
  commentpermission?: number;
  profileurl: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  avatarhash: string;
  lastlogoff?: number;
  personastate: number;
  primaryclanid?: string;
  timecreated: number;
  personastateflags?: number;
  loccountrycode?: string;
  locstatecode?: string;
  loccityid?: number;
}

// Type for Game owned by the user (from IPlayerService/GetOwnedGames/v1/)
export interface OwnedGame {
  appid: number;
  name?: string;
  playtime_forever: number;
  playtime_windows_forever: number;
  playtime_mac_forever: number;
  playtime_linux_forever: number;
  img_icon_url?: string;
  img_logo_url?: string;
  has_community_visible_stats?: boolean;
}

// Type for Achievements of a game (from ISteamUserStats/GetPlayerAchievements/v1/)
export interface Achievement {
  apiname: string;
  achieved: number;
  unlocktime: number;
}

// Type for Game Schema (from ISteamUserStats/GetSchemaForGame/v2/)
export interface GameSchema {
  gameName: string;
  gameVersion: string;
  availableGameStats: {
    achievements: AchievementSchema[];
    stats: any[]; // Define more specific types if needed
  };
}

export interface AchievementSchema {
  name: string;
  defaultvalue: number;
  displayName: string;
  hidden: boolean;
  description: string;
  icon: string;
  icongray: string;
}
