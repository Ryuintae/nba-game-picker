"use client";

import { useEffect, useId, useMemo } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themesAnimated from "@amcharts/amcharts5/themes/Animated";
import type { FeaturedGameStats } from "@/features/nba/types/home";

am5.addLicense("AM5C367437821");

type MatchupDivergingBarChartProps = {
    awayTeamAbbr: string;
    homeTeamAbbr: string;
    stats: FeaturedGameStats;
};

type ChartDatum = {
    metric: string;
    away: number;
    home: number;
    awayLabel: string;
    homeLabel: string;
};

function parseStatValue(value: string) {
    const trimmedValue = value.trim();

    if (trimmedValue.includes("-")) {
        const [wins, losses] = trimmedValue.split("-").map(Number);

        if (Number.isFinite(wins) && Number.isFinite(losses)) {
            const total = wins + losses;
            return total > 0 ? wins / total : 0;
        }
    }

    const numericValue = Number(trimmedValue.replace(/[^\d.-]/g, ""));
    return Number.isFinite(numericValue) ? numericValue : 0;
}

function normalizePair(away: number, home: number, lowerIsBetter = false) {
    const awayValue = lowerIsBetter ? 1 / Math.max(away, 1) : away;
    const homeValue = lowerIsBetter ? 1 / Math.max(home, 1) : home;
    const maxValue = Math.max(Math.abs(awayValue), Math.abs(homeValue), 1);

    return {
        away: -Math.round((Math.abs(awayValue) / maxValue) * 100),
        home: Math.round((Math.abs(homeValue) / maxValue) * 100),
    };
}

function getChartData(stats: FeaturedGameStats): ChartDatum[] {
    const form = normalizePair(
        parseStatValue(stats.awayLast5),
        parseStatValue(stats.homeLast5)
    );
    const scoring = normalizePair(
        parseStatValue(stats.awayPpg),
        parseStatValue(stats.homePpg)
    );
    const defense = normalizePair(
        parseStatValue(stats.awayOppPpg),
        parseStatValue(stats.homeOppPpg),
        true
    );
    const winRate = normalizePair(
        parseStatValue(stats.awayWinRate),
        parseStatValue(stats.homeWinRate)
    );

    return [
        {
            metric: "최근 5경기",
            away: form.away,
            home: form.home,
            awayLabel: stats.awayLast5,
            homeLabel: stats.homeLast5,
        },
        {
            metric: "평균 득점",
            away: scoring.away,
            home: scoring.home,
            awayLabel: stats.awayPpg,
            homeLabel: stats.homePpg,
        },
        {
            metric: "평균 실점",
            away: defense.away,
            home: defense.home,
            awayLabel: stats.awayOppPpg,
            homeLabel: stats.homeOppPpg,
        },
        {
            metric: "승률",
            away: winRate.away,
            home: winRate.home,
            awayLabel: stats.awayWinRate,
            homeLabel: stats.homeWinRate,
        },
    ];
}

export default function MatchupDivergingBarChart({
    awayTeamAbbr,
    homeTeamAbbr,
    stats,
}: MatchupDivergingBarChartProps) {
    const chartId = useId().replaceAll(":", "-");
    const chartData = useMemo(() => getChartData(stats), [stats]);

    useEffect(() => {
        const root = am5.Root.new(chartId);
        root.setThemes([am5themesAnimated.new(root)]);

        const chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panX: false,
                panY: false,
                wheelX: "none",
                wheelY: "none",
                paddingLeft: 0,
                paddingRight: 0,
                paddingTop: 6,
                paddingBottom: 0,
                layout: root.verticalLayout,
            })
        );

        const xRenderer = am5xy.AxisRendererX.new(root, {});
        xRenderer.grid.template.setAll({
            strokeOpacity: 0.08,
        });
        xRenderer.labels.template.setAll({
            forceHidden: true,
        });

        const xAxis = chart.xAxes.push(
            am5xy.ValueAxis.new(root, {
                min: -100,
                max: 100,
                strictMinMax: true,
                renderer: xRenderer,
            })
        );

        const yRenderer = am5xy.AxisRendererY.new(root, {
            minGridDistance: 18,
            inversed: true,
        });
        yRenderer.grid.template.setAll({
            forceHidden: true,
        });
        yRenderer.labels.template.setAll({
            fill: am5.color(0x9ca3af),
            fontSize: 10,
            fontWeight: "600",
            paddingRight: 8,
        });

        const yAxis = chart.yAxes.push(
            am5xy.CategoryAxis.new(root, {
                categoryField: "metric",
                renderer: yRenderer,
            })
        );
        yAxis.data.setAll(chartData);

        const zeroRange = xAxis.createAxisRange(
            xAxis.makeDataItem({ value: 0 })
        );
        zeroRange.get("grid")?.setAll({
            stroke: am5.color(0xffffff),
            strokeOpacity: 0.22,
            strokeWidth: 1,
        });

        function createSeries(
            name: string,
            field: "away" | "home",
            labelField: "awayLabel" | "homeLabel",
            color: number,
            align: "left" | "right"
        ) {
            const series = chart.series.push(
                am5xy.ColumnSeries.new(root, {
                    name,
                    xAxis,
                    yAxis,
                    valueXField: field,
                    categoryYField: "metric",
                    fill: am5.color(color),
                    stroke: am5.color(color),
                    sequencedInterpolation: true,
                })
            );

            series.columns.template.setAll({
                height: am5.percent(48),
                cornerRadiusBL: 2,
                cornerRadiusBR: 2,
                cornerRadiusTL: 2,
                cornerRadiusTR: 2,
            });
            series.bullets.push(() =>
                am5.Bullet.new(root, {
                    locationX: align === "left" ? 0 : 1,
                    sprite: am5.Label.new(root, {
                        text: `{${labelField}}`,
                        populateText: true,
                        centerY: am5.p50,
                        centerX: align === "left" ? am5.p100 : 0,
                        dx: align === "left" ? -6 : 6,
                        fill: am5.color(0xe5e7eb),
                        fontSize: 10,
                        fontWeight: "700",
                    }),
                })
            );
            series.data.setAll(chartData);
            series.appear(500);
        }

        createSeries(awayTeamAbbr, "away", "awayLabel", 0x1d428a, "left");
        createSeries(homeTeamAbbr, "home", "homeLabel", 0xf97316, "right");
        chart.appear(500, 80);

        return () => {
            root.dispose();
        };
    }, [awayTeamAbbr, chartData, chartId, homeTeamAbbr]);

    return (
        <div className="mt-4 border-y border-black/8 py-4 dark:border-white/10">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <p className="text-[11px] font-semibold text-neutral-950 dark:text-white">
                        지표 우위 차트
                    </p>
                    <p className="mt-1 text-[10px] text-neutral-500 dark:text-neutral-400">
                        중앙 기준선에서 양 팀 지표 우위를 비교
                    </p>
                </div>
                <div className="flex shrink-0 items-center gap-3 text-[10px] font-medium text-neutral-500 dark:text-neutral-400">
                    <span className="inline-flex items-center gap-1.5">
                        <span className="h-2 w-2 bg-[#1d428a]" />
                        {awayTeamAbbr}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <span className="h-2 w-2 bg-orange-500" />
                        {homeTeamAbbr}
                    </span>
                </div>
            </div>

            <div className="mt-3 border border-black/8 bg-white dark:border-white/10 dark:bg-black/12">
                <div id={chartId} className="h-[188px] w-full" />
            </div>
        </div>
    );
}
