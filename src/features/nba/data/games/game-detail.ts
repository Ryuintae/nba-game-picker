import type { FeaturedGame } from "@/features/nba/types/home";

export const gameDetailMap: Record<string, FeaturedGame> = {
    "lakers-warriors": {
        id: "lakers-warriors",
        time: "8:30 PM",
        awayTeam: "Lakers",
        homeTeam: "Warriors",
        awayRecord: "47-30",
        homeRecord: "45-32",
        score: 92,
        streak: "최근 접전 가능성 높음",
        reason:
            "양 팀 모두 최근 득점력이 높고, 경기 흐름이 좋아 오늘 경기 중 가장 먼저 볼 만한 매치업입니다.",
        stats: {
            awayLast5: "4승 1패",
            homeLast5: "3승 2패",
            awayPpg: "118.2",
            homePpg: "116.4",
            awayOppPpg: "112.8",
            homeOppPpg: "113.5",
            awayWinRate: "61.0%",
            homeWinRate: "58.4%",
            headToHead: "Lakers 2 - 2 Warriors",
        },
    },
    "celtics-bucks": {
        id: "celtics-bucks",
        time: "9:00 PM",
        awayTeam: "Celtics",
        homeTeam: "Bucks",
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