import type { FeaturedGame } from "@/features/nba/types/home";

function createDemoGame({
    id,
    time,
    awayTeam,
    homeTeam,
    awayTeamAbbr,
    homeTeamAbbr,
    awayLogoUrl,
    homeLogoUrl,
    awayRecord,
    homeRecord,
    score,
    awayPpg,
    homePpg,
    awayOppPpg,
    homeOppPpg,
    headToHead,
}: {
    id: string;
    time: string;
    awayTeam: string;
    homeTeam: string;
    awayTeamAbbr: string;
    homeTeamAbbr: string;
    awayLogoUrl: string;
    homeLogoUrl: string;
    awayRecord: string;
    homeRecord: string;
    score: number;
    awayPpg: string;
    homePpg: string;
    awayOppPpg: string;
    homeOppPpg: string;
    headToHead: string;
}): FeaturedGame {
    return {
        id,
        time,
        awayTeam,
        homeTeam,
        awayTeamAbbr,
        homeTeamAbbr,
        awayLogoUrl,
        homeLogoUrl,
        awayRecord,
        homeRecord,
        score,
        streak: "데모 경기",
        reason:
            "경기 없는 날에도 상세 페이지 구성을 확인할 수 있도록 준비한 데모 매치업입니다.",
        stats: {
            awayLast5: "7-3",
            homeLast5: "8-2",
            awayPpg,
            homePpg,
            awayOppPpg,
            homeOppPpg,
            awayWinRate: ".585",
            homeWinRate: ".646",
            headToHead,
        },
        recentResults: {
            away: [],
            home: [],
        },
    };
}

export const gameDetailMap: Record<string, FeaturedGame> = {
    "demo-preview-gsw-lal": createDemoGame({
        id: "demo-preview-gsw-lal",
        time: "11:00",
        awayTeam: "Golden State Warriors",
        homeTeam: "Los Angeles Lakers",
        awayTeamAbbr: "GSW",
        homeTeamAbbr: "LAL",
        awayLogoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/gs.png",
        homeLogoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/lal.png",
        awayRecord: "48-34",
        homeRecord: "53-29",
        score: 96,
        awayPpg: "114.8",
        homePpg: "118.2",
        awayOppPpg: "111.6",
        homeOppPpg: "109.7",
        headToHead: "최근 5전 LAL 3승 2패",
    }),
    "demo-preview-bos-nyk": createDemoGame({
        id: "demo-preview-bos-nyk",
        time: "09:30",
        awayTeam: "Boston Celtics",
        homeTeam: "New York Knicks",
        awayTeamAbbr: "BOS",
        homeTeamAbbr: "NYK",
        awayLogoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/bos.png",
        homeLogoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/ny.png",
        awayRecord: "57-25",
        homeRecord: "51-31",
        score: 88,
        awayPpg: "116.9",
        homePpg: "113.7",
        awayOppPpg: "109.2",
        homeOppPpg: "110.5",
        headToHead: "최근 5전 BOS 3승 2패",
    }),
    "demo-preview-den-phx": createDemoGame({
        id: "demo-preview-den-phx",
        time: "10:00",
        awayTeam: "Denver Nuggets",
        homeTeam: "Phoenix Suns",
        awayTeamAbbr: "DEN",
        homeTeamAbbr: "PHX",
        awayLogoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/den.png",
        homeLogoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/phx.png",
        awayRecord: "52-30",
        homeRecord: "46-36",
        score: 84,
        awayPpg: "115.1",
        homePpg: "114.4",
        awayOppPpg: "110.8",
        homeOppPpg: "112.3",
        headToHead: "최근 5전 DEN 3승 2패",
    }),
    "demo-preview-dal-lac": createDemoGame({
        id: "demo-preview-dal-lac",
        time: "11:30",
        awayTeam: "Dallas Mavericks",
        homeTeam: "LA Clippers",
        awayTeamAbbr: "DAL",
        homeTeamAbbr: "LAC",
        awayLogoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/dal.png",
        homeLogoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/lac.png",
        awayRecord: "45-37",
        homeRecord: "47-35",
        score: 79,
        awayPpg: "112.6",
        homePpg: "111.9",
        awayOppPpg: "113.4",
        homeOppPpg: "110.8",
        headToHead: "최근 5전 LAC 3승 2패",
    }),
};
