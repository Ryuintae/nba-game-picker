"use client";

import { useEffect, useId, useMemo } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themesAnimated from "@amcharts/amcharts5/themes/Animated";

am5.addLicense("AM5C367437821");

type MatchupStatsChartProps = {
    awayTeamLabel: string;
    homeTeamLabel: string;
    stats: {
        awayLastTen: string;
        homeLastTen: string;
        awayPpg: string;
        homePpg: string;
        awayOppPpg: string;
        homeOppPpg: string;
    };
};

type ChartDatum = {
    metric: string;
    away: number;
    home: number;
    awayLabel: string;
    homeLabel: string;
};

function parseValue(value: string) {
    if (value.includes("-")) {
        const [wins, losses] = value.split("-").map(Number);
        const total = wins + losses;

        return total > 0 ? Number(((wins / total) * 100).toFixed(1)) : 0;
    }

    const numericValue = Number(value.replace(/[^\d.-]/g, ""));
    return Number.isFinite(numericValue) ? numericValue : 0;
}

export default function MatchupStatsChart({
    awayTeamLabel,
    homeTeamLabel,
    stats,
}: MatchupStatsChartProps) {
    const chartId = useId().replaceAll(":", "-");
    const chartData = useMemo<ChartDatum[]>(
        () => [
            {
                metric: "최근 흐름",
                away: parseValue(stats.awayLastTen),
                home: parseValue(stats.homeLastTen),
                awayLabel: stats.awayLastTen,
                homeLabel: stats.homeLastTen,
            },
            {
                metric: "평균 득점",
                away: parseValue(stats.awayPpg),
                home: parseValue(stats.homePpg),
                awayLabel: stats.awayPpg,
                homeLabel: stats.homePpg,
            },
            {
                metric: "평균 실점",
                away: parseValue(stats.awayOppPpg),
                home: parseValue(stats.homeOppPpg),
                awayLabel: stats.awayOppPpg,
                homeLabel: stats.homeOppPpg,
            },
        ],
        [stats]
    );

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
                paddingTop: 8,
                paddingBottom: 0,
            })
        );

        const xRenderer = am5xy.AxisRendererX.new(root, {
            minGridDistance: 26,
        });
        xRenderer.grid.template.setAll({ strokeOpacity: 0 });
        xRenderer.labels.template.setAll({
            fill: am5.color(0x6b7280),
            fontSize: 11,
            fontWeight: "600",
        });

        const xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
                categoryField: "metric",
                renderer: xRenderer,
            })
        );
        xAxis.data.setAll(chartData);

        const yRenderer = am5xy.AxisRendererY.new(root, {});
        yRenderer.grid.template.setAll({
            stroke: am5.color(0x111827),
            strokeOpacity: 0.08,
        });
        yRenderer.labels.template.setAll({
            fill: am5.color(0x9ca3af),
            fontSize: 10,
        });

        const yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                min: 0,
                renderer: yRenderer,
            })
        );

        function createSeries(
            name: string,
            valueField: "away" | "home",
            labelField: "awayLabel" | "homeLabel",
            color: number
        ) {
            const series = chart.series.push(
                am5xy.ColumnSeries.new(root, {
                    name,
                    xAxis,
                    yAxis,
                    valueYField: valueField,
                    categoryXField: "metric",
                    clustered: true,
                    sequencedInterpolation: true,
                    fill: am5.color(color),
                    stroke: am5.color(color),
                    tooltipText: `${name}: {${labelField}}`,
                })
            );

            series.columns.template.setAll({
                width: am5.percent(70),
                cornerRadiusTL: 2,
                cornerRadiusTR: 2,
                strokeOpacity: 0,
            });
            series.bullets.push(() =>
                am5.Bullet.new(root, {
                    locationY: 1,
                    sprite: am5.Label.new(root, {
                        text: `{${labelField}}`,
                        populateText: true,
                        centerX: am5.p50,
                        centerY: am5.p100,
                        dy: -6,
                        fill: am5.color(0xffffff),
                        fontSize: 10,
                        fontWeight: "700",
                    }),
                })
            );
            series.data.setAll(chartData);
            series.appear(500);
        }

        createSeries(awayTeamLabel, "away", "awayLabel", 0x1d428a);
        createSeries(homeTeamLabel, "home", "homeLabel", 0xf97316);
        chart.appear(500, 80);

        return () => {
            root.dispose();
        };
    }, [awayTeamLabel, chartData, chartId, homeTeamLabel]);

    return (
        <div className="mt-6 border border-black/8 bg-[#f8f9fb] p-4 dark:border-white/10 dark:bg-white/[0.04]">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <p className="text-[13px] font-semibold tracking-[-0.02em] text-neutral-950 dark:text-white">
                        매치업 비교 차트
                    </p>
                    <p className="mt-1 text-[11px] text-neutral-500 dark:text-neutral-400">
                        최근 흐름과 득점/실점 지표를 나란히 비교합니다.
                    </p>
                </div>
                <div className="flex shrink-0 items-center gap-3 text-[10px] font-semibold text-neutral-500 dark:text-neutral-400">
                    <span className="inline-flex items-center gap-1.5">
                        <span className="h-2 w-2 bg-[#1d428a]" />
                        {awayTeamLabel}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <span className="h-2 w-2 bg-orange-500" />
                        {homeTeamLabel}
                    </span>
                </div>
            </div>
            <div id={chartId} className="mt-3 h-[260px] w-full" />
        </div>
    );
}
