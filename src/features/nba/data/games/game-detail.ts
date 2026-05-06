import type { FeaturedGame } from "@/features/nba/types/home";

export const gameDetailMap: Record<string, FeaturedGame> = {
    "lakers-warriors": {
        id: "lakers-warriors",
        time: "8:30 PM",
        awayTeam: "Lakers",
        homeTeam: "Warriors",
        awayTeamAbbr: "LAL",
        homeTeamAbbr: "GSW",
        awayRecord: "48-30",
        homeRecord: "46-32",
        score: 94,
        streak: "Rivalry Night",
        reason: "...",
        stats: {
            awayLast5: "...",
            homeLast5: "...",
            awayPpg: "...",
            homePpg: "...",
            awayOppPpg: "...",
            homeOppPpg: "...",
            awayWinRate: "...",
            homeWinRate: "...",
            headToHead: "...",
        },
    },

    "celtics-bucks": {
        id: "celtics-bucks",
        time: "9:00 PM",
        awayTeam: "Celtics",
        homeTeam: "Bucks",
        awayTeamAbbr: "BOS",
        homeTeamAbbr: "MIL",
        awayRecord: "58-20",
        homeRecord: "54-24",
        score: 88,
        streak: "상위권 팀 맞대결",
        reason:
            "동부 상위권 팀들의 맞대결로 전술 완성도와 스타 파워를 함께 볼 수 있는 경기입니다.",
        stats: {
            awayLast5: "4승 1패",
            homeLast5: "4승 1패",
            awayPpg: "120.1",
            homePpg: "118.9",
            awayOppPpg: "109.4",
            homeOppPpg: "111.2",
            awayWinRate: "74.4%",
            homeWinRate: "69.2%",
            headToHead: "Celtics 3 - 1 Bucks",
        },
    },
};